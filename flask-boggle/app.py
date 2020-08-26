from boggle import Boggle
from flask import Flask, request, render_template, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def show_board():
    board = boggle_game.make_board()
    session['board'] = board
    session['score'] = 0
    return render_template('index.html', board=board)

@app.route('/guess', methods=['GET'])
def check_guess():
    word = request.args['guess']
    board = session['board']
    score = session['score']
    response = boggle_game.check_valid_word(board, word)
    if response == "ok":
        session['score'] = score + len(word)
    return jsonify({'result': response, 'score': session['score']})
