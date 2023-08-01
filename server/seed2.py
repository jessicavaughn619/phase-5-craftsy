from config import app, db
from models import Product, User, Review, Order, order_product

with app.app_context():
    print("Finding users and updating profile pics...")

    molly = User.query.filter(User.username == "mvaughn").first()
    molly.profile_pic = "https://i.imgur.com/fyc16TF.jpg"

    jessica = User.query.filter(User.username == "jvaughn").first()
    jessica.profile_pic = "https://i.imgur.com/QAhNi2d.jpg"

    steve = User.query.filter(User.username == "svaughn").first()
    steve.profile_pic = "https://i.imgur.com/fw9YLnA.jpg"

    db.session.commit()

    print("Complete!")
