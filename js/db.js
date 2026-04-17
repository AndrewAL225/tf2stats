const WEAPON_NAMES = {
    "mp_weapon_car": { ru: "C.A.R.", en: "C.A.R." },
    "mp_weapon_r97": { ru: "R-97", en: "R-97" },
    "mp_weapon_vinson": { ru: "Volt", en: "Volt" },
    "mp_weapon_alternator_smg": { ru: "Alternator", en: "Alternator" },
    "mp_weapon_rspn101": { ru: "R-201", en: "R-201" },
    "mp_weapon_rspn101_hu": { ru: "R-101", en: "R-101" },
    "mp_weapon_hemloc": { ru: "Hemlok", en: "Hemlok" },
    "mp_weapon_v-6": { ru: "G2A5", en: "G2A5" },
    "mp_weapon_defender": { ru: "Flatline", en: "Flatline" },
    "mp_weapon_lstar": { ru: "L-STAR", en: "L-STAR" },
    "mp_weapon_esaw": { ru: "Devotion", en: "Devotion" },
    "mp_weapon_lmg": { ru: "Spitfire", en: "Spitfire" },
    "mp_weapon_sniper": { ru: "Kraber", en: "Kraber" },
    "mp_weapon_doubletake": { ru: "Double Take", en: "Double Take" },
    "mp_weapon_dmr": { ru: "Longbow DMR", en: "Longbow DMR" },
    "mp_weapon_shotgun": { ru: "Eva-8 Auto", en: "Eva-8 Auto" },
    "mp_weapon_mastiff": { ru: "Mastiff", en: "Mastiff" },
    "mp_weapon_epg": { ru: "EPG-1", en: "EPG-1" },
    "mp_weapon_r97": { ru: "R-97", en: "R-97" },
    "mp_weapon_smr": { ru: "Sidewinder SMR", en: "Sidewinder SMR" },
    "mp_weapon_softball": { ru: "Softball", en: "Softball" },
    "mp_weapon_pulse_lmg": { ru: "Cold War", en: "Cold War" },
    "mp_weapon_wingman": { ru: "B3 Wingman", en: "B3 Wingman" },
    "mp_weapon_shotgun_pistol": { ru: "Mozambique", en: "Mozambique" },
    "mp_weapon_semipistol": { ru: "P2016", en: "P2016" },
    "mp_weapon_autopistol": { ru: "RE-45 Auto", en: "RE-45 Auto" },
    "mp_weapon_arc_launcher": { ru: "Thunderbolt", en: "Thunderbolt" },
    "mp_weapon_mgl": { ru: "MGL Mag Launcher", en: "MGL Mag Launcher" },
    "mp_weapon_rocket_launcher": { ru: "Archer", en: "Archer" },
    "mp_weapon_defender": { ru: "Charge Rifle", en: "Charge Rifle" }
};

const TACTIC_NAMES = {
    "mp_ability_cloak": { ru: "Маскировка", en: "Cloak" },
    "mp_ability_grapple": { ru: "Кошка", en: "Grapple" },
    "mp_ability_heal": { ru: "Стим", en: "Stim" },
    "mp_weapon_grenade_sonar": { ru: "Импульсный клинок", en: "Pulse Blade" },
    "mp_ability_holopilot": { ru: "Голо-пилот", en: "Holo Pilot" },
    "mp_ability_shifter": { ru: "Фазовый сдвиг", en: "Phase Shift" },
    "mp_ability_hardcover": { ru: "A-Wall", en: "A-Wall" }
};

const TITAN_NAMES = {
    "ion": { ru: "Ион", en: "Ion" },
    "scorch": { ru: "Скорч", en: "Scorch" },
    "northstar": { ru: "Нордстар", en: "Northstar" },
    "ronin": { ru: "Ронин", en: "Ronin" },
    "tone": { ru: "Тон", en: "Tone" },
    "legion": { ru: "Легион", en: "Legion" },
    "monarch": { ru: "Монарх", en: "Monarch" },
    "pilot": { ru: "Пилот", en: "Pilot" }
};

const MODE_NAMES = {
    "tdm":            { ru: "Схватка",             en: "Team Deathmatch" },
    "cp":             { ru: "Опорный пункт",             en: "Hardpoint Domination" },
    "at":             { ru: "Усиленный опорный пункт",   en: "Amped Hardpoint" },
    "ctf":            { ru: "Захват флага",              en: "Capture the Flag" },
    "lts":            { ru: "Последний титан в живых",   en: "Last Titan Standing" },
    "mfd":            { ru: "Приговор-Смерть",              en: "Marked for Death" },
    "ps":             { ru: "Пилоты против пилотов",           en: "Pilot Skirmish" },
    "speedball":      { ru: "Спидбол",                   en: "Speedball" },
    "ttdm":           { ru: "Битва титанов",             en: "Titan Brawl" },
    "coliseum":       { ru: "Колизей",                   en: "Coliseum" },
    "gg":             { ru: "Гонка вооружений",          en: "Gun Game" },
    "inf":            { ru: "Заражение",                 en: "Infection" },
    "hideandseek":    { ru: "Прятки",                    en: "Hide and Seek" },
    "fastball":       { ru: "Фастбол",                   en: "Fastball" },
    "aitdm":          { ru: "Истребление",                   en: "AI TDM" },
    "fd_easy":        { ru: "Оборона Фронтира (Легко)",    en: "Frontier Defense (Easy)" },
    "fd_normal":      { ru: "Оборона Фронтира (Нормально)",en: "Frontier Defense (Normal)" },
    "fd_hard":        { ru: "Оборона Фронтира (Сложно)",   en: "Frontier Defense (Hard)" },
    "fd_master":      { ru: "Оборона Фронтира (Мастер)",   en: "Frontier Defense (Master)" },
    "fd_insane":      { ru: "Оборона Фронтира (Безумие)",  en: "Frontier Defense (Insane)" }
};

function getModeName(id) {
    if (!id) return id;
    const m = MODE_NAMES[id];
    if (!m) return id;
    return currentLang === "ru" ? m.ru : m.en;
}

function getWeaponName(id) {
    if (!id) return "—";
    const w = WEAPON_NAMES[id];
    if (!w) return id;
    return currentLang === "ru" ? w.ru : w.en;
}

function getTacticName(id) {
    if (!id) return "—";
    const t = TACTIC_NAMES[id];
    if (!t) return id;
    return currentLang === "ru" ? t.ru : t.en;
}

function getTitanName(id) {
    if (!id) return "—";
    const t = TITAN_NAMES[id.toLowerCase()];
    if (!t) return id;
    return currentLang === "ru" ? t.ru : t.en;
}
