/**
 * Remove white background from official WC26 logo PNG.
 * Run: node scripts/process-wc26-logo.mjs [input.png] [output.png]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const input =
  process.argv[2] ??
  path.join(
    root,
    "assets/c__Users_LENOVO_AppData_Roaming_Cursor_User_workspaceStorage_9835331e563551428276856c879630b4_images_image-91643fc4-bd76-478e-8982-9d43132e1ad4.png",
  );
const output = process.argv[3] ?? path.join(root, "public/brand/wc26-logo.png");

const { PNG } = require("pngjs");

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function isBgWhite(r, g, b, a, t = 246) {
  return a > 0 && r >= t && g >= t && b >= t;
}

function loadPng(file) {
  return PNG.sync.read(fs.readFileSync(file));
}

function savePng(png, file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, PNG.sync.write(png));
}

function idx(w, x, y) {
  return (w * y + x) << 2;
}

function floodBg(png) {
  const { width: w, height: h, data } = png;
  const seen = new Uint8Array(w * h);
  const q = [];

  for (let x = 0; x < w; x++) {
    q.push([x, 0], [x, h - 1]);
  }
  for (let y = 0; y < h; y++) {
    q.push([0, y], [w - 1, y]);
  }

  while (q.length) {
    const [x, y] = q.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const i = y * w + x;
    if (seen[i]) continue;
    seen[i] = 1;
    const p = idx(w, x, y);
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const a = data[p + 3];
    if (!isBgWhite(r, g, b, a)) continue;
    data[p + 3] = 0;
    q.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
}

/** Remove enclosed white holes inside the "26" numerals. */
function clearInteriorHoles(png) {
  const { width: w, height: h, data } = png;
  const visited = new Uint8Array(w * h);
  const components = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const start = y * w + x;
      if (visited[start]) continue;
      const p = idx(w, x, y);
      const r = data[p];
      const g = data[p + 1];
      const b = data[p + 2];
      const a = data[p + 3];
      if (a === 0 || lum(r, g, b) < 235) {
        visited[start] = 1;
        continue;
      }

      const pixels = [];
      const q = [[x, y]];
      visited[start] = 1;
      let touchesEdge = false;

      while (q.length) {
        const [cx, cy] = q.pop();
        pixels.push([cx, cy]);
        if (cx === 0 || cy === 0 || cx === w - 1 || cy === h - 1) touchesEdge = true;
        for (const [nx, ny] of [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ]) {
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const ni = ny * w + nx;
          if (visited[ni]) continue;
          const np = idx(w, nx, ny);
          const nr = data[np];
          const ng = data[np + 1];
          const nb = data[np + 2];
          const na = data[np + 3];
          if (na === 0 || lum(nr, ng, nb) < 235) {
            visited[ni] = 1;
            continue;
          }
          visited[ni] = 1;
          q.push([nx, ny]);
        }
      }

      if (!touchesEdge && pixels.length > 120) {
        components.push(pixels);
      }
    }
  }

  for (const comp of components) {
    for (const [x, y] of comp) {
      const p = idx(w, x, y);
      data[p + 3] = 0;
    }
  }
}

function trimTransparent(png) {
  const { width: w, height: h, data } = png;
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[idx(w, x, y) + 3] > 8) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX) return png;

  const pad = 4;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);
  const nw = maxX - minX + 1;
  const nh = maxY - minY + 1;
  const out = new PNG({ width: nw, height: nh });

  for (let y = 0; y < nh; y++) {
    for (let x = 0; x < nw; x++) {
      const sp = idx(w, x + minX, y + minY);
      const dp = idx(nw, x, y);
      out.data[dp] = data[sp];
      out.data[dp + 1] = data[sp + 1];
      out.data[dp + 2] = data[sp + 2];
      out.data[dp + 3] = data[sp + 3];
    }
  }
  return out;
}

if (!fs.existsSync(input)) {
  console.error("Input not found:", input);
  process.exit(1);
}

const png = loadPng(input);
floodBg(png);
clearInteriorHoles(png);
const trimmed = trimTransparent(png);
savePng(trimmed, output);
console.log("Wrote", output, `(${trimmed.width}x${trimmed.height})`);
