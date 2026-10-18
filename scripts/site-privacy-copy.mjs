import { cp, copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
await mkdir(join(root, 'dist'), { recursive: true });
await cp(join(root, 'public/site-privacy'), join(root, 'dist/site-privacy'), { recursive: true });
for (const file of ['ads.txt', 'privacy.html']) await copyFile(join(root, 'public', file), join(root, 'dist', file));
console.log('Copied pinned privacy assets and publisher declaration to Parcel output.');
