from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin
from sqlalchemy import func

from config import db, bcrypt
    
class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', '-products.user', '-reviews.user', '-user', )

    id = db.Column(db.String, primary_key=True, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    profile_pic = db.Column(db.String)
    _password_hash = db.Column(db.String)

    reviews = db.relationship('Review', backref='user')

    def get(user_id):
        user = User.query.filter_by(id=user_id).first()
        return user

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User ID: {self.id} | First Name: {self.first_name} | Last Name: {self.last_name} | Email: {self.email} | Username: {self.username} | Profile Pic: {self.profile_pic} >'
    
class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    serialize_rules = ('-reviews.product', '-reviews.user.reviews', )

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    in_stock = db.Column(db.Boolean, default=False, nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=False)

    reviews = db.relationship('Review', backref='product')

    def __repr__(self):
        return f'<Product Item: {self.item} | Description: {self.description} | Category: {self.category} | Price: {self.price} | In Stock: {self.in_stock} | Quantity: {self.quantity} >'
    
class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    serialize_rules = ('-products.review', '-users.review', )

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=func.now())

    user_id = db.Column(db.String, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    def __repr__(self):
        return f'<Review ID: {self.id} | Rating: {self.rating} | Content: {self.content} >'
