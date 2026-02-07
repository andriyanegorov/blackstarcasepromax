const tg = window.Telegram.WebApp;
const CARD_WIDTH = 130; 

// Если у вас нет своего Google Script, оставьте это поле, но авто-проверка оплаты работать не будет
const API_URL = "https://script.google.com/macros/s/AKfycbwYU8UjWwpEFeqAkBLBeh4YYdQD1LAY2GvCLMwJRdd3ziyHJ611JrG_r1xs6nWJCEXJ/exec";

// Инициализация переменной user
let user = { 
    balance: 0, 
    inventory: [], 
    uid: 0, 
    name: "Гость", 
    avatar: "" 
};

let paymentCheckInterval = null;
let cases = [];
let selectedCase = null;

document.addEventListener('DOMContentLoaded', () => {
    tg.expand(); // Разворачиваем на весь экран
    
    // Сначала загружаем данные
    loadUser();
    
    // Потом инициализируем интерфейс
    initCases();
    updateUI();
    renderInventory();
});

// --- ГЛАВНАЯ ФУНКЦИЯ ЗАГРУЗКИ ПОЛЬЗОВАТЕЛЯ ---
function loadUser() {
    // 1. Сначала пытаемся достать сохраненные данные (баланс, инвентарь)
    const saved = localStorage.getItem('br_user_data');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Берем баланс и инвентарь из памяти
            user.balance = parsed.balance || 0;
            user.inventory = parsed.inventory || [];
        } catch (e) {
            console.error("Ошибка чтения сохранения", e);
        }
    }

    // 2. ВСЕГДА обновляем данные о личности из Telegram (если доступны)
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const u = tg.initDataUnsafe.user;
        user.uid = u.id;
        user.name = u.first_name + (u.last_name ? " " + u.last_name : "");
        user.avatar = u.photo_url; // Может быть undefined
        user.username = u.username;
    } else {
        // Если открыто в браузере (не в ТГ) и нет UID
        if (!user.uid || user.uid === 0) {
            user.uid = Math.floor(100000 + Math.random() * 900000);
            user.name = "Test User";
        }
    }

    // Сохраняем актуальные данные (например, обновилась аватарка)
    saveUser();
}

// --- ФУНКЦИЯ СОХРАНЕНИЯ (ЕЕ НЕ БЫЛО В ВАШЕМ КОДЕ) ---
function saveUser() {
    localStorage.setItem('br_user_data', JSON.stringify(user));
}

function updateUI() {
    // Баланс
    const balEl = document.getElementById('user-balance');
    if(balEl) balEl.innerText = user.balance.toLocaleString();
    
    // Шапка: Имя
    const nameEl = document.getElementById('header-name');
    if(nameEl) nameEl.innerText = user.name;

    // Шапка: UID
    const uidEl = document.getElementById('header-uid');
    if(uidEl) uidEl.innerText = user.uid;
    
    // Шапка: Аватар
    const avaEl = document.getElementById('header-avatar');
    if (avaEl) {
        if (user.avatar) {
            avaEl.src = user.avatar;
        } else {
            // Заглушка
            avaEl.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 
        }
    }

    // Модалка профиля
    const pId = document.getElementById('profile-id');
    const pUid = document.getElementById('profile-uid');
    const pBal = document.getElementById('profile-bal');
    
    if(pId) pId.innerText = user.name;
    if(pUid) pUid.innerText = user.uid;
    if(pBal) pBal.innerText = user.balance + " ₽";
}

// --- ОПЛАТА ---
function initYooPayment(amount) {
    const label = `order_${user.uid}_${Date.now()}`;
    
    const params = new URLSearchParams({
        receiver: '4100117889685528', // ВАШ КОШЕЛЕК
        'quickpay-form': 'shop',
        targets: `Donate UID: ${user.uid}`,
        paymentType: 'AC', // Bank card
        sum: amount,
        label: label
    });

    const paymentUrl = `https://yoomoney.ru/quickpay/confirm?${params.toString()}`;
    
    // Открываем ссылку средствами Телеграм
    tg.openLink(paymentUrl);
    
    const statusMsg = document.getElementById('payment-msg');
    if(statusMsg) statusMsg.innerText = "Ожидание оплаты... Нажмите кнопку ниже для теста.";
}

// Тестовая функция для "накрутки" баланса (для проверки)
function checkFakePayment() {
    user.balance += 1000;
    saveUser();
    updateUI();
    tg.showAlert("Демо-режим: Баланс пополнен на 1000р!");
}

// --- КЕЙСЫ ---
function initCases() {
    cases = [
        { id: 1, name: "Бомж Старт", price: 15, img: "https://cdn-icons-png.flaticon.com/512/1995/1995493.png" },
        { id: 2, name: "Автокейс", price: 500, img: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png" },
        { id: 3, name: "Black Russia", price: 1500, img: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png" },
        { id: 4, name: "Олигарх", price: 5000, img: "https://cdn-icons-png.flaticon.com/512/2488/2488749.png" }
    ];
    
    const container = document.getElementById('cases-container');
    if(!container) return;

    container.innerHTML = cases.map(c => `
        <div class="case-card" onclick="openPreview(${c.id})">
            <img src="${c.img}" class="case-img">
            <div style="font-weight:bold">${c.name}</div>
            <div style="color: var(--gold)">${c.price} ₽</div>
        </div>
    `).join('');
}

function openPreview(id) {
    selectedCase = cases.find(c => c.id === id);
    document.getElementById('preview-img').src = selectedCase.img;
    document.getElementById('preview-title').innerText = selectedCase.name;
    document.getElementById('preview-price').innerText = selectedCase.price + ' ₽';
    
    document.getElementById('btn-start-open').onclick = startRoulette;
    document.getElementById('modal-preview').style.display = 'flex';
}

// --- РУЛЕТКА ---
function startRoulette() {
    if(user.balance < selectedCase.price) {
        return tg.showAlert("Недостаточно средств на балансе!");
    }
    
    // Списание
    user.balance -= selectedCase.price;
    saveUser();
    updateUI(); // Обновляем баланс визуально сразу
    
    // UI переключение
    closeModal('modal-preview');
    const modal = document.getElementById('modal-roulette');
    modal.style.display = 'flex';
    
    const track = document.getElementById('roulette-track');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0px)';
    
    // Генерация предметов
    const items = [];
    for(let i=0; i<100; i++) items.push(getRandomItem());
    
    // Определяем выигрыш (на 75 позиции - фиксируем логику)
    const winIndex = 75;
    const winItem = items[winIndex];
    
    // Рендер
    track.innerHTML = items.map(item => `
        <div class="roulette-card ${item.rarity}">
            <img src="${item.img}">
            <span>${item.name}</span>
        </div>
    `).join('');
    
    // Старт анимации
    setTimeout(() => {
        // Вычисляем центр экрана
        const screenCenter = window.innerWidth / 2;
        // Центр карточки
        const cardCenter = CARD_WIDTH / 2;
        
        // Считаем позицию. 
        // Нам нужно, чтобы (winIndex * CARD_WIDTH) оказался по центру экрана.
        // Формула: (ПозицияЭлемента) - (ПоловинаЭкрана) + (ПоловинаКарточки)
        const targetPos = (winIndex * CARD_WIDTH) - screenCenter + cardCenter;
        
        // Добавляем небольшой рандомный сдвиг внутри карточки (+- 20px), чтобы не всегда ровно по центру
        const randomOffset = Math.floor(Math.random() * 40) - 20;

        track.style.transition = 'transform 6s cubic-bezier(0.15, 0.85, 0.25, 1)';
        track.style.transform = `translateX(-${targetPos + randomOffset}px)`;
        
        document.getElementById('roulette-status').innerText = "КРУТИМ...";
        
        // Вибрация
        let ticks = 0;
        const interval = setInterval(() => {
            ticks++;
            if(ticks > 40) clearInterval(interval);
            tg.HapticFeedback.impactOccurred('light');
        }, 150 + (ticks * 5)); 
        
        // Финиш
        setTimeout(() => {
            showWin(winItem);
        }, 6500);
        
    }, 100);
}

function getRandomItem() {
    // Список предметов. Можно сделать разным для разных кейсов
    const items = [
        { name: "BMW M5 F90", price: 5000, img: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png", rarity: "rarity-legendary" },
        { name: "Lada Priora", price: 200, img: "https://cdn-icons-png.flaticon.com/512/1995/1995493.png", rarity: "rarity-common" },
        { name: "Mercedes G63", price: 3000, img: "https://cdn-icons-png.flaticon.com/512/741/741407.png", rarity: "rarity-rare" },
        { name: "1000 Руб", price: 1000, img: "https://cdn-icons-png.flaticon.com/512/2488/2488749.png", rarity: "rarity-rare" },
        { name: "Exp x2", price: 50, img: "https://cdn-icons-png.flaticon.com/512/9630/9630650.png", rarity: "rarity-common" },
        { name: "Skin: Bomzh", price: 20, img: "https://cdn-icons-png.flaticon.com/512/4825/4825038.png", rarity: "rarity-common" }
    ];
    return items[Math.floor(Math.random() * items.length)];
}

let currentWin = null;
function showWin(item) {
    currentWin = item;
    document.getElementById('modal-roulette').style.display = 'none';
    const winModal = document.getElementById('modal-win');
    
    document.getElementById('win-name').innerText = item.name;
    document.getElementById('win-sell-price').innerText = item.price;
    document.getElementById('win-img').src = item.img;
    
    winModal.style.display = 'flex';
    tg.HapticFeedback.notificationOccurred('success');
}

function finishWin(keep) {
    if(keep) {
        user.inventory.push(currentWin);
    } else {
        user.balance += currentWin.price;
    }
    saveUser();
    updateUI();
    renderInventory();
    closeModal('modal-win');
}

function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    const emptyMsg = document.getElementById('empty-inventory');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (user.inventory.length === 0) {
        if(emptyMsg) emptyMsg.style.display = 'block';
    } else {
        if(emptyMsg) emptyMsg.style.display = 'none';
        user.inventory.forEach(item => {
            grid.innerHTML += `
                <div class="shop-card" style="padding:10px;">
                    <img src="${item.img}" style="width:50px; height:30px; object-fit:contain;">
                    <div style="font-size:12px; font-weight:bold;">${item.name}</div>
                    <div style="font-size:10px; color:#888;">${item.price} ₽</div>
                </div>
            `;
        });
    }
}

// --- УТИЛИТЫ ---
function switchTab(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('tab-'+id).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // Простая логика подсветки
    if(id==='cases') document.querySelectorAll('.nav-btn')[0].classList.add('active');
    if(id==='shop') document.querySelectorAll('.nav-btn')[1].classList.add('active');
    if(id==='inventory') document.querySelectorAll('.nav-btn')[2].classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openProfileModal() {
    updateUI(); // Обновляем данные перед открытием
    document.getElementById('modal-profile').style.display = 'flex';
}