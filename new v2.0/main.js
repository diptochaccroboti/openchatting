document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const saveButton = document.getElementById('saveButton');
    const paragraphInput = document.getElementById('paragraphInput');
    const postsContainer = document.getElementById('postsContainer');
    const logoutButton = document.getElementById('logoutButton');

    loadPosts();

    saveButton.addEventListener('click', function() {
        const paragraphText = paragraphInput.value.trim();
        if (paragraphText) {
            savePost(paragraphText, currentUser.username);
            paragraphInput.value = '';
            loadPosts();
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    function savePost(text, author) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ text, author });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        postsContainer.innerHTML = ''; // Clear previous content
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        if (posts.length === 0) {
            const noPostsElement = document.createElement('div');
            noPostsElement.textContent = 'No posts available yet. Be the first to post!';
            noPostsElement.style.fontStyle = 'italic';
            postsContainer.appendChild(noPostsElement);
        } else {
            posts.forEach(function(post) {
                if (post.text && post.author) { // Check if both text and author are defined
                    const postElement = document.createElement('div');
                    postElement.className = 'post';

                    const authorElement = document.createElement('div');
                    authorElement.className = 'author';
                    authorElement.textContent = ` ${post.author}`;

                    const textElement = document.createElement('div');
                    textElement.textContent = post.text;

                    postElement.appendChild(authorElement);
                    postElement.appendChild(textElement);
                    postsContainer.appendChild(postElement);
                }
            });
        }
    }
});
