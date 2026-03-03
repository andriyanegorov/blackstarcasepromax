const SUPABASE_URL = 'https://itqlqsixknkqoggvubrp.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0cWxxc2l4a25rcW9nZ3Z1YnJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MjE3MDIsImV4cCI6MjA4NjQ5NzcwMn0.mV0As50_W8MBC3kpLYm_mLbExqRRyf8JaJi1eNOtAj4'; 
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const tg = window.Telegram && window.Telegram.WebApp 
    ? window.Telegram.WebApp 
    : { 
        initDataUnsafe: { user: { id: 123456, first_name: "TestUser", username: "browser_test" }, start_param: "" }, 
        expand: () => {}, 
        HapticFeedback: { notificationOccurred: (t) => {} },
        openLink: (url) => window.open(url, '_blank'),
        openTelegramLink: (url) => window.open(url, '_blank'),
        close: () => {}
      };

const API_URL = "https://script.google.com/macros/s/AKfycbwCTnYYNY3u9ceNdIxlBd0so2fWxNCzxgmQfuDntr3HuKRu9gK9cmGzkeui_Z-4HGQiqw/exec"; 
const SUB_CHANNEL_URL = "https://t.me/blackrussiacases_news"; 
const PLACEHOLDER_IMG = "https://placehold.co/150x150/1a1a1a/ffffff?text=No+Image";
const PAYMENT_BASE_URL = "https://funpay.com/lots/offer?id=64078084"; 

const RARITY_VALS = { 'consumer': 1, 'common': 2, 'rare': 3, 'epic': 4, 'legendary': 5, 'mythical': 6 };
const RARITY_COLORS = { 'consumer': '#B0B0B0', 'common': '#4CAF50', 'rare': '#3b82f6', 'epic': '#a855f7', 'legendary': '#eab308', 'mythical': '#ff3333' };
const BP_MAX_LEVEL = 20;
const BP_REWARDS = [
    { level: 1, exp: 0, free: { type: 'money', val: 5 }, premium: { type: 'money', val: 15 } },
    { level: 2, exp: 150, free: { type: 'money', val: 10 }, premium: { type: 'item', val: { name: "25 BC", price: 25, rarity: "consumer", img: "img/bc.png" } } },
    { level: 3, exp: 350, free: { type: 'item', val: { name: "Очки Street", price: 19, rarity: "consumer", img: "img/streetglass.png" } }, premium: { type: 'item', val: { name: "Шлем MechaCat", price: 40, rarity: "rare", img: "img/mechacat.png" } } },
    { level: 4, exp: 600, free: { type: 'money', val: 5 }, premium: { type: 'money', val: 20 } },
    { level: 5, exp: 900, free: { type: 'item', val: { name: "Пузатый", price: 19, rarity: "consumer", img: "img/pyzatiy.png" } }, premium: { type: 'item', val: { name: "Набор Сельчанин", price: 79, rarity: "rare", img: "img/pack_selchanin.png" } } },
    { level: 6, exp: 1250, free: { type: 'item', val: { name: "Хоуми", price: 59, rarity: "rare", img: "img/homie.png" } }, premium: { type: 'money', val: 25 } },
    { level: 7, exp: 1650, free: { type: 'money', val: 5 }, premium: { type: 'item', val: { name: "VAZ 2115", price: 55, rarity: "rare", img: "img/2115.png" } } },
    { level: 8, exp: 2100, free: { type: 'money', val: 10 }, premium: { type: 'item', val: { name: "400.000 Вирт", price: 40, rarity: "epic", img: "img/money.png" } } },
    { level: 9, exp: 2600, free: { type: 'item', val: { name: "50 BC", price: 50, rarity: "rare", img: "img/bc.png" } }, premium: { type: 'money', val: 30 } },
    { level: 10, exp: 3200, free: { type: 'money', val: 0 }, premium: { type: 'item', val: { name: "Рюкзак Мопс", price: 79, rarity: "rare", img: "img/mops.png" } } },
    { level: 11, exp: 3800, free: { type: 'item', val: { name: "Маска Дали", price: 29, rarity: "consumer", img: "img/dali.png" } }, premium: { type: 'item', val: { name: "BR VISUALS MAX", price: 69, rarity: "coomon", img: "img/vr.png" } } },
    { level: 12, exp: 4400, free: { type: 'money', val: 5 }, premium: { type: 'money', val: 30 } },
    { level: 13, exp: 5000, free: { type: 'item', val: { name: "VAZ 2107", price: 39, rarity: "consumer", img: "img/2107.png" } }, premium: { type: 'item', val: { name: "Иван Береговой", price: 79, rarity: "rare", img: "img/beregovoy.png" } } },
    { level: 14, exp: 5600, free: { type: 'money', val: 10 }, premium: { type: 'money', val: 25 } },
    { level: 15, exp: 6200, free: { type: 'item', val: { name: "Защитница закона", price: 59, rarity: "common", img: "img/zakon.png" } }, premium: { type: 'item', val: { name: "Volkswagen golf GTi", price: 99, rarity: "common", img: "img/golf.png" } } },
    { level: 16, exp: 6800, free: { type: 'money', val: 5 }, premium: { type: 'money', val: 35 } },
    { level: 17, exp: 7400, free: { type: 'item', val: { name: "VAZ 2112", price: 52, rarity: "common", img: "img/2112.png" } }, premium: { type: 'item', val: { name: "Маска Иноске", price: 119, rarity: "epic", img: "img/inoske.png" } } },
    { level: 18, exp: 8000, free: { type: 'money', val: 0 }, premium: { type: 'money', val: 40 } },
    { level: 19, exp: 8600, free: { type: 'item', val: { name: "Пакет", price: 49, rarity: "consumer", img: "img/packet.png" } }, premium: { type: 'item', val: { name: "ЛуАЗ 969", price: 114, rarity: "epic", img: "img/LuAZ.png" } } },
    { level: 20, exp: 9200, free: { type: 'item', val: { name: "1.000.000 Вирт", price: 100, rarity: "epic", img: "img/money.png" } }, premium: { type: 'item', val: { name: "BMW X5", price: 219, rarity: "legendary", img: "img/x5.png" } } }
];
const BP_TASKS = {
    open_cases: { text: "Открыть 20 кейсов", target: 20, exp: 400 },
    upgrade_fail: { text: "Сжечь предмет в апгрейде", target: 5, exp: 300 },
    contract_sign: { text: "Подписать 10 контрактов", target: 10, exp: 500 },
    sell_item: { text: "Продать 15 предметов", target: 15, exp: 350 },
    daily_login: { text: "Посетить магазин (клик)", target: 1, exp: 100 },
    upgrade_success: { text: "Успешно апгрейдить предмет 3 раза", target: 3, exp: 350 },
    earning_money: { text: "Заработать 500 рублей", target: 500, exp: 250 },
    case_legendary: { text: "Получить легендарный предмет", target: 1, exp: 500 },
    inventory_full: { text: "Собрать инвентарь из 20 предметов", target: 20, exp: 200 },
    level_battle_pass: { text: "Поднять боевой пасс на 5 уровней", target: 5, exp: 300 }
};

// === GLOBAL LOGGING FUNCTION (VIA GAS) ===
function sendAdminLog(topicKey, actionName, details) {
    // TopicKey: ACTIONS, WITHDRAW, PROMO, SECURITY
    
    // Проверяем что user инициализирован
    if (!user || !user.uid) {
        console.warn('⚠️ sendAdminLog: user не инициализирован!', {user});
        return;
    }
    
    const logData = {
        action: "log_event",
        topicKey: topicKey,
        timestamp: new Date().toISOString(),
        text: `🔔 <b>${actionName}</b>\n` +
              `👤 ${user.name} (ID: <code>${user.uid}</code>)\n` +
              `💰 Баланс: ${Math.floor(user.balance)} ₽\n` +
              `🖥 Устройство: <code>${getDeviceId()}</code>\n` +
              `📋 ${details}`
    };

    console.log('📤 Отправка лога:', logData);
    
    // Способ 1: sendBeacon (самый надежный для логирования)
    if (navigator.sendBeacon) {
        try {
            const result = navigator.sendBeacon(API_URL, JSON.stringify(logData));
            console.log('✅ sendBeacon успешно отправлен:', result);
            return;
        } catch(e1) {
            console.warn('⚠️ sendBeacon ошибка:', e1);
        }
    }
    
    // Способ 2: обычный fetch 
    try {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData),
            keepalive: true
        }).then(r => {
            console.log('✅ Fetch ответ:', r.status);
            return r.json();
        }).then(data => {
            console.log('✅ Лог принят сервером:', data);
        }).catch(e => {
            console.error('❌ Fetch ошибка:', e);
        });
    } catch(e2) {
        console.error('❌ Fetch исключение:', e2);
    }
}

let GAME_CONFIG = [];
let isX2DropActive = false; // Хранит статус X2 дропа
const DEFAULT_USER = { 
    balance: 0, inventory: [], withdrawnItems: [], uid: 0, name: "Гость", tgUsername: "", gameNick: "", 
    gameServer: "Red", bankAccount: "", avatar: "", history: [], activatedPromos: [],
    lastSubCaseTime: 0, isSubscribed: false,
    referrerId: null, referralsCount: 0, referralEarnings: 0, pendingReferralAmount: 0, isBanned: false, banReason: "",
    totalSpent: 0, isVerified: false,
    bp: { level: 1, exp: 0, premium: false, claimedFree: [], claimedPremium: [], tasks: { open_cases: 0, upgrade_fail: 0, contract_sign: 0, sell_item: 0, daily_login: 0 } },
    deviceIds: [] // Для мультиаккаунта
};
let user = { ...DEFAULT_USER };
user.pendingReferralAmount = 0; // add property for pending referral withdrawals

let selectedCase = null, currentWins = [], selectedOpenCount = 1; 
let selectedInventoryIndex = null, upgradeState = { sourceIdx: null, targetItem: null, chance: 50 };
let ALL_ITEMS_POOL = [], contractSelection = [];
let serverTimeOffset = 0; 

document.addEventListener('DOMContentLoaded', () => {
    try { if(tg) tg.expand(); } catch(e) {}
    // Set default active tab to 'cases'
    switchTab('cases');
    loadCasesFromDB().then(() => {
        initUserSessionSupabase();
        initRealtime();
        syncServerTime();
        initDynamicEffects();
    });
});

// --- DEVICE ID MANAGEMENT (MULTI-ACCOUNT PROTECTION) ---
function generateDeviceFingerprint() {
    // Собираем данные об устройстве для создания "отпечатка"
    const fingerprint = {
        // Браузер и ОС
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        
        // Экран
        screenWidth: screen.width,
        screenHeight: screen.height,
        screenColorDepth: screen.colorDepth,
        screenPixelDepth: screen.pixelDepth,
        
        // Устройство
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: navigator.deviceMemory || 0,
        
        // WebGL
        webglVendor: getWebGLVendor()
    };
    
    // Преобразуем в строку и хешируем
    const fingerprintStr = JSON.stringify(fingerprint);
    return 'dev_' + simpleHash(fingerprintStr).toString(36) + '_' + Date.now().toString(36).substr(-4);
}

function getWebGLVendor() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
    } catch(e) {}
    return 'unknown';
}

// Простая функция хеширования
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function getDeviceId() {
    // Сначала проверяем все возможные хранилища
    let dId = localStorage.getItem('br_device_id') || 
              sessionStorage.getItem('br_device_id') || 
              getCookie('br_device_id');
    
    // Если ничего не нашли, создаём новый ID на основе отпечатка устройства
    if (!dId) {
        dId = generateDeviceFingerprint();
        
        // Сохраняем в несколько мест для надежности
        localStorage.setItem('br_device_id', dId);
        sessionStorage.setItem('br_device_id', dId);
        setCookie('br_device_id', dId, 365); // На год
    }
    
    return dId;
}

// Вспомогательные функции для работы с cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/;SameSite=Lax';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

// --- SUPABASE & USER ---
async function loadCasesFromDB() {
    const { data: casesData, error: casesError } = await sb.from('cases').select('*').order('id', { ascending: true });
    if (casesError || !casesData) {
        document.getElementById('loading-screen').innerHTML = "<div style='color:red'>Ошибка сервера<br>Попробуйте позже</div>";
        return;
    }
    const { data: itemsData } = await sb.from('case_items').select('*');

    GAME_CONFIG = casesData.map(c => {
        const caseItems = itemsData ? itemsData.filter(i => i.case_id === c.id) : [];
        return {
            id: c.id, name: c.name, price: c.price, category: c.category, img: c.img, chances: c.chances,
            items: caseItems.map(i => ({ name: i.name, price: i.price, img: i.img, rarity: i.rarity }))
        };
    });
    
    // Загружаем статус X2 дропа
    await loadX2Status();
    
    initCases(); flattenItems();
}

// Загружает статус X2 из базы
async function loadX2Status() {
    try {
        const { data } = await sb.from('game_settings').select('x2_drop_active').eq('id', 1).maybeSingle();
        if (data) {
            isX2DropActive = data.x2_drop_active || false;
            updateX2Indicator();
        }
    } catch(e) {
        console.warn('Failed to load X2 status:', e);
    }
}

// Обновляет индикатор X2 на сайте
function updateX2Indicator() {
    const indicator = document.getElementById('x2-indicator');
    if (indicator) {
        if (isX2DropActive) {
            indicator.style.display = 'flex';
            indicator.innerHTML = '<div style="animation: pulse 1s infinite;">⚡ X2 ДРОП</div>';
        } else {
            indicator.style.display = 'none';
        }
    }
}

// Переключает X2 дроп (для админа)
async function toggleX2Drop() {
    try {
        isX2DropActive = !isX2DropActive;
        const { error } = await sb.from('game_settings').upsert({ id: 1, x2_drop_active: isX2DropActive });
        if (error) throw error;
        updateX2Indicator();
        showNotify(isX2DropActive ? 'X2 ДРОП ВКЛЮЧЕН ⚡' : 'X2 дроп выключен', 'success');
    } catch(e) {
        console.error('Failed to toggle X2:', e);
        isX2DropActive = !isX2DropActive; // откатываем если ошибка
        showNotify('Ошибка при переключении X2', 'error');
    }
}

function initRealtime() {
    // Уникальный channel name чтобы не пересекался
    const channel = sb.channel('public:live_drops');
    
    channel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_drops' }, (payload) => {
        addLiveFeedItem(payload.new);
    }).subscribe((status) => {

    });

    // отдельный канал для заявок на вывод, чтобы пользователь видел изменения
    const wchan = sb.channel('public:withdraws');
    wchan.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'withdraws' }, (payload) => {
        handleWithdrawRow(payload.new);
    }).on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'withdraws' }, (payload) => {
        handleWithdrawRow(payload.new);
    }).subscribe();
}

// реакция клиента на изменение/создание записи в "withdraws"
function handleWithdrawRow(w) {
    if(!user || w.user_id !== user.uid) return;
    if(w.type === 'item') {
        let idx = user.inventory.findIndex(it => it.withdrawId === w.id);
        if(idx === -1 && w.status === 'pending') {
            idx = user.inventory.findIndex(it => it.name === w.item_name && it.price === w.amount && !it.pendingWithdraw);
        }
        if(idx === -1) return;
        const item = user.inventory[idx];
        if(w.status === 'pending') {
            item.pendingWithdraw = true;
            item.withdrawId = w.id;
        } else if(w.status === 'confirmed') {
            // перемещаем в выводимые
            const moved = user.inventory.splice(idx, 1)[0];
            delete moved.pendingWithdraw;
            delete moved.withdrawId;
            user.withdrawnItems = user.withdrawnItems || [];
            user.withdrawnItems.push(moved);
            showNotify(`Вывод "${item.name}" подтверждён`, 'success');
        } else if(w.status === 'rejected') {
            item.pendingWithdraw = false;
            delete item.withdrawId;
            showNotify(`Вывод "${item.name}" отклонён`, 'error');
        }
        saveUser(); updateUI(); renderInventory(); renderWithdrawn();
    } else if(w.type === 'referral') {
        if(w.status === 'confirmed') {
            showNotify(`Запрос на вывод рефералов ${w.amount}₽ подтверждён`, 'success');
            user.pendingReferralAmount = 0;
            saveUser(); updateUI(); renderReferralStats();
        } else if(w.status === 'rejected') {
            showNotify(`Запрос на вывод рефералов ${w.amount}₽ отклонён`, 'error');
            user.referralEarnings += w.amount;
            user.pendingReferralAmount = 0;
            saveUser(); updateUI(); renderReferralStats();
        }
    }
}

function addLiveFeedItem(item) {
    const track = document.getElementById('live-feed-track');
    if(!track) return;
    if(track.querySelector('.live-item-placeholder')) track.innerHTML = '';
    const color = RARITY_COLORS[item.item_rarity] || '#fff';
    const el = document.createElement('div');
    el.className = `live-item ${item.item_rarity || 'common'}`;
    const verifyBadge = item.is_verified ? `<span class="insta-verified-badge"></span>` : '';
    el.innerHTML = `
        <div class="live-user-avatar"><img src="img/avatar_placeholder.png" onerror="this.src='https://placehold.co/50x50/333/fff?text=U'"></div>
        <div class="live-info"><span class="u-name">${item.user_name || 'Игрок'}${verifyBadge}</span><span class="i-name" style="color: ${color}">${item.item_name}</span></div>
        <img src="${item.item_img}" class="live-item-img" onerror="this.src='${PLACEHOLDER_IMG}'">
    `;
    el.style.animation = 'slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    track.prepend(el);
    
    // Add subtle shake effect to live feed header
    const header = document.querySelector('.header');
    if (header && ['legendary', 'mythical', 'epic'].includes(item.item_rarity)) {
        shakeElement(header, 2, 200);
    }
    
    if(track.children.length > 20) track.lastElementChild.remove();
}

async function syncServerTime() {
    try {
        const res = await fetch(`${API_URL}?action=get_time`);
        const data = await res.json();
        if(data.status) serverTimeOffset = Date.now() - data.serverTime; 
    } catch(e) {}
}
function getTrueTime() { return Date.now() - serverTimeOffset; }

async function initUserSessionSupabase() {
    let uid = 0, first_name = "User", username = "", photo_url = "";
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) { 
        uid = tg.initDataUnsafe.user.id; 
        first_name = tg.initDataUnsafe.user.first_name || "User";
        username = tg.initDataUnsafe.user.username ? `@${tg.initDataUnsafe.user.username}` : "";
        photo_url = tg.initDataUnsafe.user.photo_url || "";
    } else { uid = 123456; first_name = "BrowserTester"; }

    const currentDeviceId = getDeviceId();

    try {
        const { data, error } = await sb.from('users').select('*').eq('telegram_id', uid).maybeSingle();

        if (data) {
            // Проверка бана
            if(data.is_banned) {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('ban-overlay').style.display = 'flex';
                if (data.ban_reason) document.getElementById('ban-overlay').querySelector('p').innerText = `Причина: ${data.ban_reason}`;
                return; 
            }

            // Проверка мультиаккаунта ДО добавления
            let knownDevices = data.device_ids || [];
            
            // СНАЧАЛА создаём временный user объект для логирования
            user = {
                uid: data.telegram_id, name: first_name, tgUsername: username,
                balance: Number(data.balance), inventory: data.inventory || [], history: data.history || [],
                gameNick: data.game_nick || "", gameServer: data.game_server || "Red", bankAccount: data.bank_account || "",
                activatedPromos: data.activated_promos || [], isSubscribed: data.is_subscribed || false,
                lastSubCaseTime: data.last_sub_case_time || 0, referrerId: data.referrer_id,
                referralsCount: data.referrals_count || 0, referralEarnings: data.referral_earnings || 0,
                pendingReferralAmount: data.pending_referral_amount || 0,
                withdrawnItems: data.withdrawn_items || [],
                avatar: photo_url, totalSpent: Number(data.total_spent) || 0, isVerified: data.is_verified || false,
                bp: data.bp || DEFAULT_USER.bp,
                deviceIds: knownDevices
            };
            
            // Теперь проверяем, есть ли этот Device ID у ДРУГИХ юзеров
            const { data: multiData } = await sb.from('users')
                .select('telegram_id')
                // supabase expects an array for contains; wrap string into array
                .contains('device_ids', [currentDeviceId])
                .neq('telegram_id', uid);  // Исключаем самого себя!
            
            if (multiData && multiData.length > 0) {
                // НАЙДЕН МУЛЬТИАККАУНТ - у других аккаунтов есть этот Device ID
                const otherIds = multiData.map(u => u.telegram_id).join(', ');
                console.log('🚨 MULTI-ACCOUNT DETECTED:', {currentDeviceId, otherIds, uid});
                
                // ✅ Отправляем лог админу
                sendAdminLog('SECURITY', '⚠️ ПОДОЗРЕНИЕ НА МУЛЬТИАККАУНТ', 
                    `Игрок ${uid} пытается зайти с Device ID <code>${currentDeviceId}</code>, который уже используется у ID: ${otherIds}`);
                
                // ✅ Показываем видимое предупреждение на экране игрока
                showMultiAccountWarning(uid, otherIds, currentDeviceId);
                
                // Даём время отправить логи
                await new Promise(r => setTimeout(r, 1000));
            }
            
            // Добавляем Device ID в список этого пользователя
            if (!knownDevices.includes(currentDeviceId)) {
                knownDevices.push(currentDeviceId);
                try {
                    const { error } = await sb.from('users').update({ device_ids: knownDevices }).eq('telegram_id', uid);
                    if(error) console.warn('Unable to update device_ids', error);
                } catch(updErr) {
                    console.error('Exception when updating device_ids', updErr);
                }
            }
            user.bp.tasks = { 
        open_cases: user.bp.tasks?.open_cases || 0,
        upgrade_fail: user.bp.tasks?.upgrade_fail || 0,
        contract_sign: user.bp.tasks?.contract_sign || 0,
        sell_item: user.bp.tasks?.sell_item || 0,
        daily_login: user.bp.tasks?.daily_login || 0,
        upgrade_success: user.bp.tasks?.upgrade_success || 0,
        earning_money: user.bp.tasks?.earning_money || 0,
        case_legendary: user.bp.tasks?.case_legendary || 0,
        inventory_full: user.bp.tasks?.inventory_full || 0,
        level_battle_pass: user.bp.tasks?.level_battle_pass || 0
    };
            
            sb.from('users').update({ username, first_name }).eq('telegram_id', uid).then();
        } else {
            // Новый пользователь
            let refId = null;
            if (tg.initDataUnsafe.start_param && tg.initDataUnsafe.start_param.startsWith("ref_")) {
                refId = Number(tg.initDataUnsafe.start_param.split('_')[1]);
            }
            const newUser = { 
                telegram_id: uid, username: username, first_name: first_name, 
                balance: 0, inventory: [], withdrawn_items: [], history: [], referrer_id: refId, 
                total_spent: 0, is_verified: false, bp: DEFAULT_USER.bp,
                pending_referral_amount: 0,
                device_ids: [currentDeviceId] 
            };
            await sb.from('users').insert([newUser]);
            user = { ...DEFAULT_USER, ...newUser, uid: uid, avatar: photo_url };
            
            sendAdminLog('GENERAL', '🆕 Новый игрок', `Регистрация. Рефер: ${refId || 'Нет'}`);

            if (refId && refId !== uid) {
                const { data: refUser } = await sb.from('users').select('balance, referrals_count, referral_earnings').eq('telegram_id', refId).maybeSingle();
                if (refUser) {
                    await sb.from('users').update({
                        balance: Number(refUser.balance || 0) + 10,
                        referrals_count: Number(refUser.referrals_count || 0) + 1,
                        referral_earnings: Number(refUser.referral_earnings || 0) + 10
                    }).eq('telegram_id', refId);
                }
            }
        }
        document.getElementById('loading-screen').style.display = 'none';
        await syncPendingWithdraws();
        updateUI(); renderInventory(); renderWithdrawn(); renderHistory(); renderBP();
    } catch(err) {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('vpn-overlay').style.display = 'flex';
    }
}

// проверяем на подтверждённые/отклонённые заявки после загрузки
async function syncPendingWithdraws() {
    if(!user || !user.uid) return;
    try {
        const { data, error } = await sb.from('withdraws')
            .select('*')
            .eq('user_id', user.uid)
            .in('status', ['confirmed','rejected']);
        if(!error && data && data.length) {
            data.forEach(handleWithdrawRow);
        }
    } catch(e) { console.warn('syncPendingWithdraws error', e); }
}

async function saveUser() {
    if (!user.uid) return;
    try {
        const { error } = await sb.from('users').update({
            balance: user.balance, inventory: user.inventory, withdrawn_items: user.withdrawnItems, history: user.history,
            game_nick: user.gameNick, game_server: user.gameServer, bank_account: user.bankAccount,
            activated_promos: user.activatedPromos, is_subscribed: user.isSubscribed,
            last_sub_case_time: user.lastSubCaseTime, total_spent: user.totalSpent,
            referral_earnings: user.referralEarnings, referrals_count: user.referralsCount,
            pending_referral_amount: user.pendingReferralAmount,
            bp: user.bp
        }).eq('telegram_id', user.uid);
        if(error) {
            console.error('❌ saveUser error:', error);
        } else {
            console.log('✅ saveUser успешно сохранено');
        }
    } catch (e) {
        console.error('❌ saveUser exception:', e);
    }
}

// --- SHOP ---
function buyPack(amount, url) {
    if(!amount || amount < 10) return showNotify("Минимум 10 ₽", "error");
    addBPProgress('daily_login', 1);
    
    // ЛОГ ПОПЫТКИ ПОПОЛНЕНИЯ
    sendAdminLog('GENERAL', '💰 Попытка пополнения', `Сумма: ${amount} ₽\nСсылка: FunPay`);

    pendingPaymentUrl = url || `${PAYMENT_BASE_URL}?sum=${amount}&uid=${user.uid}`;
    document.getElementById('modal-payment-warning').style.display = 'flex';
    document.getElementById('btn-proceed-pay').onclick = function() { closeModal('modal-payment-warning'); tg.openLink(pendingPaymentUrl); showNotify("Переход к оплате...", "info"); };
}
function payCustomAmount() {
    addBPProgress('daily_login', 1);
    sendAdminLog('GENERAL', '💰 Попытка пополнения (Своя сумма)', `Переход на FunPay`);
    pendingPaymentUrl = "https://funpay.com/lots/offer?id=64382905"; 
    document.getElementById('modal-payment-warning').style.display = 'flex';
    document.getElementById('btn-proceed-pay').onclick = function() { closeModal('modal-payment-warning'); window.open(pendingPaymentUrl, '_blank'); };
}

// --- PROMO ---
async function activatePromo() {
    const btn = document.getElementById('btn-promo-act');
    const input = document.getElementById('promo-input');
    const code = input.value.trim().toUpperCase(); 
    if(!code) {
        showNotify("Введите код", "error");
        shakeElement(input, 4, 300);
        return;
    }
    if(btn.disabled) return; 
    btn.disabled = true; btn.innerText = "⏳";
    btn.classList.add('btn-click-anim');
    
    if(user.activatedPromos && user.activatedPromos.includes(code)) { 
        btn.disabled = false; btn.innerText = "АКТИВИРОВАТЬ"; 
        btn.classList.remove('btn-click-anim');
        showNotify("Код уже активирован", "error");
        shakeElement(btn, 3, 300);
        return;
    }

    try {
        const { data: adminData } = await sb.from('admin_promos').select('*').eq('code', code).eq('is_active', true).maybeSingle();
        if (adminData) { 
            applyPromo(adminData.reward, code); 
            input.value = ""; 
            sendAdminLog('PROMO', '🎟 Активация промокода', `Код: ${code}\nНаграда: ${adminData.reward} ₽`);
            btn.classList.remove('btn-click-anim');
            return; 
        }
        // Если не нашли код в admin_promos — пробуем таблицу promocodes (внешние/Supabase коды)
        const { data: sbPromo } = await sb.from('promocodes').select('*').eq('code', code).maybeSingle();
        if (sbPromo) {
            // Проверяем активность (если есть поле is_active)
            if (typeof sbPromo.is_active !== 'undefined' && !sbPromo.is_active) {
                showNotify("Код не активен", "error");
                shakeElement(btn, 3, 300);
                return;
            }

            // Попытка определить поле с наградой (совместимость с разными схемами)
            let amount = 0;
            if (typeof sbPromo.reward !== 'undefined') amount = Number(sbPromo.reward);
            else if (typeof sbPromo.amount !== 'undefined') amount = Number(sbPromo.amount);
            else if (typeof sbPromo.value !== 'undefined') amount = Number(sbPromo.value);
            else if (sbPromo.type === 'balance' && typeof sbPromo.val !== 'undefined') amount = Number(sbPromo.val);

            if (isNaN(amount) || amount <= 0) {
                showNotify("Неподдерживаемый тип промокода", "error");
                shakeElement(btn, 3, 300);
                return;
            }

            applyPromo(amount, code);
            input.value = "";
            sendAdminLog('PROMO', '🎟 Активация промокода (promocodes)', `Код: ${code}\nНаграда: ${amount} ₽`);

            // Обновляем статистику использования / деактивируем single-use
            try {
                if (sbPromo.single_use) {
                    await sb.from('promocodes').update({ is_active: false }).eq('id', sbPromo.id);
                } else if (typeof sbPromo.used_count !== 'undefined') {
                    await sb.from('promocodes').update({ used_count: (sbPromo.used_count || 0) + 1 }).eq('id', sbPromo.id);
                }
            } catch (e) { /* не критично если обновление не прошло */ }

            btn.classList.remove('btn-click-anim');
            return;
        }
        showNotify("Код не найден", "error");
        shakeElement(btn, 3, 300);
    } catch(e) { 
        showNotify("Ошибка активации", "error");
        shakeElement(btn, 3, 300);
    } 
    finally { btn.disabled = false; btn.innerText = "АКТИВИРОВАТЬ"; btn.classList.remove('btn-click-anim'); }
}

function applyPromo(amount, code) {
    user.balance += amount; if(!user.activatedPromos) user.activatedPromos = [];
    user.activatedPromos.push(code); addHistory(`Промокод: ${code}`, `+${amount}`);
    saveUser(); updateUI(); showNotify(`Успешно! +${amount} ₽`, "success"); safeHaptic('success');
}

// ... (BATTLE PASS FUNCTIONS REMAIN THE SAME - OMITTED FOR BREVITY BUT KEEP THEM) ...
function renderBP() {
    // Вставь сюда код renderBP из старого файла (он без изменений)
    if (!user.bp) user.bp = { level: 1, exp: 0, premium: false, claimedFree: [], claimedPremium: [], tasks: { open_cases: 0, upgrade_fail: 0, contract_sign: 0, sell_item: 0, daily_login: 0 } };
    document.getElementById('bp-current-level').innerText = user.bp.level;
    const nextLevelData = BP_REWARDS.find(r => r.level === user.bp.level + 1);
    const needExp = nextLevelData ? nextLevelData.exp : BP_REWARDS[BP_REWARDS.length-1].exp;
    const prevExp = BP_REWARDS.find(r => r.level === user.bp.level).exp;
    document.getElementById('bp-current-exp').innerText = user.bp.exp;
    document.getElementById('bp-need-exp').innerText = user.bp.level >= BP_MAX_LEVEL ? "MAX" : needExp;
    let progressPercent = 100;
    if (user.bp.level < BP_MAX_LEVEL) {
        progressPercent = ((user.bp.exp - prevExp) / (needExp - prevExp)) * 100;
    }
    document.getElementById('bp-progress-fill').style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    if(user.bp.premium) {
        document.getElementById('btn-buy-premium').style.display = 'none';
        document.getElementById('bp-premium-active').style.display = 'block';
    } else {
        document.getElementById('btn-buy-premium').style.display = 'block';
        document.getElementById('bp-premium-active').style.display = 'none';
    }
    const track = document.getElementById('bp-track'); track.innerHTML = '';
    BP_REWARDS.forEach(r => {
        const isUnlocked = user.bp.level >= r.level;
        const freeClaimed = user.bp.claimedFree.includes(r.level);
        const freeBtnState = freeClaimed ? '✅' : (isUnlocked ? 'ЗАБРАТЬ' : '🔒');
        const freeClass = freeClaimed ? 'claimed' : (isUnlocked ? 'claimable' : 'locked');
        const premClaimed = user.bp.claimedPremium.includes(r.level);
        const premBtnState = !user.bp.premium ? '🔒 PREM' : (premClaimed ? '✅' : (isUnlocked ? 'ЗАБРАТЬ' : '🔒'));
        const premClass = !user.bp.premium ? 'locked' : (premClaimed ? 'claimed' : (isUnlocked ? 'claimable' : 'locked'));
        const renderRewardContent = (reward) => {
            if(reward.type === 'money') return `<div class="bp-reward-val">${reward.val} ₽</div>`;
            return `<div class="bp-reward-img"><img src="${reward.val.img}"></div><div class="bp-reward-name">${reward.val.name}</div>`;
        };
        track.innerHTML += `
            <div class="bp-tier ${isUnlocked ? 'unlocked' : ''}">
                <div class="bp-tier-level">LVL ${r.level}</div>
                <div class="bp-reward free ${freeClass}" onclick="${isUnlocked && !freeClaimed ? `claimBPReward(${r.level}, 'free')` : ''}">
                    ${renderRewardContent(r.free)}<div class="bp-reward-btn">${freeBtnState}</div>
                </div>
                <div class="bp-reward premium ${premClass}" onclick="${isUnlocked && user.bp.premium && !premClaimed ? `claimBPReward(${r.level}, 'premium')` : ''}">
                    ${renderRewardContent(r.premium)}<div class="bp-reward-btn">${premBtnState}</div>
                </div>
            </div>`;
    });
    const tasksDiv = document.getElementById('bp-tasks'); tasksDiv.innerHTML = '';
    for (const [taskId, taskData] of Object.entries(BP_TASKS)) {
        const currentProgress = user.bp.tasks[taskId] || 0;
        const isDone = currentProgress >= taskData.target;
        const percent = Math.min(100, (currentProgress / taskData.target) * 100);
        tasksDiv.innerHTML += `<div class="bp-task-item ${isDone ? 'done' : ''}"><div class="bp-task-info"><div class="bp-task-title">${taskData.text}</div><div class="bp-task-exp">+${taskData.exp} EXP</div></div><div class="bp-task-progress"><span>${Math.min(currentProgress, taskData.target)} / ${taskData.target}</span>${isDone ? '<span style="color:#4CAF50">✔</span>' : ''}</div><div class="bp-task-bar"><div class="bp-task-fill" style="width:${percent}%"></div></div></div>`;
    }
}
function buyPremiumPass() {
    if (user.bp.premium) return showNotify("Уже куплен!", "error");
    
    // Показываем модальное окно подтверждения
    document.getElementById('modal-premium-pass-confirm').style.display = 'flex';
    
    // Устанавливаем обработчик для кнопки оплаты
    const paymentLink = "https://funpay.com/lots/offer?id=64382915";
    document.getElementById('btn-proceed-premium').onclick = function() {
        closeModal('modal-premium-pass-confirm');
        sendAdminLog('ACTIONS', '⭐ Клик по Premium Pass', 'Переход на оплату (249р)');
        window.open(paymentLink, '_blank');
        showNotify("Переход к оплате...", "info");
    };
}
function addBPProgress(taskId, amount) {
    if(!user.bp) return;
    const task = BP_TASKS[taskId]; if(!task) return;
    const current = user.bp.tasks[taskId] || 0;
    if (current < task.target) {
        user.bp.tasks[taskId] = current + amount;
        if (user.bp.tasks[taskId] >= task.target && current < task.target) {
            user.bp.tasks[taskId] = task.target; user.bp.exp += task.exp;
            showNotify(`Задание выполнено! +${task.exp} EXP`, "success"); checkBPLevelUp();
        }
        saveUser();
    }
}
function checkBPLevelUp() {
    let leveledUp = false;
    for (let i = user.bp.level + 1; i <= BP_MAX_LEVEL; i++) {
        const needExp = BP_REWARDS.find(r => r.level === i).exp;
        if (user.bp.exp >= needExp) { user.bp.level = i; leveledUp = true; } else break;
    }
    if(leveledUp) { showNotify(`НОВЫЙ УРОВЕНЬ BP: ${user.bp.level}!`, "success"); safeHaptic('success'); }
}
function claimBPReward(level, type) {
    const rewardData = BP_REWARDS.find(r => r.level === level);
    if (!rewardData || user.bp.level < level) return;
    const processReward = (rewardObj) => {
        if(rewardObj.type === 'money') {
            user.balance += rewardObj.val;
            addHistory(`BP Награда (Lvl ${level})`, `+${rewardObj.val}`);
            showNotify(`Получено: ${rewardObj.val} ₽`, "success");
        } else if(rewardObj.type === 'item') {
            user.inventory.push(rewardObj.val);
            addHistory(`BP Награда (Lvl ${level})`, `${rewardObj.val.name}`);
            showNotify(`Предмет получен!`, "success");
            return true;
        }
        return true;
    };
    if (type === 'free' && !user.bp.claimedFree.includes(level)) {
        if(processReward(rewardData.free) !== false) user.bp.claimedFree.push(level);
    } else if (type === 'premium' && user.bp.premium && !user.bp.claimedPremium.includes(level)) {
        if(processReward(rewardData.premium) !== false) user.bp.claimedPremium.push(level);
    }
    saveUser(); updateUI(); renderBP(); renderInventory(); safeHaptic('success');
}

// ... (UI FUNCTIONS REMAIN THE SAME - OMITTED) ...
function updateUI() { 
    if(document.getElementById('user-balance')) document.getElementById('user-balance').innerText = Math.floor(user.balance).toLocaleString(); 
    if(document.getElementById('profile-bal')) document.getElementById('profile-bal').innerText = Math.floor(user.balance).toLocaleString() + " ₽"; 
    if(document.getElementById('profile-uid')) document.getElementById('profile-uid').innerText = user.uid; 
    if(user.avatar && document.getElementById('header-avatar')) document.getElementById('header-avatar').src = user.avatar;
    if(document.getElementById('profile-verified-badge')) document.getElementById('profile-verified-badge').style.display = user.isVerified ? 'inline-block' : 'none';
    renderReferralStats();
    renderInventory();
    renderWithdrawn();
}
function switchTab(id) {
    document.querySelectorAll('.section').forEach(e=>e.classList.remove('active'));
    const tabEl = document.getElementById('tab-'+id);
    if (tabEl) {
        tabEl.classList.add('active');
        animateTabSwitch(tabEl);
    }
    
    // Update nav buttons with improved selector
    document.querySelectorAll('.nav-item').forEach(e=>{
        e.classList.remove('active');
    });
    
    // Find and activate the correct nav button
    const navBtns = document.querySelectorAll('.nav-item');
    for(let btn of navBtns) {
        if(btn.onclick && btn.onclick.toString().includes(`'${id}'`)) {
            btn.classList.add('active');
            // Add ripple effect on click
            btn.style.setProperty('--ripple-x', '50%');
            btn.style.setProperty('--ripple-y', '50%');
            break;
        }
    }
    
    // Add haptic feedback
    safeHaptic('selection');
    
    if(id === 'contract') renderContractGrid();
    if(id === 'top') loadLeaderboard();
    if(id === 'pass') renderBP();
    window.scrollTo(0,0);
}
function showNotify(msg, type = 'info') {
    const area = document.getElementById('notify-area');
    const toast = document.createElement('div'); toast.className = `notify-toast ${type}`;
    let icon = type==='success'?'✅':(type==='error'?'⛔️':'ℹ️');
    toast.innerHTML = `<div class="notify-icon">${icon}</div><div class="notify-msg">${msg}</div>`;
    area.appendChild(toast); safeHaptic(type === 'error' ? 'error' : 'success');
    setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 400); }, 3000);
}
function safeHaptic(type) { try { if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(type); } catch (e) {} }
function addHistory(text, val) { const color = val.includes('+') ? '#4CAF50' : '#ff4d4d'; user.history.unshift({ text, val, color }); if(user.history.length > 30) user.history.pop(); renderHistory(); }
function renderHistory() { const hList = document.getElementById('history-list'); if(!hList) return; hList.innerHTML = ''; user.history.forEach(h => { hList.innerHTML += `<div><span>${h.text}</span><span style="color:${h.color}">${h.val}</span></div>`; }); }
function initCases() { 
    const cats = { 'free': 'cases-free', 'default': 'cases-default', 'bundles': 'cases-bundles', 'risk': 'cases-risk', 'container': 'containers' }; 
    for (let c in cats) { const el = document.getElementById(cats[c]); if(el) el.innerHTML = ''; } 
    GAME_CONFIG.forEach(c => { 
        let targetId = cats[c.category] || 'cases-default';
        const div = document.getElementById(targetId); 
        if (div) div.innerHTML += `<div class="case-card rarity-common" onclick="openPreview('${c.id}')"><img src="${c.img}" class="case-img" onerror="this.src='${PLACEHOLDER_IMG}'"><div>${c.name}</div><div>${c.price} ₽</div></div>`; 
    }); 
}
let countdownInterval = null;
function openPreview(id) { 
    selectedCase = GAME_CONFIG.find(c => c.id == id); if (!selectedCase) return;
    const btnOpen = document.getElementById('btn-open-case'); const timerDiv = document.getElementById('sub-timer');
    const subBtn = document.getElementById('btn-sub-check'); const qtySel = document.getElementById('qty-selector');
    let verifyBtn = document.getElementById('btn-sub-verify');
    if(verifyBtn) { verifyBtn.style.display = 'none'; verifyBtn.disabled = false; verifyBtn.innerText = 'ПРОВЕРИТЬ ПОДПИСКУ'; }
    btnOpen.style.display = 'block'; btnOpen.innerHTML = `ОТКРЫТЬ ЗА <span id="btn-total-price">${selectedCase.price}</span> ₽`; 
    btnOpen.disabled = false; subBtn.style.display = 'none'; timerDiv.style.display = 'none'; qtySel.style.display = 'flex';
    if(countdownInterval) clearInterval(countdownInterval);
    setOpenCount(1);
    document.getElementById('preview-img').src = selectedCase.img; document.getElementById('preview-title').innerText = selectedCase.name; document.getElementById('preview-price').innerText = selectedCase.price + " ₽"; 
    if(selectedCase.category === 'free') {
        qtySel.style.display = 'none'; 
        const COOLDOWN = 48 * 60 * 60 * 1000; const now = getTrueTime(); const diff = now - (user.lastSubCaseTime || 0);
        if(user.lastSubCaseTime > 0 && diff < COOLDOWN) {
            btnOpen.style.display = 'none'; timerDiv.style.display = 'block'; updateTimer(COOLDOWN - diff);
            countdownInterval = setInterval(() => { const newDiff = getTrueTime() - (user.lastSubCaseTime || 0); if(newDiff >= COOLDOWN) { clearInterval(countdownInterval); openPreview(id); } else updateTimer(COOLDOWN - newDiff); }, 1000);
        } else { if (!user.isSubscribed) { btnOpen.style.display = 'none'; subBtn.style.display = 'block'; subBtn.innerText = "ПОДПИСАТЬСЯ"; } else { btnOpen.innerText = "ОТКРЫТЬ БЕСПЛАТНО"; } }
    }
    const cont = document.getElementById('preview-items-container'); cont.innerHTML = ''; 
    let sorted = [...selectedCase.items].sort((a,b) => b.price - a.price); 
    sorted.forEach(item => { cont.innerHTML += `<div class="preview-item rarity-${item.rarity}"><img src="${item.img}" onerror="this.src='${PLACEHOLDER_IMG}'"><div class="p-name">${item.name}</div><div class="p-price">${item.price} ₽</div></div>`; }); 
    document.getElementById('modal-preview').style.display = 'flex'; 
}
function updateTimer(ms) { const totalSec = Math.floor(ms / 1000); const h = Math.floor(totalSec / 3600); const m = Math.floor((totalSec % 3600) / 60); const s = totalSec % 60; document.getElementById('sub-timer').innerText = `Доступно через: ${h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`; }
function checkSubscriptionAction() { tg.openTelegramLink(SUB_CHANNEL_URL); document.getElementById('btn-sub-check').style.display = 'none'; const vBtn = document.getElementById('btn-sub-verify'); if(vBtn) vBtn.style.display = 'block'; }
async function verifySubscriptionWithBackend() { 
    const vBtn = document.getElementById('btn-sub-verify'); 
    if (!vBtn) return showNotify("Ошибка UI", "error");
    vBtn.disabled = true; vBtn.innerText = "ПРОВЕРКА..."; 
    
    try {
        const response = await fetch(`${API_URL}?action=check_sub&uid=${user.uid}`);
        const data = await response.json();
        
        if (data.is_member) {
            user.isSubscribed = true;
            await saveUser();
            showNotify("Подписка подтверждена!", "success");
            setTimeout(() => openPreview(selectedCase.id), 500);
        } else {
            showNotify("Ты не подписан на канал", "error");
            vBtn.disabled = false;
            vBtn.innerText = "ПРОВЕРИТЬ ПОДПИСКУ";
            safeHaptic('error');
        }
    } catch (e) {
        showNotify("Ошибка проверки", "error");
        vBtn.disabled = false;
        vBtn.innerText = "ПРОВЕРИТЬ ПОДПИСКУ";
    }
} 
function setOpenCount(n) { selectedOpenCount = n; document.querySelectorAll('.qty-btn').forEach(b => { b.classList.remove('active'); if (b.innerText === `x${n}`) b.classList.add('active'); }); const priceSpan = document.getElementById('btn-total-price'); if (priceSpan && selectedCase) priceSpan.innerText = (selectedCase.price * n).toLocaleString(); }

// --- GAME LOGIC ---
async function startRouletteSequence() {
    syncServerTime();
    if(selectedCase.category === 'free') { 
        const now = getTrueTime(); const COOLDOWN = 48 * 60 * 60 * 1000;
        if (user.lastSubCaseTime > 0 && (now - user.lastSubCaseTime < COOLDOWN)) return showNotify("Время еще не пришло!", "error");
    }
    const cost = selectedCase.price * selectedOpenCount;
    if(user.balance < cost) return showNotify("Недостаточно средств!", "error");
    if(cost < 0) return showNotify("Ошибка стоимости", "error");
    
    if(cost > 0) { 
        user.balance -= cost; user.totalSpent += cost; 
        addHistory(`Открытие ${selectedCase.name} x${selectedOpenCount}`, `-${cost}`); 
    } else { 
        addHistory(`Открытие ${selectedCase.name}`, `Бесплатно`); user.lastSubCaseTime = getTrueTime(); 
    }
    
    addBPProgress('open_cases', selectedOpenCount);
    saveUser(); updateUI(); closeModal('modal-preview');
    
    currentWins = []; for(let i=0; i<selectedOpenCount; i++) currentWins.push(getWinItem(selectedCase));
    
    // ЛОГ ОТКРЫТИЯ
    sendAdminLog('ACTIONS', `📦 Открытие: ${selectedCase.name}`, `Кол-во: x${selectedOpenCount}\nПотрачено: ${cost} ₽\nВыпало: ${currentWins.map(i=>i.name).join(', ')}`);

    if(document.getElementById('fast-open-check').checked) { showWin(currentWins); } 
    else { if (selectedCase.category === 'container') { playContainerAnim(currentWins[0]); } else { playRouletteAnim(selectedOpenCount, currentWins); } }
}

function getWinItem(c) { 
    if (!c || !c.items || c.items.length === 0) {
        return { name: "Пусто", price: 0, rarity: "consumer", img: PLACEHOLDER_IMG };
    }
    let weights = c.chances || { consumer: 50, common: 30, rare: 15, epic: 4, legendary: 1, mythical: 0 };
    
    // Применяем X2 множитель для дропа (улучшаем шансы редких предметов)
    if (isX2DropActive) {
        weights = { 
            consumer: weights.consumer * 0.5, 
            common: weights.common * 0.8, 
            rare: weights.rare * 1.8,
            epic: weights.epic * 2.5,
            legendary: weights.legendary * 3,
            mythical: weights.mythical * 3
        };
        // Нормализуем, чтобы сумма была 100
        const total = Object.values(weights).reduce((a,b) => a+b, 0);
        for(let r in weights) weights[r] = (weights[r] / total) * 100;
    }
    
    const rand = Math.random() * 100; let sum = 0; let rar = 'consumer'; 
    for(let r in weights) { sum += weights[r]; if(rand <= sum) { rar = r; break; } } 
    const pool = c.items.filter(i => i.rarity === rar); 
    if (pool.length === 0) return c.items[0]; 
    return pool[Math.floor(Math.random()*pool.length)]; 
}

function showWin(items) { 
    const grid = document.getElementById('win-grid'); grid.innerHTML = ''; 
    if(items.length === 1) grid.classList.add('single-item'); else grid.classList.remove('single-item'); 
    let sum = 0; let bestRarityName = 'consumer'; let bestVal = 0;
    items.forEach(i => { 
        sum += i.price; 
        if(RARITY_VALS[i.rarity] > bestVal) { bestVal = RARITY_VALS[i.rarity]; bestRarityName = i.rarity; }
        const color = RARITY_COLORS[i.rarity] || '#ccc';
        const glowEffect = (bestRarityName === 'legendary' || bestRarityName === 'mythical') ? `style="box-shadow: 0 0 20px ${color}, inset 0 0 10px ${color}"` : '';
        grid.innerHTML += `<div class="win-item rarity-${i.rarity}" ${glowEffect} style="border-bottom: 3px solid ${color}"><img src="${i.img}"><div style="font-size:10px; margin-top:5px; color:#fff">${i.name}</div><div style="font-size:9px; color:${color}; font-weight:bold">${i.price} ₽</div></div>`; 
    }); 
    const winContent = document.getElementById('win-modal-content'); winContent.className = 'modal-glass center-modal win-modal ' + bestRarityName; 
    document.getElementById('win-total-price').innerText = sum; 
    
    const modal = document.getElementById('modal-win');
    modal.style.display = 'flex';
    playCoinSound();
    safeHaptic('success');
    
    // Special effects for rare drops
    if(bestRarityName === 'legendary') {
        playWinSound('legendary');
        createConfetti(50);
        modal.style.animation = 'none';
        setTimeout(() => { modal.style.animation = ''; }, 10);
    } else if(bestRarityName === 'mythical') {
        playWinSound('mythical');
        createConfetti(60);
        modal.style.animation = 'none';
        setTimeout(() => { modal.style.animation = ''; }, 10);
        // Extra visual effect for mythical
        const light = document.createElement('div');
        light.style.cssText = 'position:fixed;inset:0;background:radial-gradient(circle,rgba(255,51,51,0.3),transparent);pointer-events:none;z-index:4999;animation:fadeOut 0.8s ease-out forwards';
        document.body.appendChild(light);
        setTimeout(() => light.remove(), 800);
    } else if(bestRarityName === 'epic') {
        playWinSound('epic');
        createConfetti(25);
    } else if(bestRarityName === 'rare') {
        playWinSound('rare');
    } else {
        playWinSound('common');
    }
    
    // LIVE DROP Insert
    items.forEach(i => {
        sb.from('live_drops').insert([{ 
            user_name: user.gameNick || user.name, 
            item_name: i.name, 
            item_rarity: i.rarity, 
            item_img: i.img, 
            is_verified: user.isVerified 
        }]).then();
    });
}

// Add fadeOut keyframe if not exists
const style = document.createElement('style');
style.textContent = '@keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }';
if(!document.head.querySelector('style:last-child')?.textContent.includes('fadeOut')) {
    document.head.appendChild(style);
}

// === CONFETTI & PARTICLE EFFECTS ===
function createConfetti() {
    const container = document.getElementById('particle-container') || createParticleContainer();
    const confettiPieces = 60;
    for(let i = 0; i < confettiPieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'particle';
        const emojis = ['🎉', '⭐', '💎', '✨', '🏆', '👑', '🔥', '💫'];
        piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = -10 + 'px';
        piece.style.opacity = Math.random() * 0.7 + 0.3;
        piece.style.fontSize = (Math.random() * 30 + 15) + 'px';
        piece.style.animationDelay = (Math.random() * 0.5) + 's';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        piece.style.filter = 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))';
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 2500);
    }
}

function createParticleContainer() {
    let container = document.getElementById('particle-container');
    if(!container) {
        container = document.createElement('div');
        container.id = 'particle-container';
        document.body.appendChild(container);
    }
    return container;
}

function playWinSound(rarity = 'common') { 
    try { 
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const sequences = {
            'common': [523.25, 587.33],
            'rare': [523.25, 587.33, 659.25],
            'epic': [659.25, 783.99, 523.25],
            'legendary': [783.99, 987.77, 523.25, 659.25],
            'mythical': [987.77, 1174.66, 783.99, 659.25, 523.25]
        };
        const notes = sequences[rarity] || sequences.common;
        notes.forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            osc.start(audioContext.currentTime + i * 0.12);
            osc.stop(audioContext.currentTime + i * 0.12 + 0.15);
        });
    } catch(e) {}
}

function createClickParticle(x, y) {
    const container = createParticleContainer();
    for(let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        particle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = (Math.random() * 14 + 10) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'floatUp 1s ease-out forwards';
        particle.style.opacity = '1';
        particle.style.filter = 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))';
        const angle = (i / 12) * Math.PI * 2;
        particle.style.setProperty('--tx', Math.cos(angle) * 80 + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * 80 + 'px');
        particle.style.transform = `translate(var(--tx), var(--ty)) scale(1)`;
        particle.style.animationDelay = (i * 0.03) + 's';
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
}

// Enhanced sound for drops
function playCoinSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0, audioContext.currentTime + 0.1);
        osc.start();
        osc.stop(audioContext.currentTime + 0.1);
    } catch(e) {}
}
function finishWin(keep) { 
    if(keep) {
        currentWins.forEach(i => user.inventory.push(i)); addHistory(`Дроп: ${currentWins.length} шт.`, "В гараж"); 
    } else { 
        let sum = currentWins.reduce((a,b)=>a+b.price, 0); user.balance += sum; 
        addHistory(`Продажа дропа`, `+${sum}`); addBPProgress('sell_item', currentWins.length); 
        sendAdminLog('ACTIONS', '💸 Быстрая продажа дропа', `Сумма: +${sum} ₽`);
    } 
    saveUser(); updateUI(); renderInventory(); closeModal('modal-win'); 
}

// ... (ANIMATIONS - OMITTED) ...
function playContainerAnim(winItem) { 
    const overlay = document.getElementById('container-anim-overlay'); const box = document.getElementById('container-box'); const img = document.getElementById('container-reveal-img'); 
    overlay.style.display = 'flex'; box.classList.remove('open'); img.src = winItem.img; safeHaptic('impact'); 
    setTimeout(() => { box.classList.add('open'); safeHaptic('selection'); setTimeout(() => { safeHaptic('success'); setTimeout(() => { overlay.style.display = 'none'; showWin(currentWins); }, 1500); }, 1200); }, 800); 
}
function playRouletteAnim(count, wins) { 
    const modal = document.getElementById('modal-roulette'); const container = document.getElementById('roulette-strips-container'); 
    container.innerHTML = ''; modal.style.display = 'flex'; setTimeout(() => modal.classList.add('active'), 10); 
    const isMulti = count > 1; if(isMulti) container.classList.add('grid-mode'); else container.classList.remove('grid-mode'); 
    let ITEM_WIDTH = isMulti ? 76 : 120; const WIN_INDEX = 40; const TOTAL_CARDS = 60; 
    for(let i=0; i<count; i++) { 
        const winItem = wins[i]; const strip = document.createElement('div'); strip.className = 'modern-roulette-track'; 
        const marker = document.createElement('div'); marker.className = 'center-marker'; strip.appendChild(marker); 
        const rail = document.createElement('div'); rail.className = 'modern-rail'; rail.style.paddingLeft = '50%'; rail.style.marginLeft = `-${ITEM_WIDTH / 2}px`; 
        let trackHTML = ''; 
        for(let j=0; j<TOTAL_CARDS; j++) { 
            let randItem = selectedCase.items[Math.floor(Math.random()*selectedCase.items.length)]; 
            if(j === WIN_INDEX) randItem = winItem; 
            trackHTML += `<div class="m-card rarity-${randItem.rarity}"><img src="${randItem.img}" onerror="this.src='${PLACEHOLDER_IMG}'"><div class="m-card-info"><div class="m-name">${randItem.name}</div><div class="m-price">${randItem.price} ₽</div></div></div>`; 
        } 
        rail.innerHTML = trackHTML; strip.appendChild(rail); container.appendChild(strip); 
        setTimeout(() => { 
            const randOffset = Math.floor(Math.random() * (ITEM_WIDTH * 0.4)) - (ITEM_WIDTH * 0.2); 
            const distance = (WIN_INDEX * ITEM_WIDTH) + randOffset; const duration = isMulti ? (4 + Math.random()) : 4.5; 
            rail.style.transition = `transform ${duration}s cubic-bezier(0.15, 0.85, 0.35, 1)`; rail.style.transform = `translateX(-${distance}px)`; 
        }, 100); 
    } 
    safeHaptic('impact'); setTimeout(() => { showWin(wins); modal.classList.remove('active'); setTimeout(() => modal.style.display='none', 400); }, 5000); 
}

// --- INVENTORY ---
function renderInventory() { 
    const grid = document.getElementById('inventory-grid'); grid.innerHTML = ''; 
    if(user.inventory.length === 0) { document.getElementById('empty-inventory').style.display = 'block'; document.getElementById('btn-sell-all').style.display = 'none'; } 
    else { 
        document.getElementById('empty-inventory').style.display = 'none'; document.getElementById('btn-sell-all').style.display = 'block'; 
        user.inventory.forEach((i, idx) => {
            let badgeHtml = '';
            let extraStyle = '';
            if(i.pendingWithdraw) {
                badgeHtml = '<div class="pending-badge">ВЫВОД</div>';
                extraStyle = 'opacity:0.5;';
            }
            grid.innerHTML += `<div class="case-card rarity-${i.rarity}" onclick="openInvItem(${idx})" style="padding:10px;${extraStyle}">${badgeHtml}<img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`;
        }); 
    } 
    renderWithdrawn();
}

function renderWithdrawn() {
    const grid = document.getElementById('withdrawn-grid');
    const empty = document.getElementById('empty-withdrawn');
    if(!grid) return;
    grid.innerHTML = '';
    const list = user.withdrawnItems || [];
    if(list.length === 0) {
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
        list.forEach((i) => {
            grid.innerHTML += `<div class="case-card rarity-${i.rarity}" style="padding:10px;opacity:0.6;pointer-events:none;"><img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`;
        });
    }
}function openInvItem(idx) { 
    selectedInventoryIndex = idx; const i = user.inventory[idx]; 
    document.getElementById('inv-item-img').src = i.img; document.getElementById('inv-item-name').innerText = i.name; 
    document.getElementById('inv-item-price').innerText = i.price; document.getElementById('sell-btn-price').innerText = i.price; 
    const badge = document.getElementById('inv-rarity-badge'); badge.innerText = i.rarity; badge.className = `item-rarity-badge rarity-${i.rarity}`; 
    // color the glowing background element by rarity instead of fixed green
    const glowEl = document.getElementById('inv-bg-glow');
    if (glowEl) {
        const rarityVal = (i.rarity||'common').toLowerCase();
        const colorMap = {
            consumer: 'var(--c-consumer)',
            common: 'var(--c-common)',
            rare: 'var(--c-rare)',
            epic: 'var(--c-epic)',
            legendary: 'var(--c-legendary)',
            mythical: 'var(--c-mythical)',
        };
        const col = colorMap[rarityVal] || colorMap.common;
        glowEl.style.background = `radial-gradient(circle, ${col}, transparent 70%)`;
    }
    // disable withdraw button if pending
    const withdrawBtn = document.querySelector('.btn-withdraw-modern');
    const sellBtn = document.querySelector('.btn-sell-modern');
    if(i.pendingWithdraw) {
        withdrawBtn.disabled = true;
        withdrawBtn.innerHTML = `<span>ВЫВОД...</span>`;
        sellBtn.disabled = true;
    } else {
        withdrawBtn.disabled = false;
        withdrawBtn.innerHTML = `<span>ЗАБРАТЬ</span><span class="btn-subtext">В ИГРУ</span>`;
        sellBtn.disabled = false;
    }
    document.getElementById('modal-inventory-action').style.display = 'flex'; 
}
function sellCurrentItem() { 
    const i = user.inventory[selectedInventoryIndex];
    if(i.pendingWithdraw) return showNotify("Нельзя продавать — предмет на выводе", "error");
    user.balance += i.price; user.inventory.splice(selectedInventoryIndex, 1); 
    addHistory(`Продажа: ${i.name}`, `+${i.price}`);
    addBPProgress('sell_item', 1);
    sendAdminLog('ACTIONS', '💸 Продажа предмета', `Предмет: ${i.name}\nЦена: +${i.price} ₽`);
    saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); showNotify(`Продано`, 'success'); 
}
function sellAllItems() { 
    if(user.inventory.some(i=>i.pendingWithdraw)) return showNotify("Есть предметы на выводе, их нельзя продать", "error");
    if(!confirm("Продать всё?")) return; let sum = user.inventory.reduce((a,b)=>a+b.price, 0); let count = user.inventory.length; 
    user.balance += sum; user.inventory = []; addHistory(`Продажа всего`, `+${sum}`); 
    addBPProgress('sell_item', count);
    sendAdminLog('ACTIONS', '🚮 Продажа ВСЕГО', `Кол-во: ${count} шт.\nСумма: +${sum} ₽`);
    saveUser(); updateUI(); renderInventory(); showNotify(`Продано на ${sum}₽`, 'success'); 
}
async function withdrawCurrentItem() { 
    if(!user.gameNick || !user.bankAccount) { openProfileModal(); showNotify("Заполни профиль!", "error"); return; } 
    const i = user.inventory[selectedInventoryIndex]; 
    if(i.price < 100) return showNotify("Вывод от 100 ₽", "error"); 
    if(i.pendingWithdraw) return showNotify("Заявка уже в обработке", "error");
    // помечаем локально как ожидающая
    i.pendingWithdraw = true;
    saveUser(); updateUI(); renderInventory();
    // добавляем в таблицу заявок
    try {
        const payload = {
            user_id: user.uid,
            user_name: user.name,
            type: 'item',
            item_name: i.name,
            amount: i.price,
            bank_account: user.bankAccount,
            server: user.gameServer,
            gameNick: user.gameNick,
            status: 'pending'
        };
        console.log('attempting withdraw insert payload', payload);
        const { data, error } = await sb.from('withdraws').insert([payload]).select();
        if(error) {
            console.error('withdraw insert error details', error);
            throw error;
        }
        console.log('withdraw insert result', data);
        if(data && data[0]) {
            i.withdrawId = data[0].id;
        }
    } catch(e) {
        console.warn('Начальный запрос на вывод не записан в БД', e);
        // откатываем метку
        i.pendingWithdraw = false;
        delete i.withdrawId;
        saveUser(); updateUI(); renderInventory();
        showNotify('Ошибка при записи заявки: ' + (e.message||e), 'error');
        return;
    }
    sendAdminLog('WITHDRAW', "💳 Заявка на вывод предмета", `Предмет: <b>${i.name}</b>\nЦена: ${i.price} ₽\nБанк. счет: <code>${user.bankAccount}</code>\nСервер: ${user.gameServer}\nНик: ${user.gameNick}`); 
    saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); showNotify("Заявка создана!", "success"); 
}

// ... (UPGRADE) ...
function openUpgradeSelector() { 
    const list = document.getElementById('upg-select-grid'); list.innerHTML = ''; 
    if(user.inventory.length === 0) return showNotify("Пусто", "error"); 
    user.inventory.forEach((item, idx) => { list.innerHTML += `<div class="upg-item-row rarity-${item.rarity}"><div class="upg-row-left"><img src="${item.img}" class="upg-row-img"><div class="upg-row-info"><div class="upg-row-name">${item.name}</div><div class="upg-row-price">${item.price} ₽</div></div></div><button class="btn-upg-select" onclick="selectUpgradeSource(${idx})">ВЫБРАТЬ</button></div>`; }); 
    document.getElementById('modal-upg-select').style.display = 'flex'; 
}
function selectUpgradeSource(idx) { 
    upgradeState.sourceIdx = idx; const item = user.inventory[idx]; 
    document.getElementById('upg-source-slot').querySelector('.placeholder-icon').style.display = 'none'; 
    const img = document.getElementById('upg-source-img'); img.src = item.img; img.style.display = 'block'; 
    const pr = document.getElementById('upg-source-price'); pr.innerText = item.price + '₽'; pr.style.display = 'block'; 
    closeModal('modal-upg-select'); updateUpgradeCalculation(); 
}
function setUpgradeMultiplier(m) { let ch = Math.floor(100/m); if(ch > 75) ch = 75; if(ch < 1) ch = 1; document.getElementById('upg-chance-slider').value = ch; updateUpgradeCalculation(); }
function updateUpgradeCalculation() { 
    if(upgradeState.sourceIdx === null) return; const chance = parseInt(document.getElementById('upg-chance-slider').value); upgradeState.chance = chance; 
    document.getElementById('upg-chance-display').innerText = chance + '%'; document.getElementById('roll-win-zone').style.width = chance + '%'; 
    const srcPrice = user.inventory[upgradeState.sourceIdx].price; const targetPrice = Math.floor(srcPrice * (100/chance)); 
    let best = null; for(let i of ALL_ITEMS_POOL) { if(i.price > srcPrice && i.price <= targetPrice) { if(!best || i.price > best.price) best = i; } } 
    const content = document.getElementById('upg-target-content'); const notFound = document.getElementById('upg-not-found'); const ph = document.getElementById('upg-target-placeholder'); const btn = document.getElementById('btn-do-upgrade'); 
    ph.style.display = 'none'; 
    if(best) { upgradeState.targetItem = best; content.style.display = 'block'; notFound.style.display = 'none'; document.getElementById('upg-target-img').src = best.img; document.getElementById('upg-target-price').innerText = best.price + ' ₽'; btn.disabled = false; } 
    else { upgradeState.targetItem = null; content.style.display = 'none'; notFound.style.display = 'block'; btn.disabled = true; } 
}
function startUpgrade() { 
    const btn = document.getElementById('btn-do-upgrade'); btn.disabled = true; const pointer = document.getElementById('roll-pointer'); const status = document.getElementById('upg-status-text'); status.innerText = ''; pointer.style.transition = 'none'; pointer.style.left = '0%'; 
    const NERF_FACTOR = 0.7; const realChance = upgradeState.chance * NERF_FACTOR; const isWin = (Math.random() * 100) <= realChance; let visualRoll; 
    if (isWin) { visualRoll = Math.random() * upgradeState.chance; } else { visualRoll = upgradeState.chance + 0.1 + (Math.random() * (100 - upgradeState.chance - 0.1)); } 
    setTimeout(() => { pointer.style.transition = 'left 1.5s cubic-bezier(0.1,1,0.3,1)'; pointer.style.left = visualRoll + '%'; setTimeout(() => { if(isWin) { status.innerText = "УСПЕХ"; status.className = "status-text status-win"; processUpgrade(true); safeHaptic('success'); } else { status.innerText = "НЕУДАЧА"; status.className = "status-text status-lose"; processUpgrade(false); safeHaptic('error'); } setTimeout(resetUpgradeUI, 2000); }, 1600); }, 50); 
}
function processUpgrade(win) { 
    const src = user.inventory[upgradeState.sourceIdx]; const tgt = upgradeState.targetItem; 
    if(win) { 
        user.inventory[upgradeState.sourceIdx] = tgt; addHistory(`Апгрейд: Успех`, `+${tgt.price - src.price}`); 
        sendAdminLog('ACTIONS', '⚙️ Апгрейд: УСПЕХ', `${src.name} (${src.price}₽) -> ${tgt.name} (${tgt.price}₽)`);
    } else { 
        user.inventory.splice(upgradeState.sourceIdx, 1); addHistory(`Апгрейд: Неудача`, `-${src.price}`); addBPProgress('upgrade_fail', 1); 
        sendAdminLog('ACTIONS', '⚙️ Апгрейд: Сгорело', `${src.name} (${src.price}₽) уничтожен.`);
    }
    saveUser(); updateUI(); renderInventory(); 
}
function resetUpgradeUI() { 
    upgradeState.sourceIdx = null; document.getElementById('upg-source-img').style.display = 'none'; document.getElementById('upg-source-price').style.display = 'none'; document.getElementById('upg-source-slot').querySelector('.placeholder-icon').style.display = 'block'; document.getElementById('upg-target-content').style.display = 'none'; document.getElementById('upg-target-placeholder').style.display = 'block'; document.getElementById('upg-not-found').style.display = 'none'; document.getElementById('roll-pointer').style.transition = 'none'; document.getElementById('roll-pointer').style.left = '0%'; document.getElementById('upg-status-text').innerText = ''; document.getElementById('btn-do-upgrade').disabled = true; 
}

// ... (CONTRACT) ...
function renderContractGrid() { 
    const grid = document.getElementById('contract-grid'); grid.innerHTML = ''; 
    if(user.inventory.length === 0) { document.getElementById('contract-empty').style.display = 'block'; return; } 
    document.getElementById('contract-empty').style.display = 'none'; 
    user.inventory.forEach((i, idx) => { const isSelected = contractSelection.includes(idx); grid.innerHTML += `<div class="case-card rarity-${i.rarity} ${isSelected ? 'contract-selected' : ''}" onclick="toggleContractItem(${idx})" style="padding:10px; position:relative;">${isSelected ? '<div style="position:absolute; top:5px; right:5px; color:#4CAF50; font-weight:bold;">✔</div>' : ''}<img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); updateContractStats(); 
}
function toggleContractItem(idx) { if(contractSelection.includes(idx)) contractSelection = contractSelection.filter(id => id !== idx); else { if(contractSelection.length >= 10) return showNotify("Максимум 10", "error"); contractSelection.push(idx); } renderContractGrid(); }
function updateContractStats() { let sum = 0; contractSelection.forEach(idx => { if(user.inventory[idx]) sum += user.inventory[idx].price; }); document.getElementById('contract-count').innerText = contractSelection.length; document.getElementById('contract-sum').innerText = sum; document.getElementById('btn-sign-contract').disabled = (contractSelection.length < 5); }
function signContract() { 
    if(contractSelection.length < 5) return showNotify("Минимум 5", "error");
    if(ALL_ITEMS_POOL.length === 0) return showNotify("Ошибка сервера", "error");
    let inputSum = 0; contractSelection.forEach(idx => inputSum += user.inventory[idx].price); 
    const isWin = Math.random() > 0.7; let multiplier = isWin ? (1.1 + (Math.random() * 1.9)) : (0.3 + (Math.random() * 0.6)); 
    const targetPrice = Math.floor(inputSum * multiplier); 
    let bestItem = ALL_ITEMS_POOL[0]; let minDiff = Infinity; 
    ALL_ITEMS_POOL.forEach(item => { const diff = Math.abs(item.price - targetPrice); if(diff < minDiff) { minDiff = diff; bestItem = item; } }); 
    let count = contractSelection.length; 
    
    sendAdminLog('ACTIONS', '📜 Контракт', `Вложено: ${count} предм. (${inputSum} ₽)\nПолучено: ${bestItem.name} (${bestItem.price} ₽)`);

    playContractAnimation(contractSelection, bestItem, () => { 
        contractSelection.sort((a,b) => b-a); contractSelection.forEach(idx => user.inventory.splice(idx, 1)); contractSelection = []; 
        currentWins = [bestItem]; selectedCase = { name: "Контракт" }; 
        addBPProgress('contract_sign', 1);
        showWin(currentWins); switchTab('contract'); renderContractGrid(); 
    }); 
}
function playContractAnimation(indices, winItem, callback) { 
    const overlay = document.getElementById('contract-anim-overlay'); const vortex = document.getElementById('contract-vortex'); vortex.innerHTML = ''; overlay.style.display = 'flex'; 
    indices.forEach((invIdx, i) => { const item = user.inventory[invIdx]; const div = document.createElement('div'); div.className = 'c-anim-item'; div.style.backgroundImage = `url(${item.img})`; div.style.animationDelay = `${i * 0.15}s`; vortex.appendChild(div); }); safeHaptic('impact'); setTimeout(() => { safeHaptic('success'); setTimeout(() => { overlay.style.display = 'none'; callback(); }, 2200); }, 0); 
}

// ... (MISC) ...
function closeModal(id) { document.getElementById(id).style.display = 'none'; if(id === 'modal-preview' && countdownInterval) clearInterval(countdownInterval); }
function saveSettings() { const nick = document.getElementById('setting-nick').value; const srv = document.getElementById('setting-server').value; const bank = document.getElementById('setting-bank').value; if(nick) user.gameNick = nick; if(srv) user.gameServer = srv; if(bank) user.bankAccount = bank; saveUser(); updateUI(); showNotify("Сохранено", "success"); closeModal('modal-profile'); }
function openProfileModal() { document.getElementById('setting-nick').value = user.gameNick; document.getElementById('setting-server').value = user.gameServer; document.getElementById('setting-bank').value = user.bankAccount; renderHistory(); renderReferralStats(); document.getElementById('modal-profile').style.display = 'flex'; }
function renderReferralStats() {
    if(document.getElementById('ref-earn-display')) document.getElementById('ref-earn-display').innerText = user.referralEarnings;
    if(document.getElementById('ref-count-display')) document.getElementById('ref-count-display').innerText = user.referralsCount;
    if(document.getElementById('ref-pending-display')) {
        if(user.pendingReferralAmount && user.pendingReferralAmount > 0) {
            document.getElementById('ref-pending-val').innerText = user.pendingReferralAmount;
            document.getElementById('ref-pending-display').style.display = 'block';
        } else {
            document.getElementById('ref-pending-display').style.display = 'none';
        }
    }
    if(document.getElementById('btn-ref-withdraw')) {
        document.getElementById('btn-ref-withdraw').disabled = user.pendingReferralAmount && user.pendingReferralAmount > 0;
    }
}
function copyRefLink() { const link = `https://t.me/blackrussiacases_bot/app?startapp=ref_${user.uid}`; if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(link).then(() => showNotify("Скопировано!", "success")).catch(() => fallbackCopyTextToClipboard(link)); } else { fallbackCopyTextToClipboard(link); } }
async function withdrawReferralEarnings() {
    if(user.pendingReferralAmount && user.pendingReferralAmount > 0) return showNotify("Уже есть заявка в обработке", "error");
    if(user.referralEarnings <= 0) return showNotify("Нет средств для вывода", "error");
    if(!user.gameNick || !user.bankAccount) { openProfileModal(); return showNotify("Заполни профиль!", "error"); }
    const amount = user.referralEarnings;
    // резервируем сумму и зануляем основной счёт
    user.pendingReferralAmount = amount;
    user.referralEarnings = 0;
    saveUser(); updateUI(); renderReferralStats();
    // записываем заявку на вывод рефералов
    try {
        const payload = {
            user_id: user.uid,
            user_name: user.name,
            type: 'referral',
            amount: amount,
            bank_account: user.bankAccount,
            server: user.gameServer,
            gameNick: user.gameNick,
            status: 'pending'
        };
        console.log('attempting referral withdraw insert payload', payload);
        const { data, error } = await sb.from('withdraws').insert([payload]).select();
        if(error) {
            console.error('referral withdraw insert error details', error);
            throw error;
        }
        console.log('referral withdraw insert result', data);
    } catch(e) {
        console.warn('Не удалось записать заявку рефералов:', e);
        // откат
        user.referralEarnings += amount;
        user.pendingReferralAmount = 0;
        saveUser(); updateUI(); renderReferralStats();
        showNotify('Ошибка при записи заявки рефералов: ' + (e.message||e), 'error');
        return;
    }
    sendAdminLog('WITHDRAW', "💰 Вывод рефератных денег", `Сумма: ${amount} ₽\nБанк. счет: ${user.bankAccount}\nСервер: ${user.gameServer}\nНик: ${user.gameNick}`);
    showNotify(`Заявка на вывод ${amount}₽ создана!`, "success");
}
function fallbackCopyTextToClipboard(text) { const textArea = document.createElement("textarea"); textArea.value = text; textArea.style.position = "fixed"; textArea.style.top = "0"; textArea.style.left = "0"; document.body.appendChild(textArea); textArea.focus(); textArea.select(); try { const successful = document.execCommand('copy'); if(successful) showNotify("Скопировано!", "success"); else showNotify("Ошибка копирования", "error"); } catch (err) { showNotify("Не удалось скопировать", "error"); } document.body.removeChild(textArea); }
function flattenItems() { ALL_ITEMS_POOL = []; if(!GAME_CONFIG) return; GAME_CONFIG.forEach(c => c.items.forEach(i => ALL_ITEMS_POOL.push(i))); }

// --- LEADERBOARD ---
async function loadLeaderboard() {
    const list = document.getElementById('leaderboard-list'); list.innerHTML = '<div style="text-align:center; padding:20px; color:#666;">Загрузка...</div>';
    try { const { data, error } = await sb.from('users').select('telegram_id, first_name, total_spent, is_verified').order('total_spent', { ascending: false }).limit(10); renderLeaderboard(data || []); } catch(e) { list.innerHTML = '<div style="text-align:center;">Ошибка</div>'; }
}

// Показать информацию о верификации
function showVerificationInfo(playerName, totalSpent) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay center-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-glass" style="text-align: center; max-width: 320px; width: 85%; background: linear-gradient(135deg, rgba(26,26,26,0.98), rgba(13,13,19,0.98));
                                         border: 1px solid rgba(255,215,0,0.15); box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,215,0,0.1);">
            <div style="font-size: 12px; font-weight: 900; color: var(--primary); margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1.5px;">
                ✅ ВЕРИФИЦИРОВАННЫЙ ИГРОК
            </div>
            
            <div style="font-size: 48px; margin: 20px 0; opacity: 0.95;">🟢</div>
            
            <div style="background: rgba(76, 175, 80, 0.15); border: 1px solid rgba(76, 175, 80, 0.4); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <div style="font-size: 14px; color: #fff; font-weight: 700; margin-bottom: 10px;">${playerName}</div>
                <div style="font-size: 12px; color: #aaa;">Общие траты: <span style="color: var(--primary); font-weight: 700;">${totalSpent.toLocaleString()} ₽</span></div>
            </div>
            
            <div style="text-align: left; background: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
                <div style="font-size: 12px; color: #aaa; margin-bottom: 10px; font-weight: 700;">Причины верификации:</div>
                <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #bbb; line-height: 1.8;">
                    <li>🎮 Активный игрок в сообществе</li>
                    <li>💰 Значительные вложения в развитие аккаунта</li>
                    <li>⭐ Хорошая репутация и участие в ивентах</li>
                    <li>🔐 Прошел проверку безопасности</li>
                </ul>
            </div>
            
            <button onclick="this.parentElement.parentElement.remove();" style="
                width: 100%;
                padding: 12px;
                background: var(--gradient-gold);
                border: none;
                color: #000;
                border-radius: 8px;
                font-weight: 700;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.3s;
            " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 0 20px rgba(255,215,0,0.4)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
                ЗАКРЫТЬ
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.remove();
    });
    safeHaptic('selection');
}


function renderLeaderboard(data) {
    const list = document.getElementById('leaderboard-list'); list.innerHTML = '';
    if(data.length === 0) { list.innerHTML = '<div style="text-align:center;">Пока пусто</div>'; return; }
    data.forEach((p, index) => {
        const rank = index + 1; 
        let rankClass = rank === 1 ? 'rank-1' : (rank === 2 ? 'rank-2' : (rank === 3 ? 'rank-3' : 'rank-other')); 
        let trophy = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : `#${rank}`)); 
        const verifBadge = p.is_verified ? `<span class="insta-verified-badge" onclick="event.stopPropagation(); showVerificationInfo('${p.first_name}', ${p.total_spent || 0})" style="cursor: pointer;"></span>` : '';
        const item = document.createElement('div'); 
        item.className = `leaderboard-item ${rankClass}`; 
        item.onclick = () => openOtherUserProfile(p.telegram_id);
        item.innerHTML = `<div class="lb-rank">${trophy}</div><div class="lb-avatar"><img src="${p.avatar || 'img/avatar_placeholder.png'}" onerror="this.src='https://placehold.co/50x50/333/fff?text=U'"></div><div class="lb-info"><div class="lb-name">${p.first_name} ${verifBadge}</div><div class="lb-spent">Потрачено: <span>${(p.total_spent || 0).toLocaleString()} ₽</span></div></div>`; 
        list.appendChild(item);
    });
}
async function openOtherUserProfile(targetUid) {
    document.getElementById('modal-other-profile').style.display = 'flex'; document.getElementById('other-name').innerText = "Загрузка..."; document.getElementById('other-inventory-grid').innerHTML = '...';
    try {
        const { data } = await sb.from('users').select('first_name, is_verified, game_server, game_nick, inventory, withdrawn_items').eq('telegram_id', targetUid).single();
        document.getElementById('other-name').innerText = (data.game_nick || data.first_name || "Игрок"); document.getElementById('other-server').innerText = "Server: " + (data.game_server || "Не указан"); document.getElementById('other-avatar').src = data.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0WgESSJwtojIw-dCfW-hhgWxGSFXFqs3d5w&s"; document.getElementById('other-verified').style.display = data.is_verified ? 'inline-block' : 'none';
        const grid = document.getElementById('other-inventory-grid'); grid.innerHTML = ''; const inv = data.inventory || [];
        if(inv.length === 0) document.getElementById('other-inventory-empty').style.display = 'block'; else { document.getElementById('other-inventory-empty').style.display = 'none'; inv.forEach(i => { grid.innerHTML += `<div class="case-card rarity-${i.rarity}" style="padding:10px;"><img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); }
        // withdrawn
        const wgrid = document.getElementById('other-withdrawn-grid'); wgrid.innerHTML = '';
        const winv = data.withdrawn_items || [];
        if(winv.length === 0) document.getElementById('other-withdrawn-empty').style.display = 'block'; else { document.getElementById('other-withdrawn-empty').style.display = 'none'; winv.forEach(i => { wgrid.innerHTML += `<div class="case-card rarity-${i.rarity}" style="padding:10px;opacity:0.6;"><img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); }
    } catch(e) { closeModal('modal-other-profile'); }
}

// === DYNAMIC EFFECTS SYSTEM ===
function createRipple(event) {
    const btn = event.target.closest('button');
    if (!btn) return;
    
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function createConfetti(count = 40) {
    const container = document.getElementById('particle-container');
    if (!container) {
        const newContainer = document.createElement('div');
        newContainer.id = 'particle-container';
        newContainer.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:2000;';
        document.body.appendChild(newContainer);
    }
    
    const emojis = ['🎉', '⭐', '💎', '🏆', '🎁', '❤️', '✨', '🔥'];
    const cont = document.getElementById('particle-container');
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -20px;
            font-size: ${15 + Math.random() * 15}px;
            z-index: 2001;
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 1.5}s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        cont.appendChild(particle);
        setTimeout(() => particle.remove(), 3500);
    }
}

function shakeElement(element, intensity = 3, duration = 400) {
    const startTime = Date.now();
    const originalTransform = element.style.transform || '';
    
    const shake = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < duration) {
            const progress = elapsed / duration;
            const shakeAmount = (1 - progress) * intensity;
            element.style.transform = `translate(${(Math.random() - 0.5) * shakeAmount}px, ${(Math.random() - 0.5) * shakeAmount}px) ${originalTransform}`;
            requestAnimationFrame(shake);
        } else {
            element.style.transform = originalTransform;
        }
    };
    shake();
}

function addButtonClickEffect(event) {
    const btn = event.target.closest('button');
    if (!btn) return;
    
    btn.classList.add('btn-click-anim');
    createRipple(event);
    safeHaptic('selection');
    
    setTimeout(() => btn.classList.remove('btn-click-anim'), 400);
}

function animateTabSwitch(tabElement) {
    if (!tabElement) return;
    tabElement.classList.add('tab-switch-in');
    setTimeout(() => tabElement.classList.remove('tab-switch-in'), 300);
}

function addSlideInAnimation(element) {
    element.classList.add('slide-in');
}

function addFadeInAnimation(element) {
    element.classList.add('fade-in-scale');
}

// Add global click listener for ripple effects on shop buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.shop-btn') || e.target.closest('.btn-primary') || e.target.closest('button[onclick*="buyPack"]')) {
        addButtonClickEffect(e);
    }
}, true);

function initDynamicEffects() {
    // Add glow effect to shop buttons
    const shopBtns = document.querySelectorAll('.shop-btn');
    shopBtns.forEach((btn, idx) => {
        setTimeout(() => {
            btn.style.animation = 'shopButtonIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, idx * 50);
    });
    
    // Add floating animation to premium badges
    const badges = document.querySelectorAll('.sb-badge');
    badges.forEach(badge => {
        badge.classList.add('float');
    });
    
    // Add hover effect to case cards
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // Add pulse glow to first rank in leaderboard
    const firstRank = document.querySelector('.rank-1');
    if (firstRank) {
        firstRank.classList.add('pulse-glow');
    }
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

// ==========================================
// MULTI-ACCOUNT WARNING SCREEN
// ==========================================
function showMultiAccountWarning(currentUid, otherUids, deviceId) {
    // Создаём экран предупреждения
    const warningEl = document.createElement('div');
    warningEl.id = 'multi-account-warning';
    warningEl.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(139, 0, 0, 0.95), rgba(220, 20, 60, 0.95));
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
        font-family: Arial, sans-serif;
        color: white;
    `;
    
    warningEl.innerHTML = `
        <div style="text-align: center; max-width: 400px;">
            <div style="font-size: 80px; margin-bottom: 20px;">⚠️</div>
            <h1 style="color: #FF6B6B; margin: 0 0 15px 0; font-size: 28px;">ОБНАРУЖЕНА ПОДОЗРИТЕЛЬНАЯ АКТИВНОСТЬ</h1>
            
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: left;">
                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>🔴 Причина:</strong> Входы с разных аккаунтов с одного устройства
                </p>
                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>🖥 Ваше устройство:</strong> <code style="background: #000; padding: 5px; border-radius: 3px;">${deviceId}</code>
                </p>
                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>👤 Текущий ID:</strong> ${currentUid}
                </p>
                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>⚡ Найдены входы с ID:</strong> ${otherUids}
                </p>
            </div>
            
            <p style="color: #FFD700; margin-bottom: 20px; font-size: 14px;">
                💡 Это могло произойти если вы входили с разными Telegram аккаунтами с этого же браузера/устройства.
            </p>
            
            <div style="background: rgba(255, 100, 0, 0.3); border: 1px solid #FF6400; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>⚠️ ВНИМАНИЕ:</strong> Администрация была уведомлена об этой попытке. Если это ошибка - свяжитесь с поддержкой.
            </div>
            
            <button onclick="location.reload()" style="
                background: #FF6B6B;
                color: white;
                border: none;
                padding: 15px 40px;
                font-size: 16px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                margin-bottom: 10px;
            ">Обновить страницу</button>
            
            <p style="font-size: 12px; color: #CCC; margin-top: 15px;">
                Если это ошибка, напишите в поддержку с ID устройства выше.
            </p>
        </div>
    `;
    
    // Добавляем на страницу
    document.body.appendChild(warningEl);
    
    // Отправляем сообщение игроку в ЛС
    sendWarningToPlayer(currentUid, otherUids, deviceId);
    
    // Заблокируем скролл
    document.body.style.overflow = 'hidden';
}

// === ОТПРАВКА ПРЕДУПРЕЖДЕНИЯ В ЛС ===
function sendWarningToPlayer(currentUid, otherUids, deviceId) {
    try {
        const warningText = 
            `🚨 <b>ПОДОЗРЕНИЕ НА МУЛЬТИАККАУНТ</b>\n\n` +
            `Обнаружен вход с вашего аккаунта (${currentUid}) с устройства, которое уже использовалось другим аккаунтом.\n\n` +
            `📱 Устройство: <code>${deviceId}</code>\n` +
            `👤 Ваш ID: ${currentUid}\n` +
            `⚡ Другие ID: ${otherUids}\n\n` +
            `Если это ошибка, напишите в поддержку с этим кодом устройства.`;
        
        // Отправляем через Google Script
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: "send_warning",
                userId: currentUid,
                text: warningText
            }),
            keepalive: true
        }).catch(e => console.error('Ошибка отправки предупреждения:', e));
    } catch(err) {
        console.error('sendWarningToPlayer:', err);
    }

}

