// Main App Module - Initializes and coordinates all modules
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Auth module (already auto-initialized in auth.js)
    
    // Check if user is already logged in and initialize dashboard if needed
    if (Auth && Auth.isLoggedIn && Auth.isLoggedIn()) {
        // These will be called by Auth module if user is logged in
        // Just in case, we'll call them here too
        if (BMI && BMI.calculate) {
            BMI.calculate();
        }
        
        if (Workout && Workout.generatePlan) {
            Workout.generatePlan();
        }
        
        if (Diet && Diet.generatePlan) {
            Diet.generatePlan();
        }
        
        // Initialize BMI calculator button
        const bmiCalculatorBtn = document.getElementById('bmi-calculator-btn');
        if (bmiCalculatorBtn && BMI && BMI.showCalculator) {
            bmiCalculatorBtn.addEventListener('click', BMI.showCalculator);
        }
    }
    
    // Display version and last update
    const versionInfo = {
        version: '1.0.0',
        lastUpdate: new Date().toLocaleDateString(),
        appName: 'FitTrack Personal Trainer App'
    };
    
    console.log(`${versionInfo.appName} v${versionInfo.version} - Last updated: ${versionInfo.lastUpdate}`);
}); 