"""Models for Pet Adoption Agency"""
import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)

class Pet(db.Model):
    __tablename__ = "pets"
    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    name = db.Column(db.String(30),
                    nullable=False,
                    unique=False)
    species = db.Column(db.String(30),
                    nullable=False,
                    unique=False)               
    image_url = db.Column(db.String(),
                    nullable=False,
                    default="https://image.freepik.com/free-vector/pet-silhouettes_23-2147506424.jpg")
    age = db.Column(db.Integer(),
                    nullable=True)
    notes = db.Column(db.String(),
                    nullable=True)
    available = db.Column(db.Boolean(),
                    nullable=False,
                    default=True)
