// Function to get credentials from localStorage
function getCredentials() {
    return JSON.parse(localStorage.getItem('credentials')) || {};
}

// Function to set credentials in localStorage
function setCredentials(credentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));
}

var loginStatus = false; // Variable to track login status
var loginAttempts = 0; // Variable to track login attempts
var successfulSignUp = false; // Variable to track successful sign-up

function hashPassword(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; 
    }
    return hash;
}

export function signUp(username, password){
    if (!username || !username.trim()) {
        alert("Username cannot be empty.");
        return;
    }
    let credentials = getCredentials();
    if (credentials[username]) {
        alert("Username already exists. Please choose a different username.");
        return;
    }
    // Store the "hashed" password
    credentials[username] = hashPassword(password);
    setCredentials(credentials);
    // console.log(credentials);
    console.log(`User "${username}" signed up.`);
    successfulSignUp = true;
}

export function signIn(username, password) {
    const credentials = getCredentials();
    const hashedPassword = hashPassword(password);
    console.log(`Stored credentials: ${JSON.stringify(credentials)}`);
    if (credentials[username] && credentials[username] === hashedPassword) {
        loginStatus = true;
        loginAttempts = 0;
        localStorage.setItem('loggedInUser', username); // Store username on successful login
        console.log("Login successful.");
        alert("Login successful!");
        // Redirect to homepage on successful login
        window.location.href = 'index.html';
    } else {
        loginAttempts++;
        console.log("Invalid username or password.");
        alert("Invalid username or password.");
        if (loginAttempts >= 3) {
            console.log("Too many failed login attempts. Please try again later.");
            alert("Too many failed login attempts. Please try again later.");
            const signinForm = document.getElementById('signin-form');
            if (signinForm) {
                const submitButton = signinForm.querySelector('input[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    alert("You have been locked out for 5 minutes due to too many failed login attempts.");
                    setTimeout(() => {
                        loginAttempts = 0;
                        submitButton.disabled = false;
                        alert("You can now try to log in again.");
                    }, 5 * 60 * 1000); // 5 minutes
                }
            }
        }
    }
}

export function signOut() {
    loginStatus = false;
    localStorage.removeItem('loggedInUser'); // Clear user from storage on sign out
    console.log("Logged out successfully.");
    window.location.href = 'index.html'; // Refresh to update UI
}

// Event listener to handle the form submission
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            const username = event.target.username.value;
            const password = event.target.password.value;
            signIn(username, password);
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = event.target.username.value;
            const password = event.target.password.value;
            const confirmPassword = event.target['confirm-password'].value;

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            signUp(username, password);
            if(successfulSignUp) {
                alert("Sign up successful! Please sign in.");
                window.location.href = 'signin.html';
            }
        });
    }
});



