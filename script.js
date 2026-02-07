const tg = window.Telegram.WebApp;

// 1. Инициализация и Проверка входа
document.addEventListener('DOMContentLoaded', () => {
    // Проверка платформы. В реальности проверяют tg.initData
    // Если initData пустая, значит открыто не в ТГ
    if (!tg.initDataUnsafe || Object.keys(tg.initDataUnsafe).length === 0) {
        // Раскомментируйте строчку ниже, чтобы включить строгую проверку!
        // document.getElementById('pc-blocker').style.display = 'flex';
        // document.getElementById('app').style.display = 'none';
        
        // Для теста в браузере (чтобы вы могли проверить код) оставим доступ:
        console.warn("Запущено не в Telegram. Включен режим отладки.");
        document.getElementById('pc-blocker').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        initUser({ first_name: "TestUser", id: 12345 }); // Фейк юзер
    } else {
        // Мы в Телеграм
        document.getElementById('pc-blocker').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        tg.expand(); // Развернуть на весь экран
        // Установка цветов темы ТГ
        document.body.style.backgroundColor = tg.themeParams.bg_color || '#121212';
        initUser(tg.initDataUnsafe.user);
    }
    
    loadCases();
    updateUI();
});

// Данные пользователя
let user = {
    balance: 0,
    inventory: [],
    history: [],
    stats: { opened: 0 }
};

// 2. Загрузка данных (Имитация БД через LocalStorage)
function initUser(tgUser) {
    const savedData = localStorage.getItem(`br_user_${tgUser.id}`);
    
    if (savedData) {
        user = JSON.parse(savedData);
    } else {
        // Новый пользователь
        user.balance = 5000; // Бонус при регистрации
        saveUser();
    }
    
    // UI
    document.getElementById('user-name').innerText = tgUser.first_name || 'Игрок';
    if(tgUser.photo_url) document.getElementById('user-avatar').src = tgUser.photo_url;
    
    // Сохраняем ID для сохранения
    window.currentUserId = tgUser.id;
}

function saveUser() {
    if(window.currentUserId) {
        localStorage.setItem(`br_user_${window.currentUserId}`, JSON.stringify(user));
        updateUI();
    }
}

// 3. UI Логика
function updateUI() {
    document.getElementById('user-balance').innerText = user.balance;
    document.getElementById('stats-opened').innerText = user.stats.opened;
    
    // Рендер истории
    const historyBox = document.getElementById('history-list');
    historyBox.innerHTML = user.history.map(h => `
        <div class="list-item">
            <span>${h.action}</span>
            <span class="${h.amount > 0 ? 'item-positive' : 'item-negative'}">
                ${h.amount > 0 ? '+' : ''}${h.amount} BC
            </span>
        </div>
    `).reverse().slice(0, 20).join(''); // Последние 20 действий

    // Рендер инвентаря
    const invBox = document.getElementById('inventory-list');
    invBox.innerHTML = user.inventory.map(item => `
        <div class="list-item">
            <span>${item.name}</span>
            <span style="color: gold;">${item.price} BC</span>
        </div>
    `).join('');
}

function switchTab(tabName) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 4. Логика Кейсов
function loadCases() {
    // Загрузка из админки или дефолтные
    let cases = JSON.parse(localStorage.getItem('br_cases'));
    if (!cases || cases.length === 0) {
        // Дефолтный кейс, если админ ничего не создал
        cases = [
            { id: 1, name: "Кейс Новичка", price: 500, img: "https://via.placeholder.com/80/333/fff?text=Start" },
            { id: 2, name: "Black Russia Elite", price: 2000, img: "https://via.placeholder.com/80/000/red?text=Elite" }
        ];
        localStorage.setItem('br_cases', JSON.stringify(cases));
    }

    const container = document.getElementById('cases-container');
    container.innerHTML = cases.map(c => `
        <div class="case-card" onclick="openCase(${c.id}, ${c.price}, '${c.name}')">
            <img src="${c.img}" class="case-img">
            <div class="case-title">${c.name}</div>
            <div class="case-price">${c.price} BC</div>
        </div>
    `).join('');
}

let currentWinItem = null;

function openCase(id, price, name) {
    if (user.balance < price) {
        tg.showAlert("Недостаточно средств!");
        return;
    }

    // Списание средств
    user.balance -= price;
    user.stats.opened++;
    user.history.push({ action: `Открыт ${name}`, amount: -price });
    saveUser();

    // Показываем модалку
    const modal = document.getElementById('open-modal');
    modal.style.display = 'flex';
    document.getElementById('win-display').style.display = 'none';
    document.getElementById('modal-title').innerText = "Крутим...";

    // Генерация рулетки
    const track = document.getElementById('roulette-track');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    
    // Генерируем возможные предметы (фейк дроп для демо)
    // В реальном проекте тут должен быть массив, привязанный к ID кейса
    const items = generateRandomItems(50); 
    
    // Выбираем выигрышный элемент (например, 45-й элемент)
    const winIndex = 40; 
    currentWinItem = items[winIndex];

    track.innerHTML = items.map(item => `
        <div class="roulette-item">
            <img src="https://via.placeholder.com/40?text=Item" style="border-radius:5px;">
            <span>${item.price}</span>
        </div>
    `).join('');

    // Запуск анимации (небольшая задержка чтобы CSS применился)
    setTimeout(() => {
        // Ширина итема 90px + бордеры. Сдвигаем так, чтобы 40-й элемент встал по центру
        // Центр контейнера (150px) - (40 * 90px)
        const itemWidth = 91; // 90px ширина + 1px бордер
        const offset = (winIndex * itemWidth) - (300 / 2) + (itemWidth / 2);
        
        // Добавляем немного рандома чтобы стрелка не всегда была ровно в центре
        const randomOffset = Math.floor(Math.random() * 40) - 20;

        track.style.transition = 'transform 4s cubic-bezier(0.1, 1, 0.3, 1)'; // Эффект замедления
        track.style.transform = `translateX(-${offset + randomOffset}px)`;
    }, 50);

    // Показ результата после анимации
    setTimeout(() => {
        showWin(currentWinItem);
    }, 4100);
}

function generateRandomItems(count) {
    const items = [];
    const names = ["BMW M5", "Lada Priora", "1000 BC", "Skin", "Exp", "Rubles"];
    for(let i=0; i<count; i++) {
        let val = Math.floor(Math.random() * 2000) + 100; // Цена предмета от 100 до 2100
        items.push({
            name: names[Math.floor(Math.random() * names.length)],
            price: val
        });
    }
    return items;
}

function showWin(item) {
    document.getElementById('win-display').style.display = 'block';
    document.getElementById('win-name').innerText = item.name;
    document.getElementById('win-price').innerText = item.price;
    document.getElementById('modal-title').innerText = "Успех!";
    
    // Вибрация телефона (функция ТГ)
    tg.HapticFeedback.notificationOccurred('success');
}

function closeModal() {
    if(currentWinItem) {
        // Если закрыли, значит забрали в инвентарь
        user.inventory.push(currentWinItem);
        // Не добавляем в баланс, предмет лежит вещью
        saveUser();
        currentWinItem = null;
    }
    document.getElementById('open-modal').style.display = 'none';
}

function sellItem() {
    if(currentWinItem) {
        user.balance += currentWinItem.price;
        user.history.push({ action: `Продажа ${currentWinItem.name}`, amount: currentWinItem.price });
        saveUser();
        currentWinItem = null;
    }
    document.getElementById('open-modal').style.display = 'none';
    tg.showAlert("Предмет продан!");
}

function addBalance(amount) {
    user.balance += amount;
    user.history.push({ action: "Пополнение", amount: amount });
    saveUser();
}