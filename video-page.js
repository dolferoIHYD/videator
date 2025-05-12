// Получаем ID видео из URL
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('id');

// Данные о консультациях (в реальном проекте это будет приходить с сервера)
const consultationPrices = {
    1: 3000,
    2: 2500,
    3: 3500,
    4: 2800,
    5: 3200,
    6: 4000
};

// Ссылки на профили авторов
const authorProfiles = {
    1: "https://example.com/authors/elena-petrova",
    2: "https://example.com/authors/maria-ivanova",
    3: "https://example.com/authors/alexander-smirnov",
    4: "https://example.com/authors/olga-kozlova",
    5: "https://example.com/authors/natalia-morozova",
    6: "https://example.com/authors/dmitry-volkov"
};

// Загрузка данных видео
function loadVideoData() {
    // В реальном проекте здесь будет запрос к серверу
    const video = videos.find(v => v.id === parseInt(videoId));
    if (!video) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${video.title} - ParentEdu`;
    document.querySelector('.video-title').textContent = video.title;
    
    // Создаем ссылку на профиль автора
    const authorLink = document.querySelector('.author-link');
    authorLink.href = authorProfiles[video.id];
    authorLink.textContent = video.author;
    
    document.querySelector('.video-author').textContent = 'Автор: ';
    document.querySelector('.consultation-price').textContent = 
        `Консультация: ${formatPrice(consultationPrices[video.id])}`;

    // В реальном проекте здесь будет настоящий URL видео
    document.querySelector('#mainVideo source').src = 
        `https://example.com/videos/${videoId}.mp4`;
    document.querySelector('#mainVideo').load();
}

// Форматирование цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Предустановленные сообщения для разных видео
const videoDiscussions = {
    1: [
        { author: "Модератор", text: "Добро пожаловать в обсуждение! Напоминаем, что часть сообщений генерируется искусственным интеллектом для поддержания активной дискуссии.", time: "10:00" },
        { author: "Анна", text: "Очень полезное видео! Особенно заинтересовала часть про развитие речи через игру.", time: "10:05" },
        { author: "Елена Петрова", text: "Спасибо! Для игр очень рекомендую развивающий набор 'Речевичок', о котором я говорила в видео.", time: "10:07", isAuthor: true },
        { author: "Мария", text: "А где можно купить этот набор?", time: "10:10" },
        { author: "Елена Петрова", text: "Вот ссылка на набор: <a href='https://example.com/shop/rechevichok' class='product-link'>Развивающий набор 'Речевичок'</a>", time: "10:12", isAuthor: true }
    ],
    2: [
        { author: "Модератор", text: "Добро пожаловать в обсуждение! Напоминаем, что часть сообщений генерируется искусственным интеллектом для поддержания активной дискуссии.", time: "11:00" },
        { author: "Ирина", text: "Подскажите, а с какого возраста можно начинать вводить эти продукты?", time: "11:15" },
        { author: "Мария Иванова", text: "С 6 месяцев, но важно следить за реакцией ребенка. Я рекомендую дневник питания, который упоминала в видео.", time: "11:17", isAuthor: true },
        { author: "Ольга", text: "Где можно скачать такой дневник?", time: "11:20" },
        { author: "Мария Иванова", text: "Вот ссылка на дневник: <a href='https://example.com/shop/food-diary' class='product-link'>Дневник питания дошкольника</a>", time: "11:22", isAuthor: true }
    ]
};

// Чат
class Chat {
    constructor() {
        this.messages = [];
        this.messageContainer = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.querySelector('.chat-send-button');

        this.setupEventListeners();
        this.loadInitialMessages();
        this.connectWebSocket();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    loadInitialMessages() {
        const discussion = videoDiscussions[videoId] || [];
        discussion.forEach(message => {
            this.addMessageToChat(message);
        });
    }

    connectWebSocket() {
        // В реальном проекте здесь будет подключение к WebSocket серверу
        // Имитация получения сообщений
        const possibleMessages = [
            "Отличный материал!",
            "Спасибо за подробное объяснение",
            "Очень помогло в воспитании",
            "Будут ли еще видео на эту тему?",
            "Применила советы - работает!"
        ];

        setInterval(() => {
            if (Math.random() > 0.8) {
                this.receiveMessage({
                    author: 'Пользователь ' + Math.floor(Math.random() * 100),
                    text: possibleMessages[Math.floor(Math.random() * possibleMessages.length)],
                    time: new Date()
                });
            }
        }, 8000);
    }

    sendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        const message = {
            author: 'Вы',
            text: text,
            time: new Date()
        };

        this.addMessageToChat(message);
        this.chatInput.value = '';
    }

    receiveMessage(message) {
        this.addMessageToChat(message);
    }

    addMessageToChat(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        if (message.isAuthor) {
            messageElement.classList.add('author-message');
        }
        
        const timeStr = message.time instanceof Date ? 
            this.formatTime(message.time) : message.time;

        messageElement.innerHTML = `
            <div class="message-author">${message.author}</div>
            <div class="message-text">${message.text}</div>
            <div class="message-time">${timeStr}</div>
        `;

        this.messageContainer.appendChild(messageElement);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    formatTime(date) {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    loadVideoData();
    const chat = new Chat();

    // Обработчик кнопки консультации
    document.querySelector('.consultation-button').addEventListener('click', () => {
        alert('Запрос на консультацию отправлен автору. Ожидайте ответа.');
    });
}); 