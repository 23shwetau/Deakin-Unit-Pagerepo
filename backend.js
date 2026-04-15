import bcrypt from 'bcrypt';
var loginStatus = false; // Variable to track login status
var loginAttempts = 0; // Variable to track login attempts
let credentials = []; // Hashmap to store username and password pairs



const saltRounds = 10; // Number of salt rounds for hashing

async function hashPassword(plainTextPassword) {
    try {
        // Generates a salt and hashes in one go
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        return hash;
    } catch (err) {
        console.error("Hashing error:", err);
    }
}

function signUp(username, password){
    if (credentials[username]) {
        console.log("Username already exists. Please choose a different username.");
        return;
    }
    // creating pair of user and password and store in hashmap [user: password]
    credentials[username] = hashPassword(password);
}


async function signIn(username, password) {
    // Simulate a login process (replace with actual authentication logic)
    if (credentials[username] && await bcrypt.compare(password, credentials[username])) {
        loginStatus = true;
        loginAttempts = 0;
        console.log("Login successful.");
    } else {
        loginAttempts++;
        console.log("Invalid username or password.");
        if (loginAttempts >= 3) {
            console.log("Too many failed login attempts. Please try again later.");
        }
    }
}

function signOut() {
    loginStatus = false;
    console.log("Logged out successfully.");
}

export { signUp, signIn, signOut, loginStatus };

