document.addEventListener('DOMContentLoaded', () => {
    let userName = document.querySelector('#username');
    let passWord = document.querySelector('#password');
    let enterButton = document.querySelector('#Enter_button');
    let loginPage = document.querySelector('.login');
    let dashPage = document.querySelector('.dashboard');
    let postsContainer = document.querySelector('#posts_container');
    let logoutButton = document.querySelector('.content_items button');
    let nameerr=document.querySelector('#nameError');

    if (localStorage.getItem('Username') && localStorage.getItem('Password')) {
        loginPage.style.display = 'none';
        getResults();
    }

    enterButton.addEventListener('click', () => {
        if (userName.value === 'admin' && passWord.value === '123'){
            localStorage.setItem('Username', userName.value);
            localStorage.setItem('Password', passWord.value);
            if (localStorage.getItem('Username') && localStorage.getItem('Password')) {
                loginPage.style.display = 'none';
                dashPage.style.display='flex';
                getResults();
            }
        }
        userName.value='';
        passWord.value='';
    });

    logoutButton.addEventListener('click',()=>{
        localStorage.removeItem('Username');
        localStorage.removeItem('Password');
        loginPage.style.display='flex';
        dashPage.style.display='none';
       
    });

    async function getResults() {
        try {
            let [postsResponse, commentsResponse] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/posts'),
                fetch('https://jsonplaceholder.typicode.com/comments')
            ]);

            if (!postsResponse.ok || !commentsResponse.ok) {
                throw new Error('Network response was not ok');
            }

            let posts = await postsResponse.json();
            let comments = await commentsResponse.json();
            displayPosts(posts, comments);
        } catch (error) {
            console.error('Fetch operation failed:', error);
        }
    }

    function displayPosts(posts, comments) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            let postElement = document.createElement('div');
            postElement.classList.add('api');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <button class="api_button" data-post-id="${post.id}">Comments</button>
                <div class="comments" id="comments-${post.id}" style="display: none;">
                    <ul></ul>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });

        document.querySelectorAll('.api_button').forEach(button => {
            button.addEventListener('click', (event) => {
                let postId = event.target.getAttribute('data-post-id');
                displayComments(postId, comments);
            });
        });
    }

    function displayComments(postId, comments) {
        let commentsContainer = document.querySelector(`#comments-${postId}`);
        let commentsList = commentsContainer.querySelector('ul');

        if (commentsContainer.style.display === 'none') {
            commentsList.innerHTML = '';

            let postComments = comments.filter(comment => comment.postId == postId);
            postComments.forEach(comment => {
                let commentElement = document.createElement('li');
                commentElement.innerHTML = `
                    <p><strong>${comment.name}</strong>: ${comment.body}</p>
                `;
                commentsList.appendChild(commentElement);
            });
            commentsContainer.style.display = 'block';
        } else {
            commentsContainer.style.display = 'none';
        }
    }
});
