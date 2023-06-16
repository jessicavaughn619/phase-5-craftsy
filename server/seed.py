from config import app, db
from models import User, Wishlist, Product, wishlist_product

with app.app_context():
    
    wishlists = []
    products = []

    print("Deleting existing wishlists and products...")
    db.session.query(wishlist_product).delete()
    db.session.commit()

    User.query.delete()
    db.session.commit()

    Wishlist.query.delete()
    db.session.commit()

    Product.query.delete()
    db.session.commit()

    def create_products():
        print("Creating product instances...")

        duck = Product(
            item="Duck",
            description="Blue ceramic duck with white speckles",
            category="Ceramic",
            price=15,
            in_stock=True
        )
        products.append(duck)

        birdbath = Product(
            item="Bird Bath",
            description="Blue ceramic birdbath with white speckles",
            category="Ceramic",
            price=50,
            in_stock=True
        )
        products.append(birdbath)

        turtle = Product(
            item="Turtle",
            description="Green ceramic turtle",
            category="Ceramic",
            price=15,
            in_stock=True
        )
        products.append(turtle)

        db.session.add_all(products)
        db.session.commit()
    
    create_products()
    db.session.commit()

    print("Complete!")
    