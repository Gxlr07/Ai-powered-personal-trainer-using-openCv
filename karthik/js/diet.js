// Diet Module - Generates personalized diet plans
const Diet = (function() {
    // Private variables
    const dietPlanContainer = document.getElementById('diet-plan');
    let dietaryPreference = 'veg'; // Default preference
    
    // Detailed diet plans
    const detailedDietPlans = {
        veg: {
            title: '🥗 VEG DIET PLAN (High Protein, Balanced Macros)',
            meals: {
                breakfast: {
                    title: '🍳 Breakfast Options',
                    options: [
                        'Option 1: Oats with milk, chia seeds, banana, and almonds',
                        'Option 2: Besan chilla (chickpea pancakes) + mint chutney',
                        'Option 3: Moong dal dosa + coconut chutney',
                        '1 glass warm lemon water or green tea'
                    ]
                },
                midMorning: {
                    title: '🥙 Mid-Morning Snack',
                    options: [
                        'Option 1: 1 boiled sweet potato',
                        'Option 2: 1 apple + handful of walnuts',
                        'Option 3: Protein smoothie (plant-based protein + almond milk + banana + peanut butter)'
                    ]
                },
                lunch: {
                    title: '🍛 Lunch',
                    options: [
                        'Option 1: Brown rice + rajma (kidney beans) curry + salad',
                        'Option 2: Whole wheat roti + palak paneer (low oil) + cucumber raita',
                        'Option 3: Quinoa + mixed veg stir-fry + curd',
                        'Buttermilk or coconut water'
                    ]
                },
                eveningSnack: {
                    title: '🍵 Evening Snack',
                    options: [
                        'Option 1: Roasted chickpeas or sprouts chaat',
                        'Option 2: Makhana (foxnuts) roasted in ghee',
                        'Option 3: 1 banana + peanut butter'
                    ]
                },
                dinner: {
                    title: '🍲 Dinner',
                    options: [
                        'Option 1: Vegetable soup + grilled tofu/soy chunks + chapati',
                        'Option 2: Millet khichdi with veggies + salad',
                        'Option 3: Paneer tikka + sautéed greens + multigrain roti'
                    ]
                }
            }
        },
        'non-veg': {
            title: '🍗 NON-VEG DIET PLAN (No Beef or Pork)',
            meals: {
                breakfast: {
                    title: '🍳 Breakfast Options',
                    options: [
                        'Option 1: Boiled eggs (3 whites + 1 yolk) + oats with fruit',
                        'Option 2: Egg white omelet + 2 multigrain toast slices',
                        'Option 3: Chicken/egg wrap with whole wheat base',
                        'Herbal tea or black coffee (no sugar)'
                    ]
                },
                midMorning: {
                    title: '🥙 Mid-Morning Snack',
                    options: [
                        'Option 1: 1 boiled egg + banana',
                        'Option 2: Handful of almonds + low-fat curd',
                        'Option 3: Protein smoothie with Greek yogurt and berries'
                    ]
                },
                lunch: {
                    title: '🍛 Lunch',
                    options: [
                        'Option 1: Grilled chicken breast + brown rice + green salad',
                        'Option 2: Boiled egg curry + roti + cucumber raita',
                        'Option 3: Fish curry (tilapia/rohu) + quinoa or rice',
                        'Buttermilk or lemon water'
                    ]
                },
                eveningSnack: {
                    title: '🍵 Evening Snack',
                    options: [
                        'Option 1: Boiled eggs + black salt + veggies',
                        'Option 2: Chicken/tuna salad with olive oil',
                        'Option 3: Roasted peanuts or homemade protein bar'
                    ]
                },
                dinner: {
                    title: '🍲 Dinner',
                    options: [
                        'Option 1: Grilled chicken + steamed vegetables',
                        'Option 2: Egg bhurji (scrambled eggs) + roti + salad',
                        'Option 3: Fish grilled or baked + sautéed greens or soup'
                    ]
                }
            }
        }
    };
    
    const dietNotes = [
        'Drink at least 2.5–3 liters of water daily',
        'Add whey or plant-based protein shake post-workout if needed',
        'Avoid deep-fried, sugary, or highly processed items',
        'Adjust portions based on BMI and goal (weight loss, muscle gain)'
    ];
    
    // Meal plans by BMI category and dietary preference
    const mealPlans = {
        underweight: {
            veg: {
                breakfast: [
                    { name: 'Protein Smoothie', emoji: '🥤', description: 'Banana, oats, peanut butter, spinach, protein powder, and milk' },
                    { name: 'Avocado Toast', emoji: '🥑', description: 'Whole grain bread with avocado, eggs, and chia seeds' },
                    { name: 'High-Calorie Oatmeal', emoji: '🥣', description: 'Oats cooked in full-fat milk with nuts, dried fruits, and honey' }
                ],
                lunch: [
                    { name: 'Quinoa Power Bowl', emoji: '🥗', description: 'Quinoa, roasted vegetables, chickpeas, avocado, and tahini dressing' },
                    { name: 'Lentil Pasta', emoji: '🍝', description: 'High-protein pasta with rich tomato sauce and grated cheese' },
                    { name: 'Stuffed Sweet Potato', emoji: '🍠', description: 'Baked sweet potato with black beans, corn, cheese, and sour cream' }
                ],
                dinner: [
                    { name: 'Bean and Cheese Burritos', emoji: '🌯', description: 'Whole wheat tortillas filled with beans, rice, cheese, and vegetables' },
                    { name: 'Tofu Stir-Fry', emoji: '🥢', description: 'Tofu with mixed vegetables, nuts, and brown rice' },
                    { name: 'Vegetable Curry', emoji: '🍛', description: 'Rich curry with coconut milk, plenty of vegetables, and paneer' }
                ],
                snacks: [
                    { name: 'Trail Mix', emoji: '🌰', description: 'Mixed nuts, seeds, and dried fruits' },
                    { name: 'Yogurt Parfait', emoji: '🍨', description: 'Greek yogurt with granola and fruit' },
                    { name: 'Cheese and Crackers', emoji: '🧀', description: 'Whole grain crackers with cheese and nut butter' }
                ]
            },
            'non-veg': {
                breakfast: [
                    { name: 'Protein Scramble', emoji: '🍳', description: 'Eggs scrambled with cheese, vegetables, and a side of bacon' },
                    { name: 'Breakfast Burrito', emoji: '🌯', description: 'Eggs, cheese, potatoes, and sausage in a whole wheat tortilla' },
                    { name: 'Greek Yogurt Bowl', emoji: '🥣', description: 'Full-fat Greek yogurt with nuts, seeds, fruit, and honey' }
                ],
                lunch: [
                    { name: 'Chicken Wrap', emoji: '🌮', description: 'Grilled chicken with avocado, cheese, and vegetables in a tortilla' },
                    { name: 'Tuna Melt', emoji: '🥪', description: 'Tuna salad with mayo on whole grain bread, topped with melted cheese' },
                    { name: 'Beef and Rice Bowl', emoji: '🍚', description: 'Lean beef strips with brown rice, vegetables, and teriyaki sauce' }
                ],
                dinner: [
                    { name: 'Salmon with Quinoa', emoji: '🐟', description: 'Baked salmon with quinoa and roasted vegetables' },
                    { name: 'Chicken Pasta', emoji: '🍝', description: 'Whole grain pasta with chicken, olive oil, and mixed vegetables' },
                    { name: 'Beef Stir-Fry', emoji: '🥩', description: 'Beef strips with mixed vegetables and brown rice' }
                ],
                snacks: [
                    { name: 'Protein Shake', emoji: '🥤', description: 'Protein powder with milk and a banana' },
                    { name: 'Hard-Boiled Eggs', emoji: '🥚', description: 'Two hard-boiled eggs with a pinch of salt' },
                    { name: 'Jerky and Nuts', emoji: '🥜', description: 'Beef jerky with a handful of mixed nuts' }
                ]
            }
        },
        normal: {
            veg: {
                breakfast: [
                    { name: 'Overnight Oats', emoji: '🥣', description: 'Oats soaked in milk with chia seeds and berries' },
                    { name: 'Veggie Omelet', emoji: '🍳', description: 'Egg white omelet with spinach, tomatoes, and low-fat cheese' },
                    { name: 'Whole Grain Toast', emoji: '🍞', description: 'With avocado spread and a sprinkle of seeds' }
                ],
                lunch: [
                    { name: 'Mediterranean Salad', emoji: '🥗', description: 'Mixed greens, chickpeas, feta, olives, and olive oil dressing' },
                    { name: 'Veggie Wrap', emoji: '🌯', description: 'Whole wheat wrap with hummus, mixed vegetables, and feta' },
                    { name: 'Lentil Soup', emoji: '🍲', description: 'Hearty lentil soup with whole grain bread' }
                ],
                dinner: [
                    { name: 'Cauliflower Rice Bowl', emoji: '🍚', description: 'Cauliflower rice with roasted vegetables and tofu' },
                    { name: 'Zucchini Noodles', emoji: '🍝', description: 'With tomato sauce, plant-based protein, and nutritional yeast' },
                    { name: 'Stuffed Bell Peppers', emoji: '🫑', description: 'Bell peppers stuffed with quinoa, beans, and vegetables' }
                ],
                snacks: [
                    { name: 'Apple and Nut Butter', emoji: '🍎', description: 'Apple slices with a tablespoon of almond butter' },
                    { name: 'Veggie Sticks', emoji: '🥕', description: 'Carrot and cucumber sticks with hummus' },
                    { name: 'Greek Yogurt', emoji: '🥛', description: 'Plain Greek yogurt with a small amount of honey' }
                ]
            },
            'non-veg': {
                breakfast: [
                    { name: 'Greek Yogurt Parfait', emoji: '🍨', description: 'Greek yogurt with fresh berries and a sprinkle of granola' },
                    { name: 'Turkey Breakfast Wrap', emoji: '🌯', description: 'Egg whites, turkey, spinach in a whole grain wrap' },
                    { name: 'Protein Smoothie', emoji: '🥤', description: 'Whey protein, banana, spinach, and almond milk' }
                ],
                lunch: [
                    { name: 'Grilled Chicken Salad', emoji: '🥗', description: 'Mixed greens, grilled chicken, and light vinaigrette' },
                    { name: 'Tuna Lettuce Wraps', emoji: '🥬', description: 'Tuna mixed with light mayo in lettuce cups' },
                    { name: 'Turkey and Veggie Soup', emoji: '🍲', description: 'Lean turkey with mixed vegetables in clear broth' }
                ],
                dinner: [
                    { name: 'Baked Cod', emoji: '🐟', description: 'Cod fillet with steamed vegetables and quinoa' },
                    { name: 'Chicken Stir-Fry', emoji: '🍗', description: 'Chicken breast with mixed vegetables in light sauce' },
                    { name: 'Lean Beef Kebabs', emoji: '🥩', description: 'Lean beef and vegetable skewers with brown rice' }
                ],
                snacks: [
                    { name: 'Cottage Cheese', emoji: '🧀', description: 'Low-fat cottage cheese with a small amount of fruit' },
                    { name: 'Turkey Roll-Ups', emoji: '🦃', description: 'Turkey slices wrapped around cucumber or bell pepper sticks' },
                    { name: 'Hard-Boiled Egg', emoji: '🥚', description: 'One hard-boiled egg with a pinch of salt' }
                ]
            }
        },
        overweight: {
            veg: {
                breakfast: [
                    { name: 'Green Smoothie', emoji: '🥤', description: 'Spinach, kale, cucumber, celery, lemon, and green apple' },
                    { name: 'Vegetable Egg White Omelet', emoji: '🍳', description: 'Egg whites with spinach, mushrooms, and bell peppers' },
                    { name: 'Chia Pudding', emoji: '🥣', description: 'Chia seeds soaked in almond milk with berries' }
                ],
                lunch: [
                    { name: 'Large Green Salad', emoji: '🥗', description: 'Mixed greens, cucumber, tomato, with lemon and olive oil dressing' },
                    { name: 'Lentil and Vegetable Soup', emoji: '🍲', description: 'Hearty soup with lots of vegetables and lentils' },
                    { name: 'Chickpea Lettuce Wraps', emoji: '🥬', description: 'Spiced chickpeas in lettuce cups' }
                ],
                dinner: [
                    { name: 'Zucchini Noodles', emoji: '🍝', description: 'With tomato sauce and plant-based protein' },
                    { name: 'Cauliflower Rice Bowl', emoji: '🍚', description: 'Cauliflower rice with steamed vegetables and tofu' },
                    { name: 'Vegetable Curry', emoji: '🍛', description: 'Light curry with plenty of vegetables and a small portion of brown rice' }
                ],
                snacks: [
                    { name: 'Celery with Hummus', emoji: '🥕', description: 'Celery sticks with a small amount of hummus' },
                    { name: 'Cucumber Rounds', emoji: '🥒', description: 'With a light spread of cottage cheese' },
                    { name: 'Herbal Tea', emoji: '🍵', description: 'Green or herbal tea with lemon' }
                ]
            },
            'non-veg': {
                breakfast: [
                    { name: 'Protein Scramble', emoji: '🍳', description: 'Egg whites with turkey and vegetables' },
                    { name: 'Smoked Salmon', emoji: '🐟', description: 'With cucumber slices and a small amount of cream cheese' },
                    { name: 'Greek Yogurt', emoji: '🥛', description: 'Low-fat Greek yogurt with a small amount of berries' }
                ],
                lunch: [
                    { name: 'Grilled Chicken Salad', emoji: '🥗', description: 'Large green salad with grilled chicken and light dressing' },
                    { name: 'Turkey Lettuce Wraps', emoji: '🥬', description: 'Turkey slices in lettuce cups with mustard' },
                    { name: 'Tuna Salad', emoji: '🐟', description: 'Tuna mixed with light mayo over mixed greens' }
                ],
                dinner: [
                    { name: 'Baked Fish', emoji: '🐟', description: 'White fish baked with herbs and lemon, with steamed vegetables' },
                    { name: 'Chicken and Vegetable Stir-Fry', emoji: '🍗', description: 'With minimal oil and no rice' },
                    { name: 'Lean Beef and Broccoli', emoji: '🥦', description: 'Small portion of lean beef with plenty of broccoli' }
                ],
                snacks: [
                    { name: 'Turkey Slices', emoji: '🦃', description: 'Lean turkey breast slices' },
                    { name: 'Beef Jerky', emoji: '🥩', description: 'Small portion of low-sodium beef jerky' },
                    { name: 'Hard-Boiled Egg White', emoji: '🥚', description: 'Egg whites only with a pinch of salt' }
                ]
            }
        },
        obese: {
            veg: {
                breakfast: [
                    { name: 'Detox Smoothie', emoji: '🥤', description: 'Spinach, cucumber, celery, lemon, ginger, and a small apple' },
                    { name: 'Egg White Scramble', emoji: '🍳', description: 'With spinach and tomatoes, no oil' },
                    { name: 'Overnight Oats', emoji: '🥣', description: 'Small portion with almond milk and berries, no sweetener' }
                ],
                lunch: [
                    { name: 'Large Vegetable Salad', emoji: '🥗', description: 'Lots of greens and vegetables with lemon juice' },
                    { name: 'Vegetable Soup', emoji: '🍲', description: 'Clear broth with mixed vegetables' },
                    { name: 'Lettuce Wraps', emoji: '🥬', description: 'With small amount of hummus and raw vegetables' }
                ],
                dinner: [
                    { name: 'Steamed Vegetables', emoji: '🥦', description: 'Large portion of mixed steamed vegetables with herbs' },
                    { name: 'Baked Tofu', emoji: '🍢', description: 'Small portion of baked tofu with vegetable stir-fry, no oil' },
                    { name: 'Vegetable Broth', emoji: '🍵', description: 'With added vegetables and small amount of legumes' }
                ],
                snacks: [
                    { name: 'Cucumber Slices', emoji: '🥒', description: 'With lemon and a pinch of salt' },
                    { name: 'Celery Sticks', emoji: '🥕', description: 'Plain or with a small amount of salsa' },
                    { name: 'Herbal Tea', emoji: '🍵', description: 'Unsweetened herbal or green tea' }
                ]
            },
            'non-veg': {
                breakfast: [
                    { name: 'Egg Whites', emoji: '🍳', description: 'Egg whites only with spinach and tomatoes, no oil' },
                    { name: 'Protein Shake', emoji: '🥤', description: 'Low-calorie protein powder with water and ice' },
                    { name: 'Greek Yogurt', emoji: '🥛', description: 'Fat-free Greek yogurt with a small amount of berries' }
                ],
                lunch: [
                    { name: 'Chicken Breast', emoji: '🍗', description: 'Small grilled chicken breast with large green salad' },
                    { name: 'Tuna', emoji: '🐟', description: 'Water-packed tuna over mixed greens with lemon' },
                    { name: 'Clear Soup', emoji: '🍲', description: 'Chicken broth with vegetables and small amount of shredded chicken' }
                ],
                dinner: [
                    { name: 'White Fish', emoji: '🐟', description: 'Baked or grilled white fish with steamed vegetables' },
                    { name: 'Turkey Breast', emoji: '🦃', description: 'Small portion of turkey breast with large serving of greens' },
                    { name: 'Egg White Omelet', emoji: '🍳', description: 'With plenty of vegetables and no cheese' }
                ],
                snacks: [
                    { name: 'Chicken Breast Strips', emoji: '🍗', description: 'Small strips of grilled chicken breast' },
                    { name: 'Beef Broth', emoji: '🍵', description: 'Clear, low-sodium beef broth' },
                    { name: 'Hard-Boiled Egg White', emoji: '🥚', description: 'Just the whites, no yolk' }
                ]
            }
        }
    };
    
    // Private methods
    function createMealCard(meal, category) {
        return `
            <div class="meal-card">
                <div class="meal-title">
                    <span class="emoji">${meal.emoji}</span>
                    <span>${meal.name}</span>
                </div>
                <p class="meal-details">${meal.description}</p>
            </div>
        `;
    }
    
    function getMealSection(meals, title) {
        let html = `<div class="meal-section"><h4>${title}</h4><div class="meal-grid">`;
        
        // Get random meal from the category
        const randomIndex = Math.floor(Math.random() * meals.length);
        const meal = meals[randomIndex];
        
        html += createMealCard(meal);
        
        html += `</div></div>`;
        return html;
    }

    function createPreferenceSelector() {
        return `
            <div class="diet-preference">
                <h4>Select Diet Type:</h4>
                <div class="preference-buttons">
                    <button id="veg-diet-btn" class="${dietaryPreference === 'veg' ? 'active' : ''}" data-preference="veg">
                        <span class="emoji">🥗</span> Vegetarian
                    </button>
                    <button id="nonveg-diet-btn" class="${dietaryPreference === 'non-veg' ? 'active' : ''}" data-preference="non-veg">
                        <span class="emoji">🍗</span> Non-Vegetarian
                    </button>
                </div>
            </div>
        `;
    }
    
    function attachPreferenceListeners() {
        const vegBtn = document.getElementById('veg-diet-btn');
        const nonVegBtn = document.getElementById('nonveg-diet-btn');
        
        if (vegBtn) {
            vegBtn.addEventListener('click', function() {
                dietaryPreference = 'veg';
                vegBtn.classList.add('active');
                nonVegBtn.classList.remove('active');
                renderDetailedDietPlan();
            });
        }
        
        if (nonVegBtn) {
            nonVegBtn.addEventListener('click', function() {
                dietaryPreference = 'non-veg';
                nonVegBtn.classList.add('active');
                vegBtn.classList.remove('active');
                renderDetailedDietPlan();
            });
        }
    }
    
    function renderMealOptions(options) {
        return options.map(option => `<div class="meal-option">${option}</div>`).join('');
    }
    
    function renderDetailedDietPlan() {
        const plan = detailedDietPlans[dietaryPreference];
        
        let dietHTML = createPreferenceSelector();
        
        dietHTML += `
            <div class="detailed-diet-plan">
                <h4 class="plan-title">${plan.title}</h4>
                
                <div class="meal-times-container">
                    <div class="meal-time">
                        <h5>${plan.meals.breakfast.title}</h5>
                        <div class="meal-options">
                            ${renderMealOptions(plan.meals.breakfast.options)}
                        </div>
                    </div>
                    
                    <div class="meal-time">
                        <h5>${plan.meals.midMorning.title}</h5>
                        <div class="meal-options">
                            ${renderMealOptions(plan.meals.midMorning.options)}
                        </div>
                    </div>
                    
                    <div class="meal-time">
                        <h5>${plan.meals.lunch.title}</h5>
                        <div class="meal-options">
                            ${renderMealOptions(plan.meals.lunch.options)}
                        </div>
                    </div>
                    
                    <div class="meal-time">
                        <h5>${plan.meals.eveningSnack.title}</h5>
                        <div class="meal-options">
                            ${renderMealOptions(plan.meals.eveningSnack.options)}
                        </div>
                    </div>
                    
                    <div class="meal-time">
                        <h5>${plan.meals.dinner.title}</h5>
                        <div class="meal-options">
                            ${renderMealOptions(plan.meals.dinner.options)}
                        </div>
                    </div>
                </div>
                
                <div class="diet-notes">
                    <h5>💡 Notes:</h5>
                    <ul>
                        ${dietNotes.map(note => `<li>${note}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Add BMI calculator button at the bottom of the diet plan
        dietHTML += `
            <div class="diet-bmi-calculator">
                <p>Want to check your current BMI?</p>
                <button id="diet-bmi-calculator-btn" class="btn">Calculate BMI</button>
            </div>
        `;
        
        // Update the UI
        dietPlanContainer.innerHTML = dietHTML;
        
        // Attach event listeners to preference buttons
        attachPreferenceListeners();
        
        // Attach event listener to the BMI calculator button in diet section
        const dietBmiBtn = document.getElementById('diet-bmi-calculator-btn');
        if (dietBmiBtn && BMI && BMI.showCalculator) {
            dietBmiBtn.addEventListener('click', BMI.showCalculator);
        }
    }

    // Public methods
    function generatePlan() {
        if (!Auth || !Auth.getUser || !BMI || !BMI.getBMICategory) {
            console.error('Auth or BMI module not available');
            return;
        }

        const user = Auth.getUser();
        if (!user) {
            console.error('User data not available');
            return;
        }

        // Set initial dietary preference from user data
        if (user.dietaryPreference) {
            dietaryPreference = user.dietaryPreference;
        }
        
        // Render the detailed diet plan
        renderDetailedDietPlan();
    }

    // Public API
    return {
        generatePlan: generatePlan
    };
})(); 