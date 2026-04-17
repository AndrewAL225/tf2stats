function toggleMenu() {
    const m = document.getElementById("mobileMenu");
    if (m) m.classList.toggle("open");
}

async function apiFetch(path) {
    const res = await fetch(API_BASE + path, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
}

function fmt(n) {
    if (n === null || n === undefined) return "—";
    return Number(n).toLocaleString("ru-RU");
}

function setLoading(el) { el.innerHTML = '<div class="loading-state">ЗАГРУЗКА...</div>'; }
function setError(el, msg) { el.innerHTML = '<div class="error-state">ОШИБКА: ' + msg + '</div>'; }
function setEmpty(el) { el.innerHTML = '<div class="empty-state">ДАННЫХ ЕЩЁ НЕТ</div>'; }

function animateCount(el, target) {
    let cur = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const id = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = fmt(cur);
        if (cur >= target) clearInterval(id);
    }, 30);
}

async function loadIndexStats() {
    const mEl = document.getElementById("totalMatches");
    const pEl = document.getElementById("totalPlayers");
    if (!mEl || !pEl) return;
    try {
        const d = await apiFetch("/api/stats/total");
        animateCount(mEl, d.total_matches);
        animateCount(pEl, d.total_players);
    } catch(e) {
        if (mEl) mEl.textContent = "?";
        if (pEl) pEl.textContent = "?";
    }
}

function openContact() {
    const m = document.getElementById("contactModal");
    if (m) m.classList.add("open");
}

function closeContact() {
    const m = document.getElementById("contactModal");
    if (m) m.classList.remove("open");
}

function copyEmail() {
    const email = document.getElementById("contactEmail").innerText;
    navigator.clipboard.writeText(email).then(() => {
        const hint = document.querySelector(".copy-hint");
        const oldText = hint.innerText;
        hint.innerText = t("copied");
        hint.style.color = "var(--accent)";
        setTimeout(() => {
            hint.innerText = oldText;
            hint.style.color = "";
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", loadIndexStats);
