// Данные о видео
const videos = [
    {
        id: 1,
        title: "Развитие речи у детей от 0 до 3 лет",
        author: "Елена Петрова",
        price: 1500,
        thumbnail: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500&h=300"
    },
    {
        id: 2,
        title: "Правильное питание для дошкольников",
        author: "Мария Иванова",
        price: 1200,
        thumbnail: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&h=300"
    },
    {
        id: 3,
        title: "Психология детей младшего возраста",
        author: "Александр Смирнов",
        price: 1800,
        thumbnail: "https://images.unsplash.com/photo-1602046819764-c95de93c6c03?auto=format&fit=crop&w=500&h=300"
    },
    {
        id: 4,
        title: "Развивающие игры для малышей",
        author: "Ольга Козлова",
        price: 1300,
        thumbnail: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=500&h=300"
    },
    {
        id: 5,
        title: "Подготовка к детскому саду",
        author: "Наталья Морозова",
        price: 1600,
        thumbnail: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=500&h=300"
    },
    {
        id: 6,
        title: "Первая помощь для родителей",
        author: "Дмитрий Волков",
        price: 2000,
        thumbnail: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=500&h=300"
    }
];

// Функция для форматирования цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Функция для создания карточки видео
function createVideoCard(video) {
    return `
        <div class="video-card" onclick="openVideoPage(${video.id})">
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-author">${video.author}</p>
                <p class="video-price">${formatPrice(video.price)}</p>
            </div>
        </div>
    `;
}

// Функция для перехода на страницу видео
function openVideoPage(videoId) {
    window.location.href = `video.html?id=${videoId}`;
}

// Функция для отображения всех видео
function displayVideos() {
    const videoGrid = document.querySelector('.video-grid');
    videoGrid.innerHTML = videos.map(video => createVideoCard(video)).join('');
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    displayVideos();
    
    // Обработчик формы авторизации
    const authForm = document.querySelector('.auth-form');
    const authButton = document.querySelector('.auth-button');
    
    authButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;
        
        if (email && password) {
            console.log('Попытка входа:', { email, password });
            // Здесь будет логика авторизации
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
}); 