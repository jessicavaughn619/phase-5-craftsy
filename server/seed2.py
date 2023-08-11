from config import app, db
from models import Order, order_product

with app.app_context():
    print("Deleting orders...")

    db.session.query(order_product).delete()
    db.session.commit()

    Order.query.delete()
    db.session.commit()

    db.session.commit()

    print("Complete!")
