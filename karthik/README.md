# FitTrack Personal Trainer Web App

A lightweight personal trainer web application that runs entirely in the browser with no backend dependencies. Uses HTML, CSS, and vanilla JavaScript with LocalStorage for data persistence.

## Features

### 🧍 User Authentication
- Registration with personal details (name, age, gender, weight, height, etc.)
- Secure data storage in browser's LocalStorage
- Login/logout functionality
- Form validation

### ⚖️ BMI Calculator
- Calculates BMI based on user's weight and height
- Visual gauge display showing BMI category
- Color-coded categories (Underweight, Normal, Overweight, Obese)

### 🏋️ Workout Plan Generator
- Generates personalized workout plans based on BMI category
- Includes exercise details (sets, reps, intensity)
- Exercise descriptions with emoji icons

### 🥗 Diet Plan Generator
- Customized meal plans based on BMI and dietary preference (Veg/Non-Veg)
- Daily meal suggestions for breakfast, lunch, dinner, and snacks
- Nutrition tips specific to user's body type

### 💪 Gym-Themed UI
- Dark mode theme with fitness-inspired accents
- Responsive design using CSS Flexbox/Grid
- Card layout for different dashboard sections
- Simple animations and transitions

## Technical Details

- **Front-end only**: No server-side code or API dependencies
- **No external libraries**: Built with vanilla JavaScript
- **Offline-first**: Fully functional without internet connection
- **LocalStorage**: User data persists between sessions
- **Modular JavaScript**: Organized with IIFE pattern for encapsulation

## Project Structure

```
/
├── index.html         # Main HTML file
├── css/
│   └── styles.css     # All styles
├── js/
│   ├── auth.js        # Authentication module
│   ├── bmi.js         # BMI calculator module
│   ├── workout.js     # Workout plan generator
│   ├── diet.js        # Diet plan generator
│   └── app.js         # Main application file
└── assets/            # For any additional assets
```

## How to Use

1. Open `index.html` in any modern browser
2. Register with your details
3. Log in to view your personalized dashboard
4. Explore your BMI, workout and diet plans

## Browser Compatibility

Compatible with all modern browsers that support:
- CSS Grid/Flexbox
- ES6 JavaScript
- LocalStorage API
- SVG

## License

This project is open source and available for personal or educational use.

---

&copy; 2025 FitTrack - Personal Trainer App 