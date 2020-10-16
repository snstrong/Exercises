from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, DateField, DateTimeField, IntegerField, TextAreaField
from wtforms.fields.html5 import URLField
from wtforms.validators import InputRequired, Optional, URL
class AddNewPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Pet Name", validators=[InputRequired(message="Pet Name is required")], description="Fluffy")
    species = StringField("Species", validators=[InputRequired("Species is required")], description="Dog")
    age = IntegerField("Age in Years", validators=[Optional()], description="2")
    image_url = URLField("Photo of Pet", validators=[Optional(), URL(require_tld=False)], description="http://www.instagram.com/your-image.jpg")
    notes = TextAreaField("Notes", validators=[Optional()], description="Fluffy is an energetic doggo who loves to be loved!")