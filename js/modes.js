
async function loadModes() {
    const wrap = document.getElementById("modesWrap");
    try {
        const data = await apiFetch("/api/stats/modes");
        if (!data.length) { setEmpty(wrap); return; }
        const max = data[0].matches;
        wrap.innerHTML = `<table class="data-table">
            <thead><tr><th>
            <tbody>${data.map((d,i) => `<tr>
                <td class="rank">${i+1}</td>
                <td class="name-cell">${getModeName(d.mode)}</td>
                <td class="accent-val">${fmt(d.matches)}</td>
                <td>${d.avg_players ?? "—"}</td>
                <td><div class="bar"><div class="bar-fill" style="width:${Math.round(d.matches/max*100)}%"></div></div></td>
            </tr>`).join("")}</tbody>
        </table>`;
    } catch(e) { setError(wrap, e.message); }
}

document.addEventListener("DOMContentLoaded", loadModes);
