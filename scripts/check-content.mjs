#!/usr/bin/env node
/* Checks data/content.js for mistakes before you deploy.
   Usage: node scripts/check-content.mjs */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

let data;
try {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(join(root, "data/content.js"), "utf8"), sandbox, { filename: "data/content.js" });
  data = sandbox.window.QUICKLINKS;
} catch (err) {
  console.error("✗ data/content.js has a syntax error:\n");
  console.error(err.stack.split("\n").slice(0, 4).join("\n"));
  process.exit(1);
}
if (!data) {
  console.error("✗ data/content.js must set window.QUICKLINKS = { ... }");
  process.exit(1);
}

const isDate = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? "");
  if (!m) return false;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return d.getMonth() === +m[2] - 1 && d.getDate() === +m[3]; // rejects 2026-02-30
};
const isUrl = (s) => typeof s === "string" && (s === "#" || /^(https?:|mailto:|tel:|msteams:|sms:)/.test(s));
const badScheme = (s) => typeof s === "string" && /^[a-z][a-z0-9+.-]*:/i.test(s) && !isUrl(s);
const listOf = (value, where) => {
  if (value == null) return [];
  if (!Array.isArray(value)) { errors.push(`${where} should be a list: [ … ]`); return []; }
  return value.filter((v, i) => (v && typeof v === "object" && !Array.isArray(v)) || (errors.push(`${where}[${i}] isn't a { … } block`), false));
};
const exists = (p) => existsSync(join(root, p));

const ids = new Set();
const checkId = (id, where) => {
  if (!id) errors.push(`${where}: missing "id"`);
  else if (ids.has(id)) errors.push(`${where}: duplicate id "${id}"`);
  else ids.add(id);
};

for (const [i, app] of listOf(data.apps, "apps").entries()) {
  const where = `apps[${i}] (${app.name || "?"})`;
  checkId(app.id, where);
  if (!app.name) errors.push(`${where}: missing "name"`);
  if (!isUrl(app.url)) errors.push(`${where}: "url" should start with https://`);
  if (app.url === "#") warnings.push(`${where}: link not set yet`);
  if (app.icon && /[./]/.test(app.icon) && !exists(app.icon)) errors.push(`${where}: icon image not found: ${app.icon}`);
}

for (const [i, file] of listOf(data.files, "files").entries()) {
  const where = `files[${i}] (${file.name || "?"})`;
  checkId(file.id, where);
  if (!file.name) errors.push(`${where}: missing "name"`);
  if (!file.file) errors.push(`${where}: missing "file"`);
  else if (badScheme(file.file)) errors.push(`${where}: link type not allowed in "file"`);
  else if (!exists(file.file)) warnings.push(`${where}: ${file.file} is not in the files folder yet`);
}

for (const [i, co] of listOf(data.companies, "companies").entries()) {
  const where = `companies[${i}] (${co.name || "?"})`;
  if (!co.name) errors.push(`${where}: missing "name"`);
  if (co.website && !isUrl(co.website)) errors.push(`${where}: "website" should start with https://`);
  if (co.logo && !exists(co.logo)) warnings.push(`${where}: logo not found: ${co.logo} (initials will show instead)`);
}

for (const [i, h] of listOf(data.holidays?.days, "holidays.days").entries()) {
  if (!isDate(h.date)) errors.push(`holidays.days[${i}] (${h.name || "?"}): date must be YYYY-MM-DD, got "${h.date}"`);
}
const sched = data.holidays?.scheduleFile;
if (sched && !ids.has(sched)) errors.push(`holidays.scheduleFile "${sched}" doesn't match any file id`);
const lastHoliday = (Array.isArray(data.holidays?.days) ? data.holidays.days : []).map((h) => String(h?.date)).sort().pop();
if (lastHoliday && lastHoliday < new Date().toISOString().slice(0, 10)) warnings.push("All holidays are in the past — add next year's dates");

for (const [i, a] of listOf(data.announcements, "announcements").entries()) {
  if (!a.text) errors.push(`announcements[${i}]: missing "text"`);
  for (const key of ["from", "until"]) if (a[key] && !isDate(a[key])) errors.push(`announcements[${i}]: "${key}" must be YYYY-MM-DD`);
  if (a.link && !isUrl(a.link.url) && !/^files\//.test(a.link.url || "")) errors.push(`announcements[${i}]: link url should start with https://`);
}

for (const key of ["teamsChat", "ticketUrl"]) {
  if (data.it?.[key] && !isUrl(data.it[key])) errors.push(`it.${key} should start with https:// or mailto:`);
}
if (data.updated && !isDate(data.updated)) errors.push(`"updated" must be YYYY-MM-DD`);

if (data.companiesTitle != null && typeof data.companiesTitle !== "string") errors.push(`companiesTitle should be text in quotes`);
if (data.settings?.demo != null && typeof data.settings.demo !== "boolean") errors.push(`settings.demo should be true or false`);
if (data.settings?.demo === true) warnings.push("Demo mode is on (settings.demo). Turn it off for a real company's intranet.");

const TYPE_PRESETS = ["editorial", "modern", "friendly", "system"];
if (data.theme?.type && !TYPE_PRESETS.includes(data.theme.type)) errors.push(`theme.type must be one of: ${TYPE_PRESETS.join(", ")}`);
const looksLikeColor = (c) => /^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(.+\)|[a-z]+)$/i.test(String(c).trim());
if (data.theme?.color && !looksLikeColor(data.theme.color)) errors.push(`theme.color "${data.theme.color}" doesn't look like a CSS color`);

if (data.itStatus && !["ok", "notice", "outage"].includes(data.itStatus.level)) {
  errors.push(`itStatus.level must be "ok", "notice" or "outage"`);
}

for (const w of warnings) console.log(`! ${w}`);
for (const e of errors) console.log(`✗ ${e}`);
if (errors.length) {
  console.log(`\n${errors.length} problem(s) to fix before deploying.`);
  process.exit(1);
}
console.log(`✓ content.js looks good (${(data.apps || []).length} apps, ${(data.files || []).length} files, ${(data.companies || []).length} companies)`);
