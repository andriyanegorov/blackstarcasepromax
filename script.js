const tg = window.Telegram.WebApp;
const API_URL = "https://script.google.com/macros/s/AKfycbym7BZkWwdqkB8_yE6ynKaeYKtd8X833chIM6smbbUAs_85epS5W6bz2uBi0pcQBRqF/exec";
const BOT_TOKEN = "8555487401:AAFWK-AOovV9DbnKW62ZAVIvEJWAtung05Y";
const CHAT_ID = "@brcasesvidacha"; 
const TOPICS = { WITHDRAW: 2, DEPOSIT: 4, LOGS: 8 };

const VIRT_RATE = 10000; 
function getVirtPrice(rub) { return (rub * VIRT_RATE).toLocaleString() + ' Вирт'; }

const RARITY_VALS = { 'consumer': 1, 'common': 2, 'rare': 3, 'epic': 4, 'legendary': 5, 'mythical': 6 };
const RARITY_COLORS = { 'consumer': '#B0B0B0', 'common': '#4CAF50', 'rare': '#3b82f6', 'epic': '#a855f7', 'legendary': '#eab308', 'mythical': '#ff3333' };

/* ==============================================
   КОНФИГУРАЦИЯ
   ============================================== */
let GAME_CONFIG = [
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
            { "name": "Корона короля", "price": 249, "img": "https://i.imgur.com/jMuPEij.png", "rarity": "epic" },
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
            { "name": "BMW M5 E60", "price": 499, "img": "https://i.imgur.com/DO7L8do.png", "rarity": "rare" },
            { "name": "Subaru WRX STi", "price": 549, "img": "https://i.imgur.com/TTbWXcs.png", "rarity": "rare" },
            { "name": "Toyota Camry 3.5", "price": 599, "img": "https://i.imgur.com/AnTZ6oV.png", "rarity": "rare" },
            { "name": "Volkswagen Passat", "price": 719, "img": "https://i.imgur.com/wTKU7AT.png", "rarity": "rare" },
            { "name": "Mercedes-Benz GT63s", "price": 1199, "img": "https://i.imgur.com/S9MRfzI.png", "rarity": "epic" },
            { "name": "Lamborghini Aventador S", "price": 4999, "img": "https://i.imgur.com/T2oklf8.png", "rarity": "legendary" },
            { "name": "Aurus Senat", "price": 6999, "img": "https://i.imgur.com/ExQjhq2.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz G63 AMG", "price": 5499, "img": "https://i.imgur.com/E7Sbn3I.png", "rarity": "legendary" },
            { "name": "Bugatti Divo", "price": 19999, "img": "https://i.imgur.com/TDNAGwZ.png", "rarity": "mythical" },
            { "name": "Lamborghini Urus", "price": 3799, "img": "https://i.imgur.com/7ehMTjl.png", "rarity": "epic" },
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
        "price": 3999,
        "category": "default",
        "img": "https://i.imgur.com/qzvZZmz.png",
        "chances": { "consumer": 0, "common": 0, "rare": 0, "epic": 0, "legendary": 99.9, "mythical": 0.1 },
        "items": [
            { "name": "Ocean Yacht", "price": 19999, "img": "https://i.imgur.com/U0T51l8.png", "rarity": "mythical" },
            { "name": "Rolls Royce Spectre", "price": 29999, "img": "https://i.imgur.com/vlmo0vU.png", "rarity": "mythical" },
            { "name": "Tesla CyberTruck", "price": 19999, "img": "https://i.imgur.com/Yhafdvt.png", "rarity": "mythical" },
            { "name": "Mercedes-Benz G63 AMG 6x6", "price": 39999, "img": "https://i.imgur.com/oFp8ZbQ.png", "rarity": "mythical" },
            { "name": "Bugatti Chiron", "price": 19999, "img": "https://i.imgur.com/chK3mjR.png", "rarity": "mythical" },
            { "name": "Bugatti Veyron", "price": 24999, "img": "https://i.imgur.com/5q4a8L6.png", "rarity": "mythical" },
            { "name": "Ferrari Enzo", "price": 3999, "img": "https://i.imgur.com/J3mN0Lp.png", "rarity": "legendary" },
            { "name": "Daewoo Matiz", "price": 2999, "img": "https://i.imgur.com/4QpI1cf.png", "rarity": "legendary" },
            { "name": "Ducati XDiavel", "price": 1499, "img": "https://i.imgur.com/rQn4wfp.pnga", "rarity": "legendary" },
            { "name": "Lamborghini Urus", "price": 3799, "img": "https://i.imgur.com/PYEdyJD.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz G63 AMG Max", "price": 5999, "img": "https://i.imgur.com/KF2mLzy.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz SLR McLaren", "price": 3999, "img": "https://i.imgur.com/wiTkzQa.png", "rarity": "legendary" },
            { "name": "Lamborghini Aventador", "price": 4999, "img": "https://i.imgur.com/HJCd4kU.png", "rarity": "legendary" },
            { "name": "Зловещий", "price": 1999, "img": "https://i.imgur.com/o7R4s2h.png", "rarity": "legendary" },
            { "name": "Invetero Coquette D5", "price": 2999, "img": "https://i.imgur.com/RWjulPn.png", "rarity": "legendary" },
            { "name": "F1", "price": 2999, "img": "https://i.imgur.com/rPjYhNj.png", "rarity": "legendary" },
            { "name": "Mercedes-Benz AMG GT R", "price": 3299, "img": "https://i.imgur.com/t470enD.png", "rarity": "legendary" }
        ]
    },
    {
        "id": 1770583808350,
        "name": "Кейс с Наборами",
        "price": 269,
        "category": "bundles",
        "img": "https://i.imgur.com/2tU356X.png",
        "chances": { "consumer": 0, "common": 70, "rare": 23, "epic": 5, "legendary": 1, "mythical": 0.08 },
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
    },
    {
        "id": 1770662160253,
        "name": "Кейс с аксессуарами ",
        "price": 89,
        "category": "bundles",
        "img": "https://i.imgur.com/UQBNuq0.png",
        "chances": { "consumer": 65, "common": 26, "rare": 6, "epic": 3, "legendary": 1, "mythical": 0 },
        "items": [
            { "name": "Кейс Серый", "price": 250, "img": "https://i.imgur.com/zUm5J1t.png", "rarity": "epic" },
            { "name": "Маска Дали", "price": 29, "img": "https://i.imgur.com/d0V1oez.png", "rarity": "consumer" },
            { "name": "Очки «Street»", "price": 19, "img": "https://i.imgur.com/BRzepEr.png", "rarity": "consumer" },
            { "name": "Корона Короля", "price": 99, "img": "https://i.imgur.com/UJ94rwK.png", "rarity": "rare" },
            { "name": "Рюкзак «Мопс»", "price": 79, "img": "https://i.imgur.com/otV8wsX.png", "rarity": "common" },
            { "name": "Рюкзак Боксера", "price": 1699, "img": "https://i.imgur.com/IDeo6vy.png", "rarity": "legendary" },
            { "name": "Водяной Пистолет", "price": 1399, "img": "https://i.imgur.com/kgNJP3A.png", "rarity": "legendary" },
            { "name": "Голова Коня", "price": 399, "img": "https://i.imgur.com/6wYdcnt.png", "rarity": "epic" },
            { "name": "Маска Ведущего", "price": 249, "img": "https://i.imgur.com/qkO1Jn2.png", "rarity": "epic" },
            { "name": "Крылья Демона", "price": 149, "img": "https://i.imgur.com/P3Aa4RL.png", "rarity": "rare" },
            { "name": "Демонические Рожки", "price": 99, "img": "https://i.imgur.com/rR8BTUv.png", "rarity": "common" },
            { "name": "Маска Чилл", "price": 1299, "img": "https://i.imgur.com/7keDGSp.png", "rarity": "legendary" },
            { "name": "BR VISUALS MAX", "price": 69, "img": "https://i.imgur.com/eGoBoZp.png", "rarity": "common" },
            { "name": "Новогодний Топорик", "price": 249, "img": "https://i.imgur.com/ot06msC.png", "rarity": "epic" },
            { "name": "Побитые Очки", "price": 10, "img": "https://i.imgur.com/D6ARvie.png", "rarity": "consumer" },
            { "name": "Шлем MechaCat", "price": 49, "img": "https://i.imgur.com/ziSkqaL.png", "rarity": "common" },
            { "name": "Новый предмет", "price": 149, "img": "https://i.imgur.com/ZzU7GcT.png", "rarity": "rare" },
            { "name": "Новый предмет", "price": 49, "img": "https://i.imgur.com/gSovBRv.png", "rarity": "consumer" }
        ]
    },
    {
        "id": 1770663755440,
        "name": "Кейс Скинов",
        "price": 189,
        "category": "bundles",
        "img": "https://i.imgur.com/gEvCNBo.png",
        "chances": { "consumer": 65, "common": 19, "rare": 11, "epic": 4.5, "legendary": 0.5, "mythical": 0 },
        "items": [
            { "name": "Фирменная одежда", "price": 14999, "img": "https://i.imgur.com/ht3tCIh.png", "rarity": "mythical" },
            { "name": "Скелетон", "price": 2999, "img": "https://i.imgur.com/H6pQT4H.png", "rarity": "legendary" },
            { "name": "Известный", "price": 2499, "img": "https://i.imgur.com/Cv342z2.png", "rarity": "legendary" },
            { "name": "Господин", "price": 2499, "img": "https://i.imgur.com/LzAuA7Q.png", "rarity": "legendary" },
            { "name": "Известный", "price": 2499, "img": "https://i.imgur.com/D7HdXSB.png", "rarity": "legendary" },
            { "name": "Злой", "price": 1799, "img": "https://i.imgur.com/rFeWptm.png", "rarity": "legendary" },
            { "name": "Известный", "price": 1249, "img": "https://i.imgur.com/h4gQwRd.png", "rarity": "epic" },
            { "name": "Известный", "price": 1249, "img": "https://i.imgur.com/4F5Ezcr.png", "rarity": "epic" },
            { "name": "Илон Маск", "price": 1249, "img": "https://i.imgur.com/zpWvWfr.png", "rarity": "epic" },
            { "name": "Игрок 456", "price": 749, "img": "https://i.imgur.com/fGAuWKg.png", "rarity": "epic" },
            { "name": "Мужчина", "price": 2499, "img": "https://i.imgur.com/2mDwJC4.png", "rarity": "legendary" },
            { "name": "Дед Мороз", "price": 1249, "img": "https://i.imgur.com/8aBOP3g.png", "rarity": "epic" },
            { "name": "Иван Блогер", "price": 2499, "img": "https://i.imgur.com/NXjT5RT.png", "rarity": "legendary" },
            { "name": "Блогер", "price": 2499, "img": "https://i.imgur.com/RCOGZoE.png", "rarity": "legendary" },
            { "name": "Поззи", "price": 1249, "img": "https://i.imgur.com/8OPkO6o.png", "rarity": "epic" },
            { "name": "Пчелка", "price": 399, "img": "https://i.imgur.com/1w0yRay.png", "rarity": "rare" },
            { "name": "Женщина", "price": 1249, "img": "https://i.imgur.com/NSmT6EM.png", "rarity": "epic" },
            { "name": "Посейдон", "price": 1499, "img": "https://i.imgur.com/jXe6SCe.png", "rarity": "legendary" },
            { "name": "Борик", "price": 749, "img": "https://i.imgur.com/86uLx2M.png", "rarity": "epic" },
            { "name": "Одежда 29", "price": 9, "img": "https://i.imgur.com/kkYPHsz.png", "rarity": "consumer" },
            { "name": "Защитница закона", "price": 59, "img": "https://i.imgur.com/xzipKMf.png", "rarity": "consumer" },
            { "name": "Иван Береговой", "price": 79, "img": "https://i.imgur.com/LbGuFe9.png", "rarity": "consumer" },
            { "name": "Королева Манипуляций", "price": 149, "img": "https://i.imgur.com/h33r7H3.png", "rarity": "common" },
            { "name": "Бабушка Серафима", "price": 79, "img": "https://i.imgur.com/ZXDIAEs.png", "rarity": "consumer" },
            { "name": "Бомж", "price": 9, "img": "https://i.imgur.com/wOp6yCg.png", "rarity": "consumer" },
            { "name": "Емеля", "price": 299, "img": "https://i.imgur.com/goOf1rc.png", "rarity": "common" },
            { "name": "Пузатый", "price": 19, "img": "https://i.imgur.com/2LVGLzg.png", "rarity": "consumer" },
            { "name": "Рыбачка", "price": 399, "img": "https://i.imgur.com/7QB7INu.png", "rarity": "common" },
            { "name": "Хоуми", "price": 349, "img": "https://i.imgur.com/vUSoZ3w.png", "rarity": "rare" },
            { "name": "Опасный", "price": 399, "img": "https://i.imgur.com/Iumo5AU.pnghttps://i.imgur.com/Iumo5AU.png", "rarity": "rare" }
        ]
    }
];

let PROMO_CODES = [
    { "code": "ADMINKAADMINKAADMINKA", "val": 1000, "limit": 0 },
    { "code": "BRCASES", "val": 50, "limit": 1 },
    { "code": "KOLBASENKO", "val": 15, "limit": 1 },
    { "code": "VIBE", "val": 10, "limit": 1 },
    { "code": "BAN", "val": 5, "limit": 1 },
    { "code": "FREE", "val": 20, "limit": 1 },
    { "code": "BLACK", "val": 12, "limit": 1 },
    { "code": "14FEB", "val": 14, "limit": 1 },
    { "code": "YOUTUBE", "val": 9, "limit": 1 },
    { "code": "TIKTOK", "val": 9, "limit": 1 }
];


// --- STATE ---
const STORAGE_KEY = 'br_user_data_v4';
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
    activatedPromos: [] 
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
   INIT (Синхронизация CloudStorage)
   ============================================== */
document.addEventListener('DOMContentLoaded', () => {
    try { tg.expand(); } catch(e) {}
    
    // Сначала загружаем конфиги
    loadExternalConfig(); 
    initCases(); 
    flattenItems();

    // Запускаем асинхронную загрузку пользователя (Cloud -> Local)
    initUserSession();
});

function initUserSession() {
    // 1. Пытаемся достать данные из CloudStorage (Telegram)
    if (tg && tg.CloudStorage) {
        tg.CloudStorage.getItem(STORAGE_KEY, (err, value) => {
            if (!err && value) {
                // Если в облаке есть данные
                try {
                    const cloudData = JSON.parse(value);
                    user = { ...DEFAULT_USER, ...cloudData };
                    console.log("Loaded from CloudStorage");
                } catch (e) {
                    console.error("Cloud parse error", e);
                    loadFromLocal(); // Ошибка парсинга - пробуем локалку
                }
            } else {
                // В облаке пусто - пробуем локалку (первый запуск с синхронизацией)
                console.log("Cloud empty, trying LocalStorage");
                loadFromLocal();
            }
            finalizeInit();
        });
    } else {
        // Не в Телеграме или нет CloudStorage
        loadFromLocal();
        finalizeInit();
    }
}

function loadFromLocal() {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
        try {
            user = { ...DEFAULT_USER, ...JSON.parse(localData) };
            // Если нашли данные локально, сразу закинем в облако для синхронизации
            saveUser(); 
        } catch(e) {
            user = { ...DEFAULT_USER };
        }
    } else {
        user = { ...DEFAULT_USER };
    }
}

function finalizeInit() {
    // Обновляем данные пользователя из текущей сессии TG (имя, аватар могли поменяться)
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) { 
        user.uid = tg.initDataUnsafe.user.id; 
        user.name = tg.initDataUnsafe.user.first_name || "Игрок"; 
        user.tgUsername = tg.initDataUnsafe.user.username ? `@${tg.initDataUnsafe.user.username}` : "Нет";
        if(tg.initDataUnsafe.user.photo_url) user.avatar = tg.initDataUnsafe.user.photo_url; 
    } else if (user.uid === 0) {
        // Фейк данные для браузера
        user.uid = Math.floor(100000 + Math.random() * 900000);
        user.tgUsername = "@guest";
    }
    
    // Сохраняем актуальное состояние и рендерим
    saveUser();
    updateUI(); 
    renderInventory(); 
    renderHistory();
}

// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ СОХРАНЕНИЯ (LOCAL + CLOUD)
function saveUser() { 
    const dataStr = JSON.stringify(user);
    
    // 1. Сохраняем локально (быстро)
    localStorage.setItem(STORAGE_KEY, dataStr); 
    
    // 2. Сохраняем в облако TG (асинхронно, для синхронизации)
    if (tg && tg.CloudStorage) {
        tg.CloudStorage.setItem(STORAGE_KEY, dataStr, (err, saved) => {
            if (err) console.error("Cloud Save Error:", err);
        });
    }
}

function loadExternalConfig() {
    const adminCases = localStorage.getItem('admin_game_config_v6');
    const adminPromos = localStorage.getItem('admin_promo_config_v3');
    if(adminCases) { try { const parsed = JSON.parse(adminCases); if(Array.isArray(parsed) && parsed.length > 0) GAME_CONFIG = parsed; } catch(e){} }
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
function initCases() { const cats = { 'default': 'cases-default', 'bundles': 'cases-bundles', 'risk': 'cases-risk' }; for (let c in cats) { const el = document.getElementById(cats[c]); if(el) el.innerHTML = ''; } GAME_CONFIG.forEach(c => { const targetId = cats[c.category] || 'cases-default'; const div = document.getElementById(targetId); if (div) { div.innerHTML += `<div class="case-card" onclick="openPreview(${c.id})"><img src="${c.img}" class="case-img" onerror="this.src='https://via.placeholder.com/150'"><div>${c.name}</div><div>${c.price} ₽</div></div>`; } }); }
function openPreview(id) { selectedCase = GAME_CONFIG.find(c => c.id == id); if (!selectedCase) return; setOpenCount(1); document.getElementById('preview-img').src = selectedCase.img; document.getElementById('preview-title').innerText = selectedCase.name; document.getElementById('preview-price').innerText = selectedCase.price + " ₽"; const cont = document.getElementById('preview-items-container'); cont.innerHTML = ''; let sorted = [...selectedCase.items].sort((a,b) => b.price - a.price); sorted.forEach(item => { cont.innerHTML += `<div class="preview-item rarity-${item.rarity}"><img src="${item.img}" onerror="this.src='https://via.placeholder.com/50'"><div class="p-name">${item.name}</div><div class="p-price">${item.price} ₽</div></div>`; }); document.getElementById('modal-preview').style.display = 'flex'; }
function setOpenCount(n) { selectedOpenCount = n; document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); document.getElementById('btn-total-price').innerText = (selectedCase.price * n).toLocaleString(); }

function startRouletteSequence() {
    const cost = selectedCase.price * selectedOpenCount;
    if(user.balance < cost) return safeAlert("Недостаточно средств!");
    user.balance -= cost;
    addHistory(`Открытие ${selectedCase.name} x${selectedOpenCount}`, `-${cost}`);
    saveUser(); updateUI(); closeModal('modal-preview');
    currentWins = []; for(let i=0; i<selectedOpenCount; i++) currentWins.push(getWinItem(selectedCase));
    if(document.getElementById('fast-open-check').checked) showWin(currentWins); else playRouletteAnim(selectedOpenCount, currentWins);
}
function getWinItem(c) { const weights = c.chances || { consumer: 50, common: 30, rare: 15, epic: 4, legendary: 1, mythical: 0 }; const rand = Math.random() * 100; let sum = 0; let rar = 'consumer'; for(let r in weights) { sum += weights[r]; if(rand <= sum) { rar = r; break; } } const pool = c.items.filter(i => i.rarity === rar); if (pool.length === 0) return c.items[0]; return pool[Math.floor(Math.random()*pool.length)]; }

// === ROULETTE (RESIZED FOR NEW CSS) ===
function playRouletteAnim(count, wins) {
    const modal = document.getElementById('modal-roulette');
    const container = document.getElementById('roulette-strips-container');
    container.innerHTML = '';
    
    // Show modal & trigger smooth transition
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);

    const isMulti = count > 1;
    if(isMulti) container.classList.add('grid-mode');
    else container.classList.remove('grid-mode');
    
    // Updated width logic based on new CSS (110px + 10px margin = 120px for single, ~76px for grid)
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
            trackHTML += `<div class="m-card rarity-${randItem.rarity}"><img src="${randItem.img}"><div class="m-card-info"><div class="m-name">${randItem.name}</div><div class="m-price">${randItem.price} ₽</div></div></div>`;
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
    // Reset classes
    winContent.className = 'modal-glass center-modal win-modal'; 
    if(bestRarityVal >= 3) { 
        winContent.classList.add(bestRarityName); 
    }

    document.getElementById('win-total-price').innerText = sum;
    document.getElementById('modal-win').style.display = 'flex';
    safeHaptic('success');
}
function getRarityColor(rarity) { return RARITY_COLORS[rarity] || '#ccc'; }

// === DETAILED LOGS (UPDATED) ===
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
function renderInventory() { const grid = document.getElementById('inventory-grid'); grid.innerHTML = ''; if(user.inventory.length === 0) { document.getElementById('empty-inventory').style.display = 'block'; document.getElementById('btn-sell-all').style.display = 'none'; } else { document.getElementById('empty-inventory').style.display = 'none'; document.getElementById('btn-sell-all').style.display = 'block'; user.inventory.forEach((i, idx) => { grid.innerHTML += `<div class="case-card rarity-${i.rarity}" onclick="openInvItem(${idx})" style="padding:10px;"><img src="${i.img}" style="width:100%; height:60px; object-fit:contain;"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); } }
function openInvItem(idx) { selectedInventoryIndex = idx; const i = user.inventory[idx]; document.getElementById('inv-item-img').src = i.img; document.getElementById('inv-item-name').innerText = i.name; document.getElementById('inv-item-price').innerText = i.price; document.getElementById('inv-item-virt-price').innerText = getVirtPrice(i.price); document.getElementById('sell-btn-price').innerText = i.price; const badge = document.getElementById('inv-rarity-badge'); badge.innerText = i.rarity; const color = RARITY_COLORS[i.rarity] || '#888'; document.getElementById('inv-bg-glow').style.background = `radial-gradient(circle at center, ${color}, transparent 70%)`; badge.style.borderColor = color; badge.style.color = color; badge.style.boxShadow = `0 0 10px ${color}33`; document.getElementById('modal-inventory-action').style.display = 'flex'; }
function sellCurrentItem() { const i = user.inventory[selectedInventoryIndex]; user.balance += i.price; user.inventory.splice(selectedInventoryIndex, 1); addHistory(`Продажа: ${i.name}`, `+${i.price}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА</b>\n${getLogHeader()}\n📦 ${i.name}\n💰 ${i.price}₽`); saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); }
function sellAllItems() { if(!confirm("Продать всё?")) return; let sum = user.inventory.reduce((a,b)=>a+b.price, 0); user.balance += sum; user.inventory = []; addHistory(`Продажа всего`, `+${sum}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА ВСЕГО</b>\n${getLogHeader()}\n💰 ${sum}₽`); saveUser(); updateUI(); renderInventory(); }
function withdrawCurrentItem() { if(!user.gameNick || !user.gameServer || !user.bankAccount) { openProfileModal(); safeAlert("Заполни профиль!"); return; } const i = user.inventory[selectedInventoryIndex]; user.inventory.splice(selectedInventoryIndex, 1); sendTelegramLog(TOPICS.WITHDRAW, `🏦 <b>ВЫВОД</b>\n${getLogHeader()}\n🎮 <b>GameNick:</b> ${user.gameNick}\n🌍 <b>Server:</b> ${user.gameServer}\n💳 <b>Bank:</b> ${user.bankAccount}\n\n📦 <b>ITEM:</b> ${i.name}\n💵 <b>VIRT:</b> ${getVirtPrice(i.price)}`); saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); document.getElementById('modal-withdraw-success').style.display = 'flex'; }
function switchTab(id) { document.querySelectorAll('.section').forEach(e=>e.classList.remove('active')); document.getElementById('tab-'+id).classList.add('active'); document.querySelectorAll('.nav-item').forEach(e=>e.classList.remove('active')); event.currentTarget.classList.add('active'); if(id === 'shop') { const el = document.getElementById('user-balance'); el.style.opacity = '0.5'; setTimeout(()=>el.style.opacity='1', 200); } }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function saveSettings() { const nick = document.getElementById('setting-nick').value; const srv = document.getElementById('setting-server').value; const bank = document.getElementById('setting-bank').value; if(nick) user.gameNick = nick; if(srv) user.gameServer = srv; if(bank) user.bankAccount = bank; saveUser(); updateUI(); safeAlert("Сохранено"); closeModal('modal-profile'); }
function renderHistory() { const hList = document.getElementById('history-list'); if(!hList) return; hList.innerHTML = ''; user.history.forEach(h => { hList.innerHTML += `<div><span>${h.text}</span><span style="color:${h.color}">${h.val}</span></div>`; }); }
function openProfileModal() { document.getElementById('setting-nick').value = user.gameNick; document.getElementById('setting-server').value = user.gameServer; document.getElementById('setting-bank').value = user.bankAccount; renderHistory(); document.getElementById('modal-profile').style.display = 'flex'; }
function activatePromo() { const code = document.getElementById('promo-input').value.trim(); if(!code) return; const p = PROMO_CODES.find(x => x.code === code); if(p) { if(p.limit && user.activatedPromos.includes(code)) return safeAlert("Уже использован"); user.balance += p.val; if(p.limit) user.activatedPromos.push(code); addHistory(`Промо: ${code}`, `+${p.val}`); saveUser(); updateUI(); safeAlert(`+${p.val} ₽`); } else safeAlert("Неверный код"); }
function payCustomAmount() { initYooPayment(parseInt(document.getElementById('custom-amount').value)); }
function initYooPayment(sum) { if(!sum || sum < 10) return safeAlert("Минимум 10р"); const label = `order_${user.uid}_${Date.now()}`; const url = `https://yoomoney.ru/quickpay/confirm?receiver=4100117889685528&quickpay-form=shop&targets=Deposit&paymentType=AC&sum=${sum}&label=${label}`; if(tg.openLink) tg.openLink(url); else window.open(url, '_blank'); const statusBox = document.getElementById('payment-status-box'); statusBox.style.display = 'flex'; statusBox.querySelector('.p-title').innerText = `Ожидание ${sum} ₽`; statusBox.querySelector('.p-desc').innerText = "Проверка транзакции..."; if(paymentCheckInterval) clearInterval(paymentCheckInterval); let checks = 0; paymentCheckInterval = setInterval(async () => { checks++; if(checks > 60) { clearInterval(paymentCheckInterval); statusBox.querySelector('.p-title').innerText = "Время истекло"; return; } try { const r = await fetch(`${API_URL}?label=${label}`); const d = await r.json(); if(d.status === 'success') { clearInterval(paymentCheckInterval); user.balance += parseFloat(d.amount); addHistory('Пополнение', `+${d.amount}`); sendTelegramLog(TOPICS.DEPOSIT, `💰 <b>ПОПОЛНЕНИЕ</b>\n${getLogHeader()}\n💵 ${d.amount} rub`); saveUser(); updateUI(); statusBox.querySelector('.p-title').innerText = "Успешно!"; setTimeout(() => { statusBox.style.display = 'none'; }, 3000); } } catch(e){} }, 5000); }
