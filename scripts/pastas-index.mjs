// Depois do build: quando existe "x.html" e também a pasta "x/" (ex.: sobre.html
// e sobre/socios-e-experts.html), copia x.html para x/index.html. Assim /sobre e
// /sobre/ funcionam em hospedagens que dão preferência à pasta (GitHub Pages).
import { readdirSync, statSync, existsSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory() || name.startsWith('_') || name === 'admin') continue;
    const html = p + '.html';
    const index = join(p, 'index.html');
    if (existsSync(html) && !existsSync(index)) {
      copyFileSync(html, index);
      console.log(`[pastas-index] ${index}`);
    }
    walk(p);
  }
}
walk('dist');
