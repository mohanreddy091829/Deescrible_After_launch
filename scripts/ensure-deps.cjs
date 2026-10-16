// Runs automatically before `npm start` (see "prestart" in package.json).
// If the installed packages are damaged (for example a folder was copied between computers, so a file is missing or a
// native module was built for another operating system), it reinstalls them once, so the site still starts.
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
let ok = fs.existsSync(path.join(root, "node_modules/next/dist/shared/lib/router/routes/app.js"));
if (ok) {
  try {
    require(path.join(root, "node_modules/sharp"));
  } catch {
    ok = false;
  }
}
if (!ok) {
  console.log("[ensure-deps] installed packages look damaged, reinstalling...");
  const r = spawnSync("npm", ["ci", "--omit=dev", "--no-audit", "--no-fund"], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (r.status !== 0) console.log("[ensure-deps] reinstall failed, trying to start anyway");
}
