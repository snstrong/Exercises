from app import db
from models import Pet
db.drop_all()
db.create_all()

snargle = Pet(name="Snargle", species="cat", age=3, image_url="https://pixy.org/src/22/220728.jpg", notes="Not a bobcat, for sure")
db.session.add(snargle)

stevie = Pet(name="Stevie Chicks", species="chicken", age=1, available=False)
db.session.add(stevie)

db.session.add(Pet(name="Mandy",
                species="dog",
                age=1,
                image_url="https://img1.wsimg.com/isteam/ip/d594e59d-89b4-4dad-b2d1-d4a7cc187200/013DC406-688F-4E4F-924E-844161E5B6F2.jpeg/:/rs=w:2600,h:1600",
                available=False))

db.session.add(Pet(name="Porchetta",
                species="porcupine",
                age=2,
                available=True))

db.session.add(Pet(name="Scallion",
                species="frog",
                age=1,
                image_url="https://cdn.pixabay.com/photo/2013/05/14/18/25/frog-111179_1280.jpg",
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
