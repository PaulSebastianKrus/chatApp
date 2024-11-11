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
function addMessage(messagesDiv, message, isCurrentUser) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add(isCurrentUser ? 'myMessage' : 'otherMessage');
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the latest message
}


// WebSocket Events for Chat 1
ws1.onopen = () => console.log('Connected to WebSocket server (Chat 1)');
ws1.onmessage = (event) => addMessage(messagesDiv1, event.data, false);  // False for received messages
ws1.onclose = () => console.log('Disconnected from WebSocket server (Chat 1)');

// WebSocket Events for Chat 2
ws2.onopen = () => console.log('Connected to WebSocket server (Chat 2)');
ws2.onmessage = (event) => addMessage(messagesDiv2, event.data, false);  // False for received messages
ws2.onclose = () => console.log('Disconnected from WebSocket server (Chat 2)');

// Send message for Chat 1
sendButton1.addEventListener('click', () => {
    const message = messageInput1.value.trim();
    if (message) {
        ws1.send(message);
        addMessage(messagesDiv1, message, true); // True for sent messages
        messageInput1.value = '';
    }
});

// Send message for Chat 2
sendButton2.addEventListener('click', () => {
    const message = messageInput2.value.trim();
    if (message) {
        ws2.send(message);
        addMessage(messagesDiv2, message, true); // True for sent messages
        messageInput2.value = '';
    }
});

// Add event listener to send message when Enter is pressed for Chat 1
messageInput1.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent default action (like form submission)
        sendMessage1();
    }
});

// Add event listener to send message when Enter is pressed for Chat 2
messageInput2.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent default action (like form submission)
        sendMessage2();
    }
});

// Function to send message on Enter key for Chat 1
function sendMessage1() {
    const message = messageInput1.value.trim();
    if (message) {
        ws1.send(message);
        addMessage(messagesDiv1, message, true); // True for sent messages
        messageInput1.value = '';
    }
}

// Function to send message on Enter key for Chat 2
function sendMessage2() {
    const message = messageInput2.value.trim();
    if (message) {
        ws2.send(message);
        addMessage(messagesDiv2, message, true); // True for sent messages
        messageInput2.value = '';
    }
}
