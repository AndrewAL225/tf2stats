const LANG_KEY = "tf2stats_lang";

const TRANSLATIONS = {
    en: {
        nav_home:     "HOME",
        nav_tactics:  "TACTICS",
        nav_titans:   "TITANS",
        nav_players:  "PLAYERS",
        nav_maps:     "MAPS",
        page_tactics: "PILOT <span>TACTICS</span>",
        page_titans:  "TITAN <span>POPULARITY</span>",
        page_players: "TOP <span>PLAYERS</span>",
        page_maps:    "MAPS & <span>MODES</span>",
        hero_label:   "NORTHSTAR COMMUNITY PROJECT",
        hero_desc:    "Voluntary community statistics. Install the mod — help build the history of the game.",
        hero_matches: "MATCHES",
        hero_pilots:  "PILOTS",
        hero_dl:      "DOWNLOAD MOD",
        card_tactics: "TACTICS",
        card_tactics_desc: "Pilot tactical abilities and weapons",
        card_titans:  "TITANS",
        card_titans_desc: "Most popular titans in the community",
        card_players: "PLAYERS",
        card_players_desc: "Top pilots by score and kills",
        card_maps:    "MAPS",
        card_maps_desc: "Match count per map and modes",
        tbl_pilot:    "PILOT",
        tbl_matches:  "MATCHES",
        tbl_pkills:   "PILOT KILLS",
        tbl_tkills:   "TITAN KILLS",
        tbl_npc:      "NPC",
        tbl_score:    "SCORE",
        detail_stat:  "STATISTICS",
        detail_matches: "MATCHES",
        detail_from:  "OF ALL",
        detail_modes: "MODES",
        weapons_title:"POPULAR WEAPONS",
        tbl_weapon:   "WEAPON",
        tbl_uses:     "USES",
        footer_copy:  "TF2 Community Stats · Northstar Project · Not affiliated with EA / Respawn",
        load_more:    "SHOW ALL",
        loading:      "LOADING...",
        error:        "ERROR: ",
        empty:        "NO DATA YET",
        choose_tactic:"SELECT A TACTIC",
        choose_titan: "SELECT A TITAN",
        choose_map:   "SELECT A MAP",
        nav_donate:   "DONATE",
        nav_contact:  "CONTACT",
        modal_contact_title: "CONTACT ME",
        modal_contact_desc: "If you have questions or suggestions regarding the mod:",
        modal_copy_hint: "Click to copy email",
        copied: "Copied!",
    },
    ru: {
        nav_home:     "ГЛАВНАЯ",
        nav_tactics:  "ТАКТИКИ",
        nav_titans:   "ТИТАНЫ",
        nav_players:  "ИГРОКИ",
        nav_maps:     "КАРТЫ",
        page_tactics: "ТАКТИКИ <span>ПИЛОТОВ</span>",
        page_titans:  "ПОПУЛЯРНОСТЬ <span>ТИТАНОВ</span>",
        page_players: "ТОП <span>ИГРОКОВ</span>",
        page_maps:    "СТАТИСТИКА ПО КАРТАМ <span>И РЕЖИМАМ</span>",
        hero_label:   "NORTHSTAR COMMUNITY PROJECT",
        hero_desc:    "Добровольная статистика сообщества. Установи мод — помоги строить историю игры.",
        hero_matches: "МАТЧЕЙ",
        hero_pilots:  "ПИЛОТОВ",
        hero_dl:      "СКАЧАТЬ МОД",
        card_tactics: "ТАКТИКИ",
        card_tactics_desc: "Тактические способности пилотов и оружие",
        card_titans:  "ТИТАНЫ",
        card_titans_desc: "Самые популярные титаны в сообществе",
        card_players: "ИГРОКИ",
        card_players_desc: "Топ пилотов по очкам и убийствам",
        card_maps:    "КАРТЫ",
        card_maps_desc: "Количество матчей на каждой карте",
        tbl_pilot:    "ПИЛОТ",
        tbl_matches:  "МАТЧЕЙ",
        tbl_pkills:   "УБИЙСТВ ПИЛОТОВ",
        tbl_tkills:   "УБИЙСТВ ТИТАНОВ",
        tbl_npc:      "ПЕХОТЫ",
        tbl_score:    "ОЧКОВ",
        detail_stat:  "СТАТИСТИКА",
        detail_matches:"МАТЧЕЙ",
        detail_from:  "ОТ ВСЕХ",
        detail_modes: "РЕЖИМЫ",
        weapons_title:"ПОПУЛЯРНОЕ ОРУЖИЕ",
        tbl_weapon:   "ОРУЖИЕ",
        tbl_uses:     "ИСПОЛЬЗОВАНИЙ",
        footer_copy:  "TF2 Community Stats · Northstar Project · Не аффилировано с EA / Respawn",
        load_more:    "ПОКАЗАТЬ ВСЕХ",
        loading:      "ЗАГРУЗКА...",
        error:        "ОШИБКА: ",
        empty:        "ДАННЫХ ЕЩЁ НЕТ",
        choose_tactic:"ВЫБЕРИТЕ ТАКТИКУ",
        choose_titan: "ВЫБЕРИТЕ ТИТАНА",
        choose_map:   "ВЫБЕРИТЕ КАРТУ",
        nav_donate:   "ПОДДЕРЖАТЬ",
        nav_contact:  "СВЯЗАТЬСЯ",
        modal_contact_title: "СВЯЗАТЬСЯ",
        modal_contact_desc: "Если у вас есть вопросы или предложения по работе мода:",
        modal_copy_hint: "Кликните, чтобы скопировать",
        copied: "Скопировано!",
    }
};

let currentLang = localStorage.getItem(LANG_KEY) || "en";

function t(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS["en"][key] || key;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyLang();
}

function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (el.tagName === "INPUT") el.placeholder = t(key);
        else el.innerHTML = t(key);
    });
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
    });
}

document.addEventListener("DOMContentLoaded", applyLang);

TRANSLATIONS.en.avg_speed_mph = "AVG SPEED MPH";
TRANSLATIONS.en.avg_speed_kmh = "AVG SPEED KM/H";
TRANSLATIONS.ru.avg_speed_mph = "СР. СКОРОСТЬ МПЧ";
TRANSLATIONS.ru.avg_speed_kmh = "СР. СКОРОСТЬ КМ/Ч";
