from config import app, db
from models import Product, User, Review, Order, order_product

with app.app_context():
    products = []

    print("Deleting existing data...")

    db.session.query(order_product).delete()
    db.session.commit()

    Review.query.delete()
    db.session.commit()

    Order.query.delete()
    db.session.commit()

    User.query.delete()
    db.session.commit()

    Product.query.delete()
    db.session.commit()

    def create_products():
        print("Creating product instances...")

        duck_family = Product(
            item="Duck Family",
            image="https://i.imgur.com/KOR0IHP.jpg",
            description="Blue ceramic duck with white speckles with two baby ducklings",
            category="Ceramic",
            price=50.00,
            quantity=2,
        )
        products.append(duck_family)

        birdbath_large = Product(
            item="Bird Bath",
            image="https://i.imgur.com/zzDL7E0.jpg",
            description="Blue ceramic birdbath with white speckles",
            category="Ceramic",
            price=75.00,
            quantity=1,
        )
        products.append(birdbath_large)

        frog_large = Product(
            item="Frog",
            image="https://i.imgur.com/NNaEDD8.jpg",
            description="Large green ceramic frog painted with brown speckles",
            category="Ceramic",
            price=30.00,
            quantity=0,
        )
        products.append(frog_large)

        rabbit_medium = Product(
            item="Rabbit",
            image="https://i.imgur.com/9GgtWyk.jpg",
            description="Medium brown rabbit with dark brown streaks in fur",
            category="Ceramic",
            price=20.00,
            quantity=3,
        )
        products.append(rabbit_medium)

        rabbit_large = Product(
            item="Rabbit",
            image="https://i.imgur.com/hgX1Tb6.jpg",
            description="Large gray rabbit",
            category="Ceramic",
            price=30.00,
            quantity=2,
        )
        products.append(rabbit_large)

        snail_medium = Product(
            item="Snail",
            image="https://i.imgur.com/4ivdIZb.jpg",
            description="Medium brown snail with red shell",
            category="Ceramic",
            price=20.00,
            quantity=3,
        )
        products.append(snail_medium)

        rabbit_small = Product(
            item="Rabbit",
            image="https://i.imgur.com/Ofk7eht.jpg",
            description="Small gray rabbit",
            category="Ceramic",
            price=10.00,
            quantity=1,
        )
        products.append(rabbit_small)

        frog_small = Product(
            item="Frog",
            image="https://i.imgur.com/aRXpG6V.jpg",
            description="Small green frog with brown speckles",
            category="Ceramic",
            price=10.00,
            quantity=2,
        )
        products.append(frog_small)

        lizard_small = Product(
            item="Lizard",
            image="https://i.imgur.com/bSRJM8W.jpg",
            description="Small green lizard",
            category="Ceramic",
            price=10.00,
            quantity=4,
        )
        products.append(lizard_small)

        pig_family = Product(
            item="Pig Family",
            image="https://i.imgur.com/pdcOyka.jpg",
            description="Medium tower of five pigs stacked on each others' shoulders",
            category="Ceramic",
            price=20.00,
            quantity=2,
        )
        products.append(pig_family)

        medium_pig = Product(
            item="Pig",
            image="https://i.imgur.com/Al3sCNx.jpg",
            description="Medium pink pig with reddish spots",
            category="Ceramic",
            price=20.00,
            quantity=3,
        )
        products.append(medium_pig)

        toadstool = Product(
            item="Toadstool",
            image="https://i.imgur.com/AFqkCak.jpg",
            description="Medium colorful toadstool",
            category="Ceramic",
            price=20.00,
            quantity=1,
        )
        products.append(toadstool)

        frog_medium = Product(
            item="Frog",
            image="https://i.imgur.com/eMOsRN9.jpg",
            description="Medium frog holding fly",
            category="Ceramic",
            price=20.00,
            quantity=2,
        )
        products.append(frog_medium)

        db.session.add_all(products)
        db.session.commit()

    create_products()
    db.session.commit()

    print("Complete!")
