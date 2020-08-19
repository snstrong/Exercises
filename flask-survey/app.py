from flask import Flask, request, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample
#
app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)