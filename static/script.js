function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    addMessage('user', message);
    input.value = '';

    showTyping();

    // Envoyer le message au serveur Flask
    fetch('/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'msg=' + encodeURIComponent(message)
    })
    .then(response => response.text())
    .then(data => {
        removeTyping();
        addMessage('bot', data);
    })
    .catch(error => {
        removeTyping();
        console.error('Erreur:', error);
        addMessage('bot', 'Une erreur est survenue. Veuillez réessayer.');
    });
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(sender, text) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const chatBox = document.getElementById('chatBox');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing';
    typingDiv.className = 'message bot';
    typingDiv.innerHTML = '<div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}