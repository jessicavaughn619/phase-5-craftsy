import os
import json
from flask import redirect, request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_login import (
    LoginManager,
    current_user,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient
import requests
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import User, Product, LocalUser

CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

client = WebApplicationClient(GOOGLE_CLIENT_ID)

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@app.route("/")
def index():
    return f'<h1>Craftsy Backend Development</h1>'

class CheckSession(Resource):
    def get(self):
        if current_user.is_authenticated:
            return current_user.to_dict(), 200
        if session.get('user_id'):
            user = LocalUser.query.filter(LocalUser.id == session['user_id']).first()
            return user.to_dict(), 200
        else:
            session['cart'] = []
            return {'error': '401 Unauthorized'}, 401

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@app.route("/login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@app.route("/login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code,
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that we have tokens (yay) let's find and hit URL
    # from Google that gives you user's profile information,
    # including their Google Profile Image and Email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # We want to make sure their email is verified.
    # The user authenticated with Google, authorized our
    # app, and now we've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    # Create a user in our db with the information provided
    # by Google
    user = User(
        id=unique_id, name=users_name, email=users_email, profile_pic=picture
    )

    # Doesn't exist? Add to database
    if not User.query.get(unique_id):
        user = User(
            id=unique_id, 
            name=users_name, 
            email=users_email, 
            profile_pic=picture
        )
        db.session.add(user)
        db.session.commit()
    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    return redirect('http://localhost:4000/')

class Logout(Resource):
    def delete(self):
        if current_user:
            logout_user()
            session['cart'] = []
            return {}, 204
        if session.get('user_id'):
            session['user_id'] = None
            session['cart'] = []
            return {}, 204
        return {"error": "401 Unauthorized"}, 401

class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        first_name = request_json.get('firstName')
        last_name= request_json.get('lastName')
        username = request_json.get('username')
        password = request_json.get('password')

        user = LocalUser(
            first_name=first_name,
            last_name=last_name,
            username=username,
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        
class LocalLogin(Resource):
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = LocalUser.query.filter(LocalUser.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200
            return {'error': 'Incorrect password.'}, 401

        return {'error': '401 Unauthorized'}, 401
        
class Products(Resource):
    def get(self):
        products = [product.to_dict() for product in Product.query.all()]
        return make_response(products, 200)
    
class ProductByID(Resource):
    def get(self, id):
        product = [product.to_dict() for product in Product.query.filter_by(id=id).first()]
        return make_response(product, 200)
    
class Cart(Resource):
    def get(self):
        cart_data = session.get('cart', [])
        if cart_data:
            cart_ids = tuple(cart_data)
            products = Product.query.filter(Product.id.in_(cart_ids)).all()
            product_dicts = [product.to_dict() for product in products]
            return make_response(product_dicts, 200)
        else:
            return jsonify(cart_data)
        
class CartByID(Resource):
    def post(self, id):
        session['cart'].append(id)
        session.modified=True
        return {'message': 'Successfully added item to cart'}, 201
    def delete(self, id):
        if id in session['cart']:
            session['cart'].remove(id)
            session.modified=True
            return {'message': 'Successfully removed item from cart'}, 204
        return {'error': 'Item not found in cart'}, 404
    
api.add_resource(LocalLogin, '/local_login', endpoint='local_login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Products, '/products', endpoint='products')
api.add_resource(Cart, '/cart', endpoint='cart')
api.add_resource(ProductByID, '/product/<int:id>')
api.add_resource(CartByID, '/cart/<int:id>')