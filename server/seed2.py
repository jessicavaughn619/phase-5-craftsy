from config import app, db
from models import Product

with app.app_context():
    def update_products():
        print("Updating product instances...")

        # duck_family = Product.query.filter_by(item="Duck Family").first()
        # duck_family.image = "https://i.imgur.com/KOR0IHP.jpg"

        # birdbath_large = Product.query.filter_by(item="Bird Bath").first()
        # birdbath_large.image = "https://i.imgur.com/zzDL7E0.jpg"

        frog_small = Product.query.filter_by(item="Frog", price=10.00).first()
        frog_small.image = "https://i.imgur.com/aRXpG6V.jpg"

        # frog_large = Product.query.filter_by(item="Frog", price=30.00).first()
        # frog_large.image = "https://i.imgur.com/NNaEDD8.jpg"

        # rabbit_small = Product.query.filter_by(item="Rabbit", price=10.00).first()
        # rabbit_small.image = "https://i.imgur.com/Ofk7eht.jpg"

        # rabbit_medium = Product.query.filter_by(item="Rabbit", price=20.00).first()
        # rabbit_medium.image = "https://i.imgur.com/9GgtWyk.jpg"

        # rabbit_large = Product.query.filter_by(item="Rabbit", price=30.00).first()
        # rabbit_large.image = "https://i.imgur.com/hgX1Tb6.jpg"

        # snail_medium = Product.query.filter_by(item="Snail").first()
        # snail_medium.image = "https://i.imgur.com/4ivdIZb.jpg"

        # lizard_small = Product.query.filter_by(item="Lizard").first()
        # lizard_small.image = "https://i.imgur.com/bSRJM8W.jpg"

        # pig_family = Product.query.filter_by(item="Pig Family").first()
        # pig_family.image = "https://i.imgur.com/pdcOyka.jpg"

        # medium_pig = Product.query.filter_by(item="Pig").first()
        # medium_pig.image = "https://i.imgur.com/Al3sCNx.jpg"

        # toadstool = Product.query.filter_by(item="Toadstool", price=20.00).first()
        # toadstool.image = "https://i.imgur.com/AFqkCak.jpg"

        # frog_medium = Product.query.filter_by(item="Frog", price=20.00).first()
        # frog_medium.image = "https://i.imgur.com/eMOsRN9.jpg"

        db.session.commit()

    update_products()
    db.session.commit()

    print("Complete!")
