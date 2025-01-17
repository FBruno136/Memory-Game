export function showChatError(message) {
  const chatBox = document.getElementById('chat-box');
  chatBox.textContent = message;
  chatBox.style.display = 'block';

  setTimeout(() => {
    chatBox.style.display = 'none';
  }, 3000);
}
