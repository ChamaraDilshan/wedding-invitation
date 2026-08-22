# Sandali & Chamara — Wedding Invitation

A one-page wedding invitation with a live countdown, an RSVP form that writes
to a Google Sheet, and a looping wall of guest greetings. Built with
React + Vite + Tailwind. 100% free to run and host.

## 1. Personalize it

- Put your couple photo at `public/couple.jpg` (any name is fine, just update
  the path in `src/data/config.js`).
- Edit `src/data/config.js`:
  - `name1`, `name2`
  - `weddingDateISO` — your wedding date/time
  - `photo`
  - `BRIDE`, `GROOM` — name, photo, and a short note for each profile card
  - `GALLERY` — paths to 4 (or more) photos, placed in `/public`
  - `AGENDA` — one card per event (Ceremony, Reception, etc.) with date, time
    range, and location; each gets its own "Navigate" button
  - `LOVE_QUOTE` — the verse/quote shown under the agenda
  - `VENUE` — used for the embedded map
  - `MUSIC_SRC` — path to a background music file

### Adding background music

1. Get an MP3 you have the rights to use — e.g. a royalty-free track from
   [Pixabay Music](https://pixabay.com/music/) or the
   [YouTube Audio Library](https://www.youtube.com/audiolibrary) (both free).
2. Save it as `public/music.mp3` (or update `MUSIC_SRC` in `config.js` to
   match your filename).
3. Browsers block autoplay with sound until the visitor interacts with the
   page, so the site shows a small floating 🎵 button (bottom-right) that
   guests tap to start/stop the music — this is the standard, reliable
   approach rather than trying to force autoplay.

## 2. Set up the free backend (Google Sheets + Apps Script)

1. Create a new Google Sheet (sheets.google.com → Blank).
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the placeholder code and paste in the contents of
   `apps-script/Code.gs` from this project.
4. Click **Deploy → New deployment**.
   - Select type: **Web app**.
   - Execute as: **Me**.
   - Who has access: **Anyone**.
5. Click **Deploy**, authorize the permissions Google asks for (this is your
   own script, on your own account — safe to approve).
6. Copy the **Web app URL** you're given — it looks like
   `https://script.google.com/macros/s/AKfycb.../exec`.
7. Paste that URL into `src/data/config.js` as `APPS_SCRIPT_URL`.

That's it — no server, no database, and no cost. Every RSVP appends a row to
your Sheet, which you can open, sort, or export as `.xlsx` any time via
**File → Download → Microsoft Excel**.

### Cumulative summary

Every time someone submits the RSVP form, the script also recalculates a
**Summary** tab in the same spreadsheet with: total responses, how many said
yes/no, total guest count from "yes" responses, and how many left a message.
If you already have existing RSVPs and want the Summary tab built right away
(rather than waiting for the next submission), open the Apps Script editor,
select the `manuallyRefreshSummary` function from the dropdown next to Run,
and click **Run** once.

**Optional extra safeguard:** the Apps Script URL is technically guessable by
anyone who has it. If you want a light layer of protection so random people
can't spam your sheet, set a private string as `SHARED_SECRET` in
`apps-script/Code.gs`, and the same string as `RSVP_SECRET` in
`src/data/config.js`, then redeploy the script (**Deploy → Manage
deployments → Edit → New version**).

## 3. Run it locally

```bash
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`).

## 4. Deploy for free

**Recommended: Vercel**

1. Push this project to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub (free).
3. Click **Add New → Project**, select your repo.
4. Vercel auto-detects Vite — leave the defaults and click **Deploy**.
5. You'll get a free URL like `https://your-project.vercel.app`.

**Alternative: Netlify**

1. Push to GitHub as above.
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from
   Git**.
3. Build command: `npm run build`, publish directory: `dist`.
4. Deploy — you'll get a free `https://your-project.netlify.app` URL.

Either way, whenever you push a new commit to GitHub, it redeploys
automatically.

## 5. Share it

Send the deployed URL directly in WhatsApp. Since it's a normal web link, it
will show as a clickable preview in chats.

## Notes

- The countdown updates every second, purely in the browser — no backend
  needed for it.
- The RSVP form and the greetings loop both talk to your Apps Script URL —
  update it in one place (`src/data/config.js`) whenever you redeploy the
  script and get a new URL.
- On mobile widths, the photo panel is hidden and only the right-hand
  details panel is shown, per the design requirement.
