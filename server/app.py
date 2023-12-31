import os
import json
import uuid
from flask import redirect, request, session, make_response, jsonify, url_for, render_template
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

from config import app, db, api
from models import Product, User, Review, Order

CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1' - Use in testing only

client = WebApplicationClient(GOOGLE_CLIENT_ID)


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.route("/")
@app.route("/about")
@app.route("/contact")
@app.route("/signup")
@app.route("/login")
@app.route("/products")
@app.route("/products/<int:id>")
@app.route("/cart")
def index(id=0):
    return render_template("index.html")

class CheckSession(Resource):
    def get(self):
        if current_user.is_authenticated:
            return current_user.to_dict(), 200
        elif session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            return user.to_dict(), 200
        else:
            session["cart"] = []
            return {"error": "401 Unauthorized"}, 401

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@app.route("/api/login")
def login():
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@app.route("/api/login/callback")
def callback():
    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

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

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return {"error": "User email not available or not verified by Google"}, 400

    user = User(
        id=unique_id, first_name=users_name, email=users_email, profile_pic=picture
    )

    if not User.get(unique_id):
        user = User(
            id=unique_id, first_name=users_name, email=users_email, profile_pic=picture
        )
        db.session.add(user)
        db.session.commit()

    db_user = User.get(unique_id)
    login_user(db_user, remember=True)
    return redirect("/")

class Logout(Resource):
    def delete(self):
        if current_user or session["user_id"]:
            session["cart"] = []
            session["user_id"] = None
            logout_user()
            return {"message": "Logged out"}, 204
        return {"error": "401 Unauthorized"}, 401

class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        first_name = request_json.get("first_name")
        last_name = request_json.get("first_name")
        username = request_json.get("username")
        password = request_json.get("password")

        user = User(
            id=str(uuid.uuid4()),
            first_name=first_name,
            last_name=last_name,
            username=username,
        )
        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user.to_dict(), 201

        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422

class LocalLogin(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get("username")
        password = request_json.get("password")

        user = User.query.filter_by(username=username).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200

            return {"error": "Incorrect password"}, 401

        return {"error": "401 Unauthorized"}, 401

class Products(Resource):
    def get(self):
        try:
            products = [product.to_dict() for product in Product.query.all()]
            return make_response(products, 200)
        except Exception as e:
            print(e)
            return make_response("Internal server error", 500)

class ProductByID(Resource):
    def get(self, id):
        product = [
            product.to_dict() for product in Product.query.filter_by(id=id).first()
        ]
        return make_response(product, 200)

    def post(self, id):
        request_json = request.get_json()

        rating = request_json.get("rating")
        content = request_json.get("content")
        user_id = request_json.get("user_id")

        user = User.query.filter_by(id=user_id).first()

        if user:
            review = Review(
                rating=rating,
                content=content,
                product_id=id,
                user_id=user_id,
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201
        return {"error": "Please login to leave a review"}, 401

class Cart(Resource):
    def get(self):
        cart_data = session.get("cart", [])
        
        if cart_data:
            cart_contents = {}
            for item in cart_data:
                product_id = item['id']
                quantity = item['quantity_in_cart']
                cart_contents[product_id] = quantity
            
            product_ids = list(cart_contents.keys())
            products = Product.query.filter(Product.id.in_(product_ids)).all()
            
            product_dicts = []
            for product in products:
                product_dict = product.to_dict()
                product_dict['quantity_in_cart'] = cart_contents[product.id]
                product_dicts.append(product_dict)
            
            return make_response(product_dicts, 200)
        else:
            return jsonify(cart_data)

class CartByID(Resource):
    def post(self, id):
        cart = session.get("cart", [])
        
        if id in cart:
            return {"error": "Item already added to cart"}, 401

        new_item = {
            "id": id,
            "quantity_in_cart": 1
        }

        cart.append(new_item)
        session["cart"] = cart
        session.modified = True
    
        return {"message": "Item added to cart"}, 201
    
    def patch(self, id):
        new_quantity = request.json.get('quantityInCart')
    
        if new_quantity is None:
            return jsonify(error="New quantity not provided"), 400
        
        cart = session.get('cart', [])
        
        item_to_update = next((item for item in cart if item['id'] == id), None)
        
        if item_to_update is None:
            return jsonify(error="Item not found in cart"), 404
        
        item_to_update['quantity_in_cart'] = new_quantity
        session['cart'] = cart
        session.modified = True
        
        return make_response(jsonify(message="Quantity in cart updated"), 200)

    def delete(self, id):
        cart = session.get("cart", [])
        
        item_to_remove = next((item for item in cart if item["id"] == id), None)
        
        if item_to_remove:
            cart.remove(item_to_remove)
            session["cart"] = cart
            session.modified = True
            return {"message": "Item removed from cart"}, 204
        return {"error": "Item not found in cart"}, 404

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)

class ReviewByID(Resource):
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()

        request_json = request.get_json()

        for attr in request_json:
            setattr(review, attr, request_json[attr])

        db.session.add(review)
        db.session.commit()

        return make_response(review.to_dict(), 200)

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return {"message": "Review deleted"}, 204
        else:
            return {"error": "Review not found"}, 404

class Orders(Resource):
    def get(self):
        orders = [order.to_dict() for order in Order.query.all()]
        return make_response(orders, 200)

    def post(self):
        request_json = request.get_json()

        paypal_id = request_json.get("paypal_id")
        products = request_json.get("products")
        user_id = request_json.get("user_id")
        total_cost = request_json.get("total_cost")

        product_ids = [product["id"] for product in products]

        allProducts = Product.query.filter(Product.id.in_(product_ids)).all()

        exists = Order.query.filter_by(paypal_id=paypal_id).first()
        if exists:
            return {"error": "Order already exists in database"}, 401

        else:
            for product in products:
                product_obj = Product.query.get(product["id"])
                amount_to_decrement = product["quantity_in_cart"]
                product_obj.quantity -= amount_to_decrement
                db.session.commit()

            order = Order(
                paypal_id=paypal_id,
                user_id=user_id,
                total_cost=total_cost,
                products=allProducts,
            )
            db.session.add(order)
            db.session.commit()

            session["cart"] = []
            return {"message": "Order created"}, 201

api.add_resource(LocalLogin, "/api/local_login", endpoint="local_login")
api.add_resource(Signup, "/api/signup", endpoint="signup")
api.add_resource(CheckSession, "/api/check_session", endpoint="check_session")
api.add_resource(Logout, "/api/logout", endpoint="logout")
api.add_resource(Products, "/api/products", endpoint="products")
api.add_resource(Cart, "/api/cart", endpoint="cart")
api.add_resource(ProductByID, "/api/product/<int:id>")
api.add_resource(CartByID, "/api/cart/<int:id>")
api.add_resource(Reviews, "/api/reviews", endpoint="reviews")
api.add_resource(ReviewByID, "/api/review/<int:id>")
api.add_resource(Orders, "/api/orders", endpoint="orders")