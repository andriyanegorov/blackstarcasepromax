const tg = window.Telegram.WebApp;
const CARD_WIDTH = 130; 

// ВСТАВЬ СЮДА СВОЮ ССЫЛКУ ИЗ GOOGLE DEPLOY
const API_URL = "https://script.google.com/macros/s/AKfycbwYU8UjWwpEFeqAkBLBeh4YYdQD1LAY2GvCLMwJRdd3ziyHJ611JrG_r1xs6nWJCEXJ/exec";

let user = { balance: 0, inventory: [], uid: 0 };
let paymentCheckInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    tg.expand();
    loadUser();
    initCases();
    updateUI();
});

function loadUser() {
    const saved = localStorage.getItem('br_user_data');
    if(saved) {
        user = JSON.parse(saved);
    } else {
        user.balance = 0;
        user.uid = Math.floor(100000 + Math.random() * 900000); 
        saveUser();
    }
}

function saveUser() {
    localStorage.setItem('br_user_data', JSON.stringify(user));
    updateUI();
}

function updateUI() {
    document.getElementById('user-balance').innerText = user.balance.toLocaleString();
    document.getElementById('header-uid').innerText = user.uid;
}

// РЕАЛЬНОЕ ПОПОЛНЕНИЕ
function initYooPayment(amount) {
    const label = `order_${user.uid}_${Date.now()}`;
    
    const params = new URLSearchParams({
        receiver: '4100117889685528',
        'quickpay-form': 'shop',
        targets: `Donate UID: ${user.uid}`,
        paymentType: 'AC',
        sum: amount,
        label: label
    });

    const paymentUrl = `https://yoomoney.ru/quickpay/confirm?${params.toString()}`;
    
    tg.openLink(paymentUrl); // Открываем оплату
    
    // Запускаем АВТОМАТИЧЕСКУЮ проверку без кнопок
    startAutoChecking(label, amount);
}

function startAutoChecking(label, amount) {
    const statusMsg = document.getElementById('payment-msg');
    if(statusMsg) statusMsg.innerText = "Ожидание оплаты (проверка каждые 5 сек)...";

    if (paymentCheckInterval) clearInterval(paymentCheckInterval);

    paymentCheckInterval = setInterval(() => {
        fetch(`${API_URL}?label=${label}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    clearInterval(paymentCheckInterval);
                    user.balance += amount;
                    saveUser();
                    tg.showAlert(`💳 Баланс пополнен на ${amount} ₽!`);
                    if(statusMsg) statusMsg.innerText = "Оплата принята!";
                }
            })
            .catch(err => console.log("Проверка еще не прошла..."));
    }, 5000); // Интервал 5 секунд
}

// --- КЕЙСЫ (ЦЕНА 15 РУБЛЕЙ) ---
function initCases() {
    cases = [
        { id: 1, name: "Бомж Старт", price: 15, img: "https://cdn-icons-png.flaticon.com/512/1995/1995493.png" },
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
        }, 150 + (ticks * 10)); 
        
        // Финиш
        setTimeout(() => {
            showWin(winItem);
        }, 6500);
        
    }, 100);
}

// Генератор предметов (зависит от цены кейса)
function getRandomItem(casePrice) {
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