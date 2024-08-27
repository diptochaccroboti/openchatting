document.addEventListener('DOMContentLoaded', function() {
    const adminLoginButton = document.getElementById('adminLoginButton');
    const adminUsernameInput = document.getElementById('adminUsername');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminErrorElement = document.getElementById('adminError');

    adminLoginButton.addEventListener('click', function() {
        const username = adminUsernameInput.value.trim();
        const password = adminPasswordInput.value.trim();

        if (username === 'admin1' && password === '6969') {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'admin_panel.html';
        } else {
            adminErrorElement.textContent = 'Invalid admin credentials.';
        }
    });
});
