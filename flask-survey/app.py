from flask import Flask, request, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
import surveys
# from random import randint, choice, sample

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

#############################################################

responses = []

@app.route('/')
def get_start_page():
    """Shows start page with survey title, instructions, and start button"""
    return render_template('index.html', title=surveys.satisfaction_survey.title, instructions=surveys.satisfaction_survey.instructions)


