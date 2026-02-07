const tg = window.Telegram.WebApp;
const CARD_WIDTH = 134; 

const API_URL = "https://script.google.com/macros/s/AKfycbym7BZkWwdqkB8_yE6ynKaeYKtd8X833chIM6smbbUAs_85epS5W6bz2uBi0pcQBRqF/exec";

/* ==============================================
   КОНФИГУРАЦИЯ
   ============================================== */
const GAME_CONFIG = [
    {
        "id": 1,
        "name": "Бомж Старт",
        "price": 29,
        "img": "https://i.imgur.com/9EkONxH.png",
        "items": [
            { "name": "50.000 Вирт", "price": 20, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "consumer" },
            { "name": "150.000 Вирт", "price": 75, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "common" },
            { "name": "400.000 Вирт", "price": 200, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "epic" },
            { "name": "1.000.000 Вирт", "price": 500, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "legendary" },
            { "name": "Очки «Сердечки» ", "price": 500, "img": "https://i.imgur.com/xHQRwx0.png", "rarity": "legendary" },
            { "name": "Серый кейс", "price": 500, "img": "https://i.imgur.com/OGcHP9b.png", "rarity": "legendary" },
            { "name": "Маска Дали", "price": 70, "img": "https://i.imgur.com/K0JsEMU.png", "rarity": "rare" },
            { "name": "Очки «Street» ", "price": 19, "img": "https://i.imgur.com/XARdxZn.png", "rarity": "consumer" },
            { "name": "Скин «Емеля»", "price": 300, "img": "https://i.imgur.com/goOf1rc.png", "rarity": "epic" },
            { "name": "Скин «Пузатый»", "price": 10, "img": "https://i.imgur.com/2LVGLzg.png", "rarity": "consumer" },
            { "name": "Набор «Сельчанин»", "price": 70, "img": "https://i.imgur.com/1pJCoj9.png", "rarity": "rare" },
            { "name": "Набор «Бандит»", "price": 650, "img": "https://i.imgur.com/sBOIGql.png", "rarity": "legendary" },
            { "name": "ZAZ", "price": 15, "img": "https://i.imgur.com/z0hrLCJ.png", "rarity": "consumer" },
            { "name": "VAZ 2107", "price": 30, "img": "https://i.imgur.com/Ay8kPfF.png", "rarity": "common" },
            { "name": "LADA NIVA", "price": 80, "img": "https://i.imgur.com/VDTY224.png", "rarity": "rare" },
            { "name": "LADA VESTA", "price": 175, "img": "https://i.imgur.com/MxZVdD9.png", "rarity": "epic" },
            { "name": "Mercedes-Benz W211", "price": 300, "img": "https://i.imgur.com/xFhwl3m.png", "rarity": "legendary" },
            { "name": "10 BC", "price": 10, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "consumer" },
            { "name": "25 BC", "price": 25, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "consumer" },
            { "name": "50 BC", "price": 50, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "common" },
            { "name": "500 BC", "price": 500, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "legendary" },
            { "name": "Аптечка", "price": 7, "img": "https://i.imgur.com/4I6uqi4.png", "rarity": "consumer" },
            { "name": "Ремонтный набор", "price": 7, "img": "https://i.imgur.com/0ncZmAy.png", "rarity": "consumer" },
            { "name": "Скутер", "price": 15, "img": "https://i.imgur.com/5N2komM.png", "rarity": "consumer" }
        ]
    }
];

let user = { 
    balance: 0, 
    inventory: [], 
    uid: 0, 
    name: "Гость", 
    avatar: "",
    history: [] // История операций
};

let paymentCheckInterval = null;
let selectedCase = null;
let currentWin = null;
let selectedInventoryIndex = null; 

document.addEventListener('DOMContentLoaded', () => {
    tg.expand();
    loadUser();
    initCases();
    updateUI();
    renderInventory();
});

// --- СИСТЕМА ДАННЫХ ---
function loadUser() {
    const saved = localStorage.getItem('br_user_data_v2'); 
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            user = { ...user, ...parsed };
            if(!user.history) user.history = [];
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
            user.name = "Test User";
        }
    }
    saveUser();
}

function saveUser() {
    localStorage.setItem('br_user_data_v2', JSON.stringify(user));
}

function addHistory(type, text, val) {
    user.history.unshift({
        type: type,
        text: text,
        val: val,
        date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    if(user.history.length > 30) user.history.pop();
    saveUser();
}

function updateUI() {
    const balEl = document.getElementById('user-balance');
    if(balEl) balEl.innerText = Math.floor(user.balance).toLocaleString();
    
    const nameEl = document.getElementById('header-name');
    if(nameEl) nameEl.innerText = user.name;

    const uidEl = document.getElementById('header-uid');
    if(uidEl) uidEl.innerText = user.uid;
    
    const avaEl = document.getElementById('header-avatar');
    if (avaEl && user.avatar) avaEl.src = user.avatar;

    const pBal = document.getElementById('profile-bal');
    if(pBal) pBal.innerText = user.balance + " ₽";
}

function addTestMoney() {
    user.balance += 5000;
    addHistory('balance', 'Тест. пополнение', '+5000');
    saveUser();
    updateUI();
    tg.showAlert("Выдано 5000 ₽");
}

// --- КЕЙСЫ ---
function initCases() {
    const container = document.getElementById('cases-container');
    if(!container) return;
    container.innerHTML = GAME_CONFIG.map(c => `
        <div class="case-card" onclick="openPreview(${c.id})">
            <img src="${c.img}" class="case-img">
            <div style="font-weight:bold">${c.name}</div>
            <div style="color: var(--gold)">${c.price} ₽</div>
        </div>
    `).join('');
}

function openPreview(id) {
    selectedCase = GAME_CONFIG.find(c => c.id === id);
    if (!selectedCase) return;

    document.getElementById('preview-img').src = selectedCase.img;
    document.getElementById('preview-title').innerText = selectedCase.name;
    document.getElementById('preview-price').innerText = selectedCase.price + ' ₽';
    
    const itemsContainer = document.getElementById('preview-items-container');
    itemsContainer.innerHTML = ''; 

    const sortedItems = [...selectedCase.items].sort((a, b) => {
        const rarityOrder = { 'legendary': 1, 'epic': 2, 'rare': 3, 'common': 4, 'consumer': 5 };
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });

    sortedItems.forEach(item => {
        itemsContainer.innerHTML += `
            <div class="preview-item rarity-${item.rarity}">
                <img src="${item.img}">
                <div class="p-name">${item.name}</div>
                <div class="p-price">${item.price} ₽</div>
            </div>
        `;
    });

    document.getElementById('btn-start-open').onclick = startRoulette;
    document.getElementById('modal-preview').style.display = 'flex';
}

// --- РУЛЕТКА ---
function startRoulette() {
    if(user.balance < selectedCase.price) {
        return tg.showAlert("Недостаточно средств!");
    }
    
    user.balance -= selectedCase.price;
    addHistory('case', `Открытие: ${selectedCase.name}`, `-${selectedCase.price}`);
    saveUser();
    updateUI();
    closeModal('modal-preview');
    
    document.getElementById('blur-container').classList.add('app-blurred');
    document.getElementById('modal-roulette').style.display = 'flex';
    
    const track = document.getElementById('roulette-track');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0px)';
    
    const items = [];
    for(let i=0; i<95; i++) items.push(getRandomItemFromCase(selectedCase));
    
    const winItem = getWeightedWinItem(selectedCase);
    const winIndex = 75; 
    items[winIndex] = winItem;
    currentWin = winItem;

    track.innerHTML = items.map(item => `
        <div class="roulette-card rarity-${item.rarity}">
            <img src="${item.img}">
            <span>${item.name}</span>
        </div>
    `).join('');
    
    setTimeout(() => {
        const screenCenter = window.innerWidth / 2;
        const cardCenterOffset = CARD_WIDTH / 2;
        const winCardCenterPos = (winIndex * CARD_WIDTH) + cardCenterOffset;
        const targetTranslate = winCardCenterPos - screenCenter;
        const randomOffset = (Math.random() * 20) - 10;

        track.style.transition = 'transform 6s cubic-bezier(0.1, 1, 0.3, 1)'; 
        track.style.transform = `translateX(-${targetTranslate + randomOffset}px)`;
        
        document.getElementById('roulette-status').innerText = "КРУТИМ...";
        
        let ticks = 0;
        const interval = setInterval(() => {
            ticks++;
            if(ticks > 50) clearInterval(interval);
            tg.HapticFeedback.impactOccurred('soft');
        }, 100 + (ticks * 5)); 
        
        setTimeout(() => {
            showWin(winItem);
        }, 6500);
    }, 100);
}

function getRandomItemFromCase(c) {
    if(c.items.length === 0) return { name: "?", img: "", rarity: "consumer" };
    return c.items[Math.floor(Math.random() * c.items.length)];
}

function getWeightedWinItem(c) {
    const rand = Math.random() * 100; 
    let currentRarity = 'consumer';
    if (rand < 60) currentRarity = 'consumer';
    else if (rand < 80) currentRarity = 'common';
    else if (rand < 91) currentRarity = 'rare';
    else if (rand < 99) currentRarity = 'epic';
    else currentRarity = 'legendary';

    let pool = c.items.filter(item => item.rarity === currentRarity);
    if (pool.length === 0) pool = c.items; 
    return pool[Math.floor(Math.random() * pool.length)];
}

function showWin(item) {
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
        addHistory('drop', `Выпало: ${currentWin.name}`, 'В гараж');
    } else {
        user.balance += currentWin.price;
        addHistory('sell', `Продажа: ${currentWin.name}`, `+${currentWin.price}`);
    }
    saveUser();
    updateUI();
    renderInventory();
    
    document.getElementById('blur-container').classList.remove('app-blurred');
    closeModal('modal-win');
}

// --- ИНВЕНТАРЬ ---
function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    const emptyMsg = document.getElementById('empty-inventory');
    const btnSellAll = document.getElementById('btn-sell-all');

    if (!grid) return;
    grid.innerHTML = '';
    
    if (user.inventory.length === 0) {
        if(emptyMsg) emptyMsg.style.display = 'block';
        if(btnSellAll) btnSellAll.style.display = 'none';
    } else {
        if(emptyMsg) emptyMsg.style.display = 'none';
        if(btnSellAll) btnSellAll.style.display = 'block';
        
        user.inventory.forEach((item, index) => {
            grid.innerHTML += `
                <div class="shop-card rarity-${item.rarity}" onclick="openInventoryItem(${index})" style="padding:10px; border:1px solid rgba(255,255,255,0.1); cursor: pointer;">
                    <img src="${item.img}" style="width:50px; height:30px; object-fit:contain;">
                    <div style="font-size:12px; font-weight:bold;">${item.name}</div>
                    <div style="font-size:10px; color:#888;">${item.price} ₽</div>
                </div>
            `;
        });
    }
}

function openInventoryItem(index) {
    selectedInventoryIndex = index;
    const item = user.inventory[index];
    if(!item) return;

    document.getElementById('inv-item-img').src = item.img;
    document.getElementById('inv-item-name').innerText = item.name;
    document.getElementById('inv-item-price').innerText = item.price;
    document.getElementById('sell-btn-price').innerText = item.price;

    document.getElementById('modal-inventory-action').style.display = 'flex';
}

function sellCurrentItem() {
    if (selectedInventoryIndex === null) return;
    const item = user.inventory[selectedInventoryIndex];
    
    user.balance += item.price;
    addHistory('sell', `Продажа: ${item.name}`, `+${item.price}`);
    user.inventory.splice(selectedInventoryIndex, 1);
    
    saveUser();
    updateUI();
    renderInventory();
    
    closeModal('modal-inventory-action');
    tg.showAlert(`Продано за ${item.price} ₽`);
}

function sellAllItems() {
    if (user.inventory.length === 0) return;
    
    if(!confirm("Точно продать весь гараж?")) return;

    let totalSum = 0;
    user.inventory.forEach(item => totalSum += item.price);

    user.balance += totalSum;
    user.inventory = [];
    
    addHistory('sell', 'Продажа всего гаража', `+${totalSum}`);
    saveUser();
    updateUI();
    renderInventory();
    
    tg.showAlert(`Весь гараж продан за ${totalSum} ₽`);
    tg.HapticFeedback.notificationOccurred('success');
}

function withdrawCurrentItem() {
    tg.showAlert("Вывод предметов временно недоступен (Тех. работы)");
}

// --- ОСТАЛЬНОЕ ---
function switchTab(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('tab-'+id).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const navs = document.querySelectorAll('.nav-btn');
    if(id==='cases' && navs[0]) navs[0].classList.add('active');
    if(id==='shop' && navs[1]) navs[1].classList.add('active');
    if(id==='inventory' && navs[2]) navs[2].classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openProfileModal() {
    updateUI();
    document.getElementById('profile-id').innerText = user.name;
    document.getElementById('profile-uid').innerText = user.uid;
    
    const histList = document.getElementById('history-list');
    if(histList) {
        if(user.history.length === 0) {
            histList.innerHTML = '<div style="color:#555; text-align:center; padding:10px;">Истории нет</div>';
        } else {
            histList.innerHTML = user.history.map(h => {
                const valClass = h.val.includes('+') ? 'plus' : (h.val.includes('-') ? 'minus' : '');
                return `
                <div class="history-item">
                    <div style="flex:1;">
                        <span class="h-type">[${h.date}]</span> 
                        <span style="color:#ccc">${h.text}</span>
                    </div>
                    <div class="h-val ${valClass}">${h.val}</div>
                </div>`;
            }).join('');
        }
    }

    document.getElementById('modal-profile').style.display = 'flex';
}

// --- ОПЛАТА ---
function initYooPayment(amount) {
    const label = `order_${user.uid}_${Date.now()}`;
    const params = new URLSearchParams({
        receiver: '4100117889685528', 
        'quickpay-form': 'shop',
        targets: `Пополнение (UID: ${user.uid})`,
        paymentType: 'AC', 
        sum: amount,
        label: label
    });
    const paymentUrl = `https://yoomoney.ru/quickpay/confirm?${params.toString()}`;
    tg.openLink(paymentUrl);
    
    const statusMsg = document.getElementById('payment-msg');
    if(statusMsg) {
        statusMsg.innerText = "Ожидание банка...";
        statusMsg.style.color = "var(--gold)";
    }

    if (paymentCheckInterval) clearInterval(paymentCheckInterval);
    
    let checksCount = 0;
    paymentCheckInterval = setInterval(async () => {
        checksCount++;
        if (checksCount > 120) {
            clearInterval(paymentCheckInterval);
            if(statusMsg) statusMsg.innerText = "Тайм-аут ожидания.";
            return;
        }
        try {
            const response = await fetch(`${API_URL}?label=${label}`);
            const data = await response.json();
            if (data.status === 'success') {
                clearInterval(paymentCheckInterval);
                const addedAmount = parseFloat(data.amount) || amount;
                user.balance += addedAmount;
                addHistory('balance', 'Пополнение', `+${addedAmount}`);
                saveUser();
                updateUI();
                tg.showAlert(`Баланс пополнен на ${addedAmount} ₽`);
                if(statusMsg) {
                    statusMsg.innerText = "Успешно!";
                    statusMsg.style.color = "#4CAF50";
                }
            }
        } catch (e) {
            console.error("Payment check error:", e);
        }
    }, 5000); 
}