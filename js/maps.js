

const MAP_DATA = [
    { key: "mp_forwardbase_kodai",  name: "Forward Base Kodai", img: "img/maps/TF2_Forwardbase_Kodai_Loadscreen.webp" },
    { key: "mp_grave",              name: "Boomtown",           img: "img/maps/TF2_Boomtown_Loadscreen.webp" },
    { key: "mp_homestead",          name: "Homestead",          img: "img/maps/TF2_Homestead_Loadscreen.webp" },
    { key: "mp_thaw",               name: "Exoplanet",          img: "img/maps/TF2_Exoplanet_Loadscreen.webp" },
    { key: "mp_black_water_canal",  name: "Black Water Canal",  img: "img/maps/TF2_Black_Water_Canal_Loadscreen.webp" },
    { key: "mp_eden",               name: "Eden",               img: "img/maps/TF2_Colony_Loadscreen.webp" },
    { key: "mp_drydock",            name: "Drydock",            img: "img/maps/mp_drydock.png" },
    { key: "mp_crashsite3",         name: "Crash Site",         img: "img/maps/Crash_Site.webp" },
    { key: "mp_complex3",           name: "Complex",            img: "img/maps/TF2_Complex_Loadscreen.webp" },
    { key: "mp_angel_city",         name: "Angel City",         img: "img/maps/TF_AngelCity_Loadscreen.jpeg" },
    { key: "mp_relic02",            name: "Relic",              img: "img/maps/TF_Relic_Loadscreen.jpg" },
    { key: "mp_rise",               name: "Rise",               img: "img/maps/TF_Rise_Loadscreen.webp" },
    { key: "mp_lf_meadow",          name: "Meadow",             img: "img/maps/TF2_Meadow_Loadscreen.webp" },
    { key: "mp_lf_stacks",          name: "Stacks",             img: "img/maps/TF2_Stacks_Loadscreen.webp" },
    { key: "mp_lf_township",        name: "Township",           img: "img/maps/TF2_Township.webp" },
    { key: "mp_lf_traffic",         name: "Traffic",            img: "img/maps/TF2_Traffic.webp" },
    { key: "mp_lf_uma",             name: "UMA",                img: "img/maps/TF2_UMA.webp" },
    { key: "mp_glitch",             name: "Glitch",             img: "img/maps/TF2_Glitch_Loadscreen.webp" },
    { key: "mp_wargames",           name: "War Games",          img: "img/maps/TF_War_Games_Loadscreen.webp" },
    { key: "mp_coliseum",           name: "Coliseum",           img: "img/maps/Pillars.webp" },
];

let mapStats = [];
let selectedMap = null;

function renderMapGrid() {
    const grid = document.getElementById("mapGrid");
    grid.innerHTML = MAP_DATA.map(m => {
        const isActive = selectedMap === m.key;
        return `<div class="map-card ${isActive ? 'active' : ''}" onclick="selectMap('${m.key}')">
            ${m.img
                ? `<img src="${m.img}" alt="${m.name}">`
                : `<div style="width:100%;height:100%;background:var(--border);display:flex;align-items:center;justify-content:center;color:var(--text-dim);font-size:11px;font-family:var(--font-mono)">NO IMAGE</div>`}
            <div class="map-card-label">${m.name}</div>
        </div>`;
    }).join("");
}

async function selectMap(key) {
    selectedMap = key;
    renderMapGrid();
    const map   = MAP_DATA.find(m => m.key === key);
    const stat  = mapStats.find(s => s.map === key);
    const count = stat ? stat.matches : 0;
    const total = mapStats.reduce((a, s) => a + s.matches, 0);
    const pct   = total > 0 ? Math.round(count / total * 100) : 0;

    let modesHtml = "";
    let speedHtml = "";

    try {
        const modes = await apiFetch(`/api/stats/map/${key}/modes`);
        if (modes.length > 0) {
            modesHtml = `<div class="modes-in-map">
                <div class="modes-in-map-title">${t('detail_modes')}</div>
                ${modes.map(m => `<span class="mode-tag">${modeName(m.mode)} · ${m.matches}</span>`).join("")}
            </div>`;
        }
    } catch(e) {}

    try {
        const spd = await apiFetch(`/api/stats/map/${key}/speed`);
        if (spd.avg_mph) {
            speedHtml = `
            <div class="detail-stat">
                <div class="detail-stat-val">${spd.avg_mph}</div>
                <div class="detail-stat-label">${currentLang === 'ru' ? 'СР. СКОРОСТЬ МПЧ' : 'AVG SPEED MPH'}</div>
            </div>
            <div class="detail-stat">
                <div class="detail-stat-val">${spd.avg_kmh}</div>
                <div class="detail-stat-label">${currentLang === 'ru' ? 'СР. СКОРОСТЬ КМ/Ч' : 'AVG SPEED KM/H'}</div>
            </div>`;
        }
    } catch(e) {}

    document.getElementById("mapDetail").innerHTML = `
        ${map.img ? `<img class="detail-map-img" src="${map.img}" alt="${map.name}">` : ""}
        <div class="detail-header">
            <div>
                <div class="detail-title">${map.name}</div>
                <div class="detail-subtitle">${map.key}</div>
            </div>
        </div>
        <div class="detail-stats">
            <div class="detail-stat">
                <div class="detail-stat-val">${fmt(count)}</div>
                <div class="detail-stat-label">${t('detail_matches')}</div>
            </div>
            <div class="detail-stat">
                <div class="detail-stat-val">${pct}%</div>
                <div class="detail-stat-label">${t('detail_from')}</div>
            </div>
            ${speedHtml}
        </div>
        ${modesHtml}
    `;
}

async function loadMaps() {
    try {
        mapStats = await apiFetch("/api/stats/maps");
        renderMapGrid();
        if (MAP_DATA.length > 0) selectMap(MAP_DATA[0].key);
    } catch(e) {
        setError(document.getElementById("mapsWrap"), e.message);
    }
}

document.addEventListener("DOMContentLoaded", loadMaps);
