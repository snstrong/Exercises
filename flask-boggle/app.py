from boggle import Boggle
from flask import Flask, request, render_template, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()

@app.route('/')
def show_board():
    return render_template('index.html')