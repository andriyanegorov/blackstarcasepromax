/* ==============================================
   ЗАЩИТА ОТ КОПИРОВАНИЯ ИЗОБРАЖЕНИЙ
   ============================================== */
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.addEventListener('dragstart', event => event.preventDefault());

const tg = window.Telegram.WebApp;
const API_URL = "https://script.google.com/macros/s/AKfycbym7BZkWwdqkB8_yE6ynKaeYKtd8X833chIM6smbbUAs_85epS5W6bz2uBi0pcQBRqF/exec";
const BOT_TOKEN = "8555487401:AAFWK-AOovV9DbnKW62ZAVIvEJWAtung05Y";

// --- НАСТРОЙКИ ЛОГОВ ---
const LOG_CHAT_ID = "@brcasesvidacha"; 
const TOPICS = { WITHDRAW: 2, DEPOSIT: 4, LOGS: 8 }; 

// --- НАСТРОЙКИ ПОДПИСКИ ---
const SUB_CHANNEL_URL = "https://t.me/blackrussiacases_news";

const PLACEHOLDER_IMG = "https://placehold.co/150x150/1a1a1a/ffffff?text=No+Image";

const VIRT_RATE = 10000; 
function getVirtPrice(rub) { return (rub * VIRT_RATE).toLocaleString() + ' Вирт'; }

const RARITY_VALS = { 'consumer': 1, 'common': 2, 'rare': 3, 'epic': 4, 'legendary': 5, 'mythical': 6 };
const RARITY_COLORS = { 'consumer': '#B0B0B0', 'common': '#4CAF50', 'rare': '#3b82f6', 'epic': '#a855f7', 'legendary': '#eab308', 'mythical': '#ff3333' };

/* ==============================================
   КОНФИГУРАЦИЯ (ВСТАВИТЬ ЭТО В НАЧАЛО SCRIPT.JS)
   ============================================== */
const GAME_CONFIG = [
    {
        "id": "sub_case_1",
        "name": "Раз в ДВА ДНЯ! (За подписку)",
        "price": 0,
        "category": "free",
        "img": "img/free_case.png",
        "chances": {
            "consumer": 40,
            "common": 30,
            "rare": 20,
            "epic": 8,
            "legendary": 2,
            "mythical": 0
        },
        "items": [
            {
                "name": "50.000 Вирт",
                "price": 5,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "100.000 Вирт",
                "price": 10,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "BMW M5 F90",
                "price": 400,
                "img": "img/m5f90.png",
                "rarity": "legendary"
            },
            {
                "name": "Маска Демона",
                "price": 150,
                "img": "img/demon.png",
                "rarity": "epic"
            },
            {
                "name": "Аптечка",
                "price": 7,
                "img": "img/aptechka.png",
                "rarity": "consumer"
            },
            {
                "name": "10 BC",
                "price": 10,
                "img": "img/bc.png",
                "rarity": "common"
            }
        ]
    },
    {
        "id": 1,
        "name": "Кейс Бомжа",
        "price": 29,
        "category": "default",
        "img": "img/bomj_case.png",
        "chances": {
            "consumer": 50,
            "common": 38,
            "rare": 8,
            "epic": 3,
            "legendary": 1,
            "mythical": 1
        },
        "items": [
            {
                "name": "50.000 Вирт",
                "price": 5,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "150.000 Вирт",
                "price": 15,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "400.000 Вирт",
                "price": 40,
                "img": "img/money.png",
                "rarity": "epic"
            },
            {
                "name": "5.000.000 Вирт",
                "price": 500,
                "img": "img/money.png",
                "rarity": "legendary"
            },
            {
                "name": "Очки «Сердечки»",
                "price": 500,
                "img": "img/heartglass.png",
                "rarity": "legendary"
            },
            {
                "name": "Серый кейс",
                "price": 500,
                "img": "img/graycase.png",
                "rarity": "legendary"
            },
            {
                "name": "Маска Дали",
                "price": 70,
                "img": "img/dali.png",
                "rarity": "rare"
            },
            {
                "name": "Очки «Street»",
                "price": 19,
                "img": "img/streetglass.png",
                "rarity": "consumer"
            },
            {
                "name": "Скин «Емеля»",
                "price": 300,
                "img": "img/emelya.png",
                "rarity": "epic"
            },
            {
                "name": "Скин «Пузатый»",
                "price": 10,
                "img": "img/pyzatiy.png",
                "rarity": "consumer"
            },
            {
                "name": "Набор «Сельчанин»",
                "price": 70,
                "img": "img/pack_selchanin.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Бандит»",
                "price": 650,
                "img": "img/pack_bandit.png",
                "rarity": "legendary"
            },
            {
                "name": "ZAZ",
                "price": 15,
                "img": "img/zaz.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2107",
                "price": 30,
                "img": "img/2107.png",
                "rarity": "common"
            },
            {
                "name": "LADA NIVA",
                "price": 80,
                "img": "img/niva.png",
                "rarity": "rare"
            },
            {
                "name": "LADA VESTA",
                "price": 175,
                "img": "img/vesta.png",
                "rarity": "epic"
            },
            {
                "name": "Mercedes-Benz W210",
                "price": 300,
                "img": "img/w210.png",
                "rarity": "legendary"
            },
            {
                "name": "10 BC",
                "price": 10,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "25 BC",
                "price": 25,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "50 BC",
                "price": 50,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "500 BC",
                "price": 500,
                "img": "img/bc.png",
                "rarity": "legendary"
            },
            {
                "name": "Аптечка",
                "price": 7,
                "img": "img/aptechka.png",
                "rarity": "consumer"
            },
            {
                "name": "Ремонтный набор",
                "price": 7,
                "img": "img/remka.png",
                "rarity": "consumer"
            },
            {
                "name": "Скутер",
                "price": 15,
                "img": "img/skuter.png",
                "rarity": "common"
            }
        ]
    },
    {
        "id": 1770544149013,
        "name": "Стандартный Кейс",
        "price": 199,
        "category": "default",
        "img": "img/standart_case.png",
        "chances": {
            "consumer": 0,
            "common": 60,
            "rare": 34,
            "epic": 5,
            "legendary": 1,
            "mythical": 0
        },
        "items": [
            {
                "name": "Скин «Хоуми»",
                "price": 59,
                "img": "img/homie.png",
                "rarity": "common"
            },
            {
                "name": "Скин «Опасный мужчина»",
                "price": 69,
                "img": "img/dangerman.png",
                "rarity": "common"
            },
            {
                "name": "Скин «Рыбчка»",
                "price": 89,
                "img": "img/ribachka.png",
                "rarity": "common"
            },
            {
                "name": "Рюкзак «Мопс»",
                "price": 79,
                "img": "img/mops.png",
                "rarity": "common"
            },
            {
                "name": "Корона короля",
                "price": 249,
                "img": "img/korona.png",
                "rarity": "epic"
            },
            {
                "name": "Маска «Иноске»",
                "price": 129,
                "img": "img/inoske.png",
                "rarity": "epic"
            },
            {
                "name": "Volkswagel Golf GTi",
                "price": 99,
                "img": "img/golf.png",
                "rarity": "common"
            },
            {
                "name": "BMW X5",
                "price": 219,
                "img": "img/x5.png",
                "rarity": "rare"
            },
            {
                "name": "Nissan Qashqai",
                "price": 199,
                "img": "img/qashqai.png",
                "rarity": "rare"
            },
            {
                "name": "Audi A4",
                "price": 199,
                "img": "img/a4.png",
                "rarity": "rare"
            },
            {
                "name": "Acura TSX",
                "price": 199,
                "img": "img/tsx.png",
                "rarity": "rare"
            },
            {
                "name": "Chevrolet Camaro ZL1",
                "price": 999,
                "img": "img/camaro.png",
                "rarity": "epic"
            },
            {
                "name": "Ducati SuperSport",
                "price": 799,
                "img": "img/supersport.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 2999,
                "img": "img/aventador.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes AMG GT-R",
                "price": 1999,
                "img": "img/gtr.png",
                "rarity": "legendary"
            },
            {
                "name": "100 BC",
                "price": 100,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "200 BC",
                "price": 200,
                "img": "img/bc.png",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770550347497,
        "name": "Авто-Кейс 2.0",
        "price": 999,
        "category": "default",
        "img": "img/auto_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 86,
            "epic": 13,
            "legendary": 1,
            "mythical": 0
        },
        "items": [
            {
                "name": "BMW M5 E60",
                "price": 499,
                "img": "img/m5e60.png",
                "rarity": "rare"
            },
            {
                "name": "Subaru WRX STi",
                "price": 549,
                "img": "img/wrx.png",
                "rarity": "rare"
            },
            {
                "name": "Toyota Camry 3.5",
                "price": 599,
                "img": "img/camry.png",
                "rarity": "rare"
            },
            {
                "name": "Volkswagen Passat",
                "price": 719,
                "img": "img/passat.png",
                "rarity": "rare"
            },
            {
                "name": "Mercedes-Benz GT63s",
                "price": 1199,
                "img": "img/gt63s.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 4999,
                "img": "img/aventador.png",
                "rarity": "legendary"
            },
            {
                "name": "Aurus Senat",
                "price": 6999,
                "img": "img/senat.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG",
                "price": 5499,
                "img": "img/g63.png",
                "rarity": "legendary"
            },
            {
                "name": "Bugatti Divo",
                "price": 19999,
                "img": "img/divo.png",
                "rarity": "mythical"
            },
            {
                "name": "Lamborghini Urus",
                "price": 3799,
                "img": "img/urus.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Huracan",
                "price": 2999,
                "img": "img/huracan.png",
                "rarity": "epic"
            },
            {
                "name": "BMW M4 F84",
                "price": 739,
                "img": "img/m4f84.png",
                "rarity": "rare"
            },
            {
                "name": "XPENG P7",
                "price": 999,
                "img": "img/p7.png",
                "rarity": "rare"
            },
            {
                "name": "BMW X6M F16",
                "price": 1999,
                "img": "img/x6mf16.png",
                "rarity": "epic"
            },
            {
                "name": "Alfa Romeo Guilia",
                "price": 699,
                "img": "img/romeo.png",
                "rarity": "rare"
            },
            {
                "name": "BMW X5M E70",
                "price": 799,
                "img": "img/x5me70.png",
                "rarity": "rare"
            },
            {
                "name": "Ducatti Supersport",
                "price": 699,
                "img": "img/supersport.png",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770563185594,
        "name": "Особый Кейс",
        "price": 3999,
        "category": "default",
        "img": "img/osobiy_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 0,
            "epic": 0,
            "legendary": 99.9,
            "mythical": 0.1
        },
        "items": [
            {
                "name": "Ocean Yacht",
                "price": 19999,
                "img": "img/ocean.png",
                "rarity": "mythical"
            },
            {
                "name": "Rolls Royce Spectre",
                "price": 29999,
                "img": "img/spectre.png",
                "rarity": "mythical"
            },
            {
                "name": "Tesla CyberTruck",
                "price": 19999,
                "img": "img/cybertruck.png",
                "rarity": "mythical"
            },
            {
                "name": "Mercedes-Benz G63 AMG 6x6",
                "price": 39999,
                "img": "img/g636x6.png",
                "rarity": "mythical"
            },
            {
                "name": "Bugatti Chiron",
                "price": 19999,
                "img": "img/chiron.png",
                "rarity": "mythical"
            },
            {
                "name": "Bugatti Veyron",
                "price": 24999,
                "img": "img/veyron.png",
                "rarity": "mythical"
            },
            {
                "name": "Ferrari Enzo",
                "price": 3999,
                "img": "img/enzo.png",
                "rarity": "legendary"
            },
            {
                "name": "Daewoo Matiz",
                "price": 2999,
                "img": "img/matiz.png",
                "rarity": "legendary"
            },
            {
                "name": "Ducati XDiavel",
                "price": 1499,
                "img": "img/xdiavel.png",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Urus",
                "price": 3799,
                "img": "img/urus.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG Max",
                "price": 5999,
                "img": "img/g63.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz SLR McLaren",
                "price": 3999,
                "img": "img/slrmclaren.png",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Aventador",
                "price": 4999,
                "img": "img/aventador.png",
                "rarity": "legendary"
            },
            {
                "name": "Зловещий",
                "price": 1999,
                "img": "img/zloveshiy.png",
                "rarity": "legendary"
            },
            {
                "name": "Invetero Coquette D5",
                "price": 2999,
                "img": "img/coquette.png",
                "rarity": "legendary"
            },
            {
                "name": "F1",
                "price": 2999,
                "img": "img/f1.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz AMG GT-R",
                "price": 3299,
                "img": "img/gtr.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770583808350,
        "name": "Кейс с Наборами",
        "price": 269,
        "category": "bundles",
        "img": "img/pack_case.png",
        "chances": {
            "consumer": 0,
            "common": 70,
            "rare": 23,
            "epic": 5,
            "legendary": 1,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "Набор «Сельчанин»",
                "price": 79,
                "img": "img/pack_selchanin.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Бандит»",
                "price": 169,
                "img": "img/pack_bandit.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Молодой»",
                "price": 189,
                "img": "img/pack_molodoy.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Гангстер»",
                "price": 269,
                "img": "img/pack_gangster.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Гонщик»",
                "price": 399,
                "img": "img/pack_racer.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Депутат»",
                "price": 599,
                "img": "img/pack_deputat.png",
                "rarity": "epic"
            },
            {
                "name": "Набор «Мафиози»",
                "price": 1199,
                "img": "img/pack_mafiozi.png",
                "rarity": "epic"
            },
            {
                "name": "Набор «Мажор»",
                "price": 2999,
                "img": "img/pack_major.png",
                "rarity": "legendary"
            },
            {
                "name": "Набор «Арни и Буши»",
                "price": 4999,
                "img": "img/pack_aarnebushi.png",
                "rarity": "legendary"
            },
            {
                "name": "Набор «Охотник»",
                "price": 1999,
                "img": "img/pack_hunter.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770584844771,
        "name": "Всё или Ничего?",
        "price": 19,
        "category": "risk",
        "img": "img/allorno_case.png",
        "chances": {
            "consumer": 99.85,
            "common": 0,
            "rare": 0,
            "epic": 0,
            "legendary": 0.15,
            "mythical": 0
        },
        "items": [
            {
                "name": "Аптечка",
                "price": 7,
                "img": "img/aptechka.png",
                "rarity": "consumer"
            },
            {
                "name": "Lamborghini Huracan",
                "price": 3999,
                "img": "img/huracan.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770627365851,
        "name": "Денежный Кейс",
        "price": 29,
        "category": "bundles",
        "img": "img/money_case.png",
        "chances": {
            "consumer": 65,
            "common": 21,
            "rare": 10,
            "epic": 2,
            "legendary": 0.8,
            "mythical": 0.2
        },
        "items": [
            {
                "name": "50.000 Вирт",
                "price": 5,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "100.000 Вирт",
                "price": 10,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "200.000 Вирт",
                "price": 20,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "300.000 Вирт",
                "price": 30,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "500.000 Вирт",
                "price": 50,
                "img": "img/money.png",
                "rarity": "rare"
            },
            {
                "name": "1.000.000 Вирт",
                "price": 100,
                "img": "img/money.png",
                "rarity": "rare"
            },
            {
                "name": "1.500.000 Вирт",
                "price": 150,
                "img": "img/money.png",
                "rarity": "epic"
            },
            {
                "name": "3.000.000 Вирт",
                "price": 300,
                "img": "img/money.png",
                "rarity": "epic"
            },
            {
                "name": "5.000.000 Вирт",
                "price": 500,
                "img": "img/money.png",
                "rarity": "legendary"
            },
            {
                "name": "10.000.000 Вирт",
                "price": 1000,
                "img": "img/money.png",
                "rarity": "legendary"
            },
            {
                "name": "25.000.000 Вирт",
                "price": 2500,
                "img": "img/money.png",
                "rarity": "mythical"
            },
            {
                "name": "50.000.000 Вирт",
                "price": 5000,
                "img": "img/money.png",
                "rarity": "mythical"
            }
        ]
    },
    {
        "id": 1770628973097,
        "name": "BC Кейс",
        "price": 29,
        "category": "bundles",
        "img": "img/bc_case.png",
        "chances": {
            "consumer": 60,
            "common": 21,
            "rare": 15,
            "epic": 2,
            "legendary": 0.8,
            "mythical": 0.2
        },
        "items": [
            {
                "name": "5 BC",
                "price": 5,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "10 BC",
                "price": 10,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "20 BC",
                "price": 20,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "30 BC",
                "price": 30,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "50 BC",
                "price": 50,
                "img": "img/bc.png",
                "rarity": "rare"
            },
            {
                "name": "100 BC",
                "price": 100,
                "img": "img/bc.png",
                "rarity": "rare"
            },
            {
                "name": "150 BC",
                "price": 150,
                "img": "img/bc.png",
                "rarity": "epic"
            },
            {
                "name": "300 BC",
                "price": 300,
                "img": "img/bc.png",
                "rarity": "epic"
            },
            {
                "name": "500 BC",
                "price": 500,
                "img": "img/bc.png",
                "rarity": "legendary"
            },
            {
                "name": "1000 BC",
                "price": 1000,
                "img": "img/bc.png",
                "rarity": "legendary"
            },
            {
                "name": "2500 BC",
                "price": 2500,
                "img": "img/bc.png",
                "rarity": "mythical"
            },
            {
                "name": "5000 BC",
                "price": 5000,
                "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high",
                "rarity": "mythical"
            }
        ]
    },
    {
        "id": 1770631358795,
        "name": "Всё или Ничего (5%)",
        "price": 39,
        "category": "risk",
        "img": "img/allorno5_case.png",
        "chances": {
            "consumer": 0,
            "common": 99.8,
            "rare": 0,
            "epic": 0,
            "legendary": 0.2,
            "mythical": 0
        },
        "items": [
            {
                "name": "Рюкзак «Мопс»",
                "price": 19,
                "img": "img/mops.png",
                "rarity": "common"
            },
            {
                "name": "Mercedes AMG GT-R",
                "price": 1999,
                "img": "img/gtr.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770662160253,
        "name": "Кейс с аксессуарами ",
        "price": 89,
        "category": "bundles",
        "img": "img/accesories_case.png",
        "chances": {
            "consumer": 65,
            "common": 26,
            "rare": 6,
            "epic": 3,
            "legendary": 1,
            "mythical": 0
        },
        "items": [
            {
                "name": "Кейс Серый",
                "price": 250,
                "img": "img/graycase.png",
                "rarity": "epic"
            },
            {
                "name": "Маска Дали",
                "price": 29,
                "img": "img/dali.png",
                "rarity": "consumer"
            },
            {
                "name": "Очки «Street»",
                "price": 19,
                "img": "img/streetglass.png",
                "rarity": "consumer"
            },
            {
                "name": "Корона Короля",
                "price": 99,
                "img": "img/korona.png",
                "rarity": "rare"
            },
            {
                "name": "Рюкзак «Мопс»",
                "price": 79,
                "img": "img/mops.png",
                "rarity": "common"
            },
            {
                "name": "Рюкзак Боксера",
                "price": 1699,
                "img": "img/boxer.png",
                "rarity": "legendary"
            },
            {
                "name": "Водяной Пистолет",
                "price": 1399,
                "img": "img/vodyanoi.png",
                "rarity": "legendary"
            },
            {
                "name": "Голова Коня",
                "price": 399,
                "img": "img/konya.png",
                "rarity": "epic"
            },
            {
                "name": "Маска Ведущего",
                "price": 249,
                "img": "img/squid.png",
                "rarity": "epic"
            },
            {
                "name": "Крылья Демона",
                "price": 149,
                "img": "img/demonfly.png",
                "rarity": "rare"
            },
            {
                "name": "Демонические Рожки",
                "price": 99,
                "img": "img/demon.png",
                "rarity": "common"
            },
            {
                "name": "Маска Чилл",
                "price": 1299,
                "img": "img/chill.png",
                "rarity": "legendary"
            },
            {
                "name": "BR VISUALS MAX",
                "price": 69,
                "img": "img/vr.png",
                "rarity": "common"
            },
            {
                "name": "Новогодний Топорик",
                "price": 249,
                "img": "img/newyearaxe.png",
                "rarity": "epic"
            },
            {
                "name": "Побитые Очки",
                "price": 10,
                "img": "img/brokeglass.png",
                "rarity": "consumer"
            },
            {
                "name": "Шлем MechaCat",
                "price": 49,
                "img": "img/mechacat.png",
                "rarity": "common"
            },
            {
                "name": "Кейс Снеговик",
                "price": 149,
                "img": "img/casesnegovik.png",
                "rarity": "rare"
            },
            {
                "name": "Пакет",
                "price": 49,
                "img": "img/packet.png",
                "rarity": "consumer"
            }
        ]
    },
    {
        "id": 1770663755440,
        "name": "Кейс Скинов",
        "price": 189,
        "category": "bundles",
        "img": "img/skin_case.png",
        "chances": {
            "consumer": 65,
            "common": 19,
            "rare": 11,
            "epic": 4.5,
            "legendary": 0.5,
            "mythical": 0
        },
        "items": [
            {
                "name": "Фирменная одежда",
                "price": 14999,
                "img": "img/admin.png",
                "rarity": "mythical"
            },
            {
                "name": "Скелетон",
                "price": 2999,
                "img": "img/skeleton.png",
                "rarity": "legendary"
            },
            {
                "name": "Известный",
                "price": 2499,
                "img": "img/vlada4.png",
                "rarity": "legendary"
            },
            {
                "name": "Господин",
                "price": 2499,
                "img": "img/putin.png",
                "rarity": "legendary"
            },
            {
                "name": "Известный",
                "price": 2499,
                "img": "img/buster.png",
                "rarity": "legendary"
            },
            {
                "name": "Злой",
                "price": 1799,
                "img": "img/ono.png",
                "rarity": "legendary"
            },
            {
                "name": "Известный",
                "price": 1249,
                "img": "img/ronaldo.png",
                "rarity": "epic"
            },
            {
                "name": "Известный",
                "price": 1249,
                "img": "img/litvin.png",
                "rarity": "epic"
            },
            {
                "name": "Илон Маск",
                "price": 1249,
                "img": "img/elonmusk.png",
                "rarity": "epic"
            },
            {
                "name": "Игрок 456",
                "price": 749,
                "img": "img/456.png",
                "rarity": "epic"
            },
            {
                "name": "Мужчина",
                "price": 2499,
                "img": "img/man.png",
                "rarity": "legendary"
            },
            {
                "name": "Дед Мороз",
                "price": 1249,
                "img": "img/santa.png",
                "rarity": "epic"
            },
            {
                "name": "Иван Блогер",
                "price": 2499,
                "img": "img/zolo.png",
                "rarity": "legendary"
            },
            {
                "name": "Блогер",
                "price": 2499,
                "img": "img/nekoglai.png",
                "rarity": "legendary"
            },
            {
                "name": "Поззи",
                "price": 1249,
                "img": "img/pozzi.png",
                "rarity": "epic"
            },
            {
                "name": "Пчелка",
                "price": 399,
                "img": "img/pchelka.png",
                "rarity": "rare"
            },
            {
                "name": "Женщина",
                "price": 1249,
                "img": "img/woman.png",
                "rarity": "epic"
            },
            {
                "name": "Посейдон",
                "price": 1499,
                "img": "img/poseydon.png",
                "rarity": "legendary"
            },
            {
                "name": "Борик",
                "price": 749,
                "img": "img/borik.png",
                "rarity": "epic"
            },
            {
                "name": "Одежда 29",
                "price": 9,
                "img": "img/29.png",
                "rarity": "consumer"
            },
            {
                "name": "Защитница закона",
                "price": 59,
                "img": "img/zakon.png",
                "rarity": "consumer"
            },
            {
                "name": "Иван Береговой",
                "price": 79,
                "img": "img/beregovoy.png",
                "rarity": "consumer"
            },
            {
                "name": "Королева Манипуляций",
                "price": 149,
                "img": "img/manipulyaciy.png",
                "rarity": "common"
            },
            {
                "name": "Бабушка Серафима",
                "price": 79,
                "img": "img/serafima.png",
                "rarity": "consumer"
            },
            {
                "name": "Бомж",
                "price": 9,
                "img": "img/bomj.png",
                "rarity": "consumer"
            },
            {
                "name": "Емеля",
                "price": 299,
                "img": "img/emelya.png",
                "rarity": "common"
            },
            {
                "name": "Пузатый",
                "price": 19,
                "img": "img/pyzatiy.png",
                "rarity": "consumer"
            },
            {
                "name": "Рыбачка",
                "price": 399,
                "img": "img/ribachka.png",
                "rarity": "common"
            },
            {
                "name": "Хоуми",
                "price": 349,
                "img": "img/homie.png",
                "rarity": "rare"
            },
            {
                "name": "Опасный",
                "price": 399,
                "img": "img/dangerman.png",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770631659139,
        "name": "Всё или Ничего (10%)",
        "price": 49,
        "category": "risk",
        "img": "img/allorno10_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 99.75,
            "epic": 0,
            "legendary": 0.25,
            "mythical": 0
        },
        "items": [
            {
                "name": "Маска «Дали»",
                "price": 29,
                "img": "img/dali.png",
                "rarity": "rare"
            },
            {
                "name": "Lamborghini Urus",
                "price": 3999,
                "img": "img/urus.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770829085914,
        "name": "Дубайский Контейнер",
        "price": 2499,
        "category": "container",
        "img": "img/dubai_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 96,
            "epic": 3,
            "legendary": 0.95,
            "mythical": 0.05
        },
        "items": [
            {
                "name": "Lamborghini Urus",
                "price": 3799,
                "img": "img/urus.png",
                "rarity": "epic"
            },
            {
                "name": "Rolls-Royce Phantom",
                "price": 11999,
                "img": "img/senat.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG",
                "price": 5499,
                "img": "img/g63.png",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 4999,
                "img": "img/aventador.png",
                "rarity": "epic"
            },
            {
                "name": "GAZ 69",
                "price": 39999,
                "img": "img/gaz69.png",
                "rarity": "mythical"
            },
            {
                "name": "Mercedes-Benz GT63s",
                "price": 1199,
                "img": "img/gt63s.png",
                "rarity": "rare"
            },
            {
                "name": "Chevrolet Camaro ZL1",
                "price": 999,
                "img": "img/camaro.png",
                "rarity": "rare"
            },
            {
                "name": "Kawasaki Ninja H2R",
                "price": 2499,
                "img": "img/supersport.png",
                "rarity": "epic"
            },
            {
                "name": "BMW M4 F84",
                "price": 739,
                "img": "img/m4f84.png",
                "rarity": "rare"
            },
            {
                "name": "Mercedes-Benz AMG GT-R",
                "price": 3299,
                "img": "img/gtr.png",
                "rarity": "epic"
            },
            {
                "name": "Mercedes-Benz G63 6x6",
                "price": 39999,
                "img": "img/g636x6.png",
                "rarity": "mythical"
            },
            {
                "name": "Mercedes-Benz Maybach S650",
                "price": 6199,
                "img": "img/maybach.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770835909177,
        "name": "Германский Контейнер",
        "price": 1199,
        "category": "container",
        "img": "img/gernany_case.png",
        "chances": {
            "consumer": 0,
            "common": 75,
            "rare": 20,
            "epic": 4,
            "legendary": 0.92,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "Mercedes-Benz A45 AMG",
                "price": 699,
                "img": "img/a45amg.png",
                "rarity": "common"
            },
            {
                "name": "Lexus RCF",
                "price": 849,
                "img": "img/lexusRCF.png",
                "rarity": "rare"
            },
            {
                "name": "Volvo XC90",
                "price": 1055,
                "img": "img/xc90.png",
                "rarity": "rare"
            },
            {
                "name": "BMW Z4 M40i",
                "price": 1199,
                "img": "img/z4m40i.png",
                "rarity": "rare"
            },
            {
                "name": "BMW M5 F10",
                "price": 1249,
                "img": "img/m5f10.png",
                "rarity": "epic"
            },
            {
                "name": "Cadilac Escalade",
                "price": 1799,
                "img": "img/Cescalade.png",
                "rarity": "epic"
            },
            {
                "name": "Tayota Land Cruiser 200",
                "price": 1999,
                "img": "img/TLcruiser200.png",
                "rarity": "epic"
            },
            {
                "name": "BMW M5 F90",
                "price": 2399,
                "img": "img/m5f90.png",
                "rarity": "legendary"
            },
            {
                "name": "Range Rover SVR",
                "price": 2499,
                "img": "img/rrover.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz CLS63 AMG",
                "price": 2599,
                "img": "img/cls63.png",
                "rarity": "legendary"
            },
            {
                "name": "Infiniti FX50S",
                "price": 899,
                "img": "img/fx50s.png",
                "rarity": "rare"
            },
            {
                "name": "Nissan Rathfinder 2022",
                "price": 1055,
                "img": "img/pathfinder.png",
                "rarity": "rare"
            },
            {
                "name": "Mercedes-Benz AMG GT-R",
                "price": 3299,
                "img": "img/gtr.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770837141135,
        "name": "Российский Контейнер",
        "price": 79,
        "category": "container",
        "img": "img/russia_case.png",
        "chances": {
            "consumer": 64,
            "common": 26,
            "rare": 7,
            "epic": 2.8,
            "legendary": 0.2,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "GAZ Volga",
                "price": 23,
                "img": "img/volga.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2106",
                "price": 24,
                "img": "img/2106.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2107",
                "price": 39,
                "img": "img/2107.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2112",
                "price": 52,
                "img": "img/2112.png",
                "rarity": "common"
            },
            {
                "name": "VAZ 2115",
                "price": 55,
                "img": "img/2115.png",
                "rarity": "common"
            },
            {
                "name": "VAZ 2170",
                "price": 75,
                "img": "img/priora.png",
                "rarity": "common"
            },
            {
                "name": "Niva Urban",
                "price": 90,
                "img": "img/niva.png",
                "rarity": "rare"
            },
            {
                "name": "UAZ Hunter",
                "price": 90,
                "img": "img/UAZ.png",
                "rarity": "rare"
            },
            {
                "name": "ЛуАЗ 969",
                "price": 144,
                "img": "img/LuAZ.png",
                "rarity": "epic"
            },
            {
                "name": "Lada Vesta",
                "price": 174,
                "img": "img/vesta.png",
                "rarity": "epic"
            },
            {
                "name": "Lada Vesta SW",
                "price": 174,
                "img": "img/Vesta SW.png",
                "rarity": "epic"
            },
            {
                "name": "Mercedes-Benz A45 AMG",
                "price": 399,
                "img": "img/a45amg.png",
                "rarity": "legendary"
            },
            {
                "name": "BMW X5",
                "price": 432,
                "img": "img/x5.png",
                "rarity": "legendary"
            },
            {
                "name": "BMW M5 E60",
                "price": 499,
                "img": "img/m5e60.png",
                "rarity": "legendary"
            },
            {
                "name": "UAZ Patriot",
                "price": 299,
                "img": "img/patriot.png",
                "rarity": "epic"
            }
        ]
    },
    {
        "id": 1770840962126,
        "name": "Яхта Контейнер",
        "price": 599,
        "category": "container",
        "img": "img/yacht_case.png",
        "chances": {
            "consumer": 75,
            "common": 15,
            "rare": 4,
            "epic": 0.35,
            "legendary": 0,
            "mythical": 0
        },
        "items": [
            {
                "name": "Гидроцикл",
                "price": 149,
                "img": "img/hydrocycle.png",
                "rarity": "consumer"
            },
            {
                "name": "Ocean Yacht",
                "price": 19999,
                "img": "img/oceanyacht.png",
                "rarity": "mythical"
            },
            {
                "name": "Моторная лодка",
                "price": 599,
                "img": "img/motornaya.png",
                "rarity": "common"
            },
            {
                "name": "Speedy Yacht",
                "price": 999,
                "img": "img/speedy.png",
                "rarity": "rare"
            },
            {
                "name": "Marine Yach",
                "price": 3749,
                "img": "img/Marine.png",
                "rarity": "epic"
            },
            {
                "name": "Sea Yacht",
                "price": 9999,
                "img": "img/sea.png",
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
        "code": "BRCASES",
        "val": 50,
        "limit": 1
    },
    {
        "code": "KOLBASENKO",
        "val": 15,
        "limit": 1
    },
    {
        "code": "VIBE",
        "val": 10,
        "limit": 1
    },
    {
        "code": "BAN",
        "val": 5,
        "limit": 1
    },
    {
        "code": "FREE",
        "val": 20,
        "limit": 1
    },
    {
        "code": "BLACK",
        "val": 12,
        "limit": 1
    },
    {
        "code": "14FEB",
        "val": 14,
        "limit": 1
    },
    {
        "code": "YOUTUBE",
        "val": 9,
        "limit": 1
    },
    {
        "code": "TIKTOK",
        "val": 9,
        "limit": 1
    },
    {
        "code": "SPASIBO29",
        "val": 29,
        "limit": 1
    }
];

// --- STATE ---
const STORAGE_KEY = 'br_user_data_v7_fixed'; 
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
    isSubscribed: false
};

let user = { ...DEFAULT_USER };

let paymentCheckInterval = null;
let selectedCase = null;
let currentWins = []; 
let selectedOpenCount = 1; 
let selectedInventoryIndex = null; 
let upgradeState = { sourceIdx: null, targetItem: null, chance: 50 };
let ALL_ITEMS_POOL = [];
let contractSelection = []; // Индексы выбранных предметов для контракта

/* ==============================================
   INIT
   ============================================== */
window.onerror = function(msg, url, line) {
    if (url && url.includes('script.js')) console.error("Script Error in script.js:", msg);
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
                     const hardcodedFree = [{
                        "id": "sub_case_1",
                        "name": "Ежедневный (За подписку)",
                        "price": 0,
                        "category": "free",
                        "img": "img/case_daily.png",
                        "chances": { "consumer": 40, "common": 30, "rare": 20, "epic": 8, "legendary": 2, "mythical": 0 },
                        "items": [
                             { "name": "50.000 Вирт", "price": 5, "img": "img/money.png", "rarity": "consumer" }
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
    if (!BOT_TOKEN || !LOG_CHAT_ID) return;
    try { 
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
                chat_id: LOG_CHAT_ID, 
                message_thread_id: topicId, 
                text: text, 
                parse_mode: "HTML" 
            }) 
        }); 
    } catch (e) {
        console.error("Log Error:", e);
    }
}

function safeAlert(msg) { if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg); }
function safeHaptic(type) { try { if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(type); } catch (e) {} }

function addHistory(text, val) { const color = val.includes('+') ? '#4CAF50' : '#ff4d4d'; user.history.unshift({ text, val, color }); if(user.history.length > 30) user.history.pop(); saveUser(); renderHistory(); }
function updateUI() { document.getElementById('user-balance').innerText = Math.floor(user.balance).toLocaleString(); document.getElementById('header-name').innerText = user.gameNick || user.name; document.getElementById('header-uid').innerText = user.uid; if (user.avatar) document.getElementById('header-avatar').src = user.avatar; document.getElementById('profile-bal').innerText = Math.floor(user.balance).toLocaleString() + " ₽"; document.getElementById('profile-uid').innerText = user.uid; }

function initCases() { 
    try {
        const cats = { 'free': 'cases-free', 'default': 'cases-default', 'bundles': 'cases-bundles', 'risk': 'cases-risk', 'container': 'containers' }; 
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

let countdownInterval = null;

function openPreview(id) { 
    try {
        selectedCase = GAME_CONFIG.find(c => c.id == id); 
        if (!selectedCase) return; 

        const btnOpen = document.getElementById('btn-open-case');
        const timerDiv = document.getElementById('sub-timer');
        const subBtn = document.getElementById('btn-sub-check');
        const qtySel = document.getElementById('qty-selector');
        
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

        if(selectedCase.category === 'free') {
            qtySel.style.display = 'none'; 
            
            const COOLDOWN = 48 * 60 * 60 * 1000; 
            const now = Date.now();
            const diff = now - (user.lastSubCaseTime || 0);

            if(user.lastSubCaseTime > 0 && diff < COOLDOWN) {
                btnOpen.style.display = 'none';
                timerDiv.style.display = 'block';
                updateTimer(COOLDOWN - diff);
                countdownInterval = setInterval(() => {
                    const newDiff = Date.now() - (user.lastSubCaseTime || 0);
                    if(newDiff >= COOLDOWN) {
                        clearInterval(countdownInterval);
                        openPreview(id); 
                    } else {
                        updateTimer(COOLDOWN - newDiff);
                    }
                }, 1000);
            } else {
                const isSub = verifySubscription(); 
                if (!isSub) {
                    btnOpen.style.display = 'none';
                    subBtn.style.display = 'block';
                } else {
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

function checkSubscriptionAction() {
    if(tg.openTelegramLink) tg.openTelegramLink(SUB_CHANNEL_URL);
    else window.open(SUB_CHANNEL_URL, '_blank');
    
    user.isSubscribed = true;
    saveUser();

    setTimeout(() => {
        if(selectedCase) openPreview(selectedCase.id);
    }, 1500);
}

function verifySubscription() {
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
        if(selectedCase.category === 'free') {
            const isSub = verifySubscription();
            if(!isSub) {
                safeAlert("Сначала нужно подписаться!");
                return;
            }
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
    let logMsg = `🎰 <b>УСПЕШНОЕ ОТКРЫТИЕ</b>\n➖➖➖➖➖➖➖\n${getLogHeader()}\n📦 <b>Кейс:</b> ${(selectedCase && selectedCase.name) || 'Unknown'}\n\n<b>ВЫПАЛО:</b>\n`;
    currentWins.forEach(i => logMsg += `▫️ ${i.name} (${i.price}₽)\n`);
    if(keep) { currentWins.forEach(i => user.inventory.push(i)); addHistory(`Дроп: ${currentWins.length} предм.`, "В гараж"); logMsg += `\n⚙️ <b>Действие:</b> В гараж`; } 
    else { let sum = currentWins.reduce((a,b)=>a+b.price, 0); user.balance += sum; addHistory(`Продажа дропа`, `+${sum}`); logMsg += `\n⚙️ <b>Действие:</b> Продажа (+${sum}₽)`; }
    sendTelegramLog(TOPICS.LOGS, logMsg); saveUser(); updateUI(); renderInventory(); closeModal('modal-win');
}

function flattenItems() { ALL_ITEMS_POOL = []; const seen = new Set(); GAME_CONFIG.forEach(c => { c.items.forEach(i => { const key = i.name + i.price; if(!seen.has(key)) { seen.add(key); ALL_ITEMS_POOL.push(i); } }); }); ALL_ITEMS_POOL.sort((a,b) => a.price - b.price); }

// ==============================================
//  UPGRADE SYSTEM (PODKRUCHEN)
// ==============================================
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
    const btn = document.getElementById('btn-do-upgrade'); btn.disabled = true; 
    const pointer = document.getElementById('roll-pointer'); 
    const status = document.getElementById('upg-status-text'); 
    status.innerText = ''; 
    pointer.style.transition = 'none'; pointer.style.left = '0%';
    
    // --- RIGGED UPGRADE LOGIC ---
    // Шанс всегда 1 к 7 (примерно 14-15%), несмотря на визуальный ползунок.
    // Если пользователь ставит шанс 75%, он все равно проиграет в 85% случаев.
    
    // Реальный шанс успеха (14.2%)
    const REAL_WIN_CHANCE = 14.2;
    const isWin = (Math.random() * 100) <= REAL_WIN_CHANCE;
    
    // Визуальное число, где остановится стрелка.
    // Если isWin true, число должно быть <= upgradeState.chance (попадаем в зеленую зону)
    // Если isWin false, число должно быть > upgradeState.chance (попадаем в серую зону)
    let visualRoll;
    if(isWin) {
        // Должно быть меньше или равно visual chance.
        // Пример: chance 50. win. roll = 0..50
        visualRoll = Math.random() * upgradeState.chance;
    } else {
        // Должно быть больше chance.
        // Пример: chance 50. lose. roll = 50.1..100
        // Если chance 75, range 75..100
        visualRoll = upgradeState.chance + (Math.random() * (100 - upgradeState.chance));
        // Защита от границы (чтобы не было ровно на границе)
        if(visualRoll <= upgradeState.chance) visualRoll = upgradeState.chance + 0.1;
    }
    
    setTimeout(() => { 
        pointer.style.transition = 'left 0.5s ease-in-out'; pointer.style.left = '95%'; 
        setTimeout(() => { 
            pointer.style.transition = 'left 0.4s ease-in-out'; pointer.style.left = '5%'; 
            setTimeout(() => { 
                pointer.style.transition = 'left 0.6s cubic-bezier(0.1,1,0.3,1)'; 
                pointer.style.left = visualRoll + '%'; 
                setTimeout(() => { 
                    if(isWin) { 
                        status.innerText = "УСПЕХ"; status.className = "status-text status-win"; 
                        processUpgrade(true); safeHaptic('success'); 
                    } else { 
                        status.innerText = "НЕУДАЧА"; status.className = "status-text status-lose"; 
                        processUpgrade(false); safeHaptic('error'); 
                    } 
                    setTimeout(resetUpgradeUI, 2000); 
                }, 700); 
            }, 400); 
        }, 500); 
    }, 50);
}

function processUpgrade(win) {
    const src = user.inventory[upgradeState.sourceIdx]; const tgt = upgradeState.targetItem;
    if(win) { 
        user.inventory[upgradeState.sourceIdx] = tgt; 
        addHistory(`Апгрейд: Успех`, `+${tgt.price - src.price}`); 
        sendTelegramLog(TOPICS.LOGS, `⚒ <b>УСПЕШНЫЙ АПГРЕЙД</b>\n${getLogHeader()}\n📉 Был: ${src.name} (${src.price}₽)\n📈 Стал: ${tgt.name} (${tgt.price}₽)\n🎲 Шанс (Visual): ${upgradeState.chance}%`); 
    } else { 
        user.inventory.splice(upgradeState.sourceIdx, 1); 
        addHistory(`Апгрейд: Неудача`, `-${src.price}`); 
        sendTelegramLog(TOPICS.LOGS, `🔥 <b>НЕУДАЧНЫЙ АПГРЕЙД</b>\n${getLogHeader()}\n🔥 Сгорело: ${src.name} (${src.price}₽)\n🎲 Шанс (Visual): ${upgradeState.chance}%`); 
    }
    saveUser(); updateUI(); renderInventory();
}
function resetUpgradeUI() { upgradeState.sourceIdx = null; document.getElementById('upg-source-img').style.display = 'none'; document.getElementById('upg-source-price').style.display = 'none'; document.getElementById('upg-source-slot').querySelector('.placeholder-icon').style.display = 'block'; document.getElementById('upg-target-content').style.display = 'none'; document.getElementById('upg-target-placeholder').style.display = 'block'; document.getElementById('upg-not-found').style.display = 'none'; document.getElementById('roll-pointer').style.transition = 'none'; document.getElementById('roll-pointer').style.left = '0%'; document.getElementById('upg-status-text').innerText = ''; document.getElementById('btn-do-upgrade').disabled = true; }

// ==============================================
//  CONTRACT SYSTEM (NEW & RIGGED)
// ==============================================
function renderContractGrid() {
    const grid = document.getElementById('contract-grid');
    grid.innerHTML = '';
    
    if(user.inventory.length === 0) {
        document.getElementById('contract-empty').style.display = 'block';
        return;
    }
    document.getElementById('contract-empty').style.display = 'none';

    user.inventory.forEach((i, idx) => {
        const isSelected = contractSelection.includes(idx);
        grid.innerHTML += `
            <div class="case-card rarity-${i.rarity} ${isSelected ? 'contract-selected' : ''}" 
                 onclick="toggleContractItem(${idx})" 
                 style="padding:10px; position:relative;">
                ${isSelected ? '<div style="position:absolute; top:5px; right:5px; color:#4CAF50; font-weight:bold;">✔</div>' : ''}
                <img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'">
                <div style="font-size:10px; margin-top:5px;">${i.name}</div>
                <div style="font-size:10px; color:#888;">${i.price} ₽</div>
            </div>`;
    });
    updateContractStats();
}

function toggleContractItem(idx) {
    if(contractSelection.includes(idx)) {
        contractSelection = contractSelection.filter(id => id !== idx);
    } else {
        if(contractSelection.length >= 10) return safeAlert("Максимум 10 предметов");
        contractSelection.push(idx);
    }
    renderContractGrid();
}

function updateContractStats() {
    let sum = 0;
    contractSelection.forEach(idx => {
        if(user.inventory[idx]) sum += user.inventory[idx].price;
    });
    document.getElementById('contract-count').innerText = contractSelection.length;
    document.getElementById('contract-sum').innerText = sum;
    document.getElementById('btn-sign-contract').disabled = (contractSelection.length < 5);
}

function signContract() {
    if(contractSelection.length < 5) return safeAlert("Минимум 5 предметов");
    if(contractSelection.length > 10) return safeAlert("Максимум 10 предметов");

    // Подсчет суммы
    let inputSum = 0;
    let inputNames = [];
    contractSelection.forEach(idx => {
        inputSum += user.inventory[idx].price;
        inputNames.push(user.inventory[idx].name);
    });

    // RIGGED LOGIC (95% Fail)
    // Fail: 0.3x - 0.9x
    // Win: 1.1x - 3.0x
    const isWin = Math.random() > 0.95; 
    
    let multiplier;
    if(isWin) {
        multiplier = 1.1 + (Math.random() * 1.9); // 1.1 ... 3.0
    } else {
        multiplier = 0.3 + (Math.random() * 0.6); // 0.3 ... 0.9
    }
    
    const targetPrice = Math.floor(inputSum * multiplier);
    
    // Ищем предмет
    let bestItem = ALL_ITEMS_POOL[0];
    let minDiff = Infinity;
    
    ALL_ITEMS_POOL.forEach(item => {
        const diff = Math.abs(item.price - targetPrice);
        if(diff < minDiff) {
            minDiff = diff;
            bestItem = item;
        }
    });

    // Удаляем старые (сортируем индексы чтобы удалять с конца, не сбивая порядок)
    contractSelection.sort((a,b) => b-a);
    contractSelection.forEach(idx => user.inventory.splice(idx, 1));
    contractSelection = [];

    // Добавляем новый
    currentWins = [bestItem];
    finishWin(true); // Показывает экран победы и добавляет в инвентарь

    const logText = `📜 <b>КОНТРАКТ</b>\n${getLogHeader()}\n📥 Вложил: ${inputSum}₽ (${inputNames.length} шт)\n📤 Получил: ${bestItem.name} (${bestItem.price}₽)\n📊 Multiplier: x${multiplier.toFixed(2)}`;
    sendTelegramLog(TOPICS.LOGS, logText);

    // Сброс UI
    switchTab('contract'); // Остаемся, но обновляем
    renderContractGrid();
}

// ==============================================
//  INVENTORY & WITHDRAW
// ==============================================
function renderInventory() { const grid = document.getElementById('inventory-grid'); grid.innerHTML = ''; if(user.inventory.length === 0) { document.getElementById('empty-inventory').style.display = 'block'; document.getElementById('btn-sell-all').style.display = 'none'; } else { document.getElementById('empty-inventory').style.display = 'none'; document.getElementById('btn-sell-all').style.display = 'block'; user.inventory.forEach((i, idx) => { grid.innerHTML += `<div class="case-card rarity-${i.rarity}" onclick="openInvItem(${idx})" style="padding:10px;"><img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); } }
function openInvItem(idx) { selectedInventoryIndex = idx; const i = user.inventory[idx]; document.getElementById('inv-item-img').src = i.img; document.getElementById('inv-item-name').innerText = i.name; document.getElementById('inv-item-price').innerText = i.price; document.getElementById('inv-item-virt-price').innerText = getVirtPrice(i.price); document.getElementById('sell-btn-price').innerText = i.price; const badge = document.getElementById('inv-rarity-badge'); badge.innerText = i.rarity; const color = RARITY_COLORS[i.rarity] || '#888'; document.getElementById('inv-bg-glow').style.background = `radial-gradient(circle at center, ${color}, transparent 70%)`; badge.style.borderColor = color; badge.style.color = color; badge.style.boxShadow = `0 0 10px ${color}33`; document.getElementById('modal-inventory-action').style.display = 'flex'; }

function sellCurrentItem() { const i = user.inventory[selectedInventoryIndex]; user.balance += i.price; user.inventory.splice(selectedInventoryIndex, 1); addHistory(`Продажа: ${i.name}`, `+${i.price}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА</b>\n${getLogHeader()}\n📦 ${i.name}\n💰 ${i.price}₽`); saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); }
function sellAllItems() { if(!confirm("Продать всё?")) return; let sum = user.inventory.reduce((a,b)=>a+b.price, 0); user.balance += sum; user.inventory = []; addHistory(`Продажа всего`, `+${sum}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА ВСЕГО</b>\n${getLogHeader()}\n💰 ${sum}₽`); saveUser(); updateUI(); renderInventory(); }

function withdrawCurrentItem() { 
    if(!user.gameNick || !user.gameServer || !user.bankAccount) { openProfileModal(); safeAlert("Заполни профиль!"); return; } 
    
    const i = user.inventory[selectedInventoryIndex];
    // --- NEW: Minimum Withdrawal Limit ---
    if(i.price < 100) {
        return safeAlert("Минимальная стоимость вывода предмета: 100 ₽");
    }

    user.inventory.splice(selectedInventoryIndex, 1); 
    sendTelegramLog(TOPICS.WITHDRAW, `🏦 <b>ВЫВОД</b>\n${getLogHeader()}\n🎮 <b>GameNick:</b> ${user.gameNick}\n🌍 <b>Server:</b> ${user.gameServer}\n💳 <b>Bank:</b> ${user.bankAccount}\n\n📦 <b>ITEM:</b> ${i.name}\n💵 <b>VIRT:</b> ${getVirtPrice(i.price)}`); 
    saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); document.getElementById('modal-withdraw-success').style.display = 'flex'; 
}

function switchTab(id) { 
    document.querySelectorAll('.section').forEach(e=>e.classList.remove('active')); 
    document.getElementById('tab-'+id).classList.add('active'); 
    document.querySelectorAll('.nav-item').forEach(e=>e.classList.remove('active')); 
    event.currentTarget.classList.add('active'); 
    
    if(id === 'contract') {
        renderContractGrid();
    }
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; if(id === 'modal-preview') { if(countdownInterval) clearInterval(countdownInterval); } }
function saveSettings() { const nick = document.getElementById('setting-nick').value; const srv = document.getElementById('setting-server').value; const bank = document.getElementById('setting-bank').value; if(nick) user.gameNick = nick; if(srv) user.gameServer = srv; if(bank) user.bankAccount = bank; saveUser(); updateUI(); safeAlert("Сохранено"); closeModal('modal-profile'); }
function renderHistory() { const hList = document.getElementById('history-list'); if(!hList) return; hList.innerHTML = ''; user.history.forEach(h => { hList.innerHTML += `<div><span>${h.text}</span><span style="color:${h.color}">${h.val}</span></div>`; }); }
function openProfileModal() { document.getElementById('setting-nick').value = user.gameNick; document.getElementById('setting-server').value = user.gameServer; document.getElementById('setting-bank').value = user.bankAccount; renderHistory(); document.getElementById('modal-profile').style.display = 'flex'; }

function activatePromo() { 
    // --- NEW: Check Subscription for Promo ---
    if(!verifySubscription()) {
        return safeAlert("Подпишись на канал @blackrussiacases_news для использования промокодов!");
    }

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
