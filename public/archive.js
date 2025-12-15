const entriesEl = document.getElementById("entries");
const emptyEl = document.getElementById("empty");
const tagInput = document.getElementById("tagFilter");
const refreshBtn = document.getElementById("refreshBtn");

async function loadEntries() {
  emptyEl.textContent = "";
  entriesEl.innerHTML = "";

  const tag = (tagInput?.value || "").trim();
  const url = tag ? `/entries?tag=${encodeURIComponent(tag)}` : "/entries";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.success) {
      emptyEl.textContent = data.error || "Failed to load archive.";
      return;
    }

    const entries = data.entries || [];
    if (entries.length === 0) {
      emptyEl.textContent = "No signals found.";
      return;
    }

    for (const e of entries) {
      const card = document.createElement("div");
      card.className = "entry";

      card.innerHTML = `
        <div class="meta">
          <span class="stamp">${new Date(e.createdAt).toLocaleString()}</span>
          <span class="sig">signal: ${escapeHTML(e.signalStrength)}</span>
        </div>
        <h2>${escapeHTML(e.title || "UNTITLED")}</h2>
        <p class="body">${escapeHTML(e.body)}</p>
        <div class="tags">${(e.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("")}</div>
      `;

      entriesEl.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    emptyEl.textContent = "Network error. Try Retransmit.";
  }
}

function escapeHTML(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

tagInput?.addEventListener("input", () => {
  clearTimeout(window.__t);
  window.__t = setTimeout(loadEntries, 250);
});

refreshBtn?.addEventListener("click", loadEntries);

loadEntries();
