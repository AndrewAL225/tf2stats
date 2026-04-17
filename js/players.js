let currentData = [];
let allLoaded   = false;

function renderTable(data) {
    const wrap = document.getElementById("playersWrap");
    wrap.innerHTML = `<table class="data-table">
        <thead><tr>
            <th>
            <th>${t('tbl_pilot')}</th>
            <th>${t('tbl_matches')}</th>
            <th>${t('tbl_pkills')}</th>
            <th>${t('tbl_tkills')}</th>
            <th>${t('tbl_npc')}</th>
            <th>${t('tbl_score')}</th>
        </tr></thead>
        <tbody>${data.map((p,i) => {
            const tag = p.clan_tag ? `<span class="tag">[${p.clan_tag}]</span> ` : "";
            return `<tr>
                <td class="rank">${i+1}</td>
                <td class="name-cell">${tag}${p.name}</td>
                <td>${fmt(p.matches)}</td>
                <td class="accent-val">${fmt(p.pilot_kills)}</td>
                <td>${fmt(p.titan_kills)}</td>
                <td>${fmt(p.npc_kills)}</td>
                <td>${fmt(p.total_score)}</td>
            </tr>`;
        }).join("")}</tbody>
    </table>`;
}

async function loadPlayers() {
    const wrap = document.getElementById("playersWrap");
    const btn  = document.getElementById("loadMoreBtn");
    try {
        const data = await apiFetch("/api/stats/players?limit=50&offset=0");
        currentData = data;
        if (!data.length) { setEmpty(wrap); return; }
        renderTable(data);
        if (data.length === 50) btn.style.display = "inline-block";
    } catch(e) { setError(wrap, e.message); }
}

async function loadMore() {
    const btn = document.getElementById("loadMoreBtn");
    if (allLoaded) return;
    btn.disabled = true;
    btn.textContent = t('loading');
    try {
        const data = await apiFetch("/api/stats/players?limit=1000&offset=50");
        currentData = currentData.concat(data);
        renderTable(currentData);
        allLoaded = true;
        btn.style.display = "none";
    } catch(e) {
        btn.disabled = false;
        btn.textContent = t('load_more');
    }
}

document.addEventListener("DOMContentLoaded", loadPlayers);
