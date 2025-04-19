// Auth Module - Handles user registration and login
const Auth = (function() {
    // Private variables
    const userStorageKey = 'fittrack_user';
    const isLoggedInKey = 'fittrack_logged_in';

    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginLink = document.getElementById('show-login');
    const registerLink = document.getElementById('show-register');
    const authContainer = document.getElementById('auth-container');
    const dashboard = document.getElementById('dashboard');
    const userNameSpan = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Input Fields - Login
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    
    // Input Fields - Register
    const registerName = document.getElementById('register-name');
    const registerAge = document.getElementById('register-age');
    const registerGender = document.getElementById('register-gender');
    const registerWeight = document.getElementById('register-weight');
    const registerHeight = document.getElementById('register-height');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const registerDietary = document.getElementById('register-dietary');

    // Private methods
    function showLoginForm() {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }

    function showRegisterForm() {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(message) {
        alert(message);
    }

    function saveUser(userData) {
        localStorage.setItem(userStorageKey, JSON.stringify(userData));
    }

    function getUser() {
        const userData = localStorage.getItem(userStorageKey);
        return userData ? JSON.parse(userData) : null;
    }

    function setLoggedIn(status) {
        localStorage.setItem(isLoggedInKey, status);
        if (status) {
            const user = getUser();
            userNameSpan.textContent = user.name;
            authContainer.classList.add('hidden');
            dashboard.classList.remove('hidden');
            
            // Initialize BMI and other modules after login
            if (typeof BMI !== 'undefined') {
                BMI.calculate();
            }
            if (typeof Workout !== 'undefined') {
                Workout.generatePlan();
            }
            if (typeof Diet !== 'undefined') {
                Diet.generatePlan();
            }
        } else {
            authContainer.classList.remove('hidden');
            dashboard.classList.add('hidden');
        }
    }

    function checkLoggedIn() {
        return localStorage.getItem(isLoggedInKey) === 'true';
    }

    // Public methods
    function init() {
        // Event Listeners
        if (loginLink) loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });

        if (registerLink) registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showRegisterForm();
        });

        if (document.getElementById('login')) {
            document.getElementById('login').addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }

        if (document.getElementById('register')) {
            document.getElementById('register').addEventListener('submit', function(e) {
                e.preventDefault();
                handleRegister();
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                handleLogout();
            });
        }

        // Check if user is already logged in
        if (checkLoggedIn()) {
            setLoggedIn(true);
        }
    }

    function handleRegister() {
        // Form validation
        if (!validateEmail(registerEmail.value)) {
            return showError('Please enter a valid email address');
        }

        if (registerPassword.value.length < 6) {
            return showError('Password must be at least 6 characters long');
        }

        // Create user object
        const user = {
            name: registerName.value,
            age: parseInt(registerAge.value),
            gender: registerGender.value,
            weight: parseFloat(registerWeight.value),
            height: parseFloat(registerHeight.value),
            email: registerEmail.value,
            password: registerPassword.value, // In a real app, this should be hashed
            dietaryPreference: registerDietary.value,
            registeredAt: new Date().toISOString()
        };

        // Save user data
        saveUser(user);
        setLoggedIn(true);
        showError('Registration successful!');
    }

    function handleLogin() {
        const user = getUser();
        
        if (!user) {
            return showError('No account found. Please register first.');
        }

        if (user.email === loginEmail.value && user.password === loginPassword.value) {
            setLoggedIn(true);
        } else {
            showError('Invalid email or password');
        }
    }

    function handleLogout() {
        setLoggedIn(false);
        showLoginForm();
    }

    function updateUserData(key, value) {
        const user = getUser();
        if (user) {
            user[key] = value;
            saveUser(user);
            return true;
        }
        return false;
    }

    // Public API
    return {
        init: init,
        getUser: getUser,
        updateUserData: updateUserData,
        isLoggedIn: checkLoggedIn
    };
})();

// Initialize Auth module when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    Auth.init();
}); 