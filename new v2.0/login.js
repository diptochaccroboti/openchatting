document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorElement = document.getElementById('error');

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || password.length !== 4 || isNaN(password)) {
            errorElement.textContent = 'Please enter a valid username and 4-digit password.';
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || {};
        
        if (users[username]) {
            // If the username exists, check if the password matches
            if (users[username] === password) {
                // Correct password, allow login
                localStorage.setItem('currentUser', JSON.stringify({ username, password }));
                window.location.href = 'main.html';
            } else {
                // Incorrect password for existing username
                errorElement.textContent = 'This username is already registered with a different password.';
            }
        } else {
            // If the username doesn't exist, register it with the provided password
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({ username, password }));
            window.location.href = 'main.html';
        }
    });

    const passwordField = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', function () {
    // Toggle the type attribute
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    
    // Toggle the button text
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

});
