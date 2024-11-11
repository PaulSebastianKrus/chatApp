// WebSocket connection for Chat 1
const ws1 = new WebSocket('ws://localhost:8081/ws');
const messagesDiv1 = document.getElementById('messages1');
const messageInput1 = document.getElementById('messageInput1');
const sendButton1 = document.getElementById('sendButton1');

// WebSocket connection for Chat 2
const ws2 = new WebSocket('ws://localhost:8081/ws');
const messagesDiv2 = document.getElementById('messages2');
const messageInput2 = document.getElementById('messageInput2');
const sendButton2 = document.getElementById('sendButton2');

// Function to add message to the chat box
function addMessage(messagesDiv, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the latest message
}

// WebSocket Events for Chat 1
ws1.onopen = () => console.log('Connected to WebSocket server (Chat 1)');
ws1.onmessage = (event) => addMessage(messagesDiv1, event.data);
ws1.onclose = () => console.log('Disconnected from WebSocket server (Chat 1)');

// WebSocket Events for Chat 2
ws2.onopen = () => console.log('Connected to WebSocket server (Chat 2)');
ws2.onmessage = (event) => addMessage(messagesDiv2, event.data);
ws2.onclose = () => console.log('Disconnected from WebSocket server (Chat 2)');

// Send message for Chat 1
sendButton1.addEventListener('click', () => {
    const message = messageInput1.value.trim();
    if (message) {
        ws1.send(message);
        addMessage(messagesDiv1, `You: ${message}`);
        messageInput1.value = '';
    }
});

// Send message for Chat 2
sendButton2.addEventListener('click', () => {
    const message = messageInput2.value.trim();
    if (message) {
        ws2.send(message);
        addMessage(messagesDiv2, `You: ${message}`);
        messageInput2.value = '';
    }
});
