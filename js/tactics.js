
const TACTICS = [
    { key: "cloak",       img: "img/tactics/Tacbanner_cloak.webp" },
    { key: "pulse_blade", img: "img/tactics/Tacbanner_pulseblade.webp" },
    { key: "grapple",     img: "img/tactics/Tacbanner_grapple.webp" },
    { key: "stim",        img: "img/tactics/Tacbanner_stim.webp" },
    { key: "a-wall",      img: "img/tactics/Tacbanner_awall.webp" },
    { key: "holo_pilot",  img: "img/tactics/Tacbanner_holopilot.webp" },
    { key: "phase_shift", img: "img/tactics/Tacbanner_phaseshift.webp" },
];

function tacticDisplayName(key) {
    return getTacticName(key);
}

function weaponDisplayName(key) {
    return getWeaponName(key);
}

let tacticStats = [];
let selectedTactic = null;

function renderTacticGrid() {
    const grid = document.getElementById("tacticGrid");
    grid.innerHTML = TACTICS.map(tac => {
        return `<div class="tactic-card ${selectedTactic === tac.key ? 'active' : ''}" onclick="selectTactic('${tac.key}')">
            <img src="${tac.img}" alt="${tacticDisplayName(tac.key)}">
        </div>`;
    }).join("");
}

function selectTactic(key) {
    selectedTactic = key;
    renderTacticGrid();
    const tac   = TACTICS.find(x => x.key === key);
    const stat  = tacticStats.find(s => s.tactic_used === key);
    const count = stat ? stat.count : 0;
    const total = tacticStats.reduce((a, s) => a + s.count, 0);
    const pct   = total > 0 ? Math.round(count / total * 100) : 0;

    document.getElementById("tacticDetail").innerHTML = `
        <div class="detail-header">
            <img class="detail-img-wide" src="${tac.img}" alt="${tacticDisplayName(key)}">
            <div><div class="detail-title">${tacticDisplayName(key)}</div></div>
        </div>
        <div class="detail-stats">
            <div class="detail-stat">
                <div class="detail-stat-val">${fmt(count)}</div>
                <div class="detail-stat-label">${t('tbl_matches')}</div>
            </div>
            <div class="detail-stat">
                <div class="detail-stat-val">${pct}%</div>
                <div class="detail-stat-label">${t('detail_from')}</div>
            </div>
        </div>
    `;
}

async function loadWeapons() {
    const wrap = document.getElementById("weaponsWrap");
    try {
        const data = await apiFetch("/api/stats/weapons");
        if (!data.length) { setEmpty(wrap); return; }
        wrap.innerHTML = `<table class="data-table">
            <thead><tr><th>
            <tbody>${data.map((d,i) => `<tr>
                <td class="rank">${i+1}</td>
                <td class="name-cell">${weaponDisplayName(d.weapon)}</td>
                <td class="accent-val">${fmt(d.total)}</td>
            </tr>`).join("")}</tbody>
        </table>`;
    } catch(e) { setError(wrap, e.message); }
}

async function loadTactics() {
    try {
        tacticStats = await apiFetch("/api/stats/tactics");
        renderTacticGrid();
        if (TACTICS.length > 0) selectTactic(TACTICS[0].key);
    } catch(e) {
        setError(document.getElementById("tacticsWrap"), e.message);
    }
}

document.addEventListener("DOMContentLoaded", () => { loadTactics(); loadWeapons(); });
