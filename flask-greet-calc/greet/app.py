# Greet

# In the greet folder, make a simple Flask app that responds to these routes with simple text messages:

# /welcome
# Returns “welcome”

# /welcome/home
# Returns “welcome home”

# /welcome/back
# Return “welcome back”

from flask import Flask, request
app = Flask(__name__)

@app.route('/welcome')
def say_welcome():
    return "<p>Welcome</p>"

pages = {
    "home": "Welcome Home",
    "back": "Welcome Back"
}

@app.route('/welcome/<id>')
def get_page(id):
    page = pages.get(id, "Page not found")
    return f"<p>{page}</p>"

