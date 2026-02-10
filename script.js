/* ==============================================
   ЗАЩИТА ОТ КОПИРОВАНИЯ ИЗОБРАЖЕНИЙ (ОТКЛЮЧЕНО ДЛЯ ОТЛАДКИ)
   ============================================== */
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.addEventListener('dragstart', event => event.preventDefault());

const tg = window.Telegram.WebApp;
const API_URL = "https://script.google.com/macros/s/AKfycbym7BZkWwdqkB8_yE6ynKaeYKtd8X833chIM6smbbUAs_85epS5W6bz2uBi0pcQBRqF/exec";
const BOT_TOKEN = "8555487401:AAFWK-AOovV9DbnKW62ZAVIvEJWAtung05Y";
const CHAT_ID = "@blackrussiacases_news"; 
const CHANNEL_URL = "https://t.me/blackrussiacases_news"; 
const TOPICS = { WITHDRAW: 2, DEPOSIT: 4, LOGS: 8 };

const PLACEHOLDER_IMG = "https://placehold.co/150x150/1a1a1a/ffffff?text=No+Image";

const VIRT_RATE = 10000; 
function getVirtPrice(rub) { return (rub * VIRT_RATE).toLocaleString() + ' Вирт'; }

const RARITY_VALS = { 'consumer': 1, 'common': 2, 'rare': 3, 'epic': 4, 'legendary': 5, 'mythical': 6 };
const RARITY_COLORS = { 'consumer': '#B0B0B0', 'common': '#4CAF50', 'rare': '#3b82f6', 'epic': '#a855f7', 'legendary': '#eab308', 'mythical': '#ff3333' };

/* ==============================================
   КОНФИГУРАЦИЯ
   ============================================== */
let GAME_CONFIG = [
    {
        "id": "sub_case_1",
        "name": "Раз в ДВА ДНЯ! (За подписку)",
        "price": 0,
        "category": "free",
        "img": "img/free_case.png",
        "chances": { "consumer": 60, "common": 20, "rare": 11, "epic": 8, "legendary": 1, "mythical": 0 },
        "items": [
            { "name": "50.000 Вирт", "price": 5, "img": "img/money.png", "rarity": "consumer" },
            { "name": "100.000 Вирт", "price": 10, "img": "img/money.png", "rarity": "common" },
            { "name": "BMW M5 F90", "price": 400, "img": "img/m5f90.png", "rarity": "legendary" },
            { "name": "Маска Демона", "price": 150, "img": "img/demon.png", "rarity": "epic" },
            { "name": "Аптечка", "price": 7, "img": "img/aptechka.png", "rarity": "consumer" },
            { "name": "10 BC", "price": 10, "img": "img/bc.png", "rarity": "common" }
        ]
    }
    // ... остальные кейсы подгрузятся из админки или останутся в localStorage
];

let PROMO_CODES = [
    { "code": "ADMINKAADMINKAADMINKA", "val": 1000, "limit": 0 },
    { "code": "BRCASES", "val": 50, "limit": 1 },
    { "code": "FREE", "val": 20, "limit": 1 }
];


// --- STATE ---
const STORAGE_KEY = 'br_user_data_v6_fixed'; // Изменил версию ключа для сброса багов
const DEFAULT_USER = { 
    balance: 0, 
    inventory: [], 
    uid: 0, 
    name: "Гость", 
    tgUsername: "", 
    gameNick: "", 
    gameServer: "Red", 
    bankAccount: "", 
    avatar: "", 
    history: [], 
    activatedPromos: [],
    lastSubCaseTime: 0,
    isSubscribed: false // Новое поле для фикса
};

let user = { ...DEFAULT_USER };

let paymentCheckInterval = null;
let selectedCase = null;
let currentWins = []; 
let selectedOpenCount = 1; 
let selectedInventoryIndex = null; 
let upgradeState = { sourceIdx: null, targetItem: null, chance: 50 };
let ALL_ITEMS_POOL = [];

/* ==============================================
   INIT
   ============================================== */
window.onerror = function(msg, url, line) {
    if (url && url.includes('script.js')) {
        console.error("Script Error in script.js:", msg);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    try { 
        if(window.Telegram && window.Telegram.WebApp) {
            tg.expand(); 
        }
    } catch(e) {}
    
    loadExternalConfig(); 
    initCases(); 
    flattenItems();
    initUserSession();
});

function initUserSession() {
    if (tg && tg.CloudStorage) {
        tg.CloudStorage.getItem(STORAGE_KEY, (err, value) => {
            if (!err && value) {
                try {
                    const cloudData = JSON.parse(value);
                    user = { ...DEFAULT_USER, ...cloudData };
                    user.balance = Number(user.balance);
                    console.log("Loaded from CloudStorage");
                } catch (e) {
                    loadFromLocal();
                }
            } else {
                loadFromLocal();
            }
            finalizeInit();
        });
    } else {
        loadFromLocal();
        finalizeInit();
    }
}

function loadFromLocal() {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
        try {
            user = { ...DEFAULT_USER, ...JSON.parse(localData) };
            user.balance = Number(user.balance); 
            if(isNaN(user.balance)) user.balance = 0;
            saveUser(); 
        } catch(e) {
            user = { ...DEFAULT_USER };
        }
    } else {
        user = { ...DEFAULT_USER };
    }
}

function finalizeInit() {
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) { 
        user.uid = tg.initDataUnsafe.user.id; 
        user.name = tg.initDataUnsafe.user.first_name || "Игрок"; 
        user.tgUsername = tg.initDataUnsafe.user.username ? `@${tg.initDataUnsafe.user.username}` : "Нет";
        if(tg.initDataUnsafe.user.photo_url) user.avatar = tg.initDataUnsafe.user.photo_url; 
    } else if (user.uid === 0) {
        user.uid = Math.floor(100000 + Math.random() * 900000);
        user.tgUsername = "@guest";
    }
    
    saveUser();
    updateUI(); 
    renderInventory(); 
    renderHistory();
}

function saveUser() { 
    const dataStr = JSON.stringify(user);
    localStorage.setItem(STORAGE_KEY, dataStr); 
    if (tg && tg.CloudStorage) {
        tg.CloudStorage.setItem(STORAGE_KEY, dataStr, (err, saved) => {
            if (err) console.error("Cloud Save Error:", err);
        });
    }
}

function loadExternalConfig() {
    const adminCases = localStorage.getItem('admin_game_config_v7');
    const adminPromos = localStorage.getItem('admin_promo_config_v3');
    
    if(adminCases) { 
        try { 
            const parsed = JSON.parse(adminCases); 
            if(Array.isArray(parsed) && parsed.length > 0) {
                GAME_CONFIG = parsed; 
                // Убедимся, что бесплатный кейс есть
                const hasFree = GAME_CONFIG.find(c => c.category === 'free');
                if(!hasFree) {
                     // Если удалили, добавляем дефолтный
                     const hardcodedFree = [{
                        "id": "sub_case_1",
                        "name": "Ежедневный (За подписку)",
                        "price": 0,
                        "category": "free",
                        "img": "img/case_daily.png",
                        "chances": { "consumer": 40, "common": 30, "rare": 20, "epic": 8, "legendary": 2, "mythical": 0 },
                        "items": [
                             { "name": "50.000 Вирт", "price": 5, "img": "img/virt_50k.png", "rarity": "consumer" },
                             { "name": "BMW M5 F90", "price": 400, "img": "img/bmw_m5_f90.png", "rarity": "legendary" }
                        ]
                    }];
                     GAME_CONFIG = hardcodedFree.concat(GAME_CONFIG);
                }
            }
        } catch(e){} 
    }
    
    if(adminPromos) { try { PROMO_CODES = JSON.parse(adminPromos); } catch(e){} }
}

async function sendTelegramLog(topicId, text) {
    if (!BOT_TOKEN || !CHAT_ID) return;
    try { await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: CHAT_ID, message_thread_id: topicId, text: text, parse_mode: "HTML" }) }); } catch (e) {}
}

function safeAlert(msg) { if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg); }
function safeHaptic(type) { try { if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(type); } catch (e) {} }

function addHistory(text, val) { const color = val.includes('+') ? '#4CAF50' : '#ff4d4d'; user.history.unshift({ text, val, color }); if(user.history.length > 30) user.history.pop(); saveUser(); renderHistory(); }
function updateUI() { document.getElementById('user-balance').innerText = Math.floor(user.balance).toLocaleString(); document.getElementById('header-name').innerText = user.gameNick || user.name; document.getElementById('header-uid').innerText = user.uid; if (user.avatar) document.getElementById('header-avatar').src = user.avatar; document.getElementById('profile-bal').innerText = Math.floor(user.balance).toLocaleString() + " ₽"; document.getElementById('profile-uid').innerText = user.uid; }

function initCases() { 
    try {
        const cats = { 'free': 'cases-free', 'default': 'cases-default', 'bundles': 'cases-bundles', 'risk': 'cases-risk' }; 
        for (let c in cats) { 
            const el = document.getElementById(cats[c]); 
            if(el) el.innerHTML = ''; 
        } 

        GAME_CONFIG.forEach(c => { 
            let targetId = cats[c.category];
            if (!targetId || !document.getElementById(targetId)) targetId = 'cases-default';

            const div = document.getElementById(targetId); 
            if (div) { 
                div.innerHTML += `<div class="case-card" onclick="openPreview('${c.id}')"><img src="${c.img}" class="case-img" onerror="this.src='${PLACEHOLDER_IMG}'"><div>${c.name}</div><div>${c.price} ₽</div></div>`; 
            } 
        }); 
    } catch(e) {
        console.error("Error creating cases:", e);
    }
}

/* --- ИСПРАВЛЕННАЯ ЛОГИКА ОТКРЫТИЯ И ПОДПИСКИ --- */
let countdownInterval = null;

function openPreview(id) { 
    try {
        selectedCase = GAME_CONFIG.find(c => c.id == id); 
        if (!selectedCase) return; 

        const btnOpen = document.getElementById('btn-open-case');
        const timerDiv = document.getElementById('sub-timer');
        const subBtn = document.getElementById('btn-sub-check');
        const qtySel = document.getElementById('qty-selector');
        
        // Сброс UI
        btnOpen.style.display = 'block';
        btnOpen.innerHTML = `ОТКРЫТЬ ЗА <span id="btn-total-price">${selectedCase.price}</span> ₽`;
        btnOpen.disabled = false;
        subBtn.style.display = 'none';
        timerDiv.style.display = 'none';
        qtySel.style.display = 'flex';

        if(countdownInterval) clearInterval(countdownInterval);

        setOpenCount(1);
        
        document.getElementById('preview-img').src = selectedCase.img; 
        document.getElementById('preview-title').innerText = selectedCase.name; 
        document.getElementById('preview-price').innerText = selectedCase.price + " ₽"; 

        // ЛОГИКА БЕСПЛАТНОГО КЕЙСА
        if(selectedCase.category === 'free') {
            qtySel.style.display = 'none'; // Всегда x1
            
            // 1. Проверяем Кулдаун (Время)
            const COOLDOWN = 48 * 60 * 60 * 1000; 
            const now = Date.now();
            const diff = now - (user.lastSubCaseTime || 0);

            if(user.lastSubCaseTime > 0 && diff < COOLDOWN) {
                // Таймер
                btnOpen.style.display = 'none';
                timerDiv.style.display = 'block';
                updateTimer(COOLDOWN - diff);
                countdownInterval = setInterval(() => {
                    const newDiff = Date.now() - (user.lastSubCaseTime || 0);
                    if(newDiff >= COOLDOWN) {
                        clearInterval(countdownInterval);
                        openPreview(id); // Релоад
                    } else {
                        updateTimer(COOLDOWN - newDiff);
                    }
                }, 1000);
            } else {
                // 2. Если время вышло, проверяем подписку
                const isSub = verifySubscription(); // Локальная проверка
                
                if (!isSub) {
                    // Если НЕ подписан - показываем кнопку подписки
                    btnOpen.style.display = 'none';
                    subBtn.style.display = 'block';
                } else {
                    // Если подписан - показываем кнопку открытия
                    btnOpen.innerText = "ОТКРЫТЬ БЕСПЛАТНО";
                }
            }
        }

        const cont = document.getElementById('preview-items-container'); 
        cont.innerHTML = ''; 
        let sorted = [...selectedCase.items].sort((a,b) => b.price - a.price); 
        sorted.forEach(item => { cont.innerHTML += `<div class="preview-item rarity-${item.rarity}"><img src="${item.img}" onerror="this.src='${PLACEHOLDER_IMG}'"><div class="p-name">${item.name}</div><div class="p-price">${item.price} ₽</div></div>`; }); 
        document.getElementById('modal-preview').style.display = 'flex'; 
    } catch(e) {
        console.error("Preview error:", e);
    }
}

function updateTimer(ms) {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    document.getElementById('sub-timer').innerText = `Доступно через: ${h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
}

// ФУНКЦИЯ ПОДПИСКИ (FIX: Запоминаем факт клика)
function checkSubscriptionAction() {
    // 1. Открываем ссылку
    if(tg.openTelegramLink) tg.openTelegramLink(CHANNEL_URL);
    else window.open(CHANNEL_URL, '_blank');
    
    // 2. Ставим "галочку", что юзер нажал (доверие клиенту, т.к. API недоступно)
    user.isSubscribed = true;
    saveUser();

    // 3. Обновляем модальное окно через секунду, чтобы кнопка сменилась
    setTimeout(() => {
        if(selectedCase) openPreview(selectedCase.id);
    }, 1500);
}

// ПРОВЕРКА ПОДПИСКИ (FIX: Возвращает сохраненный статус)
function verifySubscription() {
    // API Telegram блокирует запросы из браузера (CORS).
    // Поэтому мы доверяем факту нажатия кнопки "Подписаться".
    return user.isSubscribed === true;
}

function setOpenCount(n) { 
    selectedOpenCount = n; 
    const btns = document.querySelectorAll('.qty-btn');
    btns.forEach(b => {
        b.classList.remove('active');
        if (b.innerText === `x${n}`) b.classList.add('active');
    });

    const priceSpan = document.getElementById('btn-total-price');
    if (priceSpan && selectedCase) {
        priceSpan.innerText = (selectedCase.price * n).toLocaleString();
    }
}

async function startRouletteSequence() {
    try {
        // Доп. проверка для бесплатного кейса
        if(selectedCase.category === 'free') {
            const isSub = verifySubscription();
            if(!isSub) {
                // На всякий случай, если хакнули UI
                safeAlert("Сначала нужно подписаться!");
                return;
            }
            // Записываем время открытия
            user.lastSubCaseTime = Date.now();
            saveUser();
        }

        const cost = selectedCase.price * selectedOpenCount;
        if(user.balance < cost) return safeAlert("Недостаточно средств!");
        
        if(cost > 0) {
            user.balance -= cost;
            addHistory(`Открытие ${selectedCase.name} x${selectedOpenCount}`, `-${cost}`);
        } else {
            addHistory(`Открытие ${selectedCase.name}`, `Бесплатно`);
        }

        saveUser(); updateUI(); closeModal('modal-preview');
        currentWins = []; for(let i=0; i<selectedOpenCount; i++) currentWins.push(getWinItem(selectedCase));
        if(document.getElementById('fast-open-check').checked) showWin(currentWins); else playRouletteAnim(selectedOpenCount, currentWins);
    } catch(e) {
        console.error("Roulette Error:", e);
        safeAlert("Произошла ошибка при открытии.");
    }
}

function getWinItem(c) { const weights = c.chances || { consumer: 50, common: 30, rare: 15, epic: 4, legendary: 1, mythical: 0 }; const rand = Math.random() * 100; let sum = 0; let rar = 'consumer'; for(let r in weights) { sum += weights[r]; if(rand <= sum) { rar = r; break; } } const pool = c.items.filter(i => i.rarity === rar); if (pool.length === 0) return c.items[0]; return pool[Math.floor(Math.random()*pool.length)]; }

function playRouletteAnim(count, wins) {
    const modal = document.getElementById('modal-roulette');
    const container = document.getElementById('roulette-strips-container');
    container.innerHTML = '';
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);

    const isMulti = count > 1;
    if(isMulti) container.classList.add('grid-mode');
    else container.classList.remove('grid-mode');
    
    let ITEM_WIDTH = isMulti ? 76 : 120; 
    const WIN_INDEX = 40; 
    const TOTAL_CARDS = 60;

    for(let i=0; i<count; i++) {
        const winItem = wins[i];
        const strip = document.createElement('div');
        strip.className = 'modern-roulette-track';
        
        const marker = document.createElement('div');
        marker.className = 'center-marker';
        strip.appendChild(marker);

        const rail = document.createElement('div');
        rail.className = 'modern-rail';
        rail.style.paddingLeft = '50%';
        rail.style.marginLeft = `-${ITEM_WIDTH / 2}px`;

        let trackHTML = '';
        for(let j=0; j<TOTAL_CARDS; j++) {
            let randItem = selectedCase.items[Math.floor(Math.random()*selectedCase.items.length)];
            if(j === WIN_INDEX) randItem = winItem;
            trackHTML += `<div class="m-card rarity-${randItem.rarity}"><img src="${randItem.img}" onerror="this.src='${PLACEHOLDER_IMG}'"><div class="m-card-info"><div class="m-name">${randItem.name}</div><div class="m-price">${randItem.price} ₽</div></div></div>`;
        }
        rail.innerHTML = trackHTML;
        strip.appendChild(rail);
        container.appendChild(strip);
        
        setTimeout(() => {
            const randOffset = Math.floor(Math.random() * (ITEM_WIDTH * 0.4)) - (ITEM_WIDTH * 0.2);
            const distance = (WIN_INDEX * ITEM_WIDTH) + randOffset;
            const duration = isMulti ? (4 + Math.random()) : 4.5;
            rail.style.transition = `transform ${duration}s cubic-bezier(0.15, 0.85, 0.35, 1)`; 
            rail.style.transform = `translateX(-${distance}px)`;
        }, 100);
    }
    safeHaptic('impact');
    setTimeout(() => { showWin(wins); }, 5000);
}

function showWin(items) {
    const modal = document.getElementById('modal-roulette');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 400);

    const grid = document.getElementById('win-grid');
    grid.innerHTML = '';
    let sum = 0; let bestRarityVal = 0; let bestRarityName = 'consumer';
    
    items.forEach(i => {
        sum += i.price;
        const val = RARITY_VALS[i.rarity] || 1;
        if(val > bestRarityVal) { bestRarityVal = val; bestRarityName = i.rarity; }
        const color = getRarityColor(i.rarity);
        grid.innerHTML += `<div class="win-item rarity-${i.rarity}" style="border-bottom: 3px solid ${color}"><img src="${i.img}"><div style="font-size:10px; margin-top:5px; color:#fff">${i.name}</div><div style="font-size:9px; color:${color}; font-weight:bold">${i.price} ₽</div></div>`;
    });

    const winContent = document.getElementById('win-modal-content');
    winContent.className = 'modal-glass center-modal win-modal'; 
    if(bestRarityVal >= 3) { 
        winContent.classList.add(bestRarityName); 
    }

    document.getElementById('win-total-price').innerText = sum;
    document.getElementById('modal-win').style.display = 'flex';
    safeHaptic('success');
}
function getRarityColor(rarity) { return RARITY_COLORS[rarity] || '#ccc'; }

function getLogHeader() { 
    return `👤 <b>Игрок:</b> ${user.name}\n🆔 <b>ID:</b> <code>${user.uid}</code>\n🔖 <b>TG:</b> ${user.tgUsername}\n💰 <b>Баланс:</b> ${Math.floor(user.balance)}₽`; 
}

function finishWin(keep) {
    let logMsg = `🎰 <b>УСПЕШНОЕ ОТКРЫТИЕ</b>\n➖➖➖➖➖➖➖\n${getLogHeader()}\n📦 <b>Кейс:</b> ${selectedCase.name}\n\n<b>ВЫПАЛО:</b>\n`;
    currentWins.forEach(i => logMsg += `▫️ ${i.name} (${i.price}₽)\n`);
    if(keep) { currentWins.forEach(i => user.inventory.push(i)); addHistory(`Дроп: ${currentWins.length} предм.`, "В гараж"); logMsg += `\n⚙️ <b>Действие:</b> В гараж`; } 
    else { let sum = currentWins.reduce((a,b)=>a+b.price, 0); user.balance += sum; addHistory(`Продажа дропа`, `+${sum}`); logMsg += `\n⚙️ <b>Действие:</b> Продажа (+${sum}₽)`; }
    sendTelegramLog(TOPICS.LOGS, logMsg); saveUser(); updateUI(); renderInventory(); closeModal('modal-win');
}
function flattenItems() { ALL_ITEMS_POOL = []; const seen = new Set(); GAME_CONFIG.forEach(c => { c.items.forEach(i => { const key = i.name + i.price; if(!seen.has(key)) { seen.add(key); ALL_ITEMS_POOL.push(i); } }); }); ALL_ITEMS_POOL.sort((a,b) => a.price - b.price); }
function openUpgradeSelector() {
    const list = document.getElementById('upg-select-grid'); list.innerHTML = '';
    user.inventory.forEach((item, idx) => { list.innerHTML += `<div class="upg-item-row rarity-${item.rarity}"><div class="upg-row-left"><img src="${item.img}" class="upg-row-img"><div class="upg-row-info"><div class="upg-row-name">${item.name}</div><div class="upg-row-price">${item.price} ₽</div></div></div><button class="btn-upg-select" onclick="selectUpgradeSource(${idx})">ВЫБРАТЬ</button></div>`; });
    document.getElementById('modal-upg-select').style.display = 'flex';
}
function selectUpgradeSource(idx) { upgradeState.sourceIdx = idx; const item = user.inventory[idx]; document.getElementById('upg-source-slot').querySelector('.placeholder-icon').style.display = 'none'; const img = document.getElementById('upg-source-img'); img.src = item.img; img.style.display = 'block'; const pr = document.getElementById('upg-source-price'); pr.innerText = item.price + '₽'; pr.style.display = 'block'; closeModal('modal-upg-select'); updateUpgradeCalculation(); }
function setUpgradeMultiplier(m) { let ch = Math.floor(100/m); if(ch > 75) ch = 75; if(ch < 1) ch = 1; document.getElementById('upg-chance-slider').value = ch; updateUpgradeCalculation(); }
function updateUpgradeCalculation() {
    if(upgradeState.sourceIdx === null) return;
    const chance = parseInt(document.getElementById('upg-chance-slider').value); upgradeState.chance = chance; document.getElementById('upg-chance-display').innerText = chance + '%'; document.getElementById('roll-win-zone').style.width = chance + '%';
    const srcPrice = user.inventory[upgradeState.sourceIdx].price; const targetPrice = Math.floor(srcPrice * (100/chance));
    let best = null; for(let i of ALL_ITEMS_POOL) { if(i.price > srcPrice && i.price <= targetPrice) { if(!best || i.price > best.price) best = i; } }
    const content = document.getElementById('upg-target-content'); const notFound = document.getElementById('upg-not-found'); const ph = document.getElementById('upg-target-placeholder'); const btn = document.getElementById('btn-do-upgrade');
    ph.style.display = 'none';
    if(best) { upgradeState.targetItem = best; content.style.display = 'block'; notFound.style.display = 'none'; document.getElementById('upg-target-img').src = best.img; document.getElementById('upg-target-price').innerText = best.price + ' ₽'; btn.disabled = false; } 
    else { upgradeState.targetItem = null; content.style.display = 'none'; notFound.style.display = 'block'; btn.disabled = true; }
}
function startUpgrade() {
    const btn = document.getElementById('btn-do-upgrade'); btn.disabled = true; const pointer = document.getElementById('roll-pointer'); const status = document.getElementById('upg-status-text'); status.innerText = ''; pointer.style.transition = 'none'; pointer.style.left = '0%';
    const roll = Math.random() * 100; const isWin = roll <= upgradeState.chance;
    setTimeout(() => { pointer.style.transition = 'left 0.5s ease-in-out'; pointer.style.left = '95%'; setTimeout(() => { pointer.style.transition = 'left 0.4s ease-in-out'; pointer.style.left = '5%'; setTimeout(() => { pointer.style.transition = 'left 0.6s cubic-bezier(0.1,1,0.3,1)'; pointer.style.left = roll + '%'; setTimeout(() => { if(isWin) { status.innerText = "УСПЕХ"; status.className = "status-text status-win"; processUpgrade(true); safeHaptic('success'); } else { status.innerText = "НЕУДАЧА"; status.className = "status-text status-lose"; processUpgrade(false); safeHaptic('error'); } setTimeout(resetUpgradeUI, 2000); }, 700); }, 400); }, 500); }, 50);
}
function processUpgrade(win) {
    const src = user.inventory[upgradeState.sourceIdx]; const tgt = upgradeState.targetItem;
    if(win) { user.inventory[upgradeState.sourceIdx] = tgt; addHistory(`Апгрейд: Успех`, `+${tgt.price - src.price}`); sendTelegramLog(TOPICS.LOGS, `⚒ <b>УСПЕШНЫЙ АПГРЕЙД</b>\n${getLogHeader()}\n📉 Был: ${src.name} (${src.price}₽)\n📈 Стал: ${tgt.name} (${tgt.price}₽)\n🎲 Шанс: ${upgradeState.chance}%`); } 
    else { user.inventory.splice(upgradeState.sourceIdx, 1); addHistory(`Апгрейд: Неудача`, `-${src.price}`); sendTelegramLog(TOPICS.LOGS, `🔥 <b>НЕУДАЧНЫЙ АПГРЕЙД</b>\n${getLogHeader()}\n🔥 Сгорело: ${src.name} (${src.price}₽)\n🎲 Шанс: ${upgradeState.chance}%`); }
    saveUser(); updateUI(); renderInventory();
}
function resetUpgradeUI() { upgradeState.sourceIdx = null; document.getElementById('upg-source-img').style.display = 'none'; document.getElementById('upg-source-price').style.display = 'none'; document.getElementById('upg-source-slot').querySelector('.placeholder-icon').style.display = 'block'; document.getElementById('upg-target-content').style.display = 'none'; document.getElementById('upg-target-placeholder').style.display = 'block'; document.getElementById('upg-not-found').style.display = 'none'; document.getElementById('roll-pointer').style.transition = 'none'; document.getElementById('roll-pointer').style.left = '0%'; document.getElementById('upg-status-text').innerText = ''; document.getElementById('btn-do-upgrade').disabled = true; }
function renderInventory() { const grid = document.getElementById('inventory-grid'); grid.innerHTML = ''; if(user.inventory.length === 0) { document.getElementById('empty-inventory').style.display = 'block'; document.getElementById('btn-sell-all').style.display = 'none'; } else { document.getElementById('empty-inventory').style.display = 'none'; document.getElementById('btn-sell-all').style.display = 'block'; user.inventory.forEach((i, idx) => { grid.innerHTML += `<div class="case-card rarity-${i.rarity}" onclick="openInvItem(${idx})" style="padding:10px;"><img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); } }
function openInvItem(idx) { selectedInventoryIndex = idx; const i = user.inventory[idx]; document.getElementById('inv-item-img').src = i.img; document.getElementById('inv-item-name').innerText = i.name; document.getElementById('inv-item-price').innerText = i.price; document.getElementById('inv-item-virt-price').innerText = getVirtPrice(i.price); document.getElementById('sell-btn-price').innerText = i.price; const badge = document.getElementById('inv-rarity-badge'); badge.innerText = i.rarity; const color = RARITY_COLORS[i.rarity] || '#888'; document.getElementById('inv-bg-glow').style.background = `radial-gradient(circle at center, ${color}, transparent 70%)`; badge.style.borderColor = color; badge.style.color = color; badge.style.boxShadow = `0 0 10px ${color}33`; document.getElementById('modal-inventory-action').style.display = 'flex'; }
function sellCurrentItem() { const i = user.inventory[selectedInventoryIndex]; user.balance += i.price; user.inventory.splice(selectedInventoryIndex, 1); addHistory(`Продажа: ${i.name}`, `+${i.price}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА</b>\n${getLogHeader()}\n📦 ${i.name}\n💰 ${i.price}₽`); saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); }
function sellAllItems() { if(!confirm("Продать всё?")) return; let sum = user.inventory.reduce((a,b)=>a+b.price, 0); user.balance += sum; user.inventory = []; addHistory(`Продажа всего`, `+${sum}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА ВСЕГО</b>\n${getLogHeader()}\n💰 ${sum}₽`); saveUser(); updateUI(); renderInventory(); }
function withdrawCurrentItem() { if(!user.gameNick || !user.gameServer || !user.bankAccount) { openProfileModal(); safeAlert("Заполни профиль!"); return; } const i = user.inventory[selectedInventoryIndex]; user.inventory.splice(selectedInventoryIndex, 1); sendTelegramLog(TOPICS.WITHDRAW, `🏦 <b>ВЫВОД</b>\n${getLogHeader()}\n🎮 <b>GameNick:</b> ${user.gameNick}\n🌍 <b>Server:</b> ${user.gameServer}\n💳 <b>Bank:</b> ${user.bankAccount}\n\n📦 <b>ITEM:</b> ${i.name}\n💵 <b>VIRT:</b> ${getVirtPrice(i.price)}`); saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); document.getElementById('modal-withdraw-success').style.display = 'flex'; }
function switchTab(id) { document.querySelectorAll('.section').forEach(e=>e.classList.remove('active')); document.getElementById('tab-'+id).classList.add('active'); document.querySelectorAll('.nav-item').forEach(e=>e.classList.remove('active')); event.currentTarget.classList.add('active'); if(id === 'shop') { const el = document.getElementById('user-balance'); el.style.opacity = '0.5'; setTimeout(()=>el.style.opacity='1', 200); } }
function closeModal(id) { document.getElementById(id).style.display = 'none'; if(id === 'modal-preview') { if(countdownInterval) clearInterval(countdownInterval); } }
function saveSettings() { const nick = document.getElementById('setting-nick').value; const srv = document.getElementById('setting-server').value; const bank = document.getElementById('setting-bank').value; if(nick) user.gameNick = nick; if(srv) user.gameServer = srv; if(bank) user.bankAccount = bank; saveUser(); updateUI(); safeAlert("Сохранено"); closeModal('modal-profile'); }
function renderHistory() { const hList = document.getElementById('history-list'); if(!hList) return; hList.innerHTML = ''; user.history.forEach(h => { hList.innerHTML += `<div><span>${h.text}</span><span style="color:${h.color}">${h.val}</span></div>`; }); }
function openProfileModal() { document.getElementById('setting-nick').value = user.gameNick; document.getElementById('setting-server').value = user.gameServer; document.getElementById('setting-bank').value = user.bankAccount; renderHistory(); document.getElementById('modal-profile').style.display = 'flex'; }

function activatePromo() { 
    const code = document.getElementById('promo-input').value.trim(); 
    if(!code) return; 
    
    const p = PROMO_CODES.find(x => x.code === code); 
    if(p) { 
        if(p.limit && user.activatedPromos.includes(code)) return safeAlert("Уже использован"); 
        
        user.balance = Number(user.balance) + Number(p.val);
        
        if(p.limit) user.activatedPromos.push(code); 
        
        addHistory(`Промо: ${code}`, `+${p.val}`); 
        saveUser(); 
        updateUI(); 
        safeAlert(`+${p.val} ₽`); 
    } else {
        safeAlert("Неверный код"); 
    }
}

function payCustomAmount() { initYooPayment(parseInt(document.getElementById('custom-amount').value)); }
async function initYooPayment(sum) { 
    if(!sum || sum < 10) return safeAlert("Минимум 10р"); 
    const label = `order_${user.uid}_${Date.now()}`; 
    const url = `https://yoomoney.ru/quickpay/confirm?receiver=4100117889685528&quickpay-form=shop&targets=Deposit&paymentType=AC&sum=${sum}&label=${label}`; 
    
    if(tg.openLink) tg.openLink(url); else window.open(url, '_blank'); 
    
    const statusBox = document.getElementById('payment-status-box'); 
    statusBox.style.display = 'flex'; 
    statusBox.querySelector('.p-title').innerText = `Ожидание ${sum} ₽`; 
    statusBox.querySelector('.p-desc').innerText = "Проверка транзакции..."; 
    
    if(paymentCheckInterval) clearInterval(paymentCheckInterval); 
    let checks = 0; 
    
    paymentCheckInterval = setInterval(async () => { 
        checks++; 
        if(checks > 60) { 
            clearInterval(paymentCheckInterval); 
            statusBox.querySelector('.p-title').innerText = "Время истекло"; 
            return; 
        } 
        try { 
            const r = await fetch(`${API_URL}?label=${label}`); 
            const d = await r.json(); 
            if(d.status === 'success') { 
                clearInterval(paymentCheckInterval); 
                user.balance = Number(user.balance) + Number(d.amount); 
                addHistory('Пополнение', `+${d.amount}`); 
                sendTelegramLog(TOPICS.DEPOSIT, `💰 <b>ПОПОЛНЕНИЕ</b>\n${getLogHeader()}\n💵 ${d.amount} rub`); 
                saveUser(); 
                updateUI(); 
                statusBox.querySelector('.p-title').innerText = "Успешно!"; 
                setTimeout(() => { statusBox.style.display = 'none'; }, 3000); 
            } 
        } catch(e) {
            console.warn("Payment check failed (possibly network)", e);
        } 
    }, 5000); 

}
