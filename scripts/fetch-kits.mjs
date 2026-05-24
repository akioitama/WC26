/**
 * Download national team kit images from Wikimedia Commons via API.
 * Usage: npm run fetch:kits
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "kits");

/** slug → Commons filename (without File: prefix) */
const KIT_FILES = {
  "arg-home": "Argentina national football team kit (2022).svg",
  "bra-home": "Brazil national football team kit (2022).svg",
  "ger-home": "Germany national football team kit (2022).svg",
  "fra-home": "France national football team kit (2022).svg",
  "ita-home": "Italy national football team kit (2022).svg",
  "esp-home": "Spain national football team kit (2022).svg",
  "eng-home": "England national football team kit (2022).svg",
  "por-home": "Portugal national football team kit (2022).svg",
  "ned-home": "Netherlands national football team kit (2022).svg",
  "bel-home": "Belgium national football team kit (2022).svg",
  "cro-home": "Croatia national football team kit (2022).svg",
  "uru-home": "Uruguay national football team kit (2022).svg",
  "mar-home": "Morocco national football team kit (2022).svg",
  "jpn-home": "Japan national football team kit (2022).svg",
  "sen-home": "Senegal national football team kit (2022).svg",
  "mex-home": "Mexico national football team kit (2022).svg",
  "usa-home": "United States men's national soccer team kit (2022).svg",
  "can-home": "Canada men's national soccer team kit (2022).svg",
  "sui-home": "Switzerland national football team kit (2022).svg",
  "kor-home": "South Korea national football team kit (2022).svg",
  "ecu-home": "Ecuador national football team kit (2022).svg",
  "civ-home": "Ivory Coast national football team kit (2022).svg",
  "ksa-home": "Saudi Arabia national football team kit (2022).svg",
  "egy-home": "Egypt national football team kit (2022).svg",
  "col-home": "Colombia national football team kit (2022).svg",
  "aus-home": "Australia national soccer team kit (2022).svg",
  "tur-home": "Turkey national football team kit (2022).svg",
  "swe-home": "Sweden national football team kit (2022).svg",
  "nor-home": "Norway national football team kit (2022).svg",
  "aut-home": "Austria national football team kit (2022).svg",
  "sco-home": "Scotland national football team kit (2022).svg",
  "cze-home": "Czech Republic national football team kit (2022).svg",
  "irn-home": "Iran national football team kit (2022).svg",
  "gha-home": "Ghana national football team kit (2022).svg",
  "tun-home": "Tunisia national football team kit (2022).svg",
  "alg-home": "Algeria national football team kit (2022).svg",
  "par-home": "Paraguay national football team kit (2022).svg",
  "crc-home": "Costa Rica national football team kit (2022).svg",
  "wal-home": "Wales national football team kit (2022).svg",
  "pol-home": "Poland national football team kit (2022).svg",
  "cam-home": "Cameroon national football team kit (2022).svg",
  "sr-b-home": "Serbia national football team kit (2022).svg",
  "qat-home": "Qatar national football team kit (2022).svg",
  "rsa-home": "South Africa national football team kit (2010).svg",
  "nzl-home": "New Zealand national football team kit (2010).svg",
  "cpv-home": "Cape Verde national football team kit (2013).svg",
  "jor-home": "Jordan national football team kit (2019).svg",
  "pan-home": "Panama national football team kit (2018).svg",
  "hai-home": "Haiti national football team kit (2014).svg",
  "irq-home": "Iraq national football team kit (2015).svg",
  "uzb-home": "Uzbekistan national football team kit (2015).svg",
  "cod-home": "DR Congo national football team kit (2015).svg",
  "bih-home": "Bosnia and Herzegovina national football team kit (2014).svg",
  "cuw-home": "Curaçao national football team kit (2019).svg",
};

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "WC26/1.0 (educational; local dev)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function commonsThumb(fileName) {
  const api =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      titles: `File:${fileName}`,
      prop: "imageinfo",
      iiprop: "url",
      iiurlwidth: "400",
      format: "json",
    });
  const { status, body } = await get(api);
  if (status !== 200) throw new Error(`API HTTP ${status}`);
  const json = JSON.parse(body.toString());
  const page = Object.values(json.query?.pages ?? {})[0];
  if (page?.missing) throw new Error(`File not found: ${fileName}`);
  const url = page?.imageinfo?.[0]?.thumburl ?? page?.imageinfo?.[0]?.url;
  if (!url) throw new Error(`No image URL for ${fileName}`);
  return url;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const manifest = {};
  let ok = 0;
  let fail = 0;
  let i = 0;

  for (const [slug, fileName] of Object.entries(KIT_FILES)) {
    const dest = path.join(OUT, `${slug}.png`);
    try {
      if (i++ > 0) await new Promise((r) => setTimeout(r, 800));
      const imgUrl = await commonsThumb(fileName);
      await new Promise((r) => setTimeout(r, 400));
      const { status, body } = await get(imgUrl);
      if (status !== 200) throw new Error(`Download HTTP ${status}`);
      if (body.length < 300) throw new Error("File too small");
      fs.writeFileSync(dest, body);
      manifest[slug] = imgUrl;
      console.log(`✓ ${slug} ← ${fileName}`);
      ok++;
    } catch (e) {
      console.warn(`✗ ${slug} (${fileName}): ${e.message}`);
      fail++;
    }
  }

  fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nDone: ${ok} saved, ${fail} failed → ${OUT}`);
  process.exit(fail > ok ? 1 : 0);
}

main();
