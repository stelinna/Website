const articleId = document.body.getAttribute('data-article-id') || "urban-dreams";

// Function to fetch and display comments
async function loadComments() {
    try {
        const response = await fetch(`../api/comments.php?article_id=${articleId}`);
        const data = await response.json();

        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = '';

        if (data.success && data.comments.length > 0) {
            data.comments.forEach(comment => {
                const li = document.createElement('li');
                li.className = 'comment-item';
                li.innerHTML = `
                    <div class="comment-header">
                        <strong class="comment-author">${escapeHtml(comment.author_name)}</strong>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p class="comment-text">${escapeHtml(comment.comment_text)}</p>
                `;
                commentsList.appendChild(li);
            });
        } else {
            commentsList.innerHTML = '<li class="no-comments">No comments yet. Be the first to share your thoughts!</li>';
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        document.getElementById('comments-list').innerHTML = '<li class="error">Failed to load comments. Please try again later.</li>';
    }
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle form submission via AJAX
const form = document.getElementById('comment-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Posting...';
        submitButton.disabled = true;

        const formData = new FormData(form);
        const payload = {
            article_id: articleId,
            name: formData.get('name'),
            email: formData.get('email'),
            comment: formData.get('comment')
        };

        try {
            const response = await fetch('../api/comments.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                form.reset();
                loadComments(); // Reload comments after successful post
                alert('Comment posted successfully!');
            } else {
                alert(result.error || 'Error posting comment. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to post comment. Please check your connection.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Load comments when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComments);
} else {
    loadComments();
}