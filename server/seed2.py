from config import app, db
from models import Product

with app.app_context():
    print("Updating products...")

    medium_pig = Product.query.filter(Product.item == "Medium Pig").first()
    medium_pig.item = "Pig"

    medium_frog = Product.query.filter(Product.item == "Medium Frog").first()
    medium_frog.item = "Frog"

    db.session.commit()

    print("Complete!")
