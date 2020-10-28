"""Flask Feedback App"""
from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from sqlalchemy.exc import IntegrityError
from forms import RegisterForm, LoginForm, FeedbackForm

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
toolbar = DebugToolbarExtension(app)

@app.route('/')
def redirect_to_register():
    return redirect('/register')

@app.route('/register', methods=['GET','POST'])
def process_registration():
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, email, first_name, last_name)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")
        return redirect(f'/users/{new_user.username}')
    return render_template('/register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def show_login_form():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            session['user_id'] = username
            flash(f"Welcome Back, {user.username}!")
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password.']
    return render_template('login.html', form=form)

@app.route('/logout')
def logout_user():
    session.pop('user_id')
    flash("Goodbye!")
    return redirect('/login')

@app.route('/secret')
def show_secret():
    if "user_id" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    else:
        return "You made it!"

@app.route('/users/<username>')
def show_user_info(username):
    if "user_id" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    elif session["user_id"] != username:
        flash("You are not authorized to view that page!", "danger")
        return redirect(f'/users/{session["user_id"]}')
    user = User.query.get_or_404(username)
    return render_template('user_info.html', user=user)

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def handle_feedback(username):
    """Shows feedback form and handles data submission for same."""
    if "user_id" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    User.query.get_or_404(username)
    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        new_feedback = Feedback(title=title, content=content, username=username)
        db.session.add(new_feedback)
        db.session.commit()
        flash('Feedback submitted!', "success")
        return redirect(f'/users/{username}')
    else:
        return render_template('add_feedback.html', form=form)

@app.route('/users/<username>/delete')
def delete_user(username):
    user = User.query.get_or_404(username)
    db.session.delete(user)
    db.session.commit()
    session.pop("username")
    flash(f"Account for {username} deleted.", "danger")
    return redirect('/login')

