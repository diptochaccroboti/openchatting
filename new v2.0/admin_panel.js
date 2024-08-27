document.addEventListener('DOMContentLoaded', function() {
    const adminLogoutButton = document.getElementById('adminLogoutButton');
    const adminSavePostButton = document.getElementById('adminSavePostButton');
    const adminPostInput = document.getElementById('adminPostInput');
    const adminPostsContainer = document.getElementById('adminPostsContainer');
    const userStats = document.getElementById('userStats');
    const removeUserButton = document.getElementById('removeUserButton');
    const removeUsernameInput = document.getElementById('removeUsername');

    // Check if admin is logged in
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin_login.html';
        return;
    }

    adminLogoutButton.addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin_login.html';
    });

    adminSavePostButton.addEventListener('click', function() {
        const paragraphText = adminPostInput.value.trim();
        if (paragraphText) {
            savePost(paragraphText, 'Admin');
            adminPostInput.value = '';
            loadPosts();
        }
    });

    removeUserButton.addEventListener('click', function() {
        const usernameToRemove = removeUsernameInput.value.trim();
        if (usernameToRemove) {
            removeUser(usernameToRemove);
            removeUsernameInput.value = '';
            loadUserStats();
            loadLoggedInUsers();
        }
    });

    function savePost(text, author) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ text, author });
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    function loadPosts() {
        adminPostsContainer.innerHTML = ''; // Clear previous content
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(function(post, index) {
            if (post.text && post.author) {
                const postElement = document.createElement('div');
                postElement.className = 'post';

                const authorElement = document.createElement('div');
                authorElement.className = 'author';
                authorElement.textContent = `Posted by: ${post.author}`;

                const textElement = document.createElement('div');
                textElement.textContent = post.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete Post';
                deleteButton.addEventListener('click', function() {
                    deletePost(index);
                });

                postElement.appendChild(authorElement);
                postElement.appendChild(textElement);
                postElement.appendChild(deleteButton);
                adminPostsContainer.appendChild(postElement);
            }
        });
    }

    function deletePost(index) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1); // Remove the post at the specified index
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    function removeUser(username) {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            delete users[username];
            localStorage.setItem('users', JSON.stringify(users));
            loadUserStats();
        }
        let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || {};
        if (loggedInUsers[username]) {
            delete loggedInUsers[username];
            localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
        }
    }

    function loadUserStats() {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        userStats.textContent = `Total registered users: ${Object.keys(users).length}`;
        loadLoggedInUsers();
    }

    function loadLoggedInUsers() {
        const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || {};
        let loggedInUsersText = `Logged in users: ${Object.keys(loggedInUsers).join(', ') || 'None'}`;
        const loggedInUsersElement = document.createElement('div');
        loggedInUsersElement.textContent = loggedInUsersText;
        userStats.appendChild(loggedInUsersElement);
    }

    loadPosts();
    loadUserStats();
});
