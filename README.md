# Quicklinks

An intranet homepage template: apps, forms, IT support and sister-company contacts on one page.
It isn't tied to any brand. Each company deploys its own copy and sets its own name, logo, color and type style in one file.

Plain HTML, CSS and JavaScript. No WordPress, no framework, no build step, no database.

## What's on the page

- **A hero sky that follows the real time of day.** Sunrise, midday, golden hour and night, with a greeting to match.
- **Search everything.** Press `/`, `Ctrl+K`, or just start typing. It finds apps, files, companies, IT contacts and holidays ("thanksgiving" tells you the date).
- **Pins.** Each person can star the apps and files they use most. Pins show up in the hero, and keys `1`–`9` open them. Pins are saved in that person's browser, so no login is needed.
- **Holiday countdown**, built from the holiday list in the content file.
- **IT Support tile** with a status light, click-to-call, Teams chat, email and a "new ticket" link.
- **Family of companies** with click-to-call, email and copy buttons.
- **Announcement banner** with start and end dates, dismissible per person.
- Automatic light and dark mode, a mobile layout, keyboard navigation and reduced-motion support.

## Make it yours (brand theming)

Set these in [`data/content.js`](data/content.js):

```js
company: { name: "Northwind", tagline: "Intranet", logo: "assets/logos/northwind.svg" },
theme:   { color: "#0057b8", type: "modern" },
```

- **`logo`** is used in the header and as the browser-tab icon. SVG is best. Leave it empty (`""`) to show the company's initials in the brand color.
- **`color`** accepts any CSS color. It keeps your hue but is automatically lightened or darkened so links and buttons meet WCAG AA contrast in both light and dark mode. Very bright colors like yellow become a deep gold in light mode, for example.
- **`type`** sets the voice of the greeting and headings. Everything else always uses Atkinson Hyperlegible Next, a typeface designed for legibility.

| `type` | Feel | Download |
|---|---|---|
| `editorial` | Elegant serif, italic accent | ~33KB |
| `modern` | Bold, tight sans | ~18KB |
| `friendly` | Soft, rounded | ~15KB |
| `system` | Your computer's own font | none |

The interface font adds ~33KB to every preset except `system`.

**Try a look before committing:** add `?type=modern&color=%23e4572e` to the page address. `%23` is how `#` is written in a URL. Nothing is saved; it only changes what you see.

## Demo mode (showing it to a prospective client)

The `main` branch is a generic demo: "Your Company", sample sister companies, and `settings.demo: true` in `content.js`. Demo mode adds a **Customize demo** button that opens a side panel where you can, live:

- type the client's **company name** and **tagline**
- drop in their **logo** (SVG or PNG under 1 MB, or leave it empty for their initials)
- pick their **brand color**. The panel shows the exact shade links and buttons will use after the contrast adjustment.
- choose a **type style**, scrub the **time of day**, and hide **sister companies** if they don't have any

Changes are saved on that device only. **Copy link** makes a link that reproduces the look anywhere, for example:

```
https://your-demo.vercel.app/?name=Harborview+Health&color=%230a7d6e&type=friendly
```

Uploaded logos can't travel in a link, so drop the logo in again when presenting on another device. **Reset** returns to the template defaults. In demo mode, file links show a "demo" note instead of a missing file.

For a real company's intranet, set `settings.demo` to `false`. The panel disappears and `?name=` and `?tagline=` are ignored.

## Editing content

**Everything lives in [`data/content.js`](data/content.js).** Open it, change the text, save, deploy.

| To… | Edit |
|---|---|
| Add or change a link | `apps` — copy an existing block and give it a new unique `id` |
| Add a form or document | Put the file in `files/`, then add an entry to `files` |
| Post a banner | `announcements` — set `from` and `until` and it shows and hides on its own |
| Flag an outage | `itStatus.level` → `"notice"` or `"outage"`, and update `message` |
| Next year's holidays | `holidays.days` — dates are `YYYY-MM-DD` |
| Sister company details | `companies` — logos go in `assets/logos/` |
| Heading over the companies | `companiesTitle`, e.g. `"Smith Group divisions"` |
| Brand color and type | `theme` — see above |

Icons available for apps: `mail`, `users`, `cloud`, `grid`, `payroll`, `trend`, `shield`, `globe`, `headset`, `phone`, `chat`, `ticket`, `calendar`, `file`, `folder`, `building`, `link`. You can also give an image path like `"assets/icons/adp.png"`.

**Check your edits before deploying:**

```bash
node scripts/check-content.mjs
```

It catches syntax errors, duplicate ids, bad dates, missing files and links still set to `"#"`.

## Preview locally

```bash
node scripts/serve.mjs
# open http://localhost:8080
```

This preview server tells the browser not to cache, so a normal refresh always shows your latest edits. `python3 -m http.server` works too, but the browser may keep showing old files until you hard-refresh with `Ctrl+Shift+R`. Opening `index.html` directly from disk also works.

Add `?hour=19` to the URL to preview the sky at any time of day, for example `?hour=6.5` for sunrise or `?hour=23` for night.

## Deploy (Linux + nginx)

First time:

```bash
sudo mkdir -p /var/www/quicklinks
sudo cp deploy/nginx.conf /etc/nginx/sites-available/quicklinks
sudo ln -s /etc/nginx/sites-available/quicklinks /etc/nginx/sites-enabled/
# edit server_name and the allow/deny ranges in that file
sudo nginx -t && sudo systemctl reload nginx
```

Every update after that:

```bash
deploy/deploy.sh you@intranet-server
```

This runs the content check and copies only the public files over.

## Moving files over from WordPress

The current forms and documents are in the WordPress media library, under `wp-content/uploads/YYYY/MM/` on the server. Copy each one into `files/` with a clean, stable name such as `pto-request.pdf` or `expense-report.xlsx`, and update the matching entry in `content.js`.

When a form changes, replace the file but **keep the same name**. That way links people have bookmarked keep working.

## Make it everyone's homepage (Microsoft Edge via Intune or GPO)

- `HomepageLocation` → `https://quicklinks.corp.local`
- `NewTabPageLocation` → same URL, if you want new tabs to open it too
- `RestoreOnStartup` = 4 and `RestoreOnStartupURLs` → same URL

## Project layout

```
index.html               page shell
data/content.js          ← all content (the file you edit)
files/                   forms & documents served to staff
assets/css/styles.css    design
assets/js/app.js         rendering, search, pins, sky
assets/js/theme.js       applies saved theme before first paint
assets/logos/            company logos (placeholders for now)
assets/fonts/            self-hosted: Atkinson Hyperlegible Next (UI) + one display face per type preset
scripts/check-content.mjs  content validator
scripts/serve.mjs        local preview server (no caching)
deploy/                  nginx config + deploy script
```
