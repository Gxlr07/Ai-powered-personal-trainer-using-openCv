from flask import Flask, render_template, request
from workout_plan import generate_workout_plan

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    user_data = {
        'age': int(request.form['age']),
        'fitness_level': request.form['fitness_level'],
        'goal': request.form['goal'],
        'equipment': request.form['equipment']
    }
    workout_plan = generate_workout_plan(user_data)
    return render_template('plan.html', workout_plan=workout_plan)

if __name__ == '__main__':
    app.run(debug=True)
