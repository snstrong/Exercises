from app import db
from models import Pet
db.drop_all()
db.create_all()

snargle = Pet(name="Snargle", species="cat", age=3, notes="Not a bobcat, for sure")
db.session.add(snargle)

stevie = Pet(name="Stevie Chicks", species="chicken", age=1, available=False)
db.session.add(stevie)

db.session.add(Pet(name="Mandy",
                species="dog",
                age=13,
                available=False))

db.session.add(Pet(name="Porchetta",
                species="porcupine",
                age=2,
                available=True))

db.session.add(Pet(name="Dante",
                species="wombat",
                age=4,
                available=True))

db.session.add(Pet(name="Purrsephone",
                species="cat",
                age=3,
                available=True))

db.session.add(Pet(name="Prestigiar",
                species="dog",
                age=1,
                notes="Fostered by Dr. Faust",
                available=True))

db.session.add(Pet(name="Bucky",
                species="horse",
                age='9',
                available=True))

db.session.commit()
