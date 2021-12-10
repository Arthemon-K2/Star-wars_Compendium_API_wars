from flask import Flask, render_template, session, request, url_for, redirect

import data_manager
import utils


app = Flask(__name__)
app.secret_key = b'API_wars_2021'


@app.route('/', methods=['GET', 'POST'])
def index():
    if 'username' in session:
        return render_template('index.html', username=session['username'], msg='You successfully logged in!')
    else:
        return render_template('index.html', username='Visitor')


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'GET':
        return render_template('registration.html', username='Visitor')
    elif request.method == 'POST':
        input_username = request.form.get('user_name')
        input_password = request.form.get('password')
        password_hash = utils.hash_password(input_password)

        data_manager.add_user(input_username, password_hash)

        return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    msg_failed = 'Wrong username or password!'
    if request.method == 'GET':
        return render_template('login.html', username='Visitor')
    elif request.method == 'POST':
        username = request.form.get('user_name')
        password = request.form.get('user_password')

        user = data_manager.get_user(username)
        
        if user != None and utils.verify_password(password, user['password']):
            session['username'] = request.form.get('user_name')
            return redirect('/')
        else:
            return render_template('login.html', msg=msg_failed, username='Visitor')


@app.route('/logout', methods=['GET'])
def logout():
    if 'username' in session:
        session.clear()
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
