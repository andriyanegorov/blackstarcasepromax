const tg = window.Telegram.WebApp;
let user = {
    balance: 0,
    inventory: [],
    history: [],
    uid: null,
    stats: { opened: 0 }
};

// Константы
const DB_PREFIX = 'br_user_';
const CASES_KEY = 'br_cases_data';
const GLOBAL_UID_KEY = 'br_global_uid_counter';

document.addEventListener('DOMContentLoaded', () => {
    // Проверка платформы (упрощенная)
    if (!tg.initDataUnsafe || Object.keys(tg.initDataUnsafe).length === 0) {
        // Тест в браузере
        document.body.style.overflow = 'auto'; // разрешить скролл для теста
        initUser({ id: 999999, first_name: "TestBrowser" });
    } else {
        tg.expand();
        tg.setHeaderColor('#0f0f0f'); // цвет хедера ТГ
        tg.setBackgroundColor('#0f0f0f');
        initUser(tg.initDataUnsafe.user);
    }

    loadCases();
    updateUI();
});

// --- ЛОГИКА ПОЛЬЗОВАТЕЛЯ ---

function initUser(tgUser) {
    window.currentTgId = tgUser.id;
    const saved = localStorage.getItem(DB_PREFIX + tgUser.id);
    
    if (saved) {
        user = JSON.parse(saved);
        // Миграция для старых пользователей без UID
        if (!user.uid) assignUid();
    } else {
        // Новый юзер
        user.balance = 0; // Бонус
        assignUid();
        saveUser();
    }
    
    // Обновляем шапку
    document.getElementById('header-name').innerText = tgUser.first_name || 'Игрок';
    document.getElementById('header-uid').innerText = user.uid;
    if(tgUser.photo_url) document.getElementById('header-avatar').src = tgUser.photo_url;
    
    // Заполняем профиль
    document.getElementById('profile-tg-id').innerText = tgUser.id;
    document.getElementById('profile-uid').innerText = '#' + user.uid;
}

function assignUid() {
    let globalCounter = parseInt(localStorage.getItem(GLOBAL_UID_KEY) || '100');
    user.uid = globalCounter;
    localStorage.setItem(GLOBAL_UID_KEY, globalCounter + 1);
}

function saveUser() {
    if (window.currentTgId) {
        localStorage.setItem(DB_PREFIX + window.currentTgId, JSON.stringify(user));
        updateUI();
    }
}

// --- UI ЛОГИКА ---

function updateUI() {
    // Баланс с анимацией чисел (упрощенно просто текст)
    document.getElementById('user-balance').innerText = user.balance.toLocaleString();
    document.getElementById('profile-balance').innerText = user.balance.toLocaleString() + ' BC';
    document.getElementById('profile-opened').innerText = user.stats.opened;

    // История в профиле
    const histBox = document.getElementById('profile-history');
    histBox.innerHTML = user.history.slice().reverse().slice(0, 10).map(h => `
        <div class="mini-history-item">
            ${h.action} <span style="float:right; color:${h.amount > 0 ? '#34c759':'#ff3b30'}">${h.amount > 0 ? '+':''}${h.amount}</span>
        </div>
    `).join('');

    // Инвентарь
    const invGrid = document.getElementById('inventory-grid');
    if(user.inventory.length === 0) {
        invGrid.innerHTML = '<p style="grid-column: span 2; text-align:center; color:#555;">Пусто</p>';
    } else {
        invGrid.innerHTML = user.inventory.map(item => `
            <div class="case-card" style="padding: 10px;">
                <img src="https://via.placeholder.com/60?text=Item" class="case-img" style="width:50px">
                <div class="case-title" style="font-size:12px">${item.name}</div>
                <div class="case-price">${item.price} BC</div>
            </div>
        `).join('');
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).classList.add('active');
    
    // Подсветка кнопки
    const btnIndex = ['cases', 'shop', 'inventory'].indexOf(tabId);
    if(btnIndex >= 0) {
        document.querySelectorAll('.nav-btn')[btnIndex].classList.add('active');
    }
}

// --- МОДАЛКИ ---

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openProfileModal() {
    document.getElementById('modal-profile').style.display = 'flex';
}

// --- ЛОГИКА КЕЙСОВ ---

let selectedCase = null;

function loadCases() {
    let cases = JSON.parse(localStorage.getItem(CASES_KEY));
    if (!cases || cases.length === 0) {
        cases = [
            { id: 1, name: "Start Pack", price: 500, img: "https://via.placeholder.com/150/333/fff?text=Start", desc: "Идеально для новичков. Шанс выбить Lada Priora." },
            { id: 2, name: "Elite Case", price: 2500, img: "https://via.placeholder.com/150/4a148c/fff?text=Elite", desc: "Только люксовые авто. Rolls Royce и BMW." },
            { id: 3, name: "Admin Case", price: 10000, img: "https://via.placeholder.com/150/b71c1c/fff?text=Admin", desc: "Самый дорогой кейс. Шанс получить админку (фейк)." }
        ];
        localStorage.setItem(CASES_KEY, JSON.stringify(cases));
    }

    const container = document.getElementById('cases-container');
    container.innerHTML = cases.map(c => `
        <div class="case-card" onclick="showCasePreview(${c.id})">
            <img src="${c.img}" class="case-img">
            <div class="case-title">${c.name}</div>
            <div class="case-price">${c.price} BC</div>
        </div>
    `).join('');
}

function showCasePreview(id) {
    const cases = JSON.parse(localStorage.getItem(CASES_KEY));
    selectedCase = cases.find(c => c.id === id);
    
    if(!selectedCase) return;

    document.getElementById('preview-img').src = selectedCase.img;
    document.getElementById('preview-title').innerText = selectedCase.name;
    document.getElementById('preview-desc').innerText = selectedCase.desc || "Описание отсутствует";
    document.getElementById('preview-price').innerText = selectedCase.price + " BC";
    
    // Привязываем кнопку открытия
    const btn = document.getElementById('btn-start-open');
    btn.onclick = () => startRoulette();
    
    document.getElementById('modal-preview').style.display = 'flex';
}

// --- РУЛЕТКА ---

let pendingItem = null;

function startRoulette() {
    if (user.balance < selectedCase.price) {
        tg.showAlert("Недостаточно средств! Пополните баланс.");
        return;
    }

    // Списание
    user.balance -= selectedCase.price;
    user.stats.opened++;
    user.history.push({ action: `Кейс: ${selectedCase.name}`, amount: -selectedCase.price });
    saveUser();
    updateUI();

    // Закрываем превью, открываем рулетку
    closeModal('modal-preview');
    const modal = document.getElementById('modal-roulette');
    modal.style.display = 'flex';

    // Генерируем ленту
    const strip = document.getElementById('roulette-strip');
    strip.style.transition = 'none';
    strip.style.transform = 'translateX(0)';
    
    const items = generateDrop(60); // 60 предметов
    const winIndex = 50; // Выигрыш на 50 позиции
    pendingItem = items[winIndex];

    strip.innerHTML = items.map(i => `
        <div class="roulette-item">
            <img src="https://via.placeholder.com/40?text=drop">
            <span style="font-size:10px; margin-top:5px; color:#aaa;">${i.price}</span>
        </div>
    `).join('');

    // Анимация
    setTimeout(() => {
        const itemWidth = 91; // 90px + 1px border
        // Центрирование: (индекс * ширина) - (половина экрана) + (половина предмета)
        // Ширина видимой области ~300px (зависит от CSS)
        const offset = (winIndex * itemWidth) - (document.querySelector('.roulette-window').clientWidth / 2) + (itemWidth / 2);
        const random = Math.floor(Math.random() * 40) - 20;

        strip.style.transition = 'transform 5s cubic-bezier(0.15, 0.9, 0.3, 1)';
        strip.style.transform = `translateX(-${offset + random}px)`;
        
        tg.HapticFeedback.impactOccurred('medium');
    }, 100);

    // Результат
    setTimeout(() => {
        showWinScreen(pendingItem);
    }, 5200);
}

function generateDrop(count) {
    const drops = [
        { name: "100 BC", price: 100 },
        { name: "Toyota Camry", price: 1500 },
        { name: "BMW M5 F90", price: 5000 },
        { name: "Exp x2", price: 50 },
        { name: "Skin: Bomzh", price: 10 },
        { name: "Lada Vesta", price: 400 }
    ];
    let res = [];
    for(let i=0; i<count; i++) res.push(drops[Math.floor(Math.random() * drops.length)]);
    return res;
}

function showWinScreen(item) {
    closeModal('modal-roulette');
    const winModal = document.getElementById('modal-win');
    
    document.getElementById('win-name').innerText = item.name;
    document.getElementById('win-sell-price').innerText = item.price;
    // document.getElementById('win-img').src = ... 
    
    winModal.style.display = 'flex';
    tg.HapticFeedback.notificationOccurred('success');
    
    // Эффект конфетти можно добавить сюда
}

function finishWin(keep) {
    if (!pendingItem) return;

    if (keep) {
        user.inventory.push(pendingItem);
    } else {
        user.balance += pendingItem.price;
        user.history.push({ action: `Продажа: ${pendingItem.name}`, amount: pendingItem.price });
    }
    
    saveUser();
    closeModal('modal-win');
    pendingItem = null;
}

// --- ПОПОЛНЕНИЕ (ИМИТАЦИЯ TELEGRAM STARS) ---

function buyCurrency(amount, stars) {
    // В реальном приложении здесь отправляется запрос на ваш сервер, 
    // который возвращает ссылку на инвойс (tg.openInvoice).
    
    tg.showConfirm(`Купить ${amount} BC за ${stars} Stars? (Тестовая оплата)`, (confirmed) => {
        if(confirmed) {
            // Имитация задержки обработки
            tg.MainButton.showProgress();
            tg.MainButton.setText("Обработка...");
            tg.MainButton.show();
            
            setTimeout(() => {
                user.balance += amount;
                user.history.push({ action: "Пополнение Stars", amount: amount });
                saveUser();
                
                tg.MainButton.hideProgress();
                tg.MainButton.hide();
                tg.showAlert(`Успешно! Начислено ${amount} BC.`);
            }, 1500);
        }
    });
}