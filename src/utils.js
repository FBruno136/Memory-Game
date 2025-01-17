// Função para embaralhar um array
export function shuffle(array) {
    // Utiliza o método sort() com uma função de comparação aleatória
    // Math.random() retorna um número entre 0 e 1
    // Subtraindo 0.5, o resultado pode ser negativo, positivo ou zero
    // Isso efetivamente embaralha os elementos do array
    return array.sort(() => Math.random() - 0.5);
}

// Função para lidar com erros de carregamento de imagem
export function handleError(img, imagePath) {
    // Mostra uma mensagem de erro no "chat-box"
    // A função `showChatError` é chamada para exibir a mensagem no componente correspondente
    showChatError(`Erro ao carregar a imagem: ${imagePath}`);

    // Exibe o erro no console para facilitar a depuração
    console.error(`Erro ao carregar a imagem: ${imagePath}`);
}

// Função para exibir mensagens de erro no "chat-box"
export function showChatError(message) {
    // Obtém o elemento HTML do "chat-box" pelo ID
    const chatBox = document.getElementById('chat-box');

    // Define o texto da mensagem de erro no "chat-box"
    chatBox.textContent = message;

    // Torna o "chat-box" visível, alterando o estilo de exibição
    chatBox.style.display = 'block';

}
