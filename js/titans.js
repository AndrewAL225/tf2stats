const TITANS = [
    { key: "ion",       name: "Ion",       img: "img/titans/IonIcon.webp" },
    { key: "scorch",    name: "Scorch",    img: "img/titans/ScorchIcon.webp" },
    { key: "legion",    name: "Legion",    img: "img/titans/LegionIcon.webp" },
    { key: "ronin",     name: "Ronin",     img: "img/titans/RoninIcon.webp" },
    { key: "northstar", name: "Northstar", img: "img/titans/NorthstarIcon.webp" },
    { key: "tone",      name: "Tone",      img: "img/titans/ToneIcon.webp" },
    { key: "monarch",   name: "Monarch",   img: "img/titans/MonarchIcon.webp" },
];

let titanStats = [];
let selectedTitan = null;

function renderTitanList() {
    const list = document.getElementById("titanList");
    list.innerHTML = TITANS.map(t => {
        const stat  = titanStats.find(s => s.titan_used === t.key);
        const count = stat ? stat.count : 0;
        return `<div class="titan-item ${selectedTitan === t.key ? 'active' : ''}" onclick="selectTitan('${t.key}')">
            <img src="${t.img}" alt="${t.name}">
            <div class="titan-item-name">${getTitanName(t.key)}</div>
            <div class="titan-item-count">${fmt(count)}</div>
        </div>`;
    }).join("");
}

function selectTitan(key) {
    selectedTitan = key;
    renderTitanList();
    const titan = TITANS.find(t => t.key === key);
    const stat  = titanStats.find(s => s.titan_used === key);
    const count = stat ? stat.count : 0;
    const total = titanStats.reduce((a, s) => a + s.count, 0);
    const pct   = total > 0 ? Math.round(count / total * 100) : 0;

    document.getElementById("titanDetail").innerHTML = `
        <div class="detail-header">
            <img class="detail-img" src="${titan.img}" alt="${titan.name}">
            <div>
                <div class="detail-title">${getTitanName(titan.key)}</div>
                <div class="detail-subtitle" data-i18n="detail_stat">${t('detail_stat')}</div>
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
        </div>
    `;
}

async function loadTitans() {
    try {
        titanStats = await apiFetch("/api/stats/titans");
        renderTitanList();
        if (TITANS.length > 0) selectTitan(TITANS[0].key);
    } catch(e) {
        setError(document.getElementById("titansWrap"), e.message);
    }
}

document.addEventListener("DOMContentLoaded", loadTitans);
