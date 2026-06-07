const fs = require('fs');
const path = require('path');

const base = '/melbourne-plastering';
const dist = path.resolve('dist');
const known = ['/', '/about/', '/contact/', '/privacy/', '/services/', '/blog/'];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(p));
    else if (p.endsWith('.html')) files.push(p);
  }
  return files;
}

let fixed = 0;
for (const file of walk(dist)) {
  let html = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // Fix canonical URLs pointing to the live domain
  if (html.includes('example.com')) {
    html = html.replace(/https:\/\/example\.com\/melbourne-plastering\//g, 'https://sylvgira.github.io/melbourne-plastering/');
    changed = true;
  }

  // Prefix internal absolute hrefs with the base path
  for (const p of known) {
    const re = new RegExp('href="(?!' + base.replace(/\//g, '\\/') + ')' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(re, 'href="' + base + p);
    if (html.includes('"' + base + p)) changed = true;
  }

  // Fix any relative "melbourne-plastering/" links that lost their leading slash
  html = html.replace(/href="melbourne-plastering\//g, 'href="' + base + '/');

  if (changed) {
    fs.writeFileSync(file, html);
    fixed++;
  }
}

console.log('Fixed ' + fixed + ' HTML files for GitHub Pages subpath (' + base + ')');
