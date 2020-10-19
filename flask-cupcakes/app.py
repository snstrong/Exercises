"""Flask app for Cupcakes"""
from flask import Flask, request, redirect, render_template, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route("/")
def show_home_page():
    return render_template("index.html")

def serialize_cupcake(cupcake):
    """Serialize a Cupcake SQLAlchemy obj to dictionary."""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image    
    }

@app.route('/api/cupcakes')
def get_all_cupcakes():
    """Returns JSON data for all cupcakes"""
    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcake(c) for c in cupcakes]
    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_single_cupcake(cupcake_id):
    """Returns JSON data for single cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = serialize_cupcake(cupcake)
    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """Creates cupcake object from data in request.
    Responds with JSON data of new cupcake."""
    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = float(request.json["rating"])
    if request.json["image"]:
        image = request.json["image"]
    else:
        image = None
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    serialized = serialize_cupcake(new_cupcake)
    return ( jsonify(cupcake=serialized), 201 )

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get("flavor") if request.json.get("flavor") else cupcake.flavor
    cupcake.size = request.json.get("size") if request.json.get("size") else cupcake.size
    cupcake.rating = float(request.json.get("rating")) if request.json.get("rating") else cupcake.rating
    cupcake.image = request.json.get("image") if request.json.get("image") else cupcake.image
    db.session.add(cupcake)
    db.session.commit()
    serialized = serialize_cupcake(cupcake)
    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    """Delete a single cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    Cupcake.query.filter_by(id=cupcake.id).delete()
    db.session.commit()
    return jsonify({"message": "Cupcake deleted."})