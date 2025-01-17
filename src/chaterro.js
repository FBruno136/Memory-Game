export function showChatError(message) {
  const chatBox = document.getElementById('chat-box');
  chatBox.textContent = message;
  chatBox.style.display = 'block';
}
