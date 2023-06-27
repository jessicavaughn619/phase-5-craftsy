from config import app, db
from models import Product, User

with app.app_context():
    
    # products = []

    print("Deleting existing users...")
    User.query.delete()
    db.session.commit()

    # print("Deleting existing products...")
    # Product.query.delete()
    # db.session.commit()

    def create_products():
        print("Creating product instances...")

        duck_family = Product(
            item="Duck Family",
            image="https://i.imgur.com/mfqf985.jpg",
            description="Blue ceramic duck with white speckles",
            category="Ceramic",
            price=50,
            in_stock=True,
            quantity=2
        )
        products.append(duck_family)

        birdbath_large = Product(
            item="Bird Bath",
            image="https://i.imgur.com/MJvLDfO.jpg",
            description="Blue ceramic birdbath with white speckles",
            category="Ceramic",
            price=75,
            in_stock=True,
            quantity=1
        )
        products.append(birdbath_large)

        frog_large = Product(
            item="Frog",
            image="https://i.imgur.com/Q7sHnTu.jpg",
            description="Large green ceramic frog",
            category="Ceramic",
            price=30,
            in_stock=True,
            quantity=2
        )
        products.append(frog_large)

        rabbit_medium = Product(
            item="Rabbit",
            image="https://i.imgur.com/nGDkNnj.jpg",
            description="Medium brown rabbit",
            category="Ceramic",
            price=20,
            in_stock=True,
            quantity=1
        )
        products.append(rabbit_medium)

        rabbit_large = Product(
            item="Rabbit",
            image="https://i.imgur.com/Blfj1ij.jpg",
            description="Large gray rabbit",
            category="Ceramic",
            price=30,
            in_stock=False,
            quantity=1
        )
        products.append(rabbit_large)

        snail_medium = Product(
            item="Snail",
            image="https://i.imgur.com/HelV5vJ.jpg",
            description="Medium brown snail with red shell",
            category="Ceramic",
            price=20,
            in_stock=True,
            quantity=3
        )
        products.append(snail_medium)

        rabbit_small = Product(
            item="Rabbit",
            image="https://i.imgur.com/VWqfw0N.jpg",
            description="Small gray rabbit",
            category="Ceramic",
            price=10,
            in_stock=True,
            quantity=1
        )
        products.append(rabbit_small)

        frog_small = Product(
            item="Frog",
            image="https://i.imgur.com/FBWy1Jm.jpg",
            description="Small green frog with brown speckles",
            category="Ceramic",
            price=10,
            in_stock=True,
            quantity=2
        )
        products.append(frog_small)

        lizard_small = Product(
            item="Lizard",
            image="https://i.imgur.com/ESsh9WF.jpg",
            description="Small green lizard",
            category="Ceramic",
            price=10,
            in_stock=True,
            quantity=4
        )
        products.append(lizard_small)

        db.session.add_all(products)
        db.session.commit()
    
    # create_products()
    # db.session.commit()

    print("Complete!")
    