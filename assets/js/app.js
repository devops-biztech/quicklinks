/* Quicklinks — renders data/content.js. No dependencies, no build step. */
(() => {
  "use strict";

  /* ------------------------------------------------------------------ *
   * Icons (24×24, stroke-based). Use these names in content.js.
   * ------------------------------------------------------------------ */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18.5 14.6c1.6.7 2.7 2.4 3 5.4"/>',
    cloud: '<path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.2 4.7 4.7 0 0 0 7 18.5z"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
    payroll: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2c-.5-.9-1.6-1.5-2.8-1.5-1.7 0-2.9.9-2.9 2.2 0 3 5.9 1.4 5.9 4.4 0 1.3-1.3 2.2-3 2.2-1.3 0-2.4-.6-2.9-1.6M12 6v1.7M12 16.5V18"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    shield: '<path d="M12 3 19.5 6v5.5c0 4.6-3.1 8.4-7.5 9.5-4.4-1.1-7.5-4.9-7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13.5" width="4" height="6" rx="1.5"/><rect x="17" y="13.5" width="4" height="6" rx="1.5"/><path d="M20 19.5c0 1.4-1.6 2-4 2h-2"/>',
    phone: '<path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4z"/>',
    copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    arrow: '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    download: '<path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 20h14"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.6l2 2.2h7.4A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>',
    chat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z"/>',
    ticket: '<path d="M3.5 6.5h17v3.5a2 2 0 0 0 0 4v3.5h-17V14a2 2 0 0 0 0-4z"/><path d="M14.5 6.5v11" stroke-dasharray="2 2.2"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    auto: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/>',
    megaphone: '<path d="M3.5 10v4a1 1 0 0 0 1 1h2l5.5 4V5L6.5 9h-2a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M7.5 14h9"/>',
    building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10M2.5 21h19M8 7.5h4M8 11.5h4M8 15.5h4"/>',
    chevron: '<path d="m9.5 6 6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    sparkle: '<path d="M12 3.5 13.6 9a2 2 0 0 0 1.4 1.4l5.5 1.6-5.5 1.6a2 2 0 0 0-1.4 1.4L12 20.5 10.4 15A2 2 0 0 0 9 13.6L3.5 12 9 10.4A2 2 0 0 0 10.4 9z"/><path d="M19 3v3M17.5 4.5h3"/>',
    upload: '<path d="M12 15V4m-4.5 4.5L12 4l4.5 4.5M5 20h14"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  };

  const DATA = window.QUICKLINKS;
  const $ = (sel) => document.querySelector(sel);

  if (!DATA || typeof DATA !== "object") {
    document.body.prepend(
      el("div", { class: "fatal", role: "alert" },
        el("strong", {}, "The page content didn't load."),
        " There is probably a typo in data/content.js. Run ",
        el("code", {}, "node scripts/check-content.mjs"),
        " to find it.")
    );
    return;
  }

  const DAY = 864e5;
  const IS_MAC = /Mac|iPhone|iPad/.test(navigator.userAgentData?.platform || navigator.platform || "");
  const MOD = IS_MAC ? "⌘" : "Ctrl";

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */
  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value == null || value === false) continue;
      if (key === "class") node.className = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? "" : value);
    }
    for (const child of children.flat()) {
      if (child == null || child === false || child === "") continue;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
  }

  function svgIcon(name, cls) {
    const span = el("span", { class: cls, "aria-hidden": "true" });
    span.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.link) + "</svg>";
    return span;
  }
  function icon(name, cls = "ic") {
    if (!name || !/[./]/.test(name)) return svgIcon(name, cls);
    // An image icon from content.js; fall back to a plain link glyph if it's missing.
    const img = el("img", { class: cls + " ic-img", src: name, alt: "" });
    img.addEventListener("error", () => img.replaceWith(svgIcon("link", cls)), { once: true });
    return img;
  }

  // localStorage can be missing, full, blocked, or hold values from an older version.
  const store = {
    get(key, fallback, valid = () => true) {
      try {
        const raw = localStorage.getItem("ql:" + key);
        if (raw == null) return fallback;
        const value = JSON.parse(raw);
        return valid(value) ? value : fallback;
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("ql:" + key, JSON.stringify(value)); } catch {}
    },
  };

  // "YYYY-MM-DD" → local Date, or null for anything malformed (including 2026-02-30).
  function parseDate(value) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value ?? "").trim());
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.getMonth() === +m[2] - 1 && d.getDate() === +m[3] ? d : null;
  }
  function startOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  const fmt = (date, opts) => date.toLocaleDateString(undefined, opts);
  const daysUntil = (date) => Math.round((date - startOfToday()) / DAY);
  const relDays = (n) => (n === 0 ? "today" : n === 1 ? "tomorrow" : `in ${n} days`);

  const telHref = (phone) => "tel:" + String(phone).replace(/[^\d+]/g, "");
  // Domain to show for a site. Relative links (demo sample pages) have none, so callers can fall back.
  const hostOf = (url) => { try { return new URL(url).host.replace(/^www\./, ""); } catch { return ""; } };
  const domainOf = (co) => hostOf(co.website) || (co.email.split("@")[1] || "");
  const extOf = (path) => (String(path).split(/[?#]/)[0].split("/").pop().split(".").slice(1).pop() || "").toLowerCase();
  const fold = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const unsetMessage = () => (C.settings.demo ? "Demo: in your version, this opens the real link" : "This link hasn't been set up yet");

  function openUrl(url) {
    if (!url) return toast(unsetMessage());
    if (/^(tel|mailto|msteams|sms):/i.test(url) || !C.settings.newTab) { window.location.href = url; return; }
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
  }

  // A link that opens in a new tab and politely says so if it hasn't been filled in.
  function link(url, props, ...children) {
    const newTab = !!url && C.settings.newTab && !/^(tel|mailto|msteams|sms):/i.test(url);
    return el("a", {
      href: url || "#",
      target: newTab ? "_blank" : null,
      rel: newTab ? "noopener" : null,
      "aria-disabled": url ? null : "true",
      onclick: url ? null : (e) => { e.preventDefault(); toast(unsetMessage()); },
      ...props,
    }, ...children, newTab && el("span", { class: "sr-only" }, " (opens in new tab)"));
  }

  let toastTimer;
  function toast(message) {
    const node = $("#toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 2200);
  }

  async function copyText(text, label) {
    let ok = false;
    // The Clipboard API only exists on HTTPS (or localhost); fall back for plain-HTTP intranets.
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {}
    if (!ok) {
      const ta = el("textarea", { readonly: true, "aria-hidden": "true" });
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.append(ta);
      ta.select();
      try { ok = document.execCommand("copy"); } catch {}
      ta.remove();
    }
    toast(ok ? `Copied ${label || text}` : "Couldn't copy. Select the text and copy it instead.");
    return ok;
  }

  function copyButton(text, label) {
    const btn = el("button", { type: "button", class: "copy-btn", title: `Copy ${label}`, "aria-label": `Copy ${label}` }, icon("copy"));
    let reset;
    btn.addEventListener("click", async () => {
      if (!(await copyText(text, label))) return;
      btn.replaceChildren(icon("check"));
      btn.classList.add("is-done");
      clearTimeout(reset);
      reset = setTimeout(() => { btn.replaceChildren(icon("copy")); btn.classList.remove("is-done"); }, 1500);
    });
    return btn;
  }

  /* ------------------------------------------------------------------ *
   * Content: clean up whatever content.js hands us. Bad entries are
   * skipped or repaired and reported in the console instead of breaking
   * the page. scripts/check-content.mjs reports the same problems.
   * ------------------------------------------------------------------ */
  const problems = [];
  const note = (msg) => problems.push(msg);
  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
  const str = (v) => (v == null || typeof v === "object" ? "" : String(v).trim());
  const words = (v) => (Array.isArray(v) ? v.join(" ") : str(v));
  const slug = (s) => fold(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";

  function list(value, where) {
    if (value == null) return [];
    if (Array.isArray(value)) return value.filter((entry, i) => isObj(entry) || (note(`${where}[${i}] isn't a { … } block — skipped`), false));
    note(`${where} should be a list: [ … ]`);
    return [];
  }

  const SAFE_SCHEME = /^(https?|mailto|tel|msteams|sms):/i;
  function safeUrl(value, where) {
    const url = str(value);
    if (!url || url === "#") return "";
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !SAFE_SCHEME.test(url)) {
      note(`${where}: link type not allowed (${url.slice(0, 30)}…)`);
      return "";
    }
    return url;
  }

  const usedIds = new Set();
  // `required` ids matter for pins (apps, files); elsewhere an id is optional and derived quietly.
  function uniqueId(raw, name, where, required = true) {
    const base = str(raw) || slug(name);
    if (!str(raw) && required) note(`${where} has no "id"; using "${base}"`);
    let id = base;
    for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
    if (id !== base) note(`${where} reuses the id "${base}"; pins for it may not stick`);
    usedIds.add(id);
    return id;
  }

  function named(entry, where) {
    const name = str(entry.name);
    if (!name) note(`${where} has no "name" — skipped`);
    return name;
  }

  const TYPE_PRESETS = ["editorial", "modern", "friendly", "system"];
  const DISPLAY_FACE = { editorial: "Source Serif Display", modern: "Bricolage Display", friendly: "Fredoka Display", system: "" };

  const C = (() => {
    const company = isObj(DATA.company) ? DATA.company : {};
    const it = isObj(DATA.it) ? DATA.it : {};
    const status = isObj(DATA.itStatus) ? DATA.itStatus : {};
    const level = ["ok", "notice", "outage"].includes(status.level) ? status.level : "ok";
    if (status.level && level !== status.level) note(`itStatus.level must be "ok", "notice" or "outage"`);
    const holidays = isObj(DATA.holidays) ? DATA.holidays : {};

    const theme = isObj(DATA.theme) ? DATA.theme : {};
    const type = str(theme.type) || "editorial";
    const color = str(theme.color);
    if (!TYPE_PRESETS.includes(type)) note(`theme.type must be one of: ${TYPE_PRESETS.join(", ")}`);
    if (color && !CSS.supports("color", color)) note(`theme.color "${color}" isn't a color`);

    return {
      theme: {
        type: TYPE_PRESETS.includes(type) ? type : "editorial",
        color: color && CSS.supports("color", color) ? color : "",
      },
      settings: { newTab: DATA.settings?.openLinksInNewTab !== false, demo: DATA.settings?.demo === true },
      companiesTitle: str(DATA.companiesTitle) || "Family of companies",
      updated: parseDate(DATA.updated),
      company: { name: str(company.name), tagline: str(company.tagline), logo: str(company.logo) },
      status: {
        level,
        message: str(status.message) || { ok: "All systems normal", notice: "Some services affected", outage: "Service outage" }[level],
      },
      it: {
        phone: str(it.phone), ext: str(it.ext), email: str(it.email), hours: str(it.hours), afterHours: str(it.afterHours),
        teamsChat: safeUrl(it.teamsChat, "it.teamsChat"), ticketUrl: safeUrl(it.ticketUrl, "it.ticketUrl"),
      },
      announcements: list(DATA.announcements, "announcements").map((a, i) => {
        const where = `announcements[${i}]`;
        const text = str(a.text);
        if (!text) return note(`${where} has no "text" — skipped`), null;
        const from = parseDate(a.from), until = parseDate(a.until);
        if (a.from && !from) note(`${where}.from isn't a YYYY-MM-DD date — ignored`);
        if (a.until && !until) note(`${where}.until isn't a YYYY-MM-DD date — ignored`);
        const linkUrl = isObj(a.link) ? safeUrl(a.link.url, `${where}.link`) : "";
        return {
          text, from, until, tone: a.tone === "warning" ? "warning" : "info",
          link: str(a.link?.label) && linkUrl ? { label: str(a.link.label), url: linkUrl } : null,
        };
      }).filter(Boolean),
      apps: list(DATA.apps, "apps").map((a, i) => {
        const where = `apps[${i}]`;
        const name = named(a, where);
        if (!name) return null;
        const tint = str(a.tint);
        if (tint && !CSS.supports("color", tint)) note(`${where}.tint "${tint}" isn't a color`);
        return {
          id: uniqueId(a.id, name, where), name, description: str(a.description), url: safeUrl(a.url, where),
          icon: str(a.icon) || "link", tint: tint && CSS.supports("color", tint) ? tint : "", keywords: words(a.keywords),
        };
      }).filter(Boolean),
      files: list(DATA.files, "files").map((f, i) => {
        const where = `files[${i}]`;
        const name = named(f, where);
        if (!name) return null;
        return {
          id: uniqueId(f.id, name, where), name, url: safeUrl(f.file, where), ext: extOf(str(f.file)),
          category: str(f.category), updated: str(f.updated), keywords: words(f.keywords),
        };
      }).filter(Boolean),
      companies: list(DATA.companies, "companies").map((co, i) => {
        const where = `companies[${i}]`;
        const name = named(co, where);
        if (!name) return null;
        return {
          id: uniqueId(co.id, name, where, false), name, logo: str(co.logo), phone: str(co.phone), email: str(co.email),
          website: safeUrl(co.website, where), keywords: words(co.keywords),
        };
      }).filter(Boolean),
      holidays: {
        scheduleFile: str(holidays.scheduleFile),
        days: list(holidays.days, "holidays.days").map((h, i) => {
          const d = parseDate(h.date);
          if (!d) return note(`holidays.days[${i}] date "${str(h.date)}" isn't YYYY-MM-DD — skipped`), null;
          return { name: str(h.name) || "Company holiday", date: str(h.date), d };
        }).filter(Boolean).sort((a, b) => a.d - b.d),
      },
    };
  })();


  /* ------------------------------------------------------------------ *
   * The look: brand name, tagline, logo, color, type preset, sky hour and
   * whether sister companies show. It starts from content.js.
   *   Everywhere: ?color=, ?type= and ?hour= preview a look without saving.
   *   Demo mode (settings.demo): the customizer saves a look on this device,
   *   and ?name=, ?tagline= and ?companies=0 also work, for share links.
   * ------------------------------------------------------------------ */
  const DEMO = C.settings.demo;
  const MAX_LOGO_BYTES = 1024 * 1024;

  const contentLook = () => ({
    name: C.company.name, tagline: C.company.tagline, logo: C.company.logo,
    color: C.theme.color, type: C.theme.type, hour: null, companies: true,
  });

  // Keep only valid fields from saved state or a URL, so a bad link can't break the page.
  function validLook(raw) {
    const out = {};
    if (!isObj(raw)) return out;
    if (typeof raw.name === "string") out.name = raw.name.trim().slice(0, 60);
    if (typeof raw.tagline === "string") out.tagline = raw.tagline.trim().slice(0, 40);
    if (typeof raw.logo === "string" && (raw.logo === "" || /^data:image\/(png|jpeg|webp|svg\+xml);base64,/.test(raw.logo) || /^assets\//.test(raw.logo))) out.logo = raw.logo;
    if (typeof raw.color === "string" && (raw.color === "" || CSS.supports("color", raw.color))) out.color = raw.color.trim();
    if (TYPE_PRESETS.includes(raw.type)) out.type = raw.type;
    const hour = raw.hour === "" || raw.hour == null ? NaN : Number(raw.hour);
    if (Number.isFinite(hour) && hour >= 0 && hour < 24) out.hour = hour;
    if (typeof raw.companies === "boolean") out.companies = raw.companies;
    return out;
  }

  function lookFromUrl() {
    const q = new URLSearchParams(location.search);
    const pick = (keys) => Object.fromEntries(keys.filter((k) => q.has(k)).map((k) => [k, q.get(k)]));
    const raw = pick(["color", "type", "hour", ...(DEMO ? ["name", "tagline"] : [])]);
    if (DEMO && q.has("companies")) raw.companies = q.get("companies") !== "0";
    return validLook(raw);
  }

  const look = Object.assign(contentLook(), DEMO ? validLook(store.get("demo", {}, isObj)) : {}, lookFromUrl());

  /* ------------------------------------------------------------------ *
   * Search index — everything the palette can find
   * ------------------------------------------------------------------ */
  const FILE_KINDS = { pdf: "PDF", doc: "Word", docx: "Word", xls: "Excel", xlsx: "Excel", csv: "Excel",
    ppt: "PowerPoint", pptx: "PowerPoint", zip: "Archive", png: "Image", jpg: "Image", svg: "Image" };

  const items = [];
  const byId = new Map();
  const add = (item) => { item.search = fold(`${item.title} ${item.subtitle || ""} ${item.keywords || ""} ${item.kind}`); items.push(item); byId.set(item.id, item); return item; };

  for (const app of C.apps) {
    add({ id: app.id, kind: "App", title: app.name, subtitle: app.description, keywords: app.keywords,
      url: app.url, icon: app.icon, tint: app.tint, pinnable: true });
  }

  for (const file of C.files) {
    add({ id: file.id, kind: "File", title: file.name, ext: file.ext, url: file.url, pinnable: true,
      subtitle: [file.category, FILE_KINDS[file.ext] || file.ext.toUpperCase(), file.updated && `Updated ${file.updated}`]
        .filter(Boolean).join(" · "),
      keywords: `${file.keywords} ${file.category} ${file.ext}` });
  }

  for (const co of C.companies) {
    add({ id: "co:" + co.id, kind: "Company", title: co.name, logo: co.logo, url: co.website, co,
      subtitle: [co.phone, co.email].filter(Boolean).join(" · "),
      keywords: `${co.keywords} ${co.phone} ${co.email} ${domainOf(co)} sister company contact` });
  }

  const IT = C.it;
  if (IT.phone) add({ id: "it:call", kind: "IT", title: "Call IT Support", subtitle: `${IT.phone}${IT.ext ? ` · ext. ${IT.ext}` : ""}`, url: telHref(IT.phone), icon: "phone", copy: [IT.phone, "IT phone number"], keywords: "help helpdesk computer support tech" });
  if (IT.teamsChat) add({ id: "it:teams", kind: "IT", title: "Chat with IT on Teams", subtitle: "Fastest for quick questions", url: IT.teamsChat, icon: "chat", keywords: "help helpdesk message support" });
  if (IT.email) add({ id: "it:email", kind: "IT", title: "Email IT Support", subtitle: IT.email, url: "mailto:" + IT.email, icon: "mail", copy: [IT.email, "IT email address"], keywords: "help helpdesk support" });
  if (IT.ticketUrl) add({ id: "it:ticket", kind: "IT", title: "Submit an IT ticket", subtitle: "Something broken? Start here", url: IT.ticketUrl, icon: "ticket", keywords: "help helpdesk broken issue request problem" });

  const holidayFile = byId.get(C.holidays.scheduleFile);
  if (C.holidays.scheduleFile && !holidayFile) note(`holidays.scheduleFile "${C.holidays.scheduleFile}" doesn't match a file id`);
  for (const h of C.holidays.days) {
    const days = daysUntil(h.d);
    if (days < 0) continue;
    add({ id: `hol:${h.date}:${h.name}`, kind: "Holiday", title: h.name, icon: "calendar", url: holidayFile?.url,
      subtitle: `${fmt(h.d, { weekday: "long", month: "long", day: "numeric" })} · ${relDays(days)}`,
      keywords: "holiday day off office closed schedule" });
  }

  add({ id: "act:theme", kind: "Action", title: "Switch light / dark mode", subtitle: "Auto → Light → Dark",
    icon: "auto", run: () => cycleTheme(), keywords: "theme dark mode light mode appearance night" });
  add({ id: "act:keys", kind: "Action", title: "Keyboard shortcuts", subtitle: "See them, or turn single-key shortcuts off",
    icon: "keyboard", run: () => $("#help").showModal(), keywords: "help keys hotkeys voice control accessibility" });

  // Secondary actions for a result, shown with → in the palette. The first one is what Enter does.
  function actionsOf(item) {
    const acts = [];
    if (item.kind === "Company") {
      const co = item.co;
      if (co.website) acts.push({ title: "Open website", icon: "globe", run: () => openUrl(co.website) });
      if (co.phone) acts.push({ title: `Call ${co.phone}`, icon: "phone", run: () => openUrl(telHref(co.phone)) });
      if (co.email) acts.push({ title: `Email ${co.email}`, icon: "mail", run: () => openUrl("mailto:" + co.email) });
      if (co.phone) acts.push({ title: "Copy phone number", icon: "copy", run: () => copyText(co.phone, `${co.name} phone number`) });
      if (co.email) acts.push({ title: "Copy email address", icon: "copy", run: () => copyText(co.email, `${co.name} email`) });
    } else if (item.pinnable) {
      if (item.url) acts.push({ title: item.kind === "File" ? "Open file" : `Open ${item.title}`, icon: "arrow", run: () => openUrl(item.url) });
      acts.push({ title: pins.includes(item.id) ? "Unpin" : "Pin to top", icon: "star", run: () => togglePin(item.id) });
      if (item.url) acts.push({ title: "Copy link", icon: "link", run: () => copyText(new URL(item.url, location.href).href, "link") });
    } else if (item.copy) {
      acts.push({ title: item.title, icon: item.icon, run: () => openUrl(item.url) });
      acts.push({ title: `Copy ${item.copy[1].replace(/^IT /, "")}`, icon: "copy", run: () => copyText(...item.copy) });
    }
    return acts;
  }

  /* ------------------------------------------------------------------ *
   * Per-person preferences, stored in the browser
   * ------------------------------------------------------------------ */
  const loadPins = () => [...new Set(store.get("pins", [], Array.isArray).filter((id) => typeof id === "string" && byId.get(id)?.pinnable))];
  let pins = loadPins();

  const pinnedItems = () => pins.map((id) => byId.get(id)).filter(Boolean);

  function togglePin(id) {
    const item = byId.get(id);
    if (!item) return;
    pins = loadPins(); // another tab may have changed them
    const pinned = pins.includes(id);
    pins = pinned ? pins.filter((p) => p !== id) : [...pins, id];
    store.set("pins", pins);
    toast(pinned ? `Unpinned ${item.title}` : `Pinned ${item.title}`);
    syncPins();
  }

  function syncPins() {
    renderPins();
    for (const btn of document.querySelectorAll("[data-pin]")) syncStar(btn);
  }

  // The label stays fixed and aria-pressed carries the state, so screen readers say "Pin Outlook, pressed".
  function syncStar(btn) {
    const on = pins.includes(btn.dataset.pin);
    btn.setAttribute("aria-pressed", String(on));
    btn.title = on ? "Unpin" : "Pin to top";
  }

  function starButton(id) {
    const btn = el("button", { type: "button", class: "star-btn", "data-pin": id, "aria-label": `Pin ${byId.get(id).title}`,
      onclick: () => togglePin(id) }, icon("star"));
    syncStar(btn);
    return btn;
  }

  /* ------------------------------------------------------------------ *
   * Shared visuals
   * ------------------------------------------------------------------ */
  const initials = (name) => name.split(/\s+/).filter((w) => /^\p{L}/u.test(w)).slice(0, 2).map((w) => [...w][0]).join("").toUpperCase() || "•";

  function logoImg(src, name) {
    const monogram = () => el("span", { class: "monogram" }, initials(name));
    if (!src) return monogram();
    const img = el("img", { src, alt: "" });
    img.addEventListener("error", () => img.replaceWith(monogram()), { once: true });
    return img;
  }

  // `compact` chips are too small for a readable type label, so files get a tinted file glyph instead.
  function chip(item, { compact = false } = {}) {
    if (item.kind === "Company") return el("span", { class: "chip chip-logo" }, logoImg(item.logo, item.title));
    if (item.ext && compact) return el("span", { class: "chip chip-file", "data-ext": item.ext }, icon("file"));
    if (item.ext) return el("span", { class: "chip chip-file", "data-ext": item.ext }, item.ext.slice(0, 4).toUpperCase());
    const node = el("span", { class: "chip" }, icon(item.icon));
    if (item.tint) node.style.setProperty("--tint", item.tint);
    return node;
  }

  /* ------------------------------------------------------------------ *
   * Brand theme: type preset + an accent fitted for contrast
   *
   * A brand hands us any color. We keep its hue, then move only its
   * lightness (and trim chroma to stay in gamut) until it reads as text
   * on every page surface and carries readable text as a button — once
   * for light theme, once for dark. Bright yellows become a deep gold in
   * light mode; navy becomes a lighter blue in dark mode.
   * ------------------------------------------------------------------ */
  const srgbToLinear = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const linearToSrgb = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

  function toOklch(rgb255) {
    const [r, g, b] = rgb255.map((v) => srgbToLinear(v / 255));
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return [L, Math.hypot(A, B), (Math.atan2(B, A) * 180 / Math.PI + 360) % 360];
  }
  // Returns sRGB 0–255, or null when the color is outside the sRGB gamut (unless `clamp`, which forces it in).
  function fromOklch(L, C, H, clamp = false) {
    const a = C * Math.cos(H * Math.PI / 180), b = C * Math.sin(H * Math.PI / 180);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const lin = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    if (!clamp && lin.some((v) => v < -0.0005 || v > 1.0005)) return null;
    return lin.map((v) => Math.round(linearToSrgb(Math.min(1, Math.max(0, v))) * 255));
  }
  function inGamut(L, C, H) {
    for (let c = C; c >= 0; c -= 0.005) { const rgb = fromOklch(L, c, H); if (rgb) return [c, rgb]; }
    return [0, fromOklch(L, 0, H, true)];
  }
  function cssColorToRgb(color) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
  }

  // Worst-case page surfaces the accent sits on (see the surface tokens in styles.css).
  const SURFACES = {
    light: [[0.997, 0.002], [0.977, 0.005], [0.962, 0.009], [0.952, 0.008]],
    dark: [[0.165, 0.009], [0.205, 0.008], [0.235, 0.009], [0.275, 0.011]],
  };
  const TARGET = 4.8; // AA is 4.5; the margin covers the faint sky tint and the 9% accent-soft rows

  function fitAccent(color) {
    const [L0, C0, H] = toOklch(cssColorToRgb(color));
    // Every surface, plus the accent-soft tint (accent at 9% / 14% over the page) that highlighted rows use.
    const SOFT = { light: 0.09, dark: 0.14 };
    const surfacesOk = (rgb, mode) => SURFACES[mode].every(([l, c]) => {
      const surface = fromOklch(l, c, 250, true);
      return contrast(rgb, surface) >= TARGET && contrast(rgb, mix(surface, rgb, SOFT[mode])) >= 4.6;
    });
    const white = [255, 255, 255], ink = inGamut(0.2, 0.04, H)[1];

    let light = null;
    for (let L = clamp(L0, 0.2, 0.62); L >= 0.15; L -= 0.005) {
      const [c, rgb] = inGamut(L, C0, H);
      if (surfacesOk(rgb, "light")) { light = { L, c, inkL: contrast(white, rgb) >= 4.5 ? 0.995 : 0.2 }; break; }
    }
    let dark = null;
    for (let L = clamp(L0, 0.66, 0.95); L <= 0.99; L += 0.005) {
      const [c, rgb] = inGamut(L, Math.min(C0, 0.16), H);
      if (surfacesOk(rgb, "dark") && contrast(ink, rgb) >= 4.5) { dark = { L, c }; break; }
    }
    return light && dark ? { H, light, dark, adjusted: Math.abs(light.L - L0) > 0.02 } : null;
  }

  const ACCENT_VARS = ["--accent-h", "--accent-l", "--accent-c", "--accent-ink-l", "--accent-dl", "--accent-dc"];
  const toHex = (rgb) => "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");

  // Returns the fit (or null when the default accent is used), so the demo panel can show what happened.
  function applyAccent(color) {
    const root = document.documentElement;
    if (!color) { ACCENT_VARS.forEach((k) => root.style.removeProperty(k)); return null; }
    const fit = fitAccent(color);
    if (!fit) {
      ACCENT_VARS.forEach((k) => root.style.removeProperty(k));
      note(`theme.color "${color}" couldn't be made readable; using the default accent`);
      return null;
    }
    const set = (k, v) => root.style.setProperty(k, v.toFixed(3));
    set("--accent-h", fit.H);
    set("--accent-l", fit.light.L);
    set("--accent-c", fit.light.c);
    set("--accent-ink-l", fit.light.inkL);
    set("--accent-dl", fit.dark.L);
    set("--accent-dc", fit.dark.c);
    return { ...fit, lightHex: toHex(inGamut(fit.light.L, fit.light.c, fit.H)[1]) };
  }

  // Hold the reveal until the preset's display face is in (max 1.5s), so the greeting never swaps fonts on screen.
  function displayFontReady() {
    const face = DISPLAY_FACE[look.type];
    if (!face || !document.fonts) return Promise.resolve();
    const loads = [document.fonts.load(`1em "${face}"`), look.type === "editorial" && document.fonts.load(`italic 1em "${face}"`)];
    return Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, 1500))]).catch(() => {});
  }

  /* ------------------------------------------------------------------ *
   * Header, footer, announcements
   * ------------------------------------------------------------------ */
  const DEFAULT_FAVICON = document.querySelector('link[rel="icon"]')?.getAttribute("href");

  // Brand name, tagline and logo. Runs again whenever the demo panel changes them.
  function renderBrand() {
    const name = look.name;
    document.title = name ? `${name} · Quicklinks` : "Quicklinks";
    $("#page-title").textContent = name ? `${name} quicklinks` : "Quicklinks";
    $("#brand-name").textContent = name || "Quicklinks";
    const tag = $("#brand-tag");
    tag.textContent = look.tagline;
    tag.hidden = !look.tagline;

    const img = $("#brand-logo"), mono = $("#brand-mono"), favicon = document.querySelector('link[rel="icon"]');
    mono.textContent = initials(name || "Quicklinks");
    const useInitials = () => { img.hidden = true; mono.hidden = false; favicon?.setAttribute("href", DEFAULT_FAVICON); };
    if (!look.logo) return useInitials();
    img.onerror = useInitials;
    img.src = look.logo;
    img.hidden = false;
    mono.hidden = true;
    favicon?.setAttribute("href", look.logo);
  }

  function renderChrome() {
    renderBrand();

    for (const node of document.querySelectorAll("[data-icon]")) node.replaceWith(icon(node.dataset.icon));
    for (const node of document.querySelectorAll("[data-mod]")) node.textContent = MOD;
    $("#help-btn").append(icon("keyboard"));
    $("#help-btn").addEventListener("click", () => $("#help").showModal());

    if (C.updated) $("#footer-updated").textContent =
      `Maintained by IT · Updated ${fmt(C.updated, { month: "long", day: "numeric", year: "numeric" })}`;
  }

  function renderAnnouncements() {
    const box = $("#announcements");
    const today = startOfToday();
    const dismissed = store.get("dismissed", [], Array.isArray);
    for (const a of C.announcements) {
      if (a.from && a.from > today) continue;
      if (a.until && a.until < today) continue;
      if (dismissed.includes(a.text)) continue;
      const node = el("div", { class: "announcement", "data-tone": a.tone, role: "note" },
        icon("megaphone"),
        el("p", {}, a.text, " ", a.link && link(a.link.url, { class: "announcement-link" }, a.link.label, icon("right"))),
        el("button", { type: "button", class: "icon-btn icon-btn-sm", "aria-label": "Dismiss announcement",
          onclick: () => {
            store.set("dismissed", [...store.get("dismissed", [], Array.isArray), a.text].slice(-50));
            node.remove();
            $("#main").focus({ preventScroll: true }); // don't strand keyboard focus on a removed button
          } }, icon("x")));
      box.append(node);
    }
  }

  /* ------------------------------------------------------------------ *
   * Hero: greeting, clock, and a sky that follows the real time of day
   * ------------------------------------------------------------------ */
  // [hour, [top, middle, bottom]]
  const SKY = [
    [0, ["#070b1f", "#141a3d", "#262a58"]],
    [4.5, ["#0d1233", "#232a5c", "#433f78"]],
    [6, ["#2b3a7a", "#9a6a9c", "#f2a07b"]],
    [7.5, ["#5a8fd6", "#b5c9e8", "#ffd9b0"]],
    [10, ["#3f8be0", "#8dbdf0", "#d8ebfb"]],
    [14, ["#3584e0", "#86b9ef", "#d3e8fa"]],
    [17, ["#4b7fcf", "#b9b7d6", "#ffd6a5"]],
    [18.75, ["#34417f", "#d6705a", "#f8b75e"]],
    [20, ["#1a1f4f", "#55407c", "#b2637a"]],
    [21.5, ["#0c1130", "#1d2250", "#33305f"]],
    [24, ["#070b1f", "#141a3d", "#262a58"]],
  ];
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgb = (c) => `rgb(${c.join(" ")})`;
  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  const luminance = (c) => {
    const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // look.hour (from ?hour=19.5 or the demo panel) previews the sky at any time of day.
  const currentHour = () => {
    if (look.hour != null) return clamp(look.hour, 0, 23.99);
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  };

  const contrast = (a, b) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  // OKLCH hue of an sRGB color, used to tint the page neutrals toward the sky.
  function hueOf(c) {
    const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return (Math.atan2(B, A) * 180 / Math.PI + 360) % 360;
  }

  let sky = null; // [top, mid, bottom] as RGB arrays

  function paintSky() {
    const h = currentHour();
    let i = SKY.findIndex(([hh]) => hh > h);
    if (i < 1) i = 1;
    const [h0, c0] = SKY[i - 1];
    const [h1, c1] = SKY[i];
    const t = (h - h0) / (h1 - h0);
    sky = c0.map((c, k) => mix(hex(c), hex(c1[k]), t));
    const [top, mid, bottom] = sky;

    const hero = $("#hero");
    hero.style.setProperty("--sky-top", rgb(top));
    hero.style.setProperty("--sky-mid", rgb(mid));
    hero.style.setProperty("--sky-bottom", rgb(bottom));
    document.documentElement.style.setProperty("--sky-h", hueOf(mid).toFixed(1));

    // Sun travels 6:00→20:00, moon 20:00→6:00, both along an arc.
    const isDay = h >= 6 && h < 20;
    const p = isDay ? (h - 6) / 14 : ((h - 20 + 24) % 24) / 10;
    const lift = Math.sin(Math.PI * p);
    hero.dataset.orb = isDay ? "sun" : "moon";
    hero.style.setProperty("--orb-x", `${8 + 84 * p}%`);
    hero.style.setProperty("--lift", lift.toFixed(3));
    hero.style.setProperty("--orb-color", isDay ? rgb(mix(hex("#ff9a5a"), hex("#fff6d6"), clamp(lift * 1.7))) : "#eef0ff");

    const night = h < 4.5 || h >= 21.5 ? 1 : h < 6 ? 1 - (h - 4.5) / 1.5 : h >= 20 ? (h - 20) / 1.5 : 0;
    hero.style.setProperty("--stars", night.toFixed(2));
    hero.toggleAttribute("data-night", night > 0);
    // The haze drifts with the time of day: a still image that changes each minute, not a constant animation.
    hero.style.setProperty("--haze-x", `${(-12 * p).toFixed(1)}%`);
    hero.style.setProperty("--haze-y", `${(-8 * lift).toFixed(1)}%`);

    fitLegibility();
  }

  /* Hero text sits on a sky whose brightness changes all day. Rather than
     guess, measure where each line of text actually sits, sample the sky
     behind it, pick the ink that needs the least help, and add exactly
     enough wash (or glass, for the pins) to clear WCAG AA. */
  const INK = { dark: [13, 21, 48], light: [255, 255, 255] };
  const WASH = { dark: [255, 255, 255], light: [10, 13, 36] };
  const GLASS_MIN = { dark: 0.4, light: 0.22 };

  function zoneOf(node, box) {
    const r = node.getBoundingClientRect();
    const cs = getComputedStyle(node);
    const top = r.top + parseFloat(cs.paddingTop) - box.top;
    const bottom = r.bottom - parseFloat(cs.paddingBottom) - box.top;
    return [clamp(top / box.height) * 100, clamp(bottom / box.height) * 100];
  }
  function skyAt(pct) {
    const [top, mid, bottom] = sky;
    return pct <= 58 ? mix(top, mid, pct / 58) : mix(mid, bottom, (pct - 58) / 42);
  }
  function washNeeded(ink, wash, [from, to], target) {
    // Include the drifting haze (bottom/mid blend at up to 55%) as a worst case.
    const haze = mix(sky[2], sky[1], 0.3);
    const behind = [from, (from + to) / 2, to].map(skyAt).flatMap((c) => [c, mix(c, haze, 0.55)]);
    for (let a = 0; a <= 0.9; a += 0.01) {
      if (behind.every((bg) => contrast(ink, mix(bg, wash, a)) >= target)) return a;
    }
    return 0.9;
  }

  function fitLegibility() {
    const hero = $("#hero");
    if (!sky || !hero.offsetHeight) return;
    const box = hero.getBoundingClientRect();
    const zTop = zoneOf($(".hero-top"), box);
    const zGreeting = zoneOf($("#greeting"), box);
    const zPins = zoneOf($("#pins"), box);

    const plans = Object.keys(INK).map((ink) => {
      const top = washNeeded(INK[ink], WASH[ink], zTop, 5); // small text, margin for grain
      const mid = washNeeded(INK[ink], WASH[ink], zGreeting, 3.6); // display text
      const glass = washNeeded(INK[ink], WASH[ink], zPins, 5);
      return { ink, top, mid, glass, cost: Math.max(top, mid) * 2 + glass };
    });
    const plan = plans.sort((a, b) => a.cost - b.cost)[0];

    hero.dataset.ink = plan.ink;
    hero.style.setProperty("--scrim", WASH[plan.ink].join(" "));
    hero.style.setProperty("--scrim-top", plan.top.toFixed(2));
    hero.style.setProperty("--scrim-mid", plan.mid.toFixed(2));
    hero.style.setProperty("--z-top-end", `${(zTop[1] + 4).toFixed(1)}%`);
    hero.style.setProperty("--z-mid-start", `${(zGreeting[0] - 4).toFixed(1)}%`);
    hero.style.setProperty("--z-mid-end", `${(zGreeting[1] + 2).toFixed(1)}%`);
    hero.style.setProperty("--glass", `rgb(${WASH[plan.ink].join(" ")} / ${Math.max(plan.glass, GLASS_MIN[plan.ink]).toFixed(2)})`);
  }

  function makeStars() {
    const box = $("#stars");
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 70; i++) {
      const s = el("span", { class: "star" });
      s.style.cssText = `left:${rand() * 100}%;top:${rand() * 75}%;--s:${(0.6 + rand() * 1.6).toFixed(2)}px;` +
        `--o:${(0.35 + rand() * 0.65).toFixed(2)};animation-delay:${(-rand() * 6).toFixed(2)}s`;
      box.append(s);
    }
  }


  function renderClock() {
    const now = new Date();
    if (look.hour != null) now.setHours(Math.floor(currentHour()), Math.round((currentHour() % 1) * 60) % 60);
    const h = currentHour();
    const part = h < 5 ? ["Hello,", "night owl"] : h < 12 ? ["Good", "morning"] : h < 17 ? ["Good", "afternoon"] : h < 22 ? ["Good", "evening"] : ["Hello,", "night owl"];
    const greeting = $("#greeting");
    const text = `${part[0]} ${part[1]}`;
    if (greeting.dataset.text !== text) {
      greeting.dataset.text = text;
      greeting.replaceChildren(part[0], " ", el("em", {}, part[1]), ".");
    }
    $("#hero-date").textContent = fmt(now, { weekday: "long", month: "long", day: "numeric" });
    $("#hero-time").textContent = now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  const MAX_PINS_SHOWN = 9;

  function renderPins() {
    const box = $("#pins");
    const list = pinnedItems();
    if (!list.length) {
      box.replaceChildren(el("p", { class: "pins-empty" }, icon("star"),
        "Star any app or file to pin it here.", singleKeys && " Then press 1–9 to open it."));
    } else {
      const extra = list.length - MAX_PINS_SHOWN;
      box.replaceChildren(
        ...list.slice(0, MAX_PINS_SHOWN).map((item, i) =>
          link(item.url, { class: "pin", title: singleKeys ? `${item.title} (press ${i + 1})` : item.title },
            chip(item, { compact: true }), el("span", { class: "pin-label" }, item.title), singleKeys && el("kbd", { "aria-hidden": "true" }, String(i + 1)))),
        ...(extra > 0 ? [el("button", { type: "button", class: "pin pin-more", onclick: () => openPalette() }, `+${extra} more`)] : []));
    }
    fitLegibility();
  }

  /* ------------------------------------------------------------------ *
   * Tiles
   * ------------------------------------------------------------------ */
  function emptyTile(containerSel, message) {
    $(containerSel).replaceWith(el("p", { class: "tile-empty" }, message));
  }

  function renderHoliday() {
    const body = $("#holiday-body");
    const upcoming = C.holidays.days.filter((h) => daysUntil(h.d) >= 0);
    if (!upcoming.length) {
      body.append(el("p", { class: "tile-empty" }, "Next year's holiday schedule is coming soon."));
      return;
    }
    const next = upcoming[0];
    const days = daysUntil(next.d);
    body.append(
      el("div", { class: "holiday-main" },
        el("p", { class: "holiday-count" },
          days === 0 ? el("span", { class: "num num-word" }, "Today") : [
            el("span", { class: "num" }, String(days)),
            el("span", { class: "unit" }, days === 1 ? "day" : "days"),
          ]),
        el("div", { class: "holiday-info" },
          el("p", { class: "holiday-name" }, next.name),
          el("p", { class: "holiday-date" }, fmt(next.d, { weekday: "long", month: "long", day: "numeric" })))),
      upcoming.length > 1 && el("ul", { class: "holiday-next" }, upcoming.slice(1, 3).map((h) =>
        el("li", {}, el("span", {}, h.name), el("span", { class: "muted" }, fmt(h.d, { weekday: "short", month: "short", day: "numeric" }))))),
      holidayFile && link(holidayFile.url, { class: "text-link" }, "Full holiday schedule", icon("right")),
    );
  }

  function renderIT() {
    const pill = $("#it-status");
    pill.dataset.level = C.status.level;
    pill.append(el("span", { class: "dot", "aria-hidden": "true" }), C.status.message);

    const body = $("#it-body");
    if (!IT.phone && !IT.email && !IT.teamsChat && !IT.ticketUrl) {
      body.append(el("p", { class: "tile-empty" }, "IT contact details are coming soon."));
      return;
    }
    if (IT.phone) {
      body.append(el("div", { class: "it-phone" },
        el("a", { href: telHref(IT.phone), class: "big-phone" }, IT.phone),
        copyButton(IT.phone, "IT phone number")));
    }
    if (IT.ext || IT.hours) body.append(el("p", { class: "it-meta" },
      IT.ext && el("span", {}, "Internal ext. ", el("strong", {}, IT.ext)),
      IT.hours && el("span", {}, IT.hours)));

    const actions = [
      IT.teamsChat && { url: IT.teamsChat, label: "Teams chat", icon: "chat" },
      IT.email && { url: "mailto:" + IT.email, label: "Email", icon: "mail" },
      IT.ticketUrl && { url: IT.ticketUrl, label: "New ticket", icon: "ticket" },
    ].filter(Boolean);
    if (actions.length) body.append(el("div", { class: "it-actions" }, actions.map((a, i) =>
      link(a.url, { class: `btn ${i === 0 ? "btn-primary" : ""}` }, icon(a.icon), a.label))));

    if (IT.afterHours) body.append(el("p", { class: "it-after" }, "After-hours emergencies: ",
      el("a", { href: telHref(IT.afterHours) }, IT.afterHours)));
  }

  function renderApps() {
    if (!C.apps.length) return emptyTile("#app-grid", "No apps have been added yet.");
    $("#app-grid").append(...C.apps.map((app) => {
      const item = byId.get(app.id);
      return el("li", { class: "app" },
        link(app.url, { class: "app-link" },
          chip(item),
          el("span", { class: "app-name" }, app.name, icon("arrow", "ic app-arrow")),
          app.description && el("span", { class: "app-desc" }, app.description)),
        starButton(app.id));
    }));
  }

  const FILES_SHOWN = 7; // more than this and the rest fold behind "Show all"

  function renderFiles() {
    if (!C.files.length) return emptyTile("#file-list", "No forms or files have been added yet.");
    const rows = C.files.map((file) => {
      const item = byId.get(file.id);
      return el("li", { class: "file" },
        link(file.url, { class: "file-link", title: file.name },
          chip(item),
          el("span", { class: "file-text" },
            el("span", { class: "file-name" }, file.name),
            el("span", { class: "file-meta" }, item.subtitle))),
        starButton(file.id),
        icon(file.ext === "pdf" ? "arrow" : "download", "ic file-go"));
    });
    const listEl = $("#file-list");
    listEl.append(...rows);
    if (rows.length <= FILES_SHOWN + 1) return;

    rows.slice(FILES_SHOWN).forEach((r) => (r.hidden = true));
    const toggle = el("button", { type: "button", class: "text-link files-toggle", "aria-expanded": "false", "aria-controls": "file-list" });
    const label = (open) => toggle.replaceChildren(open ? "Show fewer" : `Show all ${rows.length} files`, icon(open ? "up" : "down"));
    label(false);
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      rows.slice(FILES_SHOWN).forEach((r) => (r.hidden = !open));
      toggle.setAttribute("aria-expanded", String(open));
      label(open);
      if (open) rows[FILES_SHOWN].querySelector("a").focus();
    });
    listEl.after(toggle);
  }

  function renderCompanies() {
    $("#companies-title-text").textContent = C.companiesTitle;
    $("#companies-tile").hidden = !C.companies.length || !look.companies;
    if (!C.companies.length) return;
    $("#company-grid").append(...C.companies.map((co) =>
      el("li", { class: "company" },
        el("div", { class: "company-head" },
          el("span", { class: "company-logo" }, logoImg(co.logo, co.name)),
          el("div", {},
            el("h3", { class: "company-name" }, co.name),
            domainOf(co) && el("p", { class: "company-host" }, domainOf(co)))),
        (co.phone || co.email) && el("ul", { class: "company-contacts" },
          co.phone && el("li", {}, icon("phone"), el("a", { href: telHref(co.phone), class: "num" }, co.phone), copyButton(co.phone, `${co.name} phone number`)),
          co.email && el("li", {}, icon("mail"), el("a", { href: "mailto:" + co.email, title: co.email }, co.email), copyButton(co.email, `${co.name} email`))),
        co.website && link(co.website, { class: "btn btn-ghost company-site" }, "Visit website", icon("arrow")))));
  }

  /* ------------------------------------------------------------------ *
   * Command palette
   *
   * A combobox + listbox. Focus never leaves the input: ↑ ↓ (and Tab)
   * move the active option, Enter runs it, → opens that result's actions
   * as a second list, ← or Esc comes back.
   * ------------------------------------------------------------------ */
  const palette = $("#palette");
  const input = $("#palette-input");
  const listbox = $("#palette-list");
  const crumb = $("#palette-crumb");
  let entries = []; // [{ item } | { action }] in display order
  let active = 0;
  let actionsFor = null; // the item whose actions are showing, or null

  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function isSubsequence(needle, hay) {
    let i = 0;
    for (const ch of hay) if (ch === needle[i]) i++;
    return i === needle.length;
  }

  function search(query) {
    const q = fold(query.trim());
    if (!q) {
      return [
        { label: "Pinned", items: pinnedItems() },
        { label: "Apps", items: items.filter((i) => i.kind === "App" && !pins.includes(i.id)) },
        { label: "IT Support", items: items.filter((i) => i.kind === "IT") },
      ];
    }
    const tokens = q.split(/\s+/);
    const scored = [];
    for (const item of items) {
      const title = fold(item.title);
      let total = 0;
      for (const t of tokens) {
        const word = new RegExp("(^|[^\\p{L}\\p{N}])" + escapeRe(t), "u");
        const s = title.startsWith(t) ? 100
          : word.test(title) ? 70
          : title.includes(t) ? 45
          : word.test(item.search) ? 30
          : item.search.includes(t) ? 15
          : t.length > 1 && isSubsequence(t, title) ? 6
          : 0;
        if (!s) { total = 0; break; }
        total += s;
      }
      if (total) scored.push([total + (pins.includes(item.id) ? 10 : 0), item]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    // Drop loose letter-skipping matches when there are real ones.
    const floor = (scored[0]?.[0] || 0) * 0.25;
    return [{ label: null, items: scored.filter(([s]) => s >= floor).slice(0, 14).map(([, item]) => item) }];
  }

  let announceTimer;
  function announce(message) {
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => ($("#palette-status").textContent = message), 350);
  }

  function option(index, content, props = {}) {
    return el("li", {
      id: `opt-${index}`, role: "option", class: "palette-item", "aria-selected": "false",
      onmousemove: () => active !== index && setActive(index, false),
      onclick: () => run(index),
      ...props,
    }, ...content);
  }

  function renderResults() {
    actionsFor = null;
    crumb.hidden = true;
    entries = [];
    listbox.replaceChildren();
    listbox.setAttribute("aria-label", "Results");
    for (const group of search(input.value)) {
      if (!group.items.length) continue;
      const groupEl = group.label
        ? el("li", { role: "presentation" }, el("p", { class: "palette-group", id: `grp-${slug(group.label)}` }, group.label))
        : null;
      if (groupEl) listbox.append(groupEl);
      for (const item of group.items) {
        const index = entries.push({ item }) - 1;
        const more = actionsOf(item).length > 1;
        listbox.append(option(index, [
          chip(item),
          el("span", { class: "palette-text" },
            el("span", { class: "palette-title" }, item.title),
            item.subtitle && el("span", { class: "palette-sub" }, item.subtitle)),
          // Mouse shortcuts for companies. Hidden from assistive tech: the same actions are reachable with →.
          item.kind === "Company" && el("span", { class: "palette-acts", "aria-hidden": "true" },
            actionsOf(item).slice(1, 3).map((a) => el("span", { class: "palette-act", title: a.title,
              onclick: (e) => { e.stopPropagation(); closePalette(); a.run(); } }, icon(a.icon)))),
          el("span", { class: "palette-kind" }, item.kind),
          more && icon("chevron", "ic palette-more"),
        ], { "aria-describedby": more ? "palette-more-hint" : null }));
      }
    }
    const q = input.value.trim();
    if (!entries.length) {
      listbox.append(el("li", { class: "palette-empty", role: "presentation" },
        `Nothing matches “${q}”. Try “pto”, “401k” or a company name.`));
    }
    setActive(0);
    announce(!entries.length ? `No results for ${q}` : q ? `${entries.length} result${entries.length === 1 ? "" : "s"}` : "");
  }

  function showActions(item) {
    const acts = actionsOf(item);
    actionsFor = item;
    entries = acts.map((action) => ({ action }));
    crumb.hidden = false;
    $("#palette-crumb-title").textContent = item.title;
    listbox.setAttribute("aria-label", `Actions for ${item.title}`);
    listbox.replaceChildren(...acts.map((a, i) => option(i, [
      el("span", { class: "chip chip-action" }, icon(a.icon)),
      el("span", { class: "palette-text" }, el("span", { class: "palette-title" }, a.title)),
      i === 0 && el("kbd", { class: "palette-enter", "aria-hidden": "true" }, "↵"),
    ])));
    setActive(0);
    announce(`Actions for ${item.title}: ${acts.length} options. Left arrow to go back.`);
  }

  function setActive(index, scroll = true) {
    if (!entries.length) { input.removeAttribute("aria-activedescendant"); return; }
    active = (index + entries.length) % entries.length;
    for (const node of listbox.querySelectorAll('[role="option"]')) {
      node.setAttribute("aria-selected", String(node.id === `opt-${active}`));
    }
    input.setAttribute("aria-activedescendant", `opt-${active}`);
    if (scroll) document.getElementById(`opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }

  function run(index) {
    const entry = entries[index];
    if (!entry) return;
    closePalette();
    if (entry.action) entry.action.run();
    else if (entry.item.run) entry.item.run();
    else openUrl(entry.item.url);
  }

  function openPalette(initial = "") {
    if (!palette.open) palette.showModal();
    input.value = initial;
    renderResults();
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
  function closePalette() { if (palette.open) palette.close(); }

  input.addEventListener("input", renderResults);
  input.addEventListener("keydown", (e) => {
    const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) { e.preventDefault(); setActive(active + 1); }
    else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) { e.preventDefault(); setActive(active - 1); }
    else if (e.key === "Enter") { e.preventDefault(); run(active); }
    else if (e.key === "ArrowRight" && !actionsFor && atEnd && entries[active]?.item && actionsOf(entries[active].item).length > 1) {
      e.preventDefault();
      showActions(entries[active].item);
    } else if (e.key === "ArrowLeft" && actionsFor) {
      e.preventDefault();
      const back = actionsFor;
      renderResults();
      setActive(Math.max(0, entries.findIndex((x) => x.item === back)));
    }
  });
  // Esc inside an actions list goes back a level instead of closing.
  palette.addEventListener("cancel", (e) => {
    if (!actionsFor) return;
    e.preventDefault();
    renderResults();
  });
  $("#palette-back").addEventListener("click", () => { renderResults(); input.focus(); });
  // Clicking the dimmed backdrop closes the palette.
  palette.addEventListener("click", (e) => { if (e.target === palette) closePalette(); });
  $("#help").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });
  $("#search-btn").addEventListener("click", () => openPalette());

  /* ------------------------------------------------------------------ *
   * Keyboard shortcuts
   *
   * Single-key shortcuts (type-to-search, /, ?, 1–9) can be turned off
   * in the shortcuts dialog (WCAG 2.1.4). Ctrl/⌘ K always works.
   * ------------------------------------------------------------------ */
  let singleKeys = store.get("singleKeys", true, (v) => typeof v === "boolean");

  function applySingleKeys() {
    document.documentElement.dataset.singleKeys = singleKeys ? "on" : "off";
    $("#single-keys").checked = singleKeys;
    $("#search-kbd").textContent = singleKeys ? "/" : `${MOD} K`;
    $("#footer-keys").replaceChildren(...(singleKeys
      ? ["Press ", el("kbd", {}, "/"), " to search · ", el("kbd", {}, "?"), " for shortcuts"]
      : ["Press ", el("kbd", {}, MOD), el("kbd", {}, "K"), " to search"]));
    renderPins();
  }

  $("#single-keys").addEventListener("change", (e) => {
    singleKeys = e.target.checked;
    store.set("singleKeys", singleKeys);
    applySingleKeys();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.open ? closePalette() : openPalette();
      return;
    }
    if (!singleKeys || e.isComposing) return;
    const typing = e.target.closest?.("input, textarea, select, [contenteditable]");
    if (typing || e.ctrlKey || e.metaKey || e.altKey || document.querySelector("dialog[open]")) return;

    if (e.key === "/") { e.preventDefault(); openPalette(); }
    else if (e.key === "?") { e.preventDefault(); $("#help").showModal(); }
    else if (/^[1-9]$/.test(e.key) && pins.length) {
      const item = pinnedItems()[Number(e.key) - 1];
      if (item) { e.preventDefault(); openUrl(item.url); }
    } else if (e.key.length === 1 && /\S/.test(e.key)) {
      // Start typing anywhere and search opens with what you typed.
      e.preventDefault();
      openPalette(e.key);
    }
  });

  /* ------------------------------------------------------------------ *
   * Theme: auto → light → dark
   * ------------------------------------------------------------------ */
  const THEMES = { auto: "Auto (matches your computer)", light: "Light", dark: "Dark" };
  const loadTheme = () => store.get("theme", "auto", (v) => v in THEMES);
  let theme = loadTheme();

  function applyColorMode() {
    if (theme === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    const btn = $("#theme-btn");
    btn.replaceChildren(icon(theme === "auto" ? "auto" : theme === "light" ? "sun" : "moon"));
    btn.title = `Theme: ${THEMES[theme]}`;
    btn.setAttribute("aria-label", `Theme: ${THEMES[theme]}. Click to change.`);
  }
  function cycleTheme() {
    const order = Object.keys(THEMES);
    theme = order[(order.indexOf(theme) + 1) % order.length];
    store.set("theme", theme);
    applyColorMode();
    toast(`Theme: ${THEMES[theme]}`);
  }
  $("#theme-btn").addEventListener("click", cycleTheme);

  // Keep several open tabs in agreement.
  window.addEventListener("storage", (e) => {
    if (e.key === "ql:pins") { pins = loadPins(); syncPins(); }
    else if (e.key === "ql:theme") { theme = loadTheme(); applyColorMode(); }
    else if (e.key === "ql:singleKeys") { singleKeys = store.get("singleKeys", true, (v) => typeof v === "boolean"); applySingleKeys(); }
  });

  /* ------------------------------------------------------------------ *
   * Apply the look. Cheap enough to run on every keystroke in the customizer.
   * ------------------------------------------------------------------ */
  let accentFit = null;
  let lastType = null;

  function applyLook() {
    document.documentElement.dataset.type = look.type;
    accentFit = applyAccent(look.color);
    if (document.getElementById("brand-mono")) renderBrand();
    const tile = $("#companies-tile");
    if (tile) tile.hidden = !C.companies.length || !look.companies;
    paintSky();
    renderClock();
    if (lastType !== null && lastType !== look.type) displayFontReady().then(fitLegibility);
    lastType = look.type;
  }

  /* ------------------------------------------------------------------ *
   * Demo customizer (settings.demo only)
   * ------------------------------------------------------------------ */
  function setupDemo() {
    if (!DEMO) return;
    const panel = $("#demo-panel");
    const fab = $("#demo-btn");
    const field = (id) => document.getElementById(id);
    const colorPick = field("demo-color"), colorText = field("demo-color-text");
    const hourRange = field("demo-hour"), hourOut = field("demo-hour-out");
    const logoNote = field("demo-logo-note");
    const LOGO_HINT = logoNote.textContent;
    document.documentElement.classList.add("is-demo");
    fab.hidden = false;

    const save = () => {
      const { hour, ...keep } = look; // the time of day is a presentation aid, not part of the look
      store.set("demo", keep);
    };
    const hourLabel = (h) => {
      const d = new Date(); d.setHours(Math.floor(h), Math.round((h % 1) * 60), 0);
      return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    };

    function showColorNote() {
      const note = field("demo-color-note");
      note.replaceChildren();
      if (!look.color) return note.append("Using the template's default blue.");
      if (!accentFit) return note.append("That color couldn't be used, so the default is showing.");
      const swatch = el("span", { class: "demo-swatch", "aria-hidden": "true" });
      swatch.style.background = accentFit.lightHex;
      note.append(swatch, accentFit.adjusted
        ? `Links and buttons use ${accentFit.lightHex}, a deeper shade, so text stays readable.`
        : "Used as-is: it already meets contrast for text.");
    }

    function showLogo() {
      const preview = field("demo-logo-preview");
      preview.replaceChildren(look.logo ? el("img", { src: look.logo, alt: "" }) : el("span", {}, initials(look.name || "Quicklinks")));
      field("demo-logo-action").textContent = look.logo ? "Replace logo" : "Upload logo";
      field("demo-logo-clear").hidden = !look.logo;
    }

    // look → fields
    function fill() {
      field("demo-name").value = look.name;
      field("demo-tagline").value = look.tagline;
      colorText.value = look.color;
      colorText.removeAttribute("aria-invalid");
      if (look.color) colorPick.value = toHex(cssColorToRgb(look.color));
      for (const radio of panel.querySelectorAll('input[name="type"]')) radio.checked = radio.value === look.type;
      hourRange.value = look.hour ?? currentHour();
      hourOut.textContent = look.hour == null ? "Live" : hourLabel(look.hour);
      field("demo-companies").checked = look.companies;
      field("demo-companies").disabled = !C.companies.length;
      showLogo();
      showColorNote();
    }

    function update(changes, { persist = true } = {}) {
      Object.assign(look, changes);
      applyLook();
      if (persist) save();
      showLogo();
      showColorNote();
    }

    field("demo-name").addEventListener("input", (e) => { update({ name: e.target.value.trim() }); });
    field("demo-tagline").addEventListener("input", (e) => update({ tagline: e.target.value.trim() }));
    colorPick.addEventListener("input", () => { colorText.value = colorPick.value; colorText.removeAttribute("aria-invalid"); update({ color: colorPick.value }); });
    colorText.addEventListener("input", () => {
      const value = colorText.value.trim();
      const ok = value === "" || CSS.supports("color", value);
      colorText.toggleAttribute("aria-invalid", !ok);
      if (!ok) return;
      if (value) colorPick.value = toHex(cssColorToRgb(value));
      update({ color: value });
    });
    for (const radio of panel.querySelectorAll('input[name="type"]')) radio.addEventListener("change", () => update({ type: radio.value }));
    hourRange.addEventListener("input", () => { hourOut.textContent = hourLabel(+hourRange.value); update({ hour: +hourRange.value }, { persist: false }); });
    field("demo-hour-live").addEventListener("click", () => { update({ hour: null }, { persist: false }); fill(); });
    field("demo-companies").addEventListener("change", (e) => update({ companies: e.target.checked }));

    field("demo-logo").addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      const problem = !/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type) ? "That isn't an SVG, PNG, JPG or WebP image."
        : file.size > MAX_LOGO_BYTES ? `That file is ${(file.size / 1048576).toFixed(1)} MB. Use an SVG or a PNG under 1 MB.` : "";
      logoNote.classList.toggle("is-error", !!problem);
      logoNote.textContent = problem || LOGO_HINT;
      if (problem) return;
      const reader = new FileReader();
      reader.onload = () => update({ logo: String(reader.result) });
      reader.onerror = () => { logoNote.classList.add("is-error"); logoNote.textContent = "Couldn't read that file. Try another."; };
      reader.readAsDataURL(file);
    });
    field("demo-logo-clear").addEventListener("click", () => update({ logo: "" }));

    field("demo-share").addEventListener("click", () => {
      const url = new URL(location.pathname, location.origin);
      const base = contentLook();
      if (look.name !== base.name) url.searchParams.set("name", look.name);
      if (look.tagline !== base.tagline) url.searchParams.set("tagline", look.tagline);
      if (look.color && look.color !== base.color) url.searchParams.set("color", look.color);
      if (look.type !== base.type) url.searchParams.set("type", look.type);
      if (look.hour != null) url.searchParams.set("hour", String(look.hour));
      if (!look.companies) url.searchParams.set("companies", "0");
      copyText(url.href, look.logo.startsWith("data:") ? "link (uploaded logos stay on this device)" : "link");
    });

    field("demo-reset").addEventListener("click", () => {
      try { localStorage.removeItem("ql:demo"); } catch {}
      history.replaceState(null, "", location.pathname);
      Object.assign(look, contentLook());
      applyLook();
      fill();
      logoNote.classList.remove("is-error");
      logoNote.textContent = LOGO_HINT;
      toast("Reset to the template's defaults");
    });

    // A side panel, not a modal: the page stays visible so every change shows as you make it.
    const root = document.documentElement;
    const open = () => {
      fill();
      panel.show();
      panel.scrollTop = 0;
      root.classList.add("demo-open");
      fab.setAttribute("aria-expanded", "true");
      field("demo-name").focus({ preventScroll: true });
    };
    const close = () => { panel.close(); root.classList.remove("demo-open"); fab.setAttribute("aria-expanded", "false"); fab.focus(); };
    fab.addEventListener("click", () => (panel.open ? close() : open()));
    field("demo-close").addEventListener("click", close);
    panel.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } });
    $("#demo-form").addEventListener("submit", (e) => e.preventDefault());
  }

  /* ------------------------------------------------------------------ *
   * Go. Each tile renders on its own, so one bad section can't blank the page.
   * ------------------------------------------------------------------ */
  function section(name, tileSel, render) {
    try { render(); }
    catch (err) {
      console.error(`[quicklinks] The ${name} section failed to render:`, err);
      const tile = $(tileSel);
      if (!tile) return;
      for (const child of [...tile.children]) if (!child.classList.contains("tile-head")) child.remove();
      tile.append(el("p", { class: "tile-error", role: "status" },
        "This section couldn't load. Refresh the page, and if it keeps happening, let IT know."));
    }
  }

  try { document.documentElement.dataset.type = look.type; accentFit = applyAccent(look.color); } // a bad theme must never cost the page
  catch (err) { console.error("[quicklinks] theme couldn't be applied; using defaults:", err); }
  lastType = look.type;
  renderChrome();
  applyColorMode();
  section("announcements", "#announcements", renderAnnouncements);
  makeStars();
  paintSky();
  renderClock();
  applySingleKeys();
  section("holiday", ".holiday", renderHoliday);
  section("IT support", ".it", renderIT);
  section("apps", ".apps", renderApps);
  section("files", ".files", renderFiles);
  section("companies", ".companies", renderCompanies);
  try { setupDemo(); } catch (err) { console.error("[quicklinks] demo customizer failed:", err); }
  displayFontReady().then(() => {
    document.documentElement.classList.add("ready");
    fitLegibility(); // the display face changes the greeting's size, so re-measure the hero
    requestAnimationFrame(() => requestAnimationFrame(() => $("#hero").classList.add("sky-live")));
  });

  if (problems.length) {
    console.groupCollapsed(`[quicklinks] ${problems.length} problem(s) in data/content.js — run: node scripts/check-content.mjs`);
    problems.forEach((p) => console.warn(p));
    console.groupEnd();
  }

  // Pages left open as a homepage roll over to the new day on their own.
  const dayLoaded = startOfToday().getTime();
  const rollover = () => {
    if (startOfToday().getTime() !== dayLoaded && !document.querySelector("dialog[open]")) location.reload();
  };
  setInterval(() => { renderClock(); rollover(); }, 15e3);
  setInterval(paintSky, 60e3);
  document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && rollover());
  new ResizeObserver(fitLegibility).observe($("#hero"));
  document.fonts?.ready.then(fitLegibility);
})();
