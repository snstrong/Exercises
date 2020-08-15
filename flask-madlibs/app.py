from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import stories

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

@app.route('/')
def get_answers():
    return render_template('index.html', prompts = stories.story.prompts)

@app.route('/your_story')
def make_story():
    generated_story = stories.story.generate(request.args)
    return render_template('your_story.html', your_story=generated_story)