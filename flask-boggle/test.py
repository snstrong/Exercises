from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):

    def setUp(self):
        """Runs before every test."""
        self.client = app.test_client()
        app.config['TESTING'] = True
        app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""
        with self.client as client:
            response = self.client.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertIn('board', session)
            self.assertIn('visits', session)
            self.assertIn(b'<h1>Boggle</h1>', response.data)
            self.assertIn(b'<table id="game-board">', response.data)
            self.assertIn(b'<span id="score">', response.data)

    def test_guess(self):
        """Test if word is valid by modifying the board in the session"""
        with self.client as client:
            with client.session_transaction() as faux_session:
                faux_session['board'] = [["B", "E", "A", "R", "C"], 
                                 ["S", "B", "A", "A", "O"], 
                                 ["E", "H", "O", "T", "D"], 
                                 ["A", "O", "T", "E", "E"], 
                                 ["L", "A", "P", "L", "T"]]
                faux_session['score'] = 0
            response1 = client.get('/guess?guess=bear')
            self.assertEqual(response1.json['result'], 'ok')
            self.assertEqual(response1.status_code, 200)
            response2 = client.get('/guess?guess=cat')
            self.assertEqual(response2.json['result'], 'ok')
            response3 = client.get('/guess?guess=family')
            self.assertEqual(response3.json['result'], 'not-on-board')
            response4 = client.get('/guess?guess=vraiment')
            self.assertEqual(response4.json['result'], 'not-word')
    
    def test_end_game(self):
        """Test if scores list is updated at end of game"""
        with self.client as client:
            with client.session_transaction() as faux_session:
                faux_session['scores_list'] = [27, 35, 18, 41]
                faux_session['score'] = 33
            response = client.get('/end_game')
            self.assertEqual(response.json['scores_list'], [41, 35, 33, 27, 18])

