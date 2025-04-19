// Workout Module - Generates personalized workout plans
const Workout = (function() {
    // Private variables
    const workoutPlanContainer = document.getElementById('workout-plan');
    let workoutPreference = 'home'; // Default preference is home workout
    
    // Workout exercises by category
    const workoutExercises = {
        underweight: [
            { name: 'Bench Press', emoji: '💪', sets: '3', reps: '6-8', intensity: 'Heavy', description: 'Focus on compound exercises for muscle growth' },
            { name: 'Squats', emoji: '🏋️', sets: '3', reps: '8-10', intensity: 'Moderate', description: 'Build lower body strength and stability' },
            { name: 'Pull-ups', emoji: '🧗', sets: '3', reps: '6-8', intensity: 'Challenging', description: 'Upper body strength with focus on back and arms' },
            { name: 'Deadlifts', emoji: '🏋️', sets: '3', reps: '6-8', intensity: 'Heavy', description: 'Full body strength exercise focusing on posterior chain' },
            { name: 'Protein Shake', emoji: '🥤', sets: '-', reps: '2-3 daily', intensity: '-', description: 'Supplement with protein to support muscle growth' }
        ],
        normal: [
            { name: 'Push-ups', emoji: '💪', sets: '3', reps: '10-12', intensity: 'Moderate', description: 'Upper body strength and stabilization' },
            { name: 'Body Weight Squats', emoji: '🏋️', sets: '3', reps: '15', intensity: 'Moderate', description: 'Lower body conditioning' },
            { name: 'Plank', emoji: '🧘', sets: '3', reps: '30-60 sec', intensity: 'Moderate', description: 'Core stability and strength' },
            { name: 'Mountain Climbers', emoji: '🏃', sets: '3', reps: '20 each leg', intensity: 'High', description: 'Cardio and core strengthening' },
            { name: 'Jumping Jacks', emoji: '⭐', sets: '2', reps: '30 sec', intensity: 'Moderate', description: 'Warm-up and light cardio' }
        ],
        overweight: [
            { name: 'Walking', emoji: '🚶', sets: '1', reps: '30 min', intensity: 'Low to Moderate', description: 'Start with regular walking to build stamina' },
            { name: 'Modified Push-ups', emoji: '💪', sets: '3', reps: '8-10', intensity: 'Low', description: 'Wall or knee push-ups to build upper body strength' },
            { name: 'Chair Squats', emoji: '🪑', sets: '3', reps: '10-12', intensity: 'Low', description: 'Lower body strength with support' },
            { name: 'Swimming', emoji: '🏊', sets: '1', reps: '20-30 min', intensity: 'Moderate', description: 'Low-impact full body workout' },
            { name: 'Stationary Bike', emoji: '🚲', sets: '1', reps: '15-20 min', intensity: 'Moderate', description: 'Cardiovascular training with low joint impact' }
        ],
        obese: [
            { name: 'Water Walking', emoji: '💧', sets: '1', reps: '20 min', intensity: 'Low', description: 'Low impact movement in pool' },
            { name: 'Seated Exercises', emoji: '🪑', sets: '3', reps: 'Various', intensity: 'Low', description: 'Chair-based movement to improve mobility' },
            { name: 'Arm Circles', emoji: '🔄', sets: '2', reps: '10 each direction', intensity: 'Very Low', description: 'Improving range of motion' },
            { name: 'Ankle Rotations', emoji: '👣', sets: '2', reps: '10 each foot', intensity: 'Very Low', description: 'Improving circulation and mobility' },
            { name: 'Deep Breathing', emoji: '🧘', sets: '3', reps: '10 breaths', intensity: 'Very Low', description: 'Respiratory training and mindfulness' }
        ]
    };
    
    // Weekly Gym Workout Plan
    const gymWorkoutPlan = {
        day1: {
            title: 'Day 1: Chest + Triceps',
            exercises: [
                { name: 'Bench Press', emoji: '🏋️', sets: '4', reps: '8-10' },
                { name: 'Incline Dumbbell Press', emoji: '🏋️', sets: '3', reps: '10-12' },
                { name: 'Cable Chest Fly', emoji: '🏋️', sets: '3', reps: '12-15' },
                { name: 'Tricep Pushdowns', emoji: '💪', sets: '3', reps: '12' },
                { name: 'Overhead Tricep Extension', emoji: '💪', sets: '3', reps: '10' },
                { name: 'Treadmill/Cardio Cooldown', emoji: '🔄', sets: '1', reps: '10 min' }
            ]
        },
        day2: {
            title: 'Day 2: Back + Biceps',
            exercises: [
                { name: 'Lat Pulldowns', emoji: '🏋️', sets: '4', reps: '10' },
                { name: 'Seated Cable Rows', emoji: '🏋️', sets: '3', reps: '10' },
                { name: 'Deadlifts', emoji: '🏋️', sets: '3', reps: '6-8' },
                { name: 'Barbell Curls', emoji: '💪', sets: '3', reps: '10' },
                { name: 'Hammer Curls', emoji: '💪', sets: '3', reps: '12' },
                { name: 'Incline Walking/Stretching', emoji: '🔄', sets: '1', reps: '10-15 mins' }
            ]
        },
        day3: {
            title: 'Day 3: Legs + Core',
            exercises: [
                { name: 'Squats', emoji: '🏋️', sets: '4', reps: '8-10' },
                { name: 'Leg Press', emoji: '🏋️', sets: '3', reps: '12' },
                { name: 'Romanian Deadlifts', emoji: '🏋️', sets: '3', reps: '10' },
                { name: 'Leg Curls', emoji: '🦵', sets: '3', reps: '12' },
                { name: 'Planks', emoji: '🧘', sets: '3', reps: '1 min each' },
                { name: 'Russian Twists', emoji: '🧘', sets: '3', reps: '20' },
                { name: 'Foam Rolling/Stretching', emoji: '🔄', sets: '1', reps: '10 min' }
            ]
        },
        day4: {
            title: 'Day 4: Active Rest / Cardio',
            exercises: [
                { name: 'Brisk Walk or Light Jog', emoji: '🚶', sets: '1', reps: '30-45 min' },
                { name: 'Stretching or Yoga', emoji: '🧘', sets: '1', reps: '20 min' },
                { name: 'Optional: Cycling, Swimming, or Group Class', emoji: '🚲', sets: '-', reps: 'As desired' }
            ]
        },
        day5: {
            title: 'Day 5: Shoulders + Core',
            exercises: [
                { name: 'Overhead Shoulder Press', emoji: '🏋️', sets: '4', reps: '8' },
                { name: 'Lateral Raises', emoji: '🏋️', sets: '3', reps: '12' },
                { name: 'Front Raises', emoji: '🏋️', sets: '3', reps: '12' },
                { name: 'Rear Delt Flys', emoji: '🏋️', sets: '3', reps: '15' },
                { name: 'Hanging Leg Raises', emoji: '🧘', sets: '3', reps: '12' },
                { name: 'Bicycle Crunches', emoji: '🧘', sets: '3', reps: '20' }
            ]
        },
        day6: {
            title: 'Day 6: Full Body HIIT or Functional Training',
            exercises: [
                { name: 'HIIT Circuit (40 sec work, 20 sec rest, 3 rounds)', emoji: '⏱️', sets: '3', reps: '30 min total' },
                { name: 'Jump Squats', emoji: '🏃', sets: '-', reps: '40 sec' },
                { name: 'Burpees', emoji: '🏃', sets: '-', reps: '40 sec' },
                { name: 'Mountain Climbers', emoji: '🏃', sets: '-', reps: '40 sec' },
                { name: 'Push-ups', emoji: '💪', sets: '-', reps: '40 sec' },
                { name: 'Battle Ropes / Kettlebell Swings', emoji: '🏋️', sets: '-', reps: '40 sec' }
            ]
        },
        day7: {
            title: 'Day 7: Rest & Recovery',
            exercises: [
                { name: 'Full Rest or Light Walking/Stretching', emoji: '💤', sets: '-', reps: 'As needed' },
                { name: 'Foam Rolling or Massage', emoji: '🧘', sets: '-', reps: '15-20 min' },
                { name: 'Hydrate and Focus on Nutrition', emoji: '💧', sets: '-', reps: 'All day' }
            ]
        }
    };
    
    // Home Workout Plan
    const homeWorkoutPlan = {
        day1: {
            title: 'Day 1: Push (Chest, Shoulders, Triceps)',
            exercises: [
                { name: 'Push-ups', emoji: '💪', sets: '3-4', reps: '10-15' },
                { name: 'Decline Push-ups', emoji: '💪', sets: '3', reps: '10-12' },
                { name: 'Chair Dips', emoji: '💺', sets: '3', reps: '12-15' },
                { name: 'Pike Push-ups', emoji: '🙇', sets: '3', reps: '8-12' },
                { name: 'Diamond Push-ups', emoji: '💎', sets: '3', reps: '8-12' },
                { name: 'Arm Circles', emoji: '🔄', sets: '2', reps: '30 seconds each direction' }
            ]
        },
        day2: {
            title: 'Day 2: Pull (Back, Biceps)',
            exercises: [
                { name: 'Doorway Rows', emoji: '🚪', sets: '3', reps: '10-15' },
                { name: 'Supermans', emoji: '🦸', sets: '3', reps: '12-15' },
                { name: 'Bodyweight Rows (using table)', emoji: '🪑', sets: '3', reps: '8-12' },
                { name: 'Bicep Curls with water bottles/books', emoji: '💧', sets: '3', reps: '12-15 each arm' },
                { name: 'Reverse Snow Angels', emoji: '👼', sets: '3', reps: '12' },
                { name: 'Back Extensions', emoji: '⤴️', sets: '3', reps: '10-15' }
            ]
        },
        day3: {
            title: 'Day 3: Legs & Core',
            exercises: [
                { name: 'Bodyweight Squats', emoji: '🏋️', sets: '4', reps: '15-20' },
                { name: 'Lunges', emoji: '🚶', sets: '3', reps: '12 each leg' },
                { name: 'Glute Bridges', emoji: '🍑', sets: '3', reps: '15-20' },
                { name: 'Calf Raises', emoji: '🦵', sets: '3', reps: '20-25' },
                { name: 'Planks', emoji: '🧘', sets: '3', reps: '30-60 seconds' },
                { name: 'Mountain Climbers', emoji: '⛰️', sets: '3', reps: '30 seconds' },
                { name: 'Russian Twists', emoji: '🔄', sets: '3', reps: '20 total' }
            ]
        },
        day4: {
            title: 'Day 4: Active Recovery',
            exercises: [
                { name: 'Walking', emoji: '🚶', sets: '1', reps: '20-30 minutes' },
                { name: 'Light Stretching', emoji: '🤸', sets: '1', reps: '15-20 minutes' },
                { name: 'Foam Rolling (or use tennis ball)', emoji: '🎾', sets: '1', reps: '10 minutes' },
                { name: 'Deep Breathing', emoji: '🧘', sets: '1', reps: '5 minutes' }
            ]
        },
        day5: {
            title: 'Day 5: Full Body HIIT',
            exercises: [
                { name: 'Jumping Jacks', emoji: '⭐', sets: '4', reps: '40 seconds on, 20 seconds rest' },
                { name: 'High Knees', emoji: '🏃', sets: '4', reps: '40 seconds on, 20 seconds rest' },
                { name: 'Burpees', emoji: '💥', sets: '4', reps: '40 seconds on, 20 seconds rest' },
                { name: 'Jump Squats', emoji: '🏋️', sets: '4', reps: '40 seconds on, 20 seconds rest' },
                { name: 'Mountain Climbers', emoji: '⛰️', sets: '4', reps: '40 seconds on, 20 seconds rest' },
                { name: 'Plank Jacks', emoji: '🧘', sets: '4', reps: '40 seconds on, 20 seconds rest' }
            ]
        },
        day6: {
            title: 'Day 6: Mobility & Flexibility',
            exercises: [
                { name: 'Sun Salutations', emoji: '☀️', sets: '3', reps: '5 flows' },
                { name: 'Hip Openers', emoji: '🦵', sets: '2', reps: '30 seconds each side' },
                { name: 'Shoulder Rolls and Stretches', emoji: '🔄', sets: '2', reps: '30 seconds each direction' },
                { name: 'Spinal Twists', emoji: '🧘', sets: '2', reps: '30 seconds each side' },
                { name: 'Cat-Cow Stretch', emoji: '🐱', sets: '2', reps: '10 each' },
                { name: 'Child\'s Pose to Cobra Flow', emoji: '🐍', sets: '2', reps: '10 flows' }
            ]
        },
        day7: {
            title: 'Day 7: Complete Rest Day',
            exercises: [
                { name: 'Rest - No structured exercise', emoji: '💤', sets: '-', reps: 'All day' },
                { name: 'Light walking if desired', emoji: '🚶', sets: '-', reps: 'As needed' },
                { name: 'Hydration focus', emoji: '💧', sets: '-', reps: 'Drink plenty of water' },
                { name: 'Plan next week\'s workouts', emoji: '📝', sets: '-', reps: 'Set goals for the week ahead' }
            ]
        }
    };
    
    // Workout related ads/promotions
    const workoutAds = {
        home: [
            {
                title: 'Home Workout Essentials',
                description: 'Get 15% off on resistance bands, yoga mats, and more!',
                image: 'https://placehold.co/600x200/e53935/ffffff?text=Home+Workout+Essentials',
                link: '#home-equipment'
            },
            {
                title: 'Online Fitness Programs',
                description: 'Access 1000+ home workouts with our premium online classes',
                image: 'https://placehold.co/600x200/4CAF50/ffffff?text=Online+Fitness+Programs',
                link: '#online-classes'
            }
        ],
        gym: [
            {
                title: 'Gym Membership Special',
                description: 'Join now and get 2 months free with annual membership!',
                image: 'https://placehold.co/600x200/2196F3/ffffff?text=Gym+Membership+Special',
                link: '#gym-membership'
            },
            {
                title: 'Protein Supplements',
                description: 'Fuel your gym workouts with premium protein powders',
                image: 'https://placehold.co/600x200/FF9800/ffffff?text=Protein+Supplements',
                link: '#supplements'
            }
        ]
    };
    
    // Private methods
    function createWorkoutCard(exercise) {
        return `
            <div class="workout-card">
                <div class="workout-title">
                    <span class="emoji">${exercise.emoji}</span>
                    <span>${exercise.name}</span>
                </div>
                <ul class="workout-details">
                    ${exercise.sets ? `<li><strong>Sets:</strong> ${exercise.sets}</li>` : ''}
                    ${exercise.reps ? `<li><strong>Reps:</strong> ${exercise.reps}</li>` : ''}
                    ${exercise.intensity ? `<li><strong>Intensity:</strong> ${exercise.intensity}</li>` : ''}
                    ${exercise.description ? `<li class="description"><strong>Note:</strong> ${exercise.description}</li>` : ''}
                </ul>
            </div>
        `;
    }

    function createDaySection(day) {
        return `
            <div class="workout-day-column">
                <h5>${day.title}</h5>
                <div class="day-exercises">
                    ${day.exercises.map(exercise => 
                        `<div class="day-exercise">
                            <span class="exercise-emoji">${exercise.emoji}</span>
                            <span class="exercise-name">${exercise.name}</span>
                            ${exercise.sets && exercise.reps ? 
                                `<span class="exercise-detail">${exercise.sets} × ${exercise.reps}</span>` : 
                                ''}
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    function createPreferenceSelector() {
        return `
            <div class="preference-buttons">
                <button id="home-workout-btn" class="${workoutPreference === 'home' ? 'active' : ''}" data-preference="home">
                    <span class="emoji">🏠</span> Home
                </button>
                <button id="gym-workout-btn" class="${workoutPreference === 'gym' ? 'active' : ''}" data-preference="gym">
                    <span class="emoji">🏋️</span> Gym
                </button>
            </div>
        `;
    }

    function attachPreferenceListeners() {
        const homeBtn = document.getElementById('home-workout-btn');
        const gymBtn = document.getElementById('gym-workout-btn');
        
        if (homeBtn) {
            homeBtn.addEventListener('click', function() {
                workoutPreference = 'home';
                homeBtn.classList.add('active');
                gymBtn.classList.remove('active');
                renderWorkoutPlan();
            });
        }
        
        if (gymBtn) {
            gymBtn.addEventListener('click', function() {
                workoutPreference = 'gym';
                gymBtn.classList.add('active');
                homeBtn.classList.remove('active');
                renderWorkoutPlan();
            });
        }
    }

    function createAdBanner(ad) {
        return `
            <div class="ad-banner">
                <a href="${ad.link}" class="ad-link">
                    <img src="${ad.image}" alt="${ad.title}" class="ad-image">
                    <div class="ad-content">
                        <h5 class="ad-title">${ad.title}</h5>
                        <p class="ad-description">${ad.description}</p>
                        <button class="ad-button">View</button>
                    </div>
                </a>
            </div>
        `;
    }

    function renderWorkoutPlan() {
        // Get the appropriate workout plan based on BMI category
        let bmiCategory = 'normal';
        if (BMI && BMI.getBMICategory) {
            bmiCategory = BMI.getBMICategory() || 'normal';
        }
        
        // Generate HTML for the workout plan
        let workoutHTML = `<div class="weekly-workout-plan">`;
        
        // Add the preference selector at the top of the weekly workout plan
        workoutHTML += `<h4>Select Workout Type:</h4>`;
        workoutHTML += createPreferenceSelector();
        
        // Generate the weekly workout plan section based on preference
        if (workoutPreference === 'gym') {
            workoutHTML += `
                <h4 class="plan-title">🗓️ Weekly Gym Workout Plan</h4>
                <div class="workout-days-container">
                    ${createDaySection(gymWorkoutPlan.day1)}
                    ${createDaySection(gymWorkoutPlan.day2)}
                    ${createDaySection(gymWorkoutPlan.day3)}
                    ${createDaySection(gymWorkoutPlan.day4)}
                    ${createDaySection(gymWorkoutPlan.day5)}
                    ${createDaySection(gymWorkoutPlan.day6)}
                    ${createDaySection(gymWorkoutPlan.day7)}
                </div>
                
                <div class="workout-tips">
                    <h5>✅ Tips:</h5>
                    <ul>
                        <li>Rest 60–90 seconds between sets</li>
                        <li>Progressive overload: Increase weight or reps weekly</li>
                        <li>Sleep 7–8 hours daily</li>
                        <li>Eat a balanced diet based on your fitness goal</li>
                    </ul>
                </div>
            `;
        } else { // Home workout
            workoutHTML += `
                <h4 class="plan-title">🏠 Weekly Home Workout Plan</h4>
                <div class="workout-days-container">
                    ${createDaySection(homeWorkoutPlan.day1)}
                    ${createDaySection(homeWorkoutPlan.day2)}
                    ${createDaySection(homeWorkoutPlan.day3)}
                    ${createDaySection(homeWorkoutPlan.day4)}
                    ${createDaySection(homeWorkoutPlan.day5)}
                    ${createDaySection(homeWorkoutPlan.day6)}
                    ${createDaySection(homeWorkoutPlan.day7)}
                </div>
                
                <div class="workout-tips">
                    <h5>✅ Home Workout Tips:</h5>
                    <ul>
                        <li>Create a dedicated workout space</li>
                        <li>Use household items as weights if needed</li>
                        <li>Focus on proper form rather than speed</li>
                        <li>Increase difficulty by adding more reps</li>
                        <li>Schedule workouts like important appointments</li>
                    </ul>
                </div>
            `;
        }
        
        workoutHTML += `</div>`;
        
        // Add relevant ads based on workout preference
        workoutHTML += `<div class="workout-ads">`;
        
        const relevantAds = workoutAds[workoutPreference] || [];
        relevantAds.forEach(ad => {
            workoutHTML += createAdBanner(ad);
        });
        
        workoutHTML += `</div>`;
        
        // Update the UI
        workoutPlanContainer.innerHTML = workoutHTML;
        
        // Attach event listeners to preference buttons
        attachPreferenceListeners();
    }

    // Public methods
    function generatePlan() {
        renderWorkoutPlan();
    }

    // Public API
    return {
        generatePlan: generatePlan
    };
})(); 