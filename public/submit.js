const form = document.getElementById("entryForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Transmitting…";

  const fd = new FormData(form);
  const payload = {
    title: fd.get("title"),
    body: fd.get("body"),
    tags: fd.get("tags"),
    signalStrength: fd.get("signalStrength"),
  };

  try {
    const res = await fetch("/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      statusEl.textContent = data.error || "Transmission failed.";
      return;
    }

    statusEl.textContent = "Sent. Integrity not guaranteed.";
    form.reset();

    setTimeout(() => {
      window.location.href = "/archive";
    }, 600);
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Network error. Try again.";
  }
});
