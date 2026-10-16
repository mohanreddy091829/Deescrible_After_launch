# Go-live guide: GoDaddy VPS

You need: a **GoDaddy VPS running Linux (Ubuntu 22.04 or 24.04)**, your **domain**, and the Supabase details.
Do NOT use GoDaddy's normal "Web Hosting" / cPanel / WordPress plans: they cannot run this site.
Recommended size: 1 vCPU and 2 GB RAM or more.

Replace `YOURDOMAIN.com` everywhere with your real domain.

## 1. Buy and open the server
1. In GoDaddy, buy a **VPS (Linux, Ubuntu)**. Note the server's **IP address**, the **root password** (or SSH key) it gives you.
2. On your computer open Terminal and connect: `ssh root@YOUR_SERVER_IP`

## 2. Point the domain at the server
In GoDaddy > My Products > Domain > DNS, set:
- an **A record**: Name `@`, Value `YOUR_SERVER_IP`
- an **A record**: Name `www`, Value `YOUR_SERVER_IP`
Remove any old "parked" A records. DNS can take from a few minutes to a few hours.

## 3. Prepare the server (copy and paste, one block at a time)
```bash
apt update && apt upgrade -y
apt install -y nginx git curl ufw
# Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2
# Firewall: only SSH and web traffic
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw --force enable
```
Create a normal user to run the site (safer than root):
```bash
adduser --disabled-password --gecos "" deploy
mkdir -p /var/www/deescribble && chown deploy:deploy /var/www/deescribble
```

## 4. Get the code onto the server
```bash
su - deploy
cd /var/www/deescribble
git clone https://github.com/mohanreddy091829/afterchanges_new-version.git .
```
(If the repo is private, GitHub will ask you to sign in with a personal access token.)

## 5. Add the secret settings
```bash
cp .env.example .env.production
nano .env.production
```
Fill in these lines, then press Ctrl+O, Enter, Ctrl+X to save:
```
NEXT_PUBLIC_SITE_URL=https://YOURDOMAIN.com
SESSION_SECRET=<run:  openssl rand -hex 32   and paste the result>
SUPABASE_URL=https://hpwjpzscfmzmzkkrqgrr.supabase.co
SUPABASE_PUBLISHABLE_KEY=<your publishable key>
SUPABASE_SECRET_KEY=<your NEW rotated secret key>
ADMIN_EMAIL=dedeepyajprwork@gmail.com
GMAIL_USER=<optional>
GMAIL_APP_PASSWORD=<optional>
NOTIFY_EMAIL=<optional>
```
Leave `NEXT_PUBLIC_ALLOW_INDEXING` out. Then lock the file:
```bash
chmod 600 .env.production
```
Next.js reads `.env.production` automatically when it builds and runs.

## 6. Build and start
```bash
npm ci
npm run build
pm2 start deploy/ecosystem.config.cjs
pm2 save
exit            # back to root
env PATH=$PATH:/usr/bin pm2 startup systemd -u deploy --hp /home/deploy   # copy and run the command it prints
```
Check it is running: `curl -I http://127.0.0.1:3000` should say `200`.

## 7. Nginx and HTTPS
```bash
cp /var/www/deescribble/deploy/nginx.conf /etc/nginx/sites-available/deescribble
nano /etc/nginx/sites-available/deescribble        # replace YOURDOMAIN.com (3 places)
ln -s /etc/nginx/sites-available/deescribble /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
apt install -y certbot python3-certbot-nginx
certbot --nginx -d YOURDOMAIN.com -d www.YOURDOMAIN.com     # choose "redirect HTTP to HTTPS"
```
Open `https://YOURDOMAIN.com`. The padlock should show.

## 8. Supabase settings for the live domain
In the Supabase dashboard:
- Authentication > URL Configuration: **Site URL** = `https://YOURDOMAIN.com`
- Authentication > Sign In / Providers: **sign-ups stay OFF** (already done)
- Project Settings > API Keys: **rotate the secret key** (create a new one, delete the old one, update `.env.production`, then `pm2 restart deescribble-site`)
- Billing: use a paid plan or keep the project active, because free projects pause after about a week of inactivity.

## 9. Test everything on the live site
1. Home page loads, no broken images, mobile looks right.
2. `https://YOURDOMAIN.com/admin`: log in, add a test event, publish, see it on the home page, delete it.
3. `/consultation`: send a test enquiry, see it under Admin > Enquiries (and in Gmail if configured), then delete it.
4. `https://YOURDOMAIN.com/robots.txt` and `/sitemap.xml` show your real domain.

## 10. Tell Google
1. Google Search Console > Add property > your domain, and verify it.
2. Sitemaps > submit `https://YOURDOMAIN.com/sitemap.xml`.
3. URL inspection > your home page > Request indexing.

## 11. Updating the site later
On the server as the `deploy` user: `cd /var/www/deescribble && bash deploy/deploy.sh`

## 12. Care and safety
- Your admin content is in Supabase, so redeploys never erase it.
- Change the admin password in Supabase (Authentication > Users) before launch.
- Never share or commit `.env.production`. Rotate the Supabase secret key if it ever leaks.
- Keep the server updated: `apt update && apt upgrade -y` once a month.
