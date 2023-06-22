from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin

from config import db, bcrypt

wishlist_product = db.Table('wishlist_products',
                            db.Column('wishlist_id', db.Integer, db.ForeignKey('wishlists.id'), primary_key=True),
                            db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True))

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    profile_pic = db.Column(db.String, nullable=False)

    def get(user_id):
        user = User.query.filter_by(id=user_id).first()
        return user

    def __repr__(self):
        return f'<User Name: {self.name} | Email: {self.email} >'
    
class LocalUser(db.Model, SerializerMixin):
    __tablename__ = 'local_users'

    serialize_rules = ('-_password_hash', )

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

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
        return f'<User {self.username}>'
    
class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    serialize_rules = ('-wishlists', )

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    in_stock = db.Column(db.Boolean, default=False, nullable=False)

    wishlists = db.relationship('Wishlist', secondary=wishlist_product, back_populates='products')

    def __repr__(self):
        return f'<Product Item: {self.item} | Description: {self.description} | Category: {self.category} | Price: {self.price} | In Stock: {self.in_stock} >'
    
class Wishlist(db.Model, SerializerMixin):
    __tablename__ = "wishlists"

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)

    products = db.relationship('Product', secondary=wishlist_product, back_populates='wishlists')

    def __repr__(self):
        return f'<Wishlist ID: {self.id} | User ID: {self.user_id} >'