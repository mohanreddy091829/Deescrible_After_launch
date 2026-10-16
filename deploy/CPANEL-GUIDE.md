# Going live with cPanel (GoDaddy File Manager)

## READ THIS FIRST: does your plan run Node.js?
This site is a Next.js server app, not plain HTML. It only works on cPanel if your hosting has **"Setup Node.js App"**.

1. Log in to GoDaddy > your hosting > **cPanel Admin**.
2. Use the search box at the top of cPanel and type **Node**.
3. **If you see "Setup Node.js App"**: you can continue with this guide.
4. **If you do not see it**: this plan cannot run the site. Do not upload anything yet. Your options are (a) upgrade to a GoDaddy VPS (guide: `deploy/vps/GUIDE.md`), or (b) host the site free on Vercel and point your domain to it. Ask the developer which one you prefer.

You need a Node version **20.9 or newer** in that screen (choose 22 or 20).

## Part A: make the upload file (on the developer's computer)
Needs your real domain, for example `https://yourdomain.com`:
```
bash deploy/package-for-cpanel.sh https://yourdomain.com
```
It builds the site and creates **`deescribble-upload.zip`** (about 8 MB). It refuses to include any secret. You upload that one file.

## Part B: upload in cPanel File Manager
1. cPanel > **File Manager**. Go to your **home folder** (the one that contains `public_html`).
2. **Important:** create a new folder called `deescribble` in the HOME folder. Do NOT put the site inside `public_html`: files there are public on the internet.
3. Open `deescribble`, click **Upload**, choose `deescribble-upload.zip`.
4. Right-click the zip > **Extract**. Then delete the zip.
   You should now see inside `deescribble`: `.next`, `public`, `app.js`, `package.json`, `package-lock.json`, `next.config.ts`.
   (If `.next` is not visible, in File Manager > Settings turn on "Show Hidden Files".)

## Part C: create the Node app
1. cPanel > **Setup Node.js App** > **Create Application**.
2. Fill in:
   - Node.js version: **22** (or 20, never lower)
   - Application mode: **Production**
   - Application root: `deescribble`
   - Application URL: your domain
   - Application startup file: `app.js`
3. Click **Create**.

## Part D: add the secret settings (environment variables)
Still on that screen, under **Environment variables** click **Add variable** for each line (name, then value), then **Save**:

| Name | Value |
|---|---|
| NODE_ENV | production |
| SESSION_SECRET | a new random 64-character text (generate at any password generator, letters and numbers) |
| SUPABASE_URL | https://hpwjpzscfmzmzkkrqgrr.supabase.co |
| SUPABASE_PUBLISHABLE_KEY | your publishable key |
| SUPABASE_SECRET_KEY | your secret key (rotate it first, see below) |
| ADMIN_EMAIL | dedeepyajprwork@gmail.com |
| GMAIL_USER | optional, for emailed enquiries |
| GMAIL_APP_PASSWORD | optional |
| NOTIFY_EMAIL | optional |

Do not add `NEXT_PUBLIC_ALLOW_INDEXING` (leaving it out lets Google list the site).
These values live inside cPanel only. They are not in any file you upload, and not on GitHub.

## Part E: install and start
1. On the same screen click **Run NPM Install** and wait until it finishes (a few minutes).
2. Click **Restart** (or Start).
3. Open your domain in the browser.

## Part F: Supabase (in the Supabase dashboard)
- Authentication > URL Configuration: Site URL = `https://yourdomain.com`
- Project Settings > API Keys: create a **new secret key**, delete the old one, and put the new one in cPanel (Part D), then Restart.
- Sign-ups stay OFF. Keep the project on a paid plan or active.

## Part G: test the live site
1. Home page loads, images show, mobile looks right.
2. `https://yourdomain.com/admin` > log in > add a test event > publish > see it on the site > delete it.
3. `/consultation` > send a test enquiry > check it in Admin > Enquiries.
4. `https://yourdomain.com/robots.txt` and `/sitemap.xml` show your domain.

## Part H: Google
Search Console > add your domain > Sitemaps > submit `/sitemap.xml` > request indexing for the home page.

## Updating later
Make a new zip (Part A), upload it into `deescribble`, extract over the old files, then **Restart** in Setup Node.js App. Admin content is in Supabase, so it is never lost.

## If something goes wrong
- White page or error 503: open Setup Node.js App > check the app is Started; click Restart; check the Node version is 20.9+.
- "Admin not set up": a variable in Part D is missing or misspelled.
- Admin login fails: check `ADMIN_EMAIL`, and that the user exists in Supabase > Authentication > Users.
- Images from the admin do not show: check `SUPABASE_URL` is exactly right.
