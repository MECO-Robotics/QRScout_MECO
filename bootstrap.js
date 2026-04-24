const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

async function tryLoadDevEntry() {
  if (!LOCAL_HOSTS.has(window.location.hostname)) {
    return false;
  }

  try {
    await import("./src/main.tsx");
    return true;
  } catch {
    return false;
  }
}

async function loadBuiltEntry() {
  try {
    await import("./dist/assets/app.js");
    return true;
  } catch {
    return false;
  }
}

async function bootstrapApp() {
  const loadedDevEntry = await tryLoadDevEntry();
  if (loadedDevEntry) {
    return;
  }

  const loadedBuiltEntry = await loadBuiltEntry();
  if (loadedBuiltEntry) {
    return;
  }

  document.body.innerHTML = `
    <main style="padding: 2rem; font: 16px/1.5 system-ui, sans-serif;">
      <h1>QR Scout could not load</h1>
      <p>The app bundle is unavailable. Check the published build files in <code>dist/</code>.</p>
    </main>
  `;
}

void bootstrapApp();
