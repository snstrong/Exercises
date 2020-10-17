"""Pet Adoption Agency application."""

from flask import Flask, request, redirect, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddNewPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

connect_db(app)
# db.create_all()

@app.route("/")
def show_pet_list():
    pets = Pet.query.all()
    return render_template("index.html", pets=pets)

@app.route("/add", methods=["GET", "POST"])
def show_add_pet_form():
    form = AddNewPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        age = form.age.data
        image_url = form.image_url.data
        if image_url:
            image_url=image_url
        else:
            image_url=None
        notes = form.notes.data
        
        db.session.add(Pet(name=name, species=species, age=age, image_url=image_url, notes=notes))
        db.session.commit()

        flash(f"Added {name} the {species}!")
        return redirect("/")
    else:
        return render_template("add_pet.html", form=form)

@app.route("/<int:pet_id>", methods=["GET", "POST"])
def show_pet_details(pet_id):
    """Show details page for individual pet"""
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm()
    if form.validate_on_submit():
        if form.notes.data:
            pet.notes = form.notes.data
        pet.available = form.available.data
        if form.image_url.data:
            pet.image_url = form.image_url.data
        db.session.commit()
        flash(f"{pet.name} updated!")
        return redirect('/')
    else:
        return render_template("pet_detail.html", form=form, pet=pet)