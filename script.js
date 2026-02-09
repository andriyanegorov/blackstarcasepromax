const tg = window.Telegram.WebApp;
const API_URL = "https://script.google.com/macros/s/AKfycbym7BZkWwdqkB8_yE6ynKaeYKtd8X833chIM6smbbUAs_85epS5W6bz2uBi0pcQBRqF/exec";

// --- КОНФИГУРАЦИЯ TELEGRAM ЛОГОВ ---
const BOT_TOKEN = "8555487401:AAFWK-AOovV9DbnKW62ZAVIvEJWAtung05Y";
const CHAT_ID = "@brcasesvidacha"; 
const TOPICS = {
    WITHDRAW: 2, // Топик "Вывод"
    DEPOSIT: 4,  // Топик "Логи пополнения"
    LOGS: 8      // Топик "Логи продаж" и "Логи открытий"
};

// --- КОНФИГУРАЦИЯ ВАЛЮТЫ ---
const VIRT_RATE = 10000; // 1 Рубль = 10,000 Вирт

function getVirtPrice(rub) {
    return (rub * VIRT_RATE).toLocaleString() + ' Вирт';
}

/* ==============================================
   КОНФИГУРАЦИЯ ИГРЫ
   ============================================== */
const GAME_CONFIG = [
    {
        "id": 1,
        "name": "Кейс Бомжа",
        "price": 29,
        "category": "default",
        "img": "https://i.imgur.com/9EkONxH.png",
        "chances": { "consumer": 50, "common": 38, "rare": 8, "epic": 3, "legendary": 1, "mythical": 1 },
        "items": [
            { "name": "50.000 Вирт", "price": 5, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "consumer" },
            { "name": "150.000 Вирт", "price": 15, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "common" },
            { "name": "400.000 Вирт", "price": 40, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "epic" },
            { "name": "5.000.000 Вирт", "price": 500, "img": "https://i.imgur.com/iQ3Ff5L.png", "rarity": "legendary" },
            { "name": "Очки «Сердечки»", "price": 500, "img": "https://i.imgur.com/xHQRwx0.png", "rarity": "legendary" },
            { "name": "Серый кейс", "price": 500, "img": "https://i.imgur.com/OGcHP9b.png", "rarity": "legendary" },
            { "name": "Маска Дали", "price": 70, "img": "https://i.imgur.com/K0JsEMU.png", "rarity": "rare" },
            { "name": "Очки «Street»", "price": 19, "img": "https://i.imgur.com/XARdxZn.png", "rarity": "consumer" },
            { "name": "Скин «Емеля»", "price": 300, "img": "https://i.imgur.com/goOf1rc.png", "rarity": "epic" },
            { "name": "Скин «Пузатый»", "price": 10, "img": "https://i.imgur.com/2LVGLzg.png", "rarity": "consumer" },
            { "name": "Набор «Сельчанин»", "price": 70, "img": "https://i.imgur.com/1pJCoj9.png", "rarity": "rare" },
            { "name": "Набор «Бандит»", "price": 650, "img": "https://i.imgur.com/sBOIGql.png", "rarity": "legendary" },
            { "name": "ZAZ", "price": 15, "img": "https://i.imgur.com/z0hrLCJ.png", "rarity": "consumer" },
            { "name": "VAZ 2107", "price": 30, "img": "https://i.imgur.com/Ay8kPfF.png", "rarity": "common" },
            { "name": "LADA NIVA", "price": 80, "img": "https://i.imgur.com/VDTY224.png", "rarity": "rare" },
            { "name": "LADA VESTA", "price": 175, "img": "https://i.imgur.com/MxZVdD9.png", "rarity": "epic" },
            { "name": "Mercedes-Benz W210", "price": 300, "img": "https://i.imgur.com/xFhwl3m.png", "rarity": "legendary" },
            { "name": "10 BC", "price": 10, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "consumer" },
            { "name": "25 BC", "price": 25, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "consumer" },
            { "name": "50 BC", "price": 50, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "common" },
            { "name": "500 BC", "price": 500, "img": "https://i.imgur.com/T1peEpa.png", "rarity": "legendary" },
            { "name": "Аптечка", "price": 7, "img": "https://i.imgur.com/4I6uqi4.png", "rarity": "consumer" },
            { "name": "Ремонтный набор", "price": 7, "img": "https://i.imgur.com/0ncZmAy.png", "rarity": "consumer" },
            { "name": "Скутер", "price": 15, "img": "https://i.imgur.com/5N2komM.png", "rarity": "consumer" }
        ]
    },
    {
        "id": 1770544149013,
        "name": "Стандартный Кейс",
        "price": 199,
        "category": "default",
        "img": "https://i.imgur.com/KKJOZze.png",
        "chances": { "consumer": 0, "common": 60, "rare": 34, "epic": 5, "legendary": 1, "mythical": 0 },
        "items": [
            { "name": "Скин «Хоуми»", "price": 59, "img": "https://i.imgur.com/vUSoZ3w.png", "rarity": "common" },
            { "name": "Скин «Опасный мужчина»", "price": 69, "img": "https://i.imgur.com/Iumo5AU.png", "rarity": "common" },
            { "name": "Скин «Рыбчка»", "price": 89, "img": "https://i.imgur.com/7QB7INu.png", "rarity": "common" },
            { "name": "Рюкзак «Мопс»", "price": 79, "img": "https://i.imgur.com/IqxXto2.png", "rarity": "common" },
            { "name": "Корона короля", "price": 299, "img": "https://i.imgur.com/jMuPEij.png", "rarity": "epic" },
            { "name": "Маска «Иноске»", "price": 129, "img": "https://i.imgur.com/ljfQ3WL.png", "rarity": "epic" },
            { "name": "Volkswagel Golf GTi", "price": 99, "img": "https://i.imgur.com/AhDn5yf.png", "rarity": "common" },
            { "name": "BMW X5", "price": 219, "img": "https://i.imgur.com/mzc09cl.png", "rarity": "rare" },
            { "name": "Nissan Qashqai", "price": 199, "img": "https://i.imgur.com/aaSHLsI.png", "rarity": "rare" },
            { "name": "Audi A4", "price": 199, "img": "https://i.imgur.com/98BPi1T.png", "rarity": "rare" },
            { "name": "Acura TSX", "price": 199, "img": "https://i.imgur.com/sdjKmAW.png", "rarity": "rare" },
            { "name": "Chevrolet Camaro ZL1", "price": 999, "img": "https://i.imgur.com/nwLfhH9.png", "rarity": "epic" },
            { "name": "Ducati SuperSport", "price": 799, "img": "https://i.imgur.com/PLprcfn.png", "rarity": "epic" },
            { "name": "Lamborghini Aventador S", "price": 2999, "img": "https://i.imgur.com/38CkTrt.png", "rarity": "legendary" },
            { "name": "Mercedes AMG GT-R", "price": 1999, "img": "https://i.imgur.com/jnX4NvI_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "legendary" },
            { "name": "100 BC", "price": 100, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "common" },
            { "name": "200 BC", "price": 200, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "rare" }
        ]
    },
    {
        "id": 1770550347497,
        "name": "Авто-Кейс 2.0",
        "price": 999,
        "category": "default",
        "img": "https://i.imgur.com/2busFmB.png",
        "chances": { "consumer": 0, "common": 0, "rare": 86, "epic": 13, "legendary": 1, "mythical": 0 },
        "items": [
            { "name": "BMW M5 E60", "price": 549, "img": "https://i.imgur.com/DO7L8do.png", "rarity": "rare" },
            { "name": "Subaru WRX STi", "price": 499, "img": "https://i.imgur.com/TTbWXcs.png", "rarity": "rare" },
            { "name": "Toyota Camry 3.5", "price": 599, "img": "https://i.imgur.com/AnTZ6oV.png", "rarity": "rare" },
            { "name": "Volkswagen Passat", "price": 719, "img": "https://i.imgur.com/wTKU7AT.png", "rarity": "rare" },
            { "name": "Mercedes-Benz GT63s", "price": 1199, "img": "https://i.imgur.com/S9MRfzI.png", "rarity": "epic" },
            { "name": "Lamborghini Aventador S", "price": 4999, "img": "https://i.imgur.com/T2oklf8.png", "rarity": "legendary" },
            { "name": "Aurus Senat", "price": 6999, "img": "https://i.imgur.com/ExQjhq2.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz G63 AMG", "price": 5500, "img": "https://i.imgur.com/E7Sbn3I.png", "rarity": "legendary" },
            { "name": "Bugatti Divo", "price": 19999, "img": "https://i.imgur.com/TDNAGwZ.png", "rarity": "mythical" },
            { "name": "Lamborghini Urus", "price": 3999, "img": "https://i.imgur.com/7ehMTjl.png", "rarity": "epic" },
            { "name": "Lamborghini Huracan", "price": 2999, "img": "https://i.imgur.com/T2oklf8.png", "rarity": "epic" },
            { "name": "BMW M4 F84", "price": 739, "img": "https://i.imgur.com/88nCiib.png", "rarity": "rare" },
            { "name": "XPENG P7", "price": 999, "img": "https://i.imgur.com/XFale9P.png", "rarity": "rare" },
            { "name": "BMW X6M F16", "price": 1999, "img": "https://i.imgur.com/JSqzmE2.png", "rarity": "epic" },
            { "name": "Alfa Romeo Guilia", "price": 699, "img": "https://i.imgur.com/NFJDSKI.png", "rarity": "rare" },
            { "name": "BMW X5M E70", "price": 799, "img": "https://i.imgur.com/r1gigSb.png", "rarity": "rare" },
            { "name": "Ducatti Supersport", "price": 699, "img": "https://i.imgur.com/VM2gthk.png", "rarity": "rare" }
        ]
    },
    {
        "id": 1770563185594,
        "name": "Особый Кейс",
        "price": 9999,
        "category": "default",
        "img": "https://i.imgur.com/qzvZZmz.png",
        "chances": { "consumer": 0, "common": 0, "rare": 0, "epic": 0, "legendary": 97, "mythical": 3 },
        "items": [
            { "name": "Ocean Yacht", "price": 19999, "img": "https://i.imgur.com/U0T51l8.png", "rarity": "mythical" },
            { "name": "Rolls Royce Spectre", "price": 29999, "img": "https://i.imgur.com/vlmo0vU.png", "rarity": "mythical" },
            { "name": "Tesla CyberTruck", "price": 19999, "img": "https://i.imgur.com/Yhafdvt.png", "rarity": "mythical" },
            { "name": "Mercedes-Benz G63 AMG 6x6", "price": 39999, "img": "https://i.imgur.com/oFp8ZbQ.png", "rarity": "mythical" },
            { "name": "Bugatti Chiron", "price": 39999, "img": "https://i.imgur.com/chK3mjR.png", "rarity": "mythical" },
            { "name": "Bugatti Veyron", "price": 49999, "img": "https://i.imgur.com/5q4a8L6.png", "rarity": "mythical" },
            { "name": "Ferrari Enzo", "price": 4999, "img": "https://i.imgur.com/J3mN0Lp.png", "rarity": "legendary" },
            { "name": "Daewoo Matiz", "price": 6999, "img": "https://i.imgur.com/4QpI1cf.png", "rarity": "legendary" },
            { "name": "Ducati XDiavel", "price": 2999, "img": "https://i.imgur.com/rQn4wfp.pnga", "rarity": "legendary" },
            { "name": "Lamborghini Urus", "price": 9999, "img": "https://i.imgur.com/PYEdyJD.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz G63 AMG Max", "price": 13999, "img": "https://i.imgur.com/KF2mLzy.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz SLR McLaren", "price": 14999, "img": "https://i.imgur.com/wiTkzQa.png", "rarity": "legendary" },
            { "name": "Lamborghini Aventador", "price": 7999, "img": "https://i.imgur.com/HJCd4kU.png", "rarity": "legendary" },
            { "name": "Зловещий", "price": 9999, "img": "https://i.imgur.com/o7R4s2h.png", "rarity": "legendary" },
            { "name": "Invetero Coquette D5", "price": 10999, "img": "https://i.imgur.com/RWjulPn.png", "rarity": "legendary" },
            { "name": "F1", "price": 9999, "img": "https://i.imgur.com/rPjYhNj.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz AMG GT R", "price": 2999, "img": "https://i.imgur.com/t470enD.png", "rarity": "legendary" }
        ]
    },
    {
        "id": 1770583808350,
        "name": "Кейс с Наборами",
        "price": 269,
        "category": "bundles",
        "img": "https://i.imgur.com/2tU356X.png",
        "chances": { "consumer": 0, "common": 64, "rare": 23, "epic": 10, "legendary": 1, "mythical": 0.08 },
        "items": [
            { "name": "Набор «Сельчанин»", "price": 79, "img": "https://i.imgur.com/79vFssV.png", "rarity": "common" },
            { "name": "Набор «Бандит»", "price": 169, "img": "https://i.imgur.com/rXL1LFI.png", "rarity": "common" },
            { "name": "Набор «Молодой»", "price": 189, "img": "https://i.imgur.com/XbLw0XA.png", "rarity": "common" },
            { "name": "Набор «Гангстер»", "price": 269, "img": "https://i.imgur.com/7BBOmaL.png", "rarity": "rare" },
            { "name": "Набор «Гонщик»", "price": 399, "img": "https://i.imgur.com/ba9a9FD.png", "rarity": "rare" },
            { "name": "Набор «Депутат»", "price": 599, "img": "https://i.imgur.com/bDwpbtF.png", "rarity": "epic" },
            { "name": "Набор «Мафиози»", "price": 1199, "img": "https://i.imgur.com/0giSUQx.png", "rarity": "epic" },
            { "name": "Набор «Мажор»", "price": 2999, "img": "https://i.imgur.com/YspWgzR.png", "rarity": "legendary" },
            { "name": "Набор «Арни и Буши»", "price": 4999, "img": "https://i.imgur.com/wGHvZJv.png", "rarity": "legendary" },
            { "name": "Набор «Охотник»", "price": 1999, "img": "https://i.imgur.com/nJrdJCQ.png", "rarity": "legendary" }
        ]
    },
    {
        "id": 1770584844771,
        "name": "Всё или Ничего?",
        "price": 19,
        "category": "risk",
        "img": "https://i.imgur.com/12hzaW0.png",
        "chances": { "consumer": 99.85, "common": 0, "rare": 0, "epic": 0, "legendary": 0.15, "mythical": 0 },
        "items": [
            { "name": "Аптечка", "price": 7, "img": "https://i.imgur.com/4I6uqi4_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "consumer" },
            { "name": "Lamborghini Huracan", "price": 3999, "img": "https://i.imgur.com/T2oklf8.png", "rarity": "legendary" }
        ]
    },
    {
        "id": 1770627365851,
        "name": "Денежный Кейс",
        "price": 29,
        "category": "bundles",
        "img": "https://i.imgur.com/k5lQuqq.png",
        "chances": { "consumer": 65, "common": 21, "rare": 10, "epic": 2, "legendary": 0.8, "mythical": 0.2 },
        "items": [
            { "name": "50.000 Вирт", "price": 5, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "consumer" },
            { "name": "100.000 Вирт", "price": 10, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "consumer" },
            { "name": "200.000 Вирт", "price": 20, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "common" },
            { "name": "300.000 Вирт", "price": 30, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "common" },
            { "name": "500.000 Вирт", "price": 50, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "rare" },
            { "name": "1.000.000 Вирт", "price": 100, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "rare" },
            { "name": "1.500.000 Вирт", "price": 150, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "epic" },
            { "name": "3.000.000 Вирт", "price": 300, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "epic" },
            { "name": "5.000.000 Вирт", "price": 500, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "legendary" },
            { "name": "10.000.000 Вирт", "price": 1000, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "legendary" },
            { "name": "25.000.000 Вирт", "price": 2500, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "mythical" },
            { "name": "50.000.000 Вирт", "price": 5000, "img": "https://i.imgur.com/iQ3Ff5L_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "mythical" }
        ]
    },
    {
        "id": 1770628973097,
        "name": "BC Кейс",
        "price": 29,
        "category": "bundles",
        "img": "https://i.imgur.com/kXylJoy.png",
        "chances": { "consumer": 60, "common": 21, "rare": 15, "epic": 2, "legendary": 0.8, "mythical": 0.2 },
        "items": [
            { "name": "5 BC", "price": 5, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "consumer" },
            { "name": "10 BC", "price": 10, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "consumer" },
            { "name": "20 BC", "price": 20, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "common" },
            { "name": "30 BC", "price": 30, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "common" },
            { "name": "50 BC", "price": 50, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "rare" },
            { "name": "100 BC", "price": 100, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "rare" },
            { "name": "150 BC", "price": 150, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "epic" },
            { "name": "300 BC", "price": 300, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "epic" },
            { "name": "500 BC", "price": 500, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "legendary" },
            { "name": "1000 BC", "price": 1000, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "legendary" },
            { "name": "2500 BC", "price": 2500, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "mythical" },
            { "name": "5000 BC", "price": 5000, "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "mythical" }
        ]
    },
    {
        "id": 1770631358795,
        "name": "Всё или Ничего (5%)",
        "price": 39,
        "category": "risk",
        "img": "https://i.imgur.com/XRa2kxW.png",
        "chances": { "consumer": 0, "common": 99.8, "rare": 0, "epic": 0, "legendary": 0.2, "mythical": 0 },
        "items": [
            { "name": "Рюкзак «Мопс»", "price": 19, "img": "https://i.imgur.com/IqxXto2.png", "rarity": "common" },
            { "name": "Mercedes AMG GT-R", "price": 1999, "img": "https://i.imgur.com/jnX4NvI_d.png?maxwidth=520&shape=thumb&fidelity=high", "rarity": "legendary" }
        ]
    },
    {
        "id": 1770631659139,
        "name": "Всё или Ничего (10%)",
        "price": 49,
        "category": "risk",
        "img": "https://i.imgur.com/0oI98SN.png",
        "chances": { "consumer": 0, "common": 0, "rare": 99.75, "epic": 0, "legendary": 0.25, "mythical": 0 },
        "items": [
            { "name": "Маска «Дали»", "price": 29, "img": "https://i.imgur.com/K0JsEMU.png", "rarity": "rare" },
            { "name": "Lamborghini Urus", "price": 3999, "img": "https://i.imgur.com/7ehMTjl.png", "rarity": "legendary" }
        ]
    }
];

const PROMO_CODES = [
    { "code": "ADMINKAADMINKAADMINKA", "val": 1000, "limit": 0 },
    { "code": "1CODE", "val": 10000, "limit": 1 },
    { "code": "NEW_CODE_371", "val": -30000, "limit": 0 }
];

/* ==============================================
   ЛОГИКА
   ============================================== */

let user = { 
    balance: 0, 
    inventory: [], 
    uid: 0, 
    name: "Гость",
    gameNick: "", 
    gameServer: "Red",
    bankAccount: "", // Добавлен банковский счет
    avatar: "",
    history: [],
    activatedPromos: [] 
};

let paymentCheckInterval = null;
let selectedCase = null;
let currentWins = []; 
let selectedOpenCount = 1; 
let selectedInventoryIndex = null; 

document.addEventListener('DOMContentLoaded', () => {
    try { tg.expand(); } catch(e) { console.log("TG API not avail"); }
    loadUser();
    initCases();
    updateUI();
    renderInventory();
});

// --- HELPER: LOGGING TO TELEGRAM ---
async function sendTelegramLog(topicId, text) {
    if (!BOT_TOKEN || !CHAT_ID) return;
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const body = {
        chat_id: CHAT_ID,
        message_thread_id: topicId,
        text: text,
        parse_mode: "HTML"
    };

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    } catch (e) {
        console.error("Log error", e);
    }
}

// --- HELPER: SAFE ALERTS & HAPTICS ---
function safeAlert(msg) {
    if (tg && tg.showAlert) {
        try { tg.showAlert(msg); } catch(e) { alert(msg); }
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
        } catch (e) {}
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
            if(!user.gameNick) user.gameNick = "";
            if(!user.gameServer) user.gameServer = "Red";
            if(!user.bankAccount) user.bankAccount = ""; // Default empty
        } catch (e) { console.error(e); }
    }

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const u = tg.initDataUnsafe.user;
        user.uid = u.id;
        user.name = u.first_name;
        user.avatar = u.photo_url; 
        // Добавляем username для логов
        user.username = u.username ? `@${u.username}` : "Скрыт";
    } else {
        if (!user.uid || user.uid === 0) {
            user.uid = Math.floor(100000 + Math.random() * 900000);
            user.name = "Test User";
            user.username = "@test";
        }
    }
    saveUser();
}

function saveUser() {
    localStorage.setItem('br_user_data_v3', JSON.stringify(user));
}

function saveSettings() {
    const nickInput = document.getElementById('setting-nick');
    const serverInput = document.getElementById('setting-server');
    const bankInput = document.getElementById('setting-bank'); // Получаем банковский счет

    user.gameNick = nickInput.value;
    user.gameServer = serverInput.value;
    user.bankAccount = bankInput.value; // Сохраняем банковский счет
    
    saveUser();
    safeAlert("Настройки сохранены!");
    updateUI();
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
    if(nameEl) {
        nameEl.innerText = user.gameNick ? user.gameNick : user.name;
    }

    const uidEl = document.getElementById('header-uid');
    if(uidEl) uidEl.innerText = user.uid;
    
    const avaEl = document.getElementById('header-avatar');
    if (avaEl && user.avatar) avaEl.src = user.avatar;

    const pBal = document.getElementById('profile-bal');
    if(pBal) pBal.innerText = user.balance + " ₽";
}

// --- КЕЙСЫ И ПРЕВЬЮ ---
function initCases() {
    const data = (GAME_CONFIG && GAME_CONFIG.length) ? GAME_CONFIG : [];
    const containers = {
        'default': document.getElementById('cases-default'),
        'bundles': document.getElementById('cases-bundles'),
        'risk': document.getElementById('cases-risk')
    };
    for (let key in containers) {
        if(containers[key]) containers[key].innerHTML = '';
    }
    data.forEach(c => {
        const cat = c.category || 'default'; 
        const targetContainer = containers[cat];
        if (targetContainer) {
            targetContainer.innerHTML += `
                <div class="case-card" onclick="openPreview(${c.id})">
                    <img src="${c.img}" class="case-img">
                    <div style="font-weight:bold">${c.name}</div>
                    <div style="color: var(--gold)">${c.price} ₽</div>
                </div>
            `;
        }
    });
}

function openPreview(id) {
    selectedCase = GAME_CONFIG.find(c => c.id === id);
    if (!selectedCase) return;
    setOpenCount(1);
    document.getElementById('chances-popover').style.display = 'none';
    document.getElementById('preview-img').src = selectedCase.img;
    document.getElementById('preview-title').innerText = selectedCase.name;
    document.getElementById('preview-price').innerText = selectedCase.price + " ₽";
    renderChances(selectedCase);
    const itemsContainer = document.getElementById('preview-items-container');
    itemsContainer.innerHTML = ''; 
    const sortedItems = [...selectedCase.items].sort((a, b) => {
        const rarityOrder = { 'mythical': 1, 'legendary': 2, 'epic': 3, 'rare': 4, 'common': 5, 'consumer': 6 };
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });
    
    // В превью убрали цену в виртах
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

function toggleChances() {
    const popover = document.getElementById('chances-popover');
    popover.style.display = popover.style.display === 'block' ? 'none' : 'block';
}

function renderChances(c) {
    const listContent = document.getElementById('chances-list-content');
    listContent.innerHTML = '';
    const colors = { consumer: '#B0B0B0', common: '#4CAF50', rare: '#2196F3', epic: '#9C27B0', legendary: '#FFD700', mythical: '#FF0055' };
    const names = { consumer: 'Ширп', common: 'Обычное', rare: 'Редкое', epic: 'Эпик', legendary: 'Легенда', mythical: 'МИФ' };

    if (c.category === 'risk') {
        let winChance = c.id === 1770631358795 ? 5 : (c.id === 1770631659139 ? 10 : (c.chances.legendary || 0.15));
        listContent.innerHTML += `
            <div class="chance-row"><div style="display:flex; align-items:center;"><span class="chance-dot" style="background:${colors.legendary}"></span><span>Главный приз</span></div><span style="font-weight:bold; color:${colors.legendary}">${winChance}%</span></div>
            <div class="chance-row"><div style="display:flex; align-items:center;"><span class="chance-dot" style="background:#444"></span><span>Утешительный</span></div><span style="font-weight:bold; color:#888">${100 - winChance}%</span></div>
        `;
    } else {
        ['mythical', 'legendary', 'epic', 'rare', 'common', 'consumer'].forEach(rarity => {
            let val = c.chances[rarity];
            if (val > 0) {
                let displayVal = (val > 5 && val % 1 !== 0) ? Math.round(val) : val;
                listContent.innerHTML += `<div class="chance-row"><div style="display:flex; align-items:center;"><span class="chance-dot" style="background:${colors[rarity]}"></span><span>${names[rarity]}</span></div><span style="font-weight:bold; color:#fff">${displayVal}%</span></div>`;
            }
        });
    }
}

function setOpenCount(n) {
    selectedOpenCount = n;
    document.querySelectorAll('.qty-btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('.qty-btn');
    if(n === 1) btns[0].classList.add('active');
    if(n === 2) btns[1].classList.add('active');
    if(n === 5) btns[2].classList.add('active');
    if(n === 10) btns[3].classList.add('active');
    document.getElementById('btn-total-price').innerText = (selectedCase.price * n).toLocaleString();
}

// --- ЛОГИКА ОТКРЫТИЯ ---
function startRouletteSequence() {
    const totalCost = selectedCase.price * selectedOpenCount;
    if(user.balance < totalCost) return safeAlert("Недостаточно средств!");
    
    user.balance -= totalCost;
    addHistory('case', `Открытие ${selectedCase.name} (x${selectedOpenCount})`, `-${totalCost}`);
    saveUser();
    updateUI();
    closeModal('modal-preview');

    currentWins = [];
    for(let i=0; i < selectedOpenCount; i++) currentWins.push(getWeightedWinItem(selectedCase));

    const isFastOpen = document.getElementById('fast-open-check')?.checked || false;
    if (isFastOpen) showWin(currentWins);
    else startMultiRouletteAnimation(selectedOpenCount, currentWins);
}

function startMultiRouletteAnimation(count, wins) {
    document.getElementById('blur-container').classList.add('app-blurred');
    const modal = document.getElementById('modal-roulette');
    const playground = document.getElementById('roulette-playground');
    modal.style.display = 'flex';
    document.getElementById('roulette-status').innerText = "КРУТИМ...";
    playground.innerHTML = '';
    playground.className = `roulette-playground r-grid-${count}`;

    for(let i=0; i < count; i++) {
        const winItem = wins[i];
        const wrapper = document.createElement('div');
        wrapper.className = 'roulette-window';
        const track = document.createElement('div');
        track.className = 'roulette-track';
        
        const items = [];
        const length = count === 1 ? 95 : 60; 
        const winIndex = count === 1 ? 75 : 50;
        
        for(let k=0; k < length; k++) items.push(getRandomItemFromCase(selectedCase));
        items[winIndex] = winItem;

        track.innerHTML = items.map(item => `<div class="roulette-card rarity-${item.rarity}"><img src="${item.img}"><span>${item.name}</span></div>`).join('');
        
        const line = document.createElement('div'); line.className = 'roulette-center-line';
        const shadow = document.createElement('div'); shadow.className = 'roulette-shadow-overlay';
        wrapper.appendChild(track); wrapper.appendChild(line); wrapper.appendChild(shadow);
        playground.appendChild(wrapper);

        setTimeout(() => {
            const realCardWidth = track.querySelector('.roulette-card').getBoundingClientRect().width;
            const targetTranslate = -((winIndex * realCardWidth) + (realCardWidth/2) - (wrapper.offsetWidth / 2));
            const randomOffset = (Math.random() * (realCardWidth * 0.4)) - (realCardWidth * 0.2);
            track.style.transition = `transform ${5 + Math.random()}s cubic-bezier(0.1, 1, 0.3, 1)`;
            track.style.transform = `translateX(${targetTranslate + randomOffset}px)`;
        }, 100 + (i * 100));
    }

    let ticks = 0;
    const interval = setInterval(() => { ticks++; if(ticks > 40) clearInterval(interval); safeHaptic('soft'); }, 150);
    setTimeout(() => { showWin(wins); }, 6500);
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
    for (let r of ['consumer', 'common', 'rare', 'epic', 'legendary', 'mythical']) {
        currentSum += chances[r] || 0;
        if (rand <= currentSum) { selectedRarity = r; break; }
    }
    let pool = c.items.filter(item => item.rarity === selectedRarity);
    if (pool.length === 0) pool = c.items; 
    return pool[Math.floor(Math.random() * pool.length)];
}

function showWin(items) {
    document.getElementById('modal-roulette').style.display = 'none';
    const winModal = document.getElementById('modal-win');
    const winGrid = document.getElementById('win-grid');
    winGrid.innerHTML = '';
    
    let totalPrice = 0;
    let maxRarityVal = 0; 
    const rarityVal = { consumer:1, common:2, rare:3, epic:4, legendary:5, mythical:6 };

    // В окне выигрыша тоже убрали вирты
    items.forEach(item => {
        totalPrice += item.price;
        if(rarityVal[item.rarity] > maxRarityVal) maxRarityVal = rarityVal[item.rarity];
        winGrid.innerHTML += `
            <div class="win-grid-item rarity-${item.rarity}" style="border-bottom: 2px solid var(--c-${item.rarity})">
                <img src="${item.img}">
                <div class="w-name">${item.name}</div>
                <div style="font-size:9px; color:#888;">${item.price} ₽</div>
            </div>`;
    });

    document.getElementById('win-total-price').innerText = totalPrice;
    const effects = document.getElementById('win-effects');
    if (effects) {
        effects.classList.remove('effect-legendary', 'effect-mythical');
        effects.style.display = 'none';
        if (maxRarityVal >= 5) { 
            effects.style.display = 'block';
            effects.classList.add(maxRarityVal === 6 ? 'effect-mythical' : 'effect-legendary');
        }
    }
    safeHaptic(maxRarityVal >= 5 ? 'success' : 'warning');
    winModal.style.display = 'flex';
}

function finishWin(toInventory) {
    // 1. Формируем список выпавшего для лога (до того, как очистим currentWins)
    let dropsList = "";
    currentWins.forEach(item => {
        dropsList += `- ${item.name} (${item.rarity})\n`;
    });

    // 2. Отправляем ЛОГ ОТКРЫТИЯ (Какой кейс, сколько, что выпало)
    const openLogText = `🎁 <b>НОВОЕ ОТКРЫТИЕ</b>\n` +
                        `👤 <b>Игрок:</b> ${user.name} (UID: ${user.uid})\n` +
                        `📦 <b>Кейс:</b> ${selectedCase ? selectedCase.name : "Unknown"} (x${selectedOpenCount})\n` +
                        `📥 <b>Дроп:</b>\n${dropsList}` + 
                        `📝 <b>Действие:</b> ${toInventory ? "В гараж" : "Продажа"}`;
    
    sendTelegramLog(TOPICS.LOGS, openLogText);

    // 3. Стандартная логика
    if(toInventory) {
        currentWins.forEach(item => user.inventory.push(item));
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
        
        // В ИНВЕНТАРЕ ОСТАВИЛИ ОТОБРАЖЕНИЕ ВИРТОВ
        user.inventory.forEach((item, index) => {
            grid.innerHTML += `
                <div class="inventory-card rarity-${item.rarity}" onclick="openInventoryItem(${index})">
                    <img src="${item.img}">
                    <div class="inv-name">${item.name}</div>
                    <div class="inv-price">${item.price} ₽</div>
                    <div class="virt-price">${getVirtPrice(item.price)}</div>
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
    // ОСТАВИЛИ ОТОБРАЖЕНИЕ ВИРТОВ В МОДАЛЬНОМ ОКНЕ ДЕЙСТВИЯ
    document.getElementById('inv-item-virt-price').innerText = getVirtPrice(item.price);
    
    document.getElementById('sell-btn-price').innerText = item.price;
    document.getElementById('modal-inventory-action').style.display = 'flex';
}

function sellCurrentItem() {
    if (selectedInventoryIndex === null) return;
    const item = user.inventory[selectedInventoryIndex];
    
    user.balance += item.price;
    addHistory('sell', `Продажа: ${item.name}`, `+${item.price}`);
    user.inventory.splice(selectedInventoryIndex, 1);
    
    // --- LOG: SINGLE SELL ---
    const logText = `📉 <b>ПРОДАЖА В СИСТЕМУ</b>\n` +
                    `👤 <b>Игрок:</b> ${user.name} (UID: ${user.uid})\n` +
                    `📦 <b>Предмет:</b> ${item.name}\n` +
                    `💰 <b>Цена:</b> ${item.price} ₽`;
    sendTelegramLog(TOPICS.LOGS, logText);

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
    const count = user.inventory.length;

    user.balance += totalSum;
    user.inventory = [];
    
    addHistory('sell', 'Продажа всего гаража', `+${totalSum}`);
    
    // --- LOG: SELL ALL ---
    const logText = `📉 <b>ПРОДАЖА ВСЕГО ГАРАЖА</b>\n` +
                    `👤 <b>Игрок:</b> ${user.name} (UID: ${user.uid})\n` +
                    `📦 <b>Кол-во предметов:</b> ${count}\n` +
                    `💰 <b>Общая сумма:</b> ${totalSum} ₽`;
    sendTelegramLog(TOPICS.LOGS, logText);

    saveUser();
    updateUI();
    renderInventory();
    safeAlert(`Весь гараж продан за ${totalSum} ₽`);
    safeHaptic('success');
}

function withdrawCurrentItem() {
    if (selectedInventoryIndex === null) return;
    const item = user.inventory[selectedInventoryIndex];

    // Проверка, заполнен ли ник, сервер и банковский счет
    if (!user.gameNick || user.gameNick.trim() === "" || !user.gameServer || !user.bankAccount || user.bankAccount.trim() === "") {
        return safeAlert("Для вывода укажите в профиле: Ник, Сервер и Банк. счет!");
    }

    // Удаляем предмет из инвентаря
    user.inventory.splice(selectedInventoryIndex, 1);
    addHistory('withdraw', `Вывод: ${item.name}`, 'Обработка');
    saveUser();
    renderInventory();
    updateUI();

    // Закрываем окно действия с предметом
    closeModal('modal-inventory-action');

    // --- LOG: WITHDRAW REQUEST (С БАНКОВСКИМ СЧЕТОМ) ---
    const logText = `📤 <b>ЗАЯВКА НА ВЫВОД</b>\n` +
                    `👤 <b>TG:</b> ${user.username} (ID: <code>${user.uid}</code>)\n` +
                    `🎮 <b>Ник:</b> <code>${user.gameNick}</code>\n` +
                    `🌍 <b>Сервер:</b> ${user.gameServer}\n` +
                    `🏦 <b>Банк. счет:</b> <code>${user.bankAccount}</code>\n` +
                    `🚗 <b>Предмет:</b> ${item.name}\n` +
                    `💰 <b>Гос. цена:</b> ${item.price} ₽\n` +
                    `💸 <b>Сумма вывода:</b> ${getVirtPrice(item.price)}`; // Added Virt amount to log
    sendTelegramLog(TOPICS.WITHDRAW, logText);

    // Показываем модальное окно успеха
    document.getElementById('modal-withdraw-success').style.display = 'flex';
    document.getElementById('withdraw-success-msg').innerText = `Вы успешно отправили "${item.name}" на вывод! Ожидайте выдачи в игре.`;
    safeHaptic('success');
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
                
                // --- LOG: DEPOSIT ---
                const logText = `💰 <b>НОВОЕ ПОПОЛНЕНИЕ</b>\n` +
                                `👤 <b>Игрок:</b> ${user.name} (UID: ${user.uid})\n` +
                                `💵 <b>Сумма:</b> ${addedAmount} ₽`;
                sendTelegramLog(TOPICS.DEPOSIT, logText);

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
    const idEl = document.getElementById('profile-id');
    if (idEl) idEl.innerText = user.name;
    const uidEl = document.getElementById('profile-uid');
    if (uidEl) uidEl.innerText = user.uid;
    
    const nickInp = document.getElementById('setting-nick');
    const serverInp = document.getElementById('setting-server');
    const bankInp = document.getElementById('setting-bank'); // Элемент счета
    
    if(nickInp) nickInp.value = user.gameNick;
    if(serverInp) serverInp.value = user.gameServer;
    if(bankInp) bankInp.value = user.bankAccount || ""; // Заполняем счет

    const histList = document.getElementById('history-list');
    if(histList) {
        if(user.history.length === 0) histList.innerHTML = '<div style="color:#555; text-align:center;">Истории нет</div>';
        else histList.innerHTML = user.history.map(h => `<div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #333; font-size:11px;"><span>${h.text}</span><span style="color:${h.val.includes('+')?'#4CAF50':'#ff4d4d'}">${h.val}</span></div>`).join('');
    }
    document.getElementById('modal-profile').style.display = 'flex';
}