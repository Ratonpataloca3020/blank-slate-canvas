// Chat Widget Interaction - Elegant Design
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chat widget script loaded');
    
    const trigger = document.getElementById('chat-trigger');
    const panel = document.getElementById('chat-panel');
    const closeBtn = document.getElementById('chat-close');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messagesContainer = document.getElementById('chat-messages');

    console.log('Trigger:', trigger);
    console.log('Panel:', panel);

    // Open chat
    if (trigger) {
        trigger.addEventListener('click', function() {
            console.log('Chat trigger clicked');
            trigger.classList.add('hidden');
            panel.classList.add('active');
            setTimeout(() => {
                if (input) input.focus();
            }, 300);
        });
    }

    // Close chat
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            console.log('Chat close clicked');
            panel.classList.remove('active');
            setTimeout(() => {
                trigger.classList.remove('hidden');
            }, 300);
        });
    }

    // Auto-resize textarea
    if (input) {
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Send on Enter (Shift+Enter for new line)
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Send button
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    function sendMessage() {
        if (!input || !messagesContainer) return;
        
        const message = input.value.trim();
        if (!message) return;

        console.log('Sending message:', message);

        // Add user message to chat
        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message user-message';
        messageEl.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${escapeHtml(message)}</p>
                </div>
                <span class="message-time">Ahora</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Clear input
        input.value = '';
        input.style.height = 'auto';

        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot-message';
            botMessage.innerHTML = `
                <div class="message-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>Gracias por contactarnos. Un miembro de nuestro equipo revisará tu caso y se pondrá en contacto contigo pronto.</p>
                    </div>
                    <span class="message-time">Ahora</span>
                </div>
            `;
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    console.log('Chat widget initialized');
});
