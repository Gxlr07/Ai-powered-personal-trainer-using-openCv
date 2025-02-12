from flask import Flask, render_template, request, redirect, url_for

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
        bmi = calculate_bmi(weight, height)
    return render_template("index.html", bmi=bmi, workout_plan=workout_plan)

# Define the route for Home workout
@app.route("/home_workout/<bmi>")
def home_workout(bmi):
    workout_plan = [
        "Push-ups: 3 sets of 12 reps",
        "Squats: 3 sets of 15 reps",
        "Lunges: 3 sets of 12 reps per leg",
        "Plank: 3 sets of 30 seconds",
        "Jumping Jacks: 3 sets of 20 reps"
    ]
    return render_template("index.html", bmi=bmi, workout_plan=workout_plan)

# Define the route for Gym workout
@app.route("/gym_workout/<bmi>")
def gym_workout(bmi):
    workout_plan = [
        "Monday :" "Back and biceps workout",
        "Tuesday :" "Chest and triceps workout",
        "Wednesday :" "Leg workout",
        "Thursday :" "Shoulders and abs workout",
        "Friday :" "Full body strength",
        "Saturday :" "Cardio and core",
        "Sunday :" "Rest"
    ]
    return render_template("index.html", bmi=bmi, workout_plan=workout_plan)

if __name__ == "__main__":
    app.run(debug=True)
