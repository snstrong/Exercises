from flask import Flask, request, render_template, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

#############################################################

RESPONSES = []

@app.route('/')
def get_start_page():
    """Shows start page with survey title, instructions, and start button"""
    return render_template('index.html', title=surveys.satisfaction_survey.title, instructions=surveys.satisfaction_survey.instructions)

@app.route('/question/<num>')
def get_question(num):
    """Used to show each question in the survey."""
    num = int(num)
    if num == len(RESPONSES):
        if len(RESPONSES) < len(surveys.satisfaction_survey.questions):
            choices = surveys.satisfaction_survey.questions[num].choices
            return render_template('question.html', number=num, question=surveys.satisfaction_survey.questions[num].question, choices=choices)
        else:
            return redirect('/thank-you')
    else:
        flash("Questions must be answered in order!")
        return redirect(f'/question/{len(RESPONSES)}')

@app.route('/answer', methods=['POST'])
def get_answer():
    """Adds question response to list, then redirects to next question"""
    RESPONSES.append(request.form['response'])
    number = int(request.form['which_number']) + 1
    if number < len(surveys.satisfaction_survey.questions):
        return redirect(f'/question/{number}')
    else:
        return redirect('/thank-you')

@app.route('/thank-you')
def get_thank_you():
    """Displays "thank you" page at end of survey."""
    return render_template('thank-you.html', title=surveys.satisfaction_survey.title)
