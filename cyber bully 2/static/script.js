document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('linkForm');
    const postLinkInput = document.getElementById('postLink');
    const loadingIndicator = document.getElementById('loading');
    const commentList = document.getElementById('commentList');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const postLink = postLinkInput.value;
        loadingIndicator.classList.remove('hidden');
        commentList.innerHTML = '';

        try {
            // Make a POST request to your backend with the link
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: postLink }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data)
            // const { cyberbullyingComments } = data.result;

            commentList.innerHTML = data.result;
        } catch (error) {
            console.error('Error:', error);
            commentList.innerHTML = '<li>Error processing the request. Please try again.</li>';
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    });
});