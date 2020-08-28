"""Endpoints for Boggle game"""

from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def start_game():
    """starts game"""
    board = boggle_game.make_board()
    session['board'] = board
    session['score'] = 0
    if not session.get('visits'):
        session['visits'] = 0
    visits = session['visits'];
    visits += 1
    session['visits'] = visits
    return render_template('index.html', board=board)

@app.route('/guess', methods=['GET'])
def check_guess():
    """checks to see if guessed word is valid and updates score"""
    word = request.args['guess']
    board = session['board']
    score = session['score']
    response = boggle_game.check_valid_word(board, word)
    if response == "ok":
        session['score'] = score + len(word)
    return jsonify({'result': response, 'score': session['score'], 'points': len(word)})

@app.route('/end_game', methods=['GET'])
def end_game():
    """updates and sends back list of high scores at end of game"""    
    scores_list = []
    if not session.get('scores_list'):
        session['scores_list'] = [session['score']]
        scores_list = session['scores_list']
    else:
        scores_list = session['scores_list']
        scores_list.append(session['score'])
        scores_list.sort(reverse=True)
        session['scores_list'] = scores_list
    return jsonify({'scores_list': session['scores_list']})
    
