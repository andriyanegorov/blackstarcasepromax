const tg = window.Telegram.WebApp;
const CARD_WIDTH = 130; 

// Твоя ссылка на Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbym7BZkWwdqkB8_yE6ynKaeYKtd8X833chIM6smbbUAs_85epS5W6bz2uBi0pcQBRqF/exec";

// Инициализация
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
    tg.expand();
    loadUser();
    initCases();
    updateUI();
    renderInventory();
});

function loadUser() {
    const saved = localStorage.getItem('br_user_data');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            user.balance = parsed.balance || 0;
            user.inventory = parsed.inventory || [];
        } catch (e) { console.error(e); }
    }

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const u = tg.initDataUnsafe.user;
        user.uid = u.id;
        user.name = u.first_name;
        user.avatar = u.photo_url; 
    } else {
        if (!user.uid || user.uid === 0) {
            user.uid = Math.floor(100000 + Math.random() * 900000);
            user.name = "Гость";
        }
    }
    saveUser();
}

function saveUser() {
    localStorage.setItem('br_user_data', JSON.stringify(user));
}

function updateUI() {
    const balEl = document.getElementById('user-balance');
    if(balEl) balEl.innerText = Math.floor(user.balance).toLocaleString(); // Округляем для красоты
    
    const nameEl = document.getElementById('header-name');
    if(nameEl) nameEl.innerText = user.name;

    const uidEl = document.getElementById('header-uid');
    if(uidEl) uidEl.innerText = user.uid;
    
    const avaEl = document.getElementById('header-avatar');
    if (avaEl && user.avatar) avaEl.src = user.avatar;

    // Модалка профиля
    const pBal = document.getElementById('profile-bal');
    if(pBal) pBal.innerText = user.balance + " ₽";
}

// --- ИСПРАВЛЕННАЯ ОПЛАТА ---
function initYooPayment(amount) {
    // 1. Создаем уникальную метку: UID + Время
    const label = `order_${user.uid}_${Date.now()}`;
    
    // 2. Параметры для ссылки
    const params = new URLSearchParams({
        receiver: '4100117889685528', // Твой кошелек
        'quickpay-form': 'shop',
        targets: `Пополнение баланса (UID: ${user.uid})`,
        paymentType: 'AC', // Банковская карта
        sum: amount,
        label: label // ОЧЕНЬ ВАЖНО: передаем метку, чтобы потом по ней найти платеж
    });

    const paymentUrl = `https://yoomoney.ru/quickpay/confirm?${params.toString()}`;
    
    // 3. Открываем ссылку
    tg.openLink(paymentUrl);
    
    // 4. Обновляем интерфейс
    const statusMsg = document.getElementById('payment-msg');
    if(statusMsg) {
        statusMsg.innerText = "Ожидание подтверждения банка...";
        statusMsg.style.color = "var(--gold)";
    }

    // 5. Запускаем проверку (Polling)
    if (paymentCheckInterval) clearInterval(paymentCheckInterval);
    
    let checksCount = 0;
    paymentCheckInterval = setInterval(async () => {
        checksCount++;
        // Перестаем проверять через 10 минут (120 проверок по 5 сек)
        if (checksCount > 120) {
            clearInterval(paymentCheckInterval);
            if(statusMsg) statusMsg.innerText = "Время ожидания истекло.";
            return;
        }

        try {
            // Запрос к Google Script: "Пришли ли деньги с меткой label?"
            const response = await fetch(`${API_URL}?label=${label}`);
            const data = await response.json();

            if (data.status === 'success') {
                // УРА! Деньги пришли
                clearInterval(paymentCheckInterval);
                
                // Начисляем реальную сумму из ответа (data.amount) или запрошенную
                const addedAmount = parseFloat(data.amount) || amount;
                user.balance += addedAmount;
                saveUser();
                updateUI();
                
                tg.showAlert(`Успешно! Баланс пополнен на ${addedAmount} ₽`);
                if(statusMsg) {
                    statusMsg.innerText = "Оплата прошла успешно!";
                    statusMsg.style.color = "#4CAF50";
                }
            }
        } catch (e) {
            console.error("Ошибка проверки:", e);
        }
    }, 5000); // Проверяем каждые 5 секунд
}

// --- ОСТАЛЬНОЙ КОД БЕЗ ИЗМЕНЕНИЙ (КЕЙСЫ, РУЛЕТКА) ---

function initCases() {
    cases = [
        { id: 1, name: "Бомжик", price: 15, img: "https://cdn-icons-png.flaticon.com/512/1995/1995493.png" },
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

function startRoulette() {
    if(user.balance < selectedCase.price) {
        return tg.showAlert("Недостаточно средств на балансе!");
    }
    user.balance -= selectedCase.price;
    saveUser();
    updateUI();
    closeModal('modal-preview');
    const modal = document.getElementById('modal-roulette');
    modal.style.display = 'flex';
    
    const track = document.getElementById('roulette-track');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0px)';
    
    const items = [];
    for(let i=0; i<100; i++) items.push(getRandomItem());
    
    const winIndex = 75;
    const winItem = items[winIndex];
    
    track.innerHTML = items.map(item => `
        <div class="roulette-card ${item.rarity}">
            <img src="${item.img}">
            <span>${item.name}</span>
        </div>
    `).join('');
    
    setTimeout(() => {
        const screenCenter = window.innerWidth / 2;
        const cardCenter = CARD_WIDTH / 2;
        const targetPos = (winIndex * CARD_WIDTH) - screenCenter + cardCenter;
        const randomOffset = Math.floor(Math.random() * 40) - 20;

        track.style.transition = 'transform 6s cubic-bezier(0.15, 0.85, 0.25, 1)';
        track.style.transform = `translateX(-${targetPos + randomOffset}px)`;
        
        document.getElementById('roulette-status').innerText = "КРУТИМ...";
        
        let ticks = 0;
        const interval = setInterval(() => {
            ticks++;
            if(ticks > 40) clearInterval(interval);
            tg.HapticFeedback.impactOccurred('light');
        }, 150 + (ticks * 5)); 
        
        setTimeout(() => {
            showWin(winItem);
        }, 6500);
    }, 100);
}

function getRandomItem() {
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
    updateUI(); 
    document.getElementById('modal-profile').style.display = 'flex';

}

