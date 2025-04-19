// BMI Module - Calculates and displays BMI information
const BMI = (function() {
    // Private variables
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const gaugeFill = document.getElementById('gauge-fill');
    
    // BMI categories with their respective ranges and colors
    const categories = [
        { name: 'Underweight', range: [0, 18.5], color: 'var(--underweight-color)' },
        { name: 'Normal', range: [18.5, 25], color: 'var(--normal-color)' },
        { name: 'Overweight', range: [25, 30], color: 'var(--overweight-color)' },
        { name: 'Obese', range: [30, 50], color: 'var(--obese-color)' }
    ];

    // Constants for gauge
    const gaugeMax = 50; // Maximum BMI value on gauge
    const gaugeMin = 0;  // Minimum BMI value on gauge
    const arcLength = 251.2; // Length of the SVG arc in user units

    // Private methods
    function calculateBMI(weight, heightCm) {
        // Convert height from cm to meters
        const heightM = heightCm / 100;
        // BMI formula: weight (kg) / (height (m))^2
        return weight / (heightM * heightM);
    }

    function getCategoryForBMI(bmi) {
        for (const category of categories) {
            if (bmi >= category.range[0] && bmi < category.range[1]) {
                return category;
            }
        }
        return categories[categories.length - 1]; // Default to the last category (obese)
    }

    function updateGauge(bmi, category) {
        // Calculate the percentage filled on the gauge
        const percentage = Math.min(Math.max((bmi - gaugeMin) / (gaugeMax - gaugeMin), 0), 1);
        
        // Calculate the dash array value for the stroke
        const dashValue = percentage * arcLength;
        
        // Update the fill path
        gaugeFill.style.stroke = category.color;
        gaugeFill.setAttribute('stroke-dasharray', `${dashValue} ${arcLength}`);
    }
    
    function createBMICalculatorModal() {
        // Create the modal HTML
        const modalHTML = `
            <div id="bmi-calculator-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>BMI Calculator</h3>
                    <div class="form-group">
                        <label for="calc-weight">Weight (kg)</label>
                        <input type="number" id="calc-weight" min="20" max="300" step="0.1" required>
                    </div>
                    <div class="form-group">
                        <label for="calc-height">Height (cm)</label>
                        <input type="number" id="calc-height" min="100" max="250" required>
                    </div>
                    <button id="calculate-bmi-btn" class="btn">Calculate BMI</button>
                    <div id="calc-result" class="calc-result hidden">
                        <h4>Your BMI: <span id="calc-bmi-value">0.0</span></h4>
                        <p>Category: <span id="calc-bmi-category">-</span></p>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to the body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Get DOM elements
        const modal = document.getElementById('bmi-calculator-modal');
        const closeBtn = modal.querySelector('.close-modal');
        const calcBtn = document.getElementById('calculate-bmi-btn');
        const weightInput = document.getElementById('calc-weight');
        const heightInput = document.getElementById('calc-height');
        const resultDiv = document.getElementById('calc-result');
        const bmiValueSpan = document.getElementById('calc-bmi-value');
        const bmiCategorySpan = document.getElementById('calc-bmi-category');
        
        // Attach event listeners
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        calcBtn.addEventListener('click', function() {
            const weight = parseFloat(weightInput.value);
            const height = parseFloat(heightInput.value);
            
            if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
                alert('Please enter valid weight and height values');
                return;
            }
            
            const bmi = calculateBMI(weight, height);
            const category = getCategoryForBMI(bmi);
            
            bmiValueSpan.textContent = bmi.toFixed(1);
            bmiCategorySpan.textContent = category.name;
            bmiCategorySpan.style.color = category.color;
            
            resultDiv.classList.remove('hidden');
        });
    }

    // Public methods
    function calculate() {
        if (!Auth || !Auth.getUser) {
            console.error('Auth module not available');
            return;
        }

        const user = Auth.getUser();
        if (!user) {
            console.error('User data not available');
            return;
        }

        const bmi = calculateBMI(user.weight, user.height);
        const category = getCategoryForBMI(bmi);
        
        // Update the UI
        bmiValue.textContent = bmi.toFixed(1);
        bmiCategory.textContent = category.name;
        
        // Update the gauge
        updateGauge(bmi, category);
        
        return {
            value: bmi,
            category: category.name
        };
    }

    function getBMICategory() {
        const user = Auth.getUser();
        if (!user) return null;
        
        const bmi = calculateBMI(user.weight, user.height);
        const category = getCategoryForBMI(bmi);
        return category.name.toLowerCase();
    }
    
    function showCalculator() {
        // Create the calculator modal if it doesn't exist
        if (!document.getElementById('bmi-calculator-modal')) {
            createBMICalculatorModal();
        }
        
        // Populate with current user data
        if (Auth && Auth.getUser) {
            const user = Auth.getUser();
            if (user) {
                document.getElementById('calc-weight').value = user.weight;
                document.getElementById('calc-height').value = user.height;
            }
        }
        
        // Show the modal
        document.getElementById('bmi-calculator-modal').style.display = 'flex';
    }

    // Public API
    return {
        calculate: calculate,
        getBMICategory: getBMICategory,
        showCalculator: showCalculator
    };
})(); 