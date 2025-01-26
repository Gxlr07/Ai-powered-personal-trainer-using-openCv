def generate_workout_plan(user_data):
    if user_data['goal'] == 'weight_loss':
        return ["Jumping Jacks", "Burpees", "Mountain Climbers", "Running"]
    elif user_data['goal'] == 'strength':
        return ["Deadlifts", "Squats", "Pull-Ups", "Push-Ups"]
    else:
        return ["Basic Cardio", "Stretching"]
