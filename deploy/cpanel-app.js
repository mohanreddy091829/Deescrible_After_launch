// Startup file for cPanel "Setup Node.js App" (Phusion Passenger).
// Starts the production Next.js server. All secrets come from the environment variables set in cPanel.
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
}).catch((err) => {
  console.error("Failed to start", err);
  process.exit(1);
});
