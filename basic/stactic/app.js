document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let height = parseFloat(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let age = parseInt(document.getElementById('age').value);
    let gender = document.getElementById('gender').value;

    if (height && weight && age) {
        let bmi = calculateBMI(height, weight);
        displayBMI(bmi);
        suggestWorkout(bmi);
    } else {
        alert("Please fill in all fields.");
    }
});

function calculateBMI(height, weight) {
    // Convert height to meters and calculate BMI
    let heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

function displayBMI(bmi) {
    document.getElementById('result').innerHTML = `Your BMI is: ${bmi.toFixed(2)}`;
}

function suggestWorkout(bmi) {
    let workoutType = "";
    if (bmi < 18.5) {
        workoutType = "Underweight: Focus on gaining muscle and strength.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        workoutType = "Normal: Maintain your fitness with balanced workouts.";
    } else if (bmi >= 25 && bmi < 29.9) {
        workoutType = "Overweight: Focus on cardio and fat loss.";
    } else {
        workoutType = "Obese: Focus on low-impact cardio and gradual weight loss.";
    }

    document.getElementById('suggestions').innerHTML = workoutType;

    document.getElementById('workoutPlan').style.display = "block";
}
