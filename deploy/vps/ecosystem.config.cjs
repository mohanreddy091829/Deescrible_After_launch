// PM2 process file: keeps the site running, restarts it after a crash or a reboot.
// Listens on 127.0.0.1 only, so the outside world can reach it only through Nginx.
module.exports = {
  apps: [
    {
      name: "deescribble-site",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      cwd: __dirname + "/../..",
      env: { NODE_ENV: "production" },
      max_memory_restart: "700M",
      autorestart: true,
    },
  ],
};
