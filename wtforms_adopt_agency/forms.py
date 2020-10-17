from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, DateField, DateTimeField, IntegerField, TextAreaField, SelectField
from wtforms.fields.html5 import URLField
from wtforms.validators import InputRequired, Optional, URL, Length
class AddNewPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField(
        "Pet Name",
        validators=[InputRequired(message="Pet Name is required")],
        description="Fluffy"
    )
    species = SelectField(
        "Species",
        choices=[("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine"), ("frog", "Frog"), ("wombat", "Wombat"), ("fish", "Fish"), ("horse", "Horse"), ("chicken", "Chicken")],
    )
    age = IntegerField(
        "Age in Years",
        validators=[Optional()],
        description="2")
    image_url = URLField(
        "Photo of Pet",
        validators=[Optional(), URL()],
        description="http://www.instagram.com/your-image.jpg")
    notes = TextAreaField(
        "Comments",
        validators=[Optional(), Length(min=10)], description="Fluffy is an energetic doggo who loves to be loved!")

class EditPetForm(FlaskForm):
    """Form for editing an existing pet."""

    image_url = URLField(
        "Photo of Pet",
        validators=[Optional(), URL()],
        description="http://www.instagram.com/your-image.jpg"
    )

    notes = TextAreaField(
        "Comments",
        validators=[Optional(), Length(min=10)],
    )

    available = BooleanField("Available?")