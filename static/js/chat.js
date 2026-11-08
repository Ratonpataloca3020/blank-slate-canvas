// Chat Widget Interaction - Elegant Design
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chat widget script loaded');
    
    const trigger = document.getElementById('chat-trigger');
    const panel = document.getElementById('chat-panel');
    const backdrop = document.getElementById('chat-backdrop');
    const closeBtn = document.getElementById('chat-close');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messagesContainer = document.getElementById('chat-messages');

    console.log('Trigger:', trigger);
    console.log('Panel:', panel);
    console.log('Backdrop:', backdrop);

    // Open chat
    if (trigger) {
        trigger.addEventListener('click', function() {
            console.log('Chat trigger clicked');
            
            // Hide trigger button
            trigger.classList.add('hidden');
            
            // Show backdrop
            if (backdrop) {
                backdrop.classList.add('active');
                backdrop.style.display = 'block';
                backdrop.style.opacity = '1';
            }
            
            // Show panel with class and inline styles as fallback
            panel.classList.add('active');
            panel.style.display = 'flex';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'all';
            panel.style.transform = 'translateY(0) scale(1)';
            panel.style.visibility = 'visible';
            
            setTimeout(() => {
                if (input) input.focus();
            }, 300);
        });
    }

    // Close chat
    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }
    
    // Close chat when clicking backdrop
    if (backdrop) {
        backdrop.addEventListener('click', closeChat);
    }
    
    function closeChat() {
        console.log('Chat close clicked');
        
        // Hide backdrop
        if (backdrop) {
            backdrop.classList.remove('active');
            backdrop.style.opacity = '0';
        }
        
        // Hide panel
        panel.classList.remove('active');
        panel.style.opacity = '0';
        panel.style.pointerEvents = 'none';
        panel.style.transform = 'translateY(20px) scale(0.95)';
        
        setTimeout(() => {
            trigger.classList.remove('hidden');
            if (backdrop) backdrop.style.display = 'none';
        }, 300);
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
                        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                        <circle cx="8" cy="15" r="1" fill="currentColor"></circle>
                        <circle cx="16" cy="15" r="1" fill="currentColor"></circle>
                        <path d="M9 11V7a3 3 0 0 1 6 0v4"></path>
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
