from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

# Function to calculate BMI
def calculate_bmi(weight, height):
    height_in_m = height / 100  # Convert cm to meters
    bmi = weight / (height_in_m ** 2)
    return round(bmi, 2)

# Define the route for the home page
@app.route("/", methods=["GET", "POST"])
def index():
    bmi = None
    workout_plan = []
    if request.method == "POST":
        weight = float(request.form["weight"])
        height = float(request.form["height"])
        
        # Calculate BMI
        bmi = calculate_bmi(weight, height)
        
        # Store the BMI value to pass it to the template
        return render_template("index.html", bmi=bmi)

    return render_template("index.html", bmi=bmi, workout_plan=workout_plan)

# Define the route for Home workout
@app.route("/home_workout")
def home_workout():
    # Home workout plan based on BMI
    workout_plan = [
        "Push-ups: 3 sets of 12 reps",
        "Squats: 3 sets of 15 reps",
        "Lunges: 3 sets of 12 reps per leg",
        "Plank: 3 sets of 30 seconds",
        "Jumping Jacks: 3 sets of 20 reps"
    ]
    return render_template("index.html", workout_plan=workout_plan)

# Define the route for Gym workout
@app.route("/gym_workout")
def gym_workout():
    # Gym workout plan based on BMI
    workout_plan = [
        "Bench Press: 4 sets of 10 reps",
        "Deadlift: 4 sets of 8 reps",
        "Leg Press: 4 sets of 12 reps",
        "Lat Pulldown: 3 sets of 12 reps",
        "Bicep Curl: 3 sets of 10 reps"
    ]
    return render_template("index.html", workout_plan=workout_plan)

if __name__ == "__main__":
    app.run(debug=True)
