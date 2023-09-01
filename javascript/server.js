    const chatList = document.querySelector(".chatlist");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat_input input");

    let chats = []; // Almacenar los datos del JSON aquí
    let activeChatIndex = 0; // Índice del chat activo

    // Cargar los datos del JSON
    fetch("json/db.json")
    .then(response => response.json())
    .then(data => {
        chats = data.chats;
        renderChatList();
        renderChatConversation();
    })
    .catch(error => console.error("Error al cargar los datos del JSON:", error));

    // Cargar la lista de chats en el lado izquierdo
    function renderChatList() {
    chatList.innerHTML = "";
    for (let i = 0; i < chats.length; i++) {
        const chat = chats[i];
        const unreadClass = chat.unread > 0 ? "unread" : "";
        const activeClass = activeChatIndex === i ? "active" : "";
        const deliveredIcon = chat.unread === 0 ? `<ion-icon name="checkmark-done-circle"></ion-icon>` : "";
        const chatBlock = `
        <div class="block ${unreadClass} ${activeClass}" data-chat-index="${i}">
            <div class="imgBox">
                <img src="img/imagen.jpg" class="cover" alt="">
            </div>
            <div class="details">
                <div class="listHead">
                    <h4>${chat.name}</h4>
                    <p class="time">${getLastMessageTimestamp(chat)}</p>
                </div>
                <div class="message_p">
                    <p>${getLastMessageContent(chat)}</p>
                </div>
                ${getLastMessageDeliveredText(chat)}
            </div>
        </div>
    `;
    
        
        chatList.insertAdjacentHTML("beforeend", chatBlock);
    }
    }
    function getLastMessageDeliveredText(chat) {
        const lastMessage = chat.messages[chat.messages.length - 1];
        if (lastMessage && lastMessage.sender === "Me" && lastMessage.delivered) {
            return '<span class="delivered-text">✓✓</span>';
        }
        return "";
    }
    

    // Obtener el último mensaje y su contenido
    function getLastMessageContent(chat) {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage ? lastMessage.content : "";
    }

    // Obtener la hora del último mensaje
    function getLastMessageTimestamp(chat) {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage ? lastMessage.timestamp : "";
    }

// Cargar la conversación en el lado derecho
function renderChatConversation() {
    chatbox.innerHTML = "";
    const chat = chats[activeChatIndex];
    for (const message of chat.messages) {
        const messageClass = message.sender === "Me" ? "my_msg" : "friend_msg";
        const messageContent = `
            <p>${message.content}<br><span>${message.timestamp}</span>${message.sender === "Me" && message.delivered ? '<span class="delivered-text">✓✓</span>' : ''}</p>
        `;
        
        const messageBlock = `
            <div class="message ${messageClass}">
                ${messageContent}
            </div>
        `;
        chatbox.insertAdjacentHTML("beforeend", messageBlock);
    }
}

    // Manejar el envío de un nuevo mensaje
    function sendMessage(content) {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const chat = chats[activeChatIndex];
    chat.messages.push({ content, sender: "Me", timestamp, delivered: true  });
    chat.unread++;
    renderChatConversation();
    renderChatList();
    }

    // Evento de clic en un chat de la lista
    chatList.addEventListener("click", (event) => {
    const chatBlock = event.target.closest(".block");
    if (chatBlock) {
        activeChatIndex = parseInt(chatBlock.getAttribute("data-chat-index"));
        renderChatConversation();
        renderChatList();
    }
    });

    // Evento de envío de mensaje
    chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const messageContent = chatInput.value;
        sendMessage(messageContent);
        chatInput.value = "";
    }
    });
