const tg = window.Telegram.WebApp;
const CARD_WIDTH = 130; // Ширина карточки (должна совпадать с CSS .roulette-card min-width)

// Состояние
let user = {
    balance: 0,
    inventory: [],
    uid: 100,
    history: []
};
let cases = [];
let selectedCase = null;

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram
    tg.expand();
    tg.setHeaderColor('#090909');
    tg.setBackgroundColor('#090909');
    
    loadUser();
    initCases();
    updateUI();
});

// --- User Data ---
function loadUser() {
    const saved = localStorage.getItem('br_user_data');
    if(saved) {
        user = JSON.parse(saved);
    } else {
        // Первый вход
        user.balance = 0;
        user.uid = Math.floor(100000 + Math.random() * 900000); 
        saveUser();
    }
    
    // UI Профиля
    const tgUser = tg.initDataUnsafe.user;
    if(tgUser) {
        document.getElementById('header-name').innerText = tgUser.first_name;
        document.getElementById('profile-id').innerText = tgUser.id;
        if(tgUser.photo_url) document.getElementById('header-avatar').src = tgUser.photo_url;
    }
}

function saveUser() {
    localStorage.setItem('br_user_data', JSON.stringify(user));
    updateUI();
}

function updateUI() {
    document.getElementById('user-balance').innerText = user.balance.toLocaleString();
    document.getElementById('header-uid').innerText = user.uid;
    document.getElementById('profile-bal').innerText = user.balance.toLocaleString() + ' ₽';
    document.getElementById('profile-uid').innerText = '#' + user.uid;
    
    // Инвентарь
    const grid = document.getElementById('inventory-grid');
    if(user.inventory.length === 0) {
        grid.innerHTML = '<div style="grid-column: span 2; color:#555; text-align:center; padding:20px;">Пусто...</div>';
    } else {
        grid.innerHTML = user.inventory.map(i => `
            <div class="case-card" style="padding:10px">
                <img src="${i.img}" class="case-img" style="height:50px">
                <div style="font-size:12px; font-weight:bold">${i.name}</div>
                <div style="font-size:10px; color:#888">${i.price} ₽</div>
            </div>
        `).join('');
    }
}

// URL твоего развернутого Google Script
const API_URL = "https://script.google.com/macros/s/AKfycbxchWD4KsXBbWrw-lMhxHUHOL6ZaI9Jf1AVeUNTQC7w5A1NgXKauLoNnF48S35noAfn/exec";

function checkPaymentStatus(orderId) {
    // Показываем лоадер
    tg.MainButton.showProgress();
    
    fetch(`${API_URL}?label=${orderId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                tg.showAlert("Оплата получена! Баланс пополнен.");
                // Тут логика начисления баланса (например, берем сумму из текущего окна оплаты)
                const amount = parseInt(document.getElementById('yoo-sum').value);
                user.balance += amount;
                saveUser();
                tg.MainButton.hideProgress();
            } else {
                tg.showAlert("Платеж еще не обработан. Попробуйте через минуту.");
                tg.MainButton.hideProgress();
            }
        })
        .catch(err => {
            console.error(err);
            tg.showAlert("Ошибка проверки. Обратитесь в поддержку.");
            tg.MainButton.hideProgress();
        });
}

// Изменим функцию в кнопке "Я оплатил"
function checkFakePayment() {
    const currentLabel = document.getElementById('yoo-label').value;
    if(!currentLabel) return tg.showAlert("Сначала создайте счет");
    checkPaymentStatus(currentLabel);
}

// --- Cases & Roulette ---
function initCases() {
    // Можно редактировать список кейсов тут
    cases = [
        { id: 1, name: "Бомж Старт", price: 100, img: "https://cdn-icons-png.flaticon.com/512/1995/1995493.png" },
        { id: 2, name: "Автокейс", price: 500, img: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png" },
        { id: 3, name: "Black Russia", price: 1500, img: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png" },
        { id: 4, name: "Олигарх", price: 5000, img: "https://cdn-icons-png.flaticon.com/512/2488/2488749.png" }
    ];
    
    const container = document.getElementById('cases-container');
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

function startRoulette() {
    if(user.balance < selectedCase.price) {
        return tg.showAlert("Недостаточно средств на балансе!");
    }
    
    // Списание
    user.balance -= selectedCase.price;
    saveUser();
    
    // UI переключение
    closeModal('modal-preview');
    const modal = document.getElementById('modal-roulette');
    modal.style.display = 'flex';
    
    const track = document.getElementById('roulette-track');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0px)';
    
    // Генерация предметов (100 шт)
    const items = [];
    for(let i=0; i<100; i++) items.push(getRandomItem(selectedCase.price));
    
    // Определяем выигрыш (на 75 позиции)
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
        const screenCenter = window.innerWidth / 2;
        const cardCenter = CARD_WIDTH / 2;
        
        // Считаем сдвиг: чтобы 75-й элемент встал по центру экрана
        // Формула: (Index * Width) - (HalfScreen) + (HalfCard)
        // Добавляем Random +/- 30px для реализма
        const randomOffset = Math.floor(Math.random() * 50) - 25;
        const targetPos = (winIndex * CARD_WIDTH) - screenCenter + cardCenter + randomOffset;
        
        track.style.transition = 'transform 6s cubic-bezier(0.15, 0.85, 0.25, 1)';
        track.style.transform = `translateX(-${targetPos}px)`;
        
        document.getElementById('roulette-status').innerText = "КРУТИМ...";
        
        // Вибрация (Haptic)
        let ticks = 0;
        const interval = setInterval(() => {
            ticks++;
            if(ticks > 30) clearInterval(interval);
            tg.HapticFeedback.impactOccurred('light');
        }, 150 + (ticks * 10)); // Увеличение интервала (замедление звука)
        
        // Финиш
        setTimeout(() => {
            showWin(winItem);
        }, 6500);
        
    }, 100);
}

// Генератор предметов (зависит от цены кейса)
function getRandomItem(casePrice) {
    // Шансы: чем дороже кейс, тем лучше дроп (простая логика)
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
    closeModal('modal-win');
}

// --- Utils ---
function switchTab(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('tab-'+id).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    if(id==='cases') document.querySelectorAll('.nav-btn')[0].classList.add('active');
    if(id==='shop') document.querySelectorAll('.nav-btn')[1].classList.add('active');
    if(id==='inventory') document.querySelectorAll('.nav-btn')[2].classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openProfileModal() {
    document.getElementById('modal-profile').style.display = 'flex';
}