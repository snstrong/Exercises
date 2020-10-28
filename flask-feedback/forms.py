from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, DateField, DateTimeField, IntegerField, TextAreaField, SelectField, PasswordField
from wtforms.fields.html5 import URLField, EmailField
from wtforms.validators import InputRequired, Optional, URL, Length
class RegisterForm(FlaskForm):
    """Form for registering a new user."""

    username = StringField(
        "Username",
        validators=[InputRequired(message="Username required"), Length(max=20)]
    )

    password = PasswordField(
        "Password",
        validators=[InputRequired(message="Password required")]
    )

    email = EmailField(
        "Email",
        validators=[InputRequired(message="Email required"), Length(max=50)]
    )

    first_name = StringField(
        "First Name",
        validators=[InputRequired(message="First name required"), Length(max=30)]
    )

    last_name = StringField(
        "Last Name",
        validators=[InputRequired(message="Last name required"), Length(max=30)]
    )

class LoginForm(FlaskForm):
    """Form for logging in a user."""

    username = StringField(
        "Username",
        validators=[InputRequired(message="Username required")]
    )

    password = PasswordField(
        "Password",
        validators=[InputRequired(message="Password required")]
    )

class FeedbackForm(FlaskForm):
    """Form for adding feedback."""

    title = StringField(
        "Title",
        validators=[InputRequired(message="Title required"), Length(max=100)]
    )

    content = TextAreaField(
        "Content",
        validators=[InputRequired(message="Please enter feedback")]
    )