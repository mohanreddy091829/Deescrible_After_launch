// Safety net that NEVER reinstalls or deletes anything (a reinstall inside the host's build can corrupt node_modules).
//   node scripts/ensure-deps.cjs backup   -> after install: keep a copy of Next's few files named app.js
//   node scripts/ensure-deps.cjs          -> before start: if any of those copies' originals went missing, put them back,
//                                            and print a short report so problems show up in the logs.
// It always exits 0, so it can never stop the site from starting.
const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, "..", "node_modules", "next");
const SUFFIX = ".dd-backup";

function walk(dir, out = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === "app.js" || e.name === "app.js" + SUFFIX) out.push(p);
  }
  return out;
}

try {
  const mode = process.argv[2];
  if (mode === "backup") {
    for (const p of walk(nextDir)) if (p.endsWith("app.js")) fs.copyFileSync(p, p + SUFFIX);
  } else {
    let restored = 0;
    for (const p of walk(nextDir)) {
      if (p.endsWith(SUFFIX)) {
        const orig = p.slice(0, -SUFFIX.length);
        if (!fs.existsSync(orig)) {
          fs.copyFileSync(p, orig);
          restored++;
        }
      }
    }
    if (restored) console.log(`[ensure-deps] restored ${restored} missing Next.js file(s)`);
    if (!fs.existsSync(path.join(nextDir, "dist", "bin", "next"))) console.log("[ensure-deps] WARNING: next binary not found");
    try {
      require(path.join(__dirname, "..", "node_modules", "sharp"));
    } catch (e) {
      console.log("[ensure-deps] WARNING: image library (sharp) cannot load: " + String(e && e.message).split("\n")[0]);
    }
  }
} catch (e) {
  console.log("[ensure-deps] skipped: " + (e && e.message));
}
process.exit(0);
