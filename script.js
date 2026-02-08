const tg = window.Telegram.WebApp;
const API_URL = "https://script.google.com/macros/s/AKfycbym7BZkWwdqkB8_yE6ynKaeYKtd8X833chIM6smbbUAs_85epS5W6bz2uBi0pcQBRqF/exec";

/* ==============================================
   КОНФИГУРАЦИЯ (ВСТАВИТЬ ЭТО В НАЧАЛО SCRIPT.JS)
   ============================================== */
const GAME_CONFIG = [
    {
        "id": 1,
        "name": "Кейс Бомжа",
        "price": 29,
        "img": "https://i.imgur.com/9EkONxH.png",
        "chances": {
            "consumer": 65,
            "common": 15,
            "rare": 10,
            "epic": 8,
            "legendary": 1,
            "mythical": 1
        },
        "items": [
            {
                "name": "50.000 Вирт",
                "price": 20,
                "img": "https://i.imgur.com/iQ3Ff5L.png",
                "rarity": "consumer"
            },
            {
                "name": "150.000 Вирт",
                "price": 75,
                "img": "https://i.imgur.com/iQ3Ff5L.png",
                "rarity": "common"
            },
            {
                "name": "400.000 Вирт",
                "price": 200,
                "img": "https://i.imgur.com/iQ3Ff5L.png",
                "rarity": "epic"
            },
            {
                "name": "1.000.000 Вирт",
                "price": 500,
                "img": "https://i.imgur.com/iQ3Ff5L.png",
                "rarity": "legendary"
            },
            {
                "name": "Очки «Сердечки»",
                "price": 500,
                "img": "https://i.imgur.com/xHQRwx0.png",
                "rarity": "legendary"
            },
            {
                "name": "Серый кейс",
                "price": 500,
                "img": "https://i.imgur.com/OGcHP9b.png",
                "rarity": "legendary"
            },
            {
                "name": "Маска Дали",
                "price": 70,
                "img": "https://i.imgur.com/K0JsEMU.png",
                "rarity": "rare"
            },
            {
                "name": "Очки «Street»",
                "price": 19,
                "img": "https://i.imgur.com/XARdxZn.png",
                "rarity": "consumer"
            },
            {
                "name": "Скин «Емеля»",
                "price": 300,
                "img": "https://i.imgur.com/goOf1rc.png",
                "rarity": "epic"
            },
            {
                "name": "Скин «Пузатый»",
                "price": 10,
                "img": "https://i.imgur.com/2LVGLzg.png",
                "rarity": "consumer"
            },
            {
                "name": "Набор «Сельчанин»",
                "price": 70,
                "img": "https://i.imgur.com/1pJCoj9.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Бандит»",
                "price": 650,
                "img": "https://i.imgur.com/sBOIGql.png",
                "rarity": "legendary"
            },
            {
                "name": "ZAZ",
                "price": 15,
                "img": "https://i.imgur.com/z0hrLCJ.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2107",
                "price": 30,
                "img": "https://i.imgur.com/Ay8kPfF.png",
                "rarity": "common"
            },
            {
                "name": "LADA NIVA",
                "price": 80,
                "img": "https://i.imgur.com/VDTY224.png",
                "rarity": "rare"
            },
            {
                "name": "LADA VESTA",
                "price": 175,
                "img": "https://i.imgur.com/MxZVdD9.png",
                "rarity": "epic"
            },
            {
                "name": "Mercedes-Benz W210",
                "price": 300,
                "img": "https://i.imgur.com/xFhwl3m.png",
                "rarity": "legendary"
            },
            {
                "name": "10 BC",
                "price": 10,
                "img": "https://i.imgur.com/T1peEpa.png",
                "rarity": "consumer"
            },
            {
                "name": "25 BC",
                "price": 25,
                "img": "https://i.imgur.com/T1peEpa.png",
                "rarity": "consumer"
            },
            {
                "name": "50 BC",
                "price": 50,
                "img": "https://i.imgur.com/T1peEpa.png",
                "rarity": "common"
            },
            {
                "name": "500 BC",
                "price": 500,
                "img": "https://i.imgur.com/T1peEpa.png",
                "rarity": "legendary"
            },
            {
                "name": "Аптечка",
                "price": 7,
                "img": "https://i.imgur.com/4I6uqi4.png",
                "rarity": "consumer"
            },
            {
                "name": "Ремонтный набор",
                "price": 7,
                "img": "https://i.imgur.com/0ncZmAy.png",
                "rarity": "consumer"
            },
            {
                "name": "Скутер",
                "price": 15,
                "img": "https://i.imgur.com/5N2komM.png",
                "rarity": "consumer"
            }
        ]
    },
    {
        "id": 1770544149013,
        "name": "Стандартный Кейс",
        "price": 199,
        "img": "https://i.imgur.com/KKJOZze.png",
        "chances": {
            "consumer": 0,
            "common": 65,
            "rare": 25,
            "epic": 8,
            "legendary": 1.92,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "Скин «Хоуми»",
                "price": 59,
                "img": "https://i.imgur.com/vUSoZ3w.png",
                "rarity": "common"
            },
            {
                "name": "Скин «Опасный мужчина»",
                "price": 69,
                "img": "https://i.imgur.com/Iumo5AU.png",
                "rarity": "common"
            },
            {
                "name": "Скин «Рыбчка»",
                "price": 89,
                "img": "https://i.imgur.com/7QB7INu.png",
                "rarity": "common"
            },
            {
                "name": "Рюкзак «Мопс»",
                "price": 79,
                "img": "https://i.imgur.com/IqxXto2.png",
                "rarity": "common"
            },
            {
                "name": "Корона короля",
                "price": 299,
                "img": "https://i.imgur.com/jMuPEij.png",
                "rarity": "epic"
            },
            {
                "name": "Маска «Иноске»",
                "price": 129,
                "img": "https://i.imgur.com/ljfQ3WL.png",
                "rarity": "epic"
            },
            {
                "name": "Volkswagel Golf GTi",
                "price": 99,
                "img": "https://i.imgur.com/AhDn5yf.png",
                "rarity": "common"
            },
            {
                "name": "BMW X5",
                "price": 219,
                "img": "https://i.imgur.com/mzc09cl.png",
                "rarity": "rare"
            },
            {
                "name": "Nissan Qashqai",
                "price": 199,
                "img": "https://i.imgur.com/aaSHLsI.png",
                "rarity": "rare"
            },
            {
                "name": "Audi A4",
                "price": 199,
                "img": "https://i.imgur.com/98BPi1T.png",
                "rarity": "rare"
            },
            {
                "name": "Acura TSX",
                "price": 199,
                "img": "https://i.imgur.com/sdjKmAW.png",
                "rarity": "rare"
            },
            {
                "name": "Chevrolet Camaro ZL1",
                "price": 999,
                "img": "https://i.imgur.com/nwLfhH9.png",
                "rarity": "epic"
            },
            {
                "name": "Ducati SuperSport",
                "price": 799,
                "img": "https://i.imgur.com/PLprcfn.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 4999,
                "img": "https://i.imgur.com/38CkTrt.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes AMG GT-R",
                "price": 2999,
                "img": "https://i.imgur.com/jnX4NvI_d.png?maxwidth=520&shape=thumb&fidelity=high",
                "rarity": "legendary"
            },
            {
                "name": "100 BC",
                "price": 100,
                "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high",
                "rarity": "common"
            },
            {
                "name": "200 BC",
                "price": 200,
                "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770550347497,
        "name": "Авто-Кейс 2.0",
        "price": 999,
        "img": "https://i.imgur.com/2busFmB.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 75,
            "epic": 24,
            "legendary": 1,
            "mythical": 0
        },
        "items": [
            {
                "name": "BMW M5 E60",
                "price": 549,
                "img": "https://i.imgur.com/DO7L8do.png",
                "rarity": "rare"
            },
            {
                "name": "Subaru WRX STi",
                "price": 499,
                "img": "https://i.imgur.com/TTbWXcs.png",
                "rarity": "rare"
            },
            {
                "name": "Toyota Camry 3.5",
                "price": 599,
                "img": "https://i.imgur.com/AnTZ6oV.png",
                "rarity": "rare"
            },
            {
                "name": "Volkswagen Passat",
                "price": 719,
                "img": "https://i.imgur.com/wTKU7AT.png",
                "rarity": "rare"
            },
            {
                "name": "Mercedes-Benz GT63s",
                "price": 1699,
                "img": "https://i.imgur.com/S9MRfzI.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 4999,
                "img": "https://i.imgur.com/T2oklf8.png",
                "rarity": "legendary"
            },
            {
                "name": "Aurus Senat",
                "price": 6999,
                "img": "https://i.imgur.com/ExQjhq2.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG",
                "price": 5500,
                "img": "https://i.imgur.com/E7Sbn3I.png",
                "rarity": "legendary"
            },
            {
                "name": "Bugatti Divo",
                "price": 19999,
                "img": "https://i.imgur.com/TDNAGwZ.png",
                "rarity": "mythical"
            },
            {
                "name": "Lamborghini Urus",
                "price": 3999,
                "img": "https://i.imgur.com/7ehMTjl.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Huracan",
                "price": 3999,
                "img": "https://i.imgur.com/T2oklf8.png",
                "rarity": "epic"
            },
            {
                "name": "BMW M4 F84",
                "price": 739,
                "img": "https://i.imgur.com/88nCiib.png",
                "rarity": "rare"
            },
            {
                "name": "XPENG P7",
                "price": 999,
                "img": "https://i.imgur.com/XFale9P.png",
                "rarity": "rare"
            },
            {
                "name": "BMW X6M F16",
                "price": 1999,
                "img": "https://i.imgur.com/JSqzmE2.png",
                "rarity": "epic"
            },
            {
                "name": "Alfa Romeo Guilia",
                "price": 699,
                "img": "https://i.imgur.com/NFJDSKI.png",
                "rarity": "rare"
            },
            {
                "name": "BMW X5M E70",
                "price": 799,
                "img": "https://i.imgur.com/r1gigSb.png",
                "rarity": "rare"
            },
            {
                "name": "Ducatti Supersport",
                "price": 699,
                "img": "https://i.imgur.com/VM2gthk.png",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770563185594,
        "name": "Особый Кейс",
        "price": 9999,
        "img": "https://i.imgur.com/qzvZZmz.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 0,
            "epic": 0,
            "legendary": 99.95,
            "mythical": 0.05
        },
        "items": [
            {
                "name": "Ocean Yacht",
                "price": 19999,
                "img": "https://i.imgur.com/U0T51l8.png",
                "rarity": "mythical"
            },
            {
                "name": "Rolls Royce Spectre",
                "price": 29999,
                "img": "https://i.imgur.com/vlmo0vU.png",
                "rarity": "mythical"
            },
            {
                "name": "Tesla CyberTruck",
                "price": 19999,
                "img": "https://i.imgur.com/Yhafdvt.png",
                "rarity": "mythical"
            },
            {
                "name": "Mercedes-Benz G63 AMG 6x6",
                "price": 39999,
                "img": "https://i.imgur.com/oFp8ZbQ.png",
                "rarity": "mythical"
            },
            {
                "name": "Bugatti Chiron",
                "price": 39999,
                "img": "https://i.imgur.com/chK3mjR.png",
                "rarity": "mythical"
            },
            {
                "name": "Bugatti Veyron",
                "price": 49999,
                "img": "https://i.imgur.com/5q4a8L6.png",
                "rarity": "mythical"
            },
            {
                "name": "Ferrari Enzo",
                "price": 4999,
                "img": "https://i.imgur.com/J3mN0Lp.png",
                "rarity": "legendary"
            },
            {
                "name": "Daewoo Matiz",
                "price": 6999,
                "img": "https://i.imgur.com/4QpI1cf.png",
                "rarity": "legendary"
            },
            {
                "name": "Ducati XDiavel",
                "price": 2999,
                "img": "https://i.imgur.com/rQn4wfp.pnga",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Urus",
                "price": 9999,
                "img": "https://i.imgur.com/PYEdyJD.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG Max",
                "price": 13999,
                "img": "https://i.imgur.com/KF2mLzy.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz SLR McLaren",
                "price": 14999,
                "img": "https://i.imgur.com/wiTkzQa.png",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Aventador",
                "price": 7999,
                "img": "https://i.imgur.com/HJCd4kU.png",
                "rarity": "legendary"
            },
            {
                "name": "Зловещий",
                "price": 9999,
                "img": "https://i.imgur.com/o7R4s2h.png",
                "rarity": "legendary"
            },
            {
                "name": "Invetero Coquette D5",
                "price": 10999,
                "img": "https://i.imgur.com/RWjulPn.png",
                "rarity": "legendary"
            },
            {
                "name": "F1",
                "price": 9999,
                "img": "https://i.imgur.com/rPjYhNj.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz AMG GT R",
                "price": 2999,
                "img": "https://i.imgur.com/t470enD.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770583808350,
        "name": "Кейс с Наборами",
        "price": 269,
        "img": "https://i.imgur.com/2tU356X.png",
        "chances": {
            "consumer": 0,
            "common": 70,
            "rare": 20,
            "epic": 9,
            "legendary": 1,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "Набор «Сельчанин»",
                "price": 79,
                "img": "https://i.imgur.com/79vFssV.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Бандит»",
                "price": 169,
                "img": "https://i.imgur.com/rXL1LFI.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Молодой»",
                "price": 189,
                "img": "https://i.imgur.com/XbLw0XA.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Гангстер»",
                "price": 269,
                "img": "https://i.imgur.com/7BBOmaL.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Гонщик»",
                "price": 399,
                "img": "https://i.imgur.com/ba9a9FD.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Депутат»",
                "price": 599,
                "img": "https://i.imgur.com/bDwpbtF.png",
                "rarity": "epic"
            },
            {
                "name": "Набор «Мафиози»",
                "price": 1999,
                "img": "https://i.imgur.com/0giSUQx.png",
                "rarity": "epic"
            },
            {
                "name": "Набор «Мажор»",
                "price": 2999,
                "img": "https://i.imgur.com/YspWgzR.png",
                "rarity": "legendary"
            },
            {
                "name": "Набор «Арни и Буши»",
                "price": 4999,
                "img": "https://i.imgur.com/wGHvZJv.png",
                "rarity": "legendary"
            },
            {
                "name": "Набор «Охотник»",
                "price": 1999,
                "img": "https://i.imgur.com/nJrdJCQ.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770584844771,
        "name": "Всё или Ничего?",
        "price": 19,
        "img": "https://i.imgur.com/12hzaW0.png",
        "chances": {
            "consumer": 99.95,
            "common": 0,
            "rare": 0,
            "epic": 0,
            "legendary": 0.05,
            "mythical": 0
        },
        "items": [
            {
                "name": "Аптечка",
                "price": 7,
                "img": "https://i.imgur.com/4I6uqi4_d.png?maxwidth=520&shape=thumb&fidelity=high",
                "rarity": "consumer"
            },
            {
                "name": "Lamborghini Huracan",
                "price": 3999,
                "img": "https://i.imgur.com/T2oklf8.png",
                "rarity": "legendary"
            }
        ]
    }
];

const PROMO_CODES = [
    {
        "code": "ADMINKAADMINKAADMINKA",
        "val": 1000,
        "limit": 0
    },
    {
        "code": "1CODE",
        "val": 10000,
        "limit": 1
    },
    {
        "code": "NEW_CODE_371",
        "val": -296992,
        "limit": 1
    }
];






/* ==============================================
   ЛОГИКА
   ============================================== */

let user = { 
    balance: 0, 
    inventory: [], 
    uid: 0, 
    name: "Гость", 
    avatar: "",
    history: [],
    activatedPromos: [] 
};

let paymentCheckInterval = null;
let selectedCase = null;
let currentWins = []; // Массив выигранных предметов
let selectedOpenCount = 1; // 1, 2, 5, 10
let selectedInventoryIndex = null; 

document.addEventListener('DOMContentLoaded', () => {
    try {
        tg.expand();
    } catch(e) { console.log("TG API not avail"); }
    loadUser();
    initCases();
    updateUI();
    renderInventory();
});

// --- HELPER: SAFE ALERTS & HAPTICS (Исправляет WebAppMethodUnsupported) ---
function safeAlert(msg) {
    if (tg && tg.showAlert) {
        try {
            tg.showAlert(msg);
        } catch(e) {
            alert(msg);
        }
    } else {
        alert(msg);
    }
}

function safeHaptic(type) {
    if (tg && tg.HapticFeedback) {
        try {
            if(type === 'soft') tg.HapticFeedback.impactOccurred('soft');
            if(type === 'success') tg.HapticFeedback.notificationOccurred('success');
            if(type === 'warning') tg.HapticFeedback.notificationOccurred('warning');
            if(type === 'error') tg.HapticFeedback.notificationOccurred('error');
        } catch (e) {
            // Игнорируем ошибки вибрации в браузере
        }
    }
}

// --- СИСТЕМА ДАННЫХ ---
function loadUser() {
    const saved = localStorage.getItem('br_user_data_v3');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            user = { ...user, ...parsed };
            if(!user.history) user.history = [];
            if(!user.activatedPromos) user.activatedPromos = [];
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
    localStorage.setItem('br_user_data_v3', JSON.stringify(user));
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

// --- КЕЙСЫ И ПРЕВЬЮ ---
function initCases() {
    const container = document.getElementById('cases-container');
    if(!container) return;
    
    const data = (GAME_CONFIG && GAME_CONFIG.length) ? GAME_CONFIG : [];

    container.innerHTML = data.map(c => `
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

    setOpenCount(1);

    document.getElementById('preview-img').src = selectedCase.img;
    document.getElementById('preview-title').innerText = selectedCase.name;
    document.getElementById('preview-price').innerText = selectedCase.price + " ₽";
    
    const itemsContainer = document.getElementById('preview-items-container');
    itemsContainer.innerHTML = ''; 

    const sortedItems = [...selectedCase.items].sort((a, b) => {
        const rarityOrder = { 'mythical': 1, 'legendary': 2, 'epic': 3, 'rare': 4, 'common': 5, 'consumer': 6 };
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

    document.getElementById('modal-preview').style.display = 'flex';
}

// --- ВЫБОР КОЛИЧЕСТВА ---
function setOpenCount(n) {
    selectedOpenCount = n;
    
    document.querySelectorAll('.qty-btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('.qty-btn');
    if(n === 1) btns[0].classList.add('active');
    if(n === 2) btns[1].classList.add('active');
    if(n === 5) btns[2].classList.add('active');
    if(n === 10) btns[3].classList.add('active');

    const total = selectedCase.price * n;
    document.getElementById('btn-total-price').innerText = total.toLocaleString();
}

// --- ЛОГИКА ОТКРЫТИЯ ---
function startRouletteSequence() {
    const totalCost = selectedCase.price * selectedOpenCount;
    
    if(user.balance < totalCost) {
        return safeAlert("Недостаточно средств!");
    }
    
    user.balance -= totalCost;
    addHistory('case', `Открытие ${selectedCase.name} (x${selectedOpenCount})`, `-${totalCost}`);
    saveUser();
    updateUI();
    closeModal('modal-preview');

    currentWins = [];
    for(let i=0; i < selectedOpenCount; i++) {
        currentWins.push(getWeightedWinItem(selectedCase));
    }

    const fastOpenEl = document.getElementById('fast-open-check');
    const isFastOpen = fastOpenEl ? fastOpenEl.checked : false;

    if (isFastOpen) {
        showWin(currentWins);
    } else {
        startMultiRouletteAnimation(selectedOpenCount, currentWins);
    }
}

// --- АНИМАЦИЯ РУЛЕТКИ (МУЛЬТИ) - UPDATED FOR MOBILE RESPONSIVENESS ---
function startMultiRouletteAnimation(count, wins) {
    document.getElementById('blur-container').classList.add('app-blurred');
    const modal = document.getElementById('modal-roulette');
    const playground = document.getElementById('roulette-playground');
    modal.style.display = 'flex';
    document.getElementById('roulette-status').innerText = "КРУТИМ...";

    playground.innerHTML = '';
    playground.className = 'roulette-playground'; 
    if(count === 2) playground.classList.add('r-grid-2');
    if(count === 5) playground.classList.add('r-grid-5');
    if(count === 10) playground.classList.add('r-grid-10');
    if(count === 1) playground.classList.add('r-grid-1');

    for(let i=0; i < count; i++) {
        const winItem = wins[i];
        
        const wrapper = document.createElement('div');
        wrapper.className = 'roulette-window';
        
        const track = document.createElement('div');
        track.className = 'roulette-track';
        track.id = `track-${i}`;

        const items = [];
        const length = count === 1 ? 95 : 60; 
        const winIndex = count === 1 ? 75 : 50;
        
        for(let k=0; k < length; k++) items.push(getRandomItemFromCase(selectedCase));
        items[winIndex] = winItem;

        track.innerHTML = items.map(item => `
            <div class="roulette-card rarity-${item.rarity}">
                <img src="${item.img}">
                <span>${item.name}</span>
            </div>
        `).join('');

        const line = document.createElement('div');
        line.className = 'roulette-center-line';
        
        const shadow = document.createElement('div');
        shadow.className = 'roulette-shadow-overlay';

        wrapper.appendChild(track);
        wrapper.appendChild(line);
        wrapper.appendChild(shadow);
        playground.appendChild(wrapper);

        // Используем setTimeout, чтобы DOM успел отрисоваться и мы могли узнать реальную ширину карточки
        setTimeout(() => {
            // FIX: Вычисляем ширину карточки динамически, так как на мобильных она меньше
            const firstCard = track.querySelector('.roulette-card');
            const realCardWidth = firstCard ? firstCard.getBoundingClientRect().width : 104;
            
            // Если карточка меньше 100px (мобильная версия), отступов (gap) там нет, учитываем только ширину
            // На десктопе в CSS margin-ов нет, но могут быть border-ы.
            // Надежнее использовать реальную ширину элемента
            
            const screenCenter = wrapper.offsetWidth / 2; 
            const winCardCenterPos = (winIndex * realCardWidth) + (realCardWidth/2); 
            const targetTranslate = -(winCardCenterPos - screenCenter);
            
            // Добавляем немного рандома, чтобы линия не всегда была идеально по центру (реализм)
            const randomOffset = (Math.random() * (realCardWidth * 0.4)) - (realCardWidth * 0.2);
            
            track.style.transition = `transform ${5 + (Math.random())}s cubic-bezier(0.1, 1, 0.3, 1)`;
            track.style.transform = `translateX(${targetTranslate + randomOffset}px)`;
        }, 100 + (i * 100));
    }

    let ticks = 0;
    const interval = setInterval(() => {
        ticks++;
        if(ticks > 40) clearInterval(interval);
        safeHaptic('soft');
    }, 150);

    setTimeout(() => {
        showWin(wins);
    }, 6500);
}

function getRandomItemFromCase(c) {
    if(!c.items || c.items.length === 0) return { name: "?", img: "", rarity: "consumer" };
    return c.items[Math.floor(Math.random() * c.items.length)];
}

function getWeightedWinItem(c) {
    const chances = c.chances || { consumer: 50, common: 30, rare: 15, epic: 4, legendary: 0.92, mythical: 0.08 };
    
    let rand = Math.random() * 100;
    let currentSum = 0;
    let selectedRarity = 'consumer';
    const order = ['consumer', 'common', 'rare', 'epic', 'legendary', 'mythical'];

    for (let r of order) {
        currentSum += chances[r] || 0;
        if (rand <= currentSum) {
            selectedRarity = r;
            break;
        }
    }

    let pool = c.items.filter(item => item.rarity === selectedRarity);
    if (pool.length === 0) pool = c.items; 
    return pool[Math.floor(Math.random() * pool.length)];
}

// --- ПОКАЗ ВЫИГРЫША ---
function showWin(items) {
    document.getElementById('modal-roulette').style.display = 'none';
    const winModal = document.getElementById('modal-win');
    
    const winGrid = document.getElementById('win-grid');
    winGrid.innerHTML = '';
    
    let totalPrice = 0;
    let maxRarityVal = 0; 
    const rarityVal = { consumer:1, common:2, rare:3, epic:4, legendary:5, mythical:6 };

    items.forEach(item => {
        totalPrice += item.price;
        if(rarityVal[item.rarity] > maxRarityVal) maxRarityVal = rarityVal[item.rarity];
        
        winGrid.innerHTML += `
            <div class="win-grid-item rarity-${item.rarity}" style="border-bottom: 2px solid var(--c-${item.rarity})">
                <img src="${item.img}">
                <div class="w-name">${item.name}</div>
                <div style="font-size:9px; color:#888;">${item.price} ₽</div>
            </div>
        `;
    });

    document.getElementById('win-total-price').innerText = totalPrice;

    const effects = document.getElementById('win-effects');
    if (effects) {
        effects.classList.remove('effect-legendary', 'effect-mythical');
        effects.style.display = 'none';
        
        if (maxRarityVal >= 5) { 
            effects.style.display = 'block';
            if(maxRarityVal === 6) effects.classList.add('effect-mythical');
            else effects.classList.add('effect-legendary');
        }
    }
    
    safeHaptic(maxRarityVal >= 5 ? 'success' : 'warning');
    winModal.style.display = 'flex';
}

function finishWin(toInventory) {
    if(toInventory) {
        currentWins.forEach(item => {
            user.inventory.push(item);
        });
        addHistory('drop', `Получено предметов: ${currentWins.length}`, 'В гараж');
    } else {
        let sum = 0;
        currentWins.forEach(item => sum += item.price);
        user.balance += sum;
        addHistory('sell', `Продажа предметов (${currentWins.length})`, `+${sum}`);
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
                <div class="inventory-card rarity-${item.rarity}" onclick="openInventoryItem(${index})">
                    <img src="${item.img}">
                    <div class="inv-name">${item.name}</div>
                    <div class="inv-price">${item.price} ₽</div>
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
    safeAlert(`Продано за ${item.price} ₽`);
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
    
    safeAlert(`Весь гараж продан за ${totalSum} ₽`);
    safeHaptic('success');
}

function withdrawCurrentItem() {
    safeAlert("Вывод предметов временно недоступен (Тех. работы)");
}

// --- УТИЛИТЫ ---
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

// --- ПРОМО И ОПЛАТА ---
function activatePromo() {
    const input = document.getElementById('promo-input');
    const code = input.value.trim();
    if(!code) return safeAlert("Введите код!");

    const promo = PROMO_CODES.find(p => p.code === code);
    if(!promo) return safeAlert("Неверный промокод");
    if (promo.limit === 1 && user.activatedPromos.includes(code)) return safeAlert("Вы уже активировали этот код!");

    user.balance += promo.val;
    if(promo.limit === 1) user.activatedPromos.push(code);

    addHistory('balance', `Промо: ${code}`, `+${promo.val}`);
    saveUser();
    updateUI();
    
    input.value = '';
    safeAlert(`Успешно! Начислено ${promo.val} ₽`);
}

function payCustomAmount() {
    const input = document.getElementById('custom-amount');
    const val = parseInt(input.value);
    if(!val || val < 10) return safeAlert("Минимальная сумма 10 ₽");
    initYooPayment(val);
}

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
    
    if(tg && tg.openLink) {
        tg.openLink(`https://yoomoney.ru/quickpay/confirm?${params.toString()}`);
    } else {
        window.open(`https://yoomoney.ru/quickpay/confirm?${params.toString()}`, '_blank');
    }
    
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
                safeAlert(`Баланс пополнен на ${addedAmount} ₽`);
                if(statusMsg) {
                    statusMsg.innerText = "Успешно!";
                    statusMsg.style.color = "#4CAF50";
                }
            }
        } catch (e) {}
    }, 5000); 
}

function openProfileModal() {
    updateUI();
    document.getElementById('profile-id').innerText = user.name;
    document.getElementById('profile-uid').innerText = user.uid;
    const histList = document.getElementById('history-list');
    if(histList) {
        if(user.history.length === 0) histList.innerHTML = '<div style="color:#555; text-align:center;">Истории нет</div>';
        else histList.innerHTML = user.history.map(h => `<div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #333; font-size:11px;"><span>${h.text}</span><span style="color:${h.val.includes('+')?'#4CAF50':'#ff4d4d'}">${h.val}</span></div>`).join('');
    }
    document.getElementById('modal-profile').style.display = 'flex';
}