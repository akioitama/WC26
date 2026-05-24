/**
 * Fetch verified player portrait URLs from Wikipedia API,
 * then download 330px thumbnails into public/players/.
 *
 * Usage:
 *   npm run fetch:players          # skip existing, 5s delay, retries on 429
 *   npm run fetch:players -- --force   # re-download all
 *   npm run fetch:players -- --retry   # only missing/failed
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "players");
const MANIFEST_PATH = path.join(OUT, "manifest.json");

const ARGS = new Set(process.argv.slice(2));
const FORCE = ARGS.has("--force");
const RETRY_ONLY = ARGS.has("--retry");
const SYNC_MANIFEST = ARGS.has("--sync-manifest");

const DELAY_MS = 5000;
const MAX_RETRIES = 4;

/** slug → Wikipedia article title */
const PLAYERS = {
  messi: "Lionel Messi",
  maradona: "Diego Maradona",
  mbappe: "Kylian Mbappé",
  pele: "Pelé",
  zidane: "Zinedine Zidane",
  ronaldo: "Ronaldo (Brazilian footballer)",
  cruyff: "Johan Cruyff",
  iniesta: "Andrés Iniesta",
  gotze: "Mario Götze",
  klose: "Miroslav Klose",
  tardelli: "Marco Tardelli",
  schillaci: "Salvatore Schillaci",
  "carlos-alberto": "Carlos Alberto Torres",
  hurst: "Geoff Hurst",
  muller: "Gerd Müller",
  fontaine: "Just Fontaine",
  klinsmann: "Jürgen Klinsmann",
  rahn: "Helmut Rahn",
  kocsis: "Sándor Kocsis",
  "emiliano-martinez": "Emiliano Martínez",
  "lautaro-martinez": "Lautaro Martínez",
  "alexis-mac-allister": "Alexis Mac Allister",
  "cristian-romero": "Cristian Romero",
  kempes: "Mario Kempes",
  "vinicius-junior": "Vinícius Júnior",
  rodrygo: "Rodrygo",
  alisson: "Alisson Becker",
  marquinhos: "Marquinhos",
  "bruno-guimaraes": "Bruno Guimarães",
  "florian-wirtz": "Florian Wirtz",
  "jamal-musiala": "Jamal Musiala",
  "manuel-neuer": "Manuel Neuer",
  "joshua-kimmich": "Joshua Kimmich",
  "kai-havertz": "Kai Havertz",
  beckenbauer: "Franz Beckenbauer",
  "antoine-griezmann": "Antoine Griezmann",
  "aurelien-tchouameni": "Aurélien Tchouaméni",
  "william-saliba": "William Saliba",
  "mike-maignan": "Mike Maignan",
  platini: "Michel Platini",
  "gianluigi-donnarumma": "Gianluigi Donnarumma",
  "federico-chiesa": "Federico Chiesa",
  "nicolo-barella": "Nicolò Barella",
  "alessandro-bastoni": "Alessandro Bastoni",
  cannavaro: "Fabio Cannavaro",
  "lamine-yamal": "Lamine Yamal",
  rodri: "Rodri (footballer, born 1996)",
  pedri: "Pedri",
  "nico-williams": "Nico Williams",
  "unai-simon": "Unai Simón",
  xavi: "Xavi (footballer, born 1980)",
  "harry-kane": "Harry Kane",
  "jude-bellingham": "Jude Bellingham",
  "phil-foden": "Phil Foden",
  "bukayo-saka": "Bukayo Saka",
  "jordan-pickford": "Jordan Pickford",
  "bobby-moore": "Bobby Moore",
  "wayne-rooney": "Wayne Rooney",
  "cristiano-ronaldo": "Cristiano Ronaldo",
  "bruno-fernandes": "Bruno Fernandes",
  "bernardo-silva": "Bernardo Silva",
  "ruben-dias": "Rúben Dias",
  eusebio: "Eusébio",
  figo: "Luís Figo",
  "virgil-van-dijk": "Virgil van Dijk",
  "frenkie-de-jong": "Frenkie de Jong",
  "cody-gakpo": "Cody Gakpo",
  "memphis-depay": "Memphis Depay",
  "marco-van-basten": "Marco van Basten",
  "kevin-de-bruyne": "Kevin De Bruyne",
  "romelu-lukaku": "Romelu Lukaku",
  "thibaut-courtois": "Thibaut Courtois",
  "eden-hazard": "Eden Hazard",
  "luka-modric": "Luka Modrić",
  "josko-gvardiol": "Joško Gvardiol",
  "mateo-kovacic": "Mateo Kovačić",
  suker: "Davor Šuker",
  "federico-valverde": "Federico Valverde",
  "darwin-nunez": "Darwin Núñez",
  "ronald-araujo": "Ronald Araújo",
  forlan: "Diego Forlán",
  "luis-suarez": "Luis Suárez",
  "achraf-hakimi": "Achraf Hakimi",
  "hakim-ziyech": "Hakim Ziyech",
  "yassine-bounou": "Yassine Bounou",
  "takefusa-kubo": "Takefusa Kubo",
  "wataru-endo": "Wataru Endo",
  "kaoru-mitoma": "Kaoru Mitoma",
  "sadio-mane": "Sadio Mané",
  "edouard-mendy": "Édouard Mendy",
  "kalidou-koulibaly": "Kalidou Koulibaly",
  "edson-alvarez": "Edson Álvarez",
  "hirving-lozano": "Hirving Lozano",
  "santiago-gimenez": "Santiago Giménez",
  "christian-pulisic": "Christian Pulisic",
  "tyler-adams": "Tyler Adams",
  "weston-mckennie": "Weston McKennie",
  "alphonso-davies": "Alphonso Davies",
  "jonathan-david": "Jonathan David",
  "granit-xhaka": "Granit Xhaka",
  "manuel-akanji": "Manuel Akanji",
  "heung-min-son": "Son Heung-min",
  "lee-kang-in": "Lee Kang-in",
  "moises-caicedo": "Moisés Caicedo",
  "pervis-estupinan": "Pervis Estupiñán",
  "sebastien-haller": "Sébastien Haller",
  "simon-adingra": "Simon Adingra",
  "salem-al-dawsari": "Salem Al-Dawsari",
  "mohamed-salah": "Mohamed Salah",
  "erling-haaland": "Erling Haaland",
  neymar: "Neymar",
  "hakan-calhanoglu": "Hakan Çalhanoğlu",
  "arda-guler": "Arda Güler",
  "james-rodriguez": "James Rodríguez",
  "david-alaba": "David Alaba",
  "martin-odegaard": "Martin Ødegaard",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

function hasValidLocal(slug) {
  const dest = path.join(OUT, `${slug}.jpg`);
  try {
    return fs.statSync(dest).size >= 1000;
  } catch {
    return false;
  }
}

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "WC26/1.0 (educational; local dev; contact=local)",
            Accept: "application/json, image/*, */*",
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            get(res.headers.location).then(resolve).catch(reject);
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () =>
            resolve({ status: res.statusCode, body: Buffer.concat(chunks) }),
          );
          res.on("error", reject);
        },
      )
      .on("error", reject);
  });
}

async function withRetry(label, fn) {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const msg = e.message ?? String(e);
      const is429 = msg.includes("429");
      if (!is429 || attempt === MAX_RETRIES) throw e;
      const wait = 15000 * (attempt + 1);
      console.warn(`  ↻ ${label}: rate limited, waiting ${wait / 1000}s…`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

async function wikiThumb(title) {
  const api =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      titles: title,
      prop: "pageimages",
      piprop: "thumbnail",
      pithumbsize: "330",
      format: "json",
    });
  const { status, body } = await get(api);
  if (status === 429) throw new Error("API HTTP 429");
  if (status !== 200) throw new Error(`API HTTP ${status}`);
  const json = JSON.parse(body.toString());
  const page = Object.values(json.query?.pages ?? {})[0];
  if (page?.missing) throw new Error(`Wikipedia page not found: ${title}`);
  const src = page?.thumbnail?.source;
  if (!src) throw new Error(`No thumbnail on page: ${title}`);
  return src;
}

async function downloadThumb(thumbUrl) {
  const { status, body } = await get(thumbUrl);
  if (status === 429) throw new Error("Download HTTP 429");
  if (status !== 200) throw new Error(`Download HTTP ${status}`);
  if (body.length < 1000) throw new Error("File too small");
  return body;
}

async function fetchOne(slug, title) {
  const thumbUrl = await withRetry(slug, () => wikiThumb(title));
  await sleep(1200);
  const body = await withRetry(slug, () => downloadThumb(thumbUrl));
  fs.writeFileSync(path.join(OUT, `${slug}.jpg`), body);
  return thumbUrl;
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
}

async function syncManifest(manifest) {
  let ok = 0;
  let skip = 0;
  let fail = 0;
  const entries = Object.entries(PLAYERS).filter(
    ([slug]) => hasValidLocal(slug) && !manifest[slug],
  );

  for (let i = 0; i < entries.length; i++) {
    const [slug, title] = entries[i];
    if (i > 0) await sleep(DELAY_MS);
    try {
      manifest[slug] = await withRetry(slug, () => wikiThumb(title));
      saveManifest(manifest);
      console.log(`↺ ${slug} manifest ← ${title}`);
      ok++;
    } catch (e) {
      console.warn(`✗ ${slug} (${title}): ${e.message}`);
      fail++;
    }
  }

  console.log(`\nManifest sync: ${ok} added, ${skip} skipped, ${fail} failed`);
  return fail;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const manifest = loadManifest();

  if (SYNC_MANIFEST) {
    const fail = await syncManifest(manifest);
    process.exit(fail > 0 ? 1 : 0);
  }

  let ok = 0;
  let skip = 0;
  let fail = 0;
  const failed = [];

  const entries = Object.entries(PLAYERS);

  for (let i = 0; i < entries.length; i++) {
    const [slug, title] = entries[i];

    if (!FORCE && hasValidLocal(slug)) {
      if (RETRY_ONLY) {
        skip++;
        continue;
      }
      console.log(`○ ${slug} (already cached)`);
      skip++;
      continue;
    }

    if (i > 0) await sleep(DELAY_MS);

    try {
      const thumbUrl = await fetchOne(slug, title);
      manifest[slug] = thumbUrl;
      saveManifest(manifest);
      console.log(`✓ ${slug} ← ${title}`);
      ok++;
    } catch (e) {
      console.warn(`✗ ${slug} (${title}): ${e.message}`);
      failed.push(slug);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} saved, ${skip} skipped, ${fail} failed → ${OUT}`);
  if (failed.length) {
    console.log(`\nRe-run missing only:\n  npm run fetch:players:retry`);
    console.log(`Failed: ${failed.join(", ")}`);
  }
  process.exit(fail > 0 ? 1 : 0);
}

main();
