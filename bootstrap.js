const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const MANIFEST_PATHS = [
  { manifest: "./dist/.vite/manifest.json", assetBase: "./dist/" },
  { manifest: "./.vite/manifest.json", assetBase: "./" },
];

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

function findBuiltEntry(manifest) {
  const directEntries = [
    manifest["src/main.tsx"],
    manifest["index.html"],
    manifest["dist/assets/app.js"],
  ].filter(Boolean);

  if (directEntries.length > 0) {
    return directEntries[0];
  }

  return (
    Object.values(manifest).find((entry) => {
      const file = entry?.file;
      return (
        typeof file === "string" &&
        (file.includes("/main-") || file.includes("/app-"))
      );
    }) ?? null
  );
}

async function loadBuiltEntry() {
  for (const { manifest: manifestPath, assetBase } of MANIFEST_PATHS) {
    try {
      const response = await fetch(manifestPath, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }

      const manifest = await response.json();
      const entry = findBuiltEntry(manifest);
      if (!entry?.file) {
        continue;
      }

      await import(/* @vite-ignore */ `${assetBase}${entry.file}`);
      return true;
    } catch {
      // Try the next deployment layout.
    }
  }

  return false;
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
