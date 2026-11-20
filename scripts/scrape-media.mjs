/**
 * Collects public photos and videos of Rohit Prasai from the web for the portfolio gallery.
 *
 *   npm run scrape                 his Facebook photos (opens a window; log in once)
 *   npm run scrape -- --web        Bing Images + YouTube instead (noisy: other people share the name)
 *   npm run scrape -- --videos     his Facebook videos and reels: links, titles, cover images
 *   npm run scrape -- --facebook   also opens a visible browser on his Facebook photos;
 *                                  log in once, the session is kept in .fb-session/
 *
 * Output goes to scraped/<date-time>/ :
 *   images/NNN.<ext>   downloaded photos (deduplicated, tiny images skipped)
 *   manifest.json      every image + video with its source page and title
 *
 * Search results always include other people with the same name. Review the folder,
 * then copy the good ones into public/images/gallery/ and list them in src/data/gallery.ts.
 */
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const args = new Set(process.argv.slice(2));
const MIN_BYTES = 18_000;
const PER_QUERY = 60;

const IMAGE_QUERIES = [
  'Rohit Prasai Birtamod',
  'Rohit Prasai Birtamode ward',
  'Rohit Prasai Jhapa',
  'Rohit Prasai Nepali Congress',
  'Rohit Prasai Jhapa Gold Cup',
  'रोहित प्रसाईं',
  'रोहित प्रसाई बिर्तामोड',
  'वडाध्यक्ष रोहित प्रसाईं',
];
const VIDEO_QUERIES = [
  'Rohit Prasai Birtamod',
  'Rohit Prasai Jhapa Gold Cup',
  'रोहित प्रसाईं बिर्तामोड',
  'वडाध्यक्ष रोहित प्रसाईं',
];
const FB_PROFILE = 'https://www.facebook.com/Rohitprasaii';

const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
const outDir = path.resolve('scraped', stamp);
const imgDir = path.join(outDir, 'images');
fs.mkdirSync(imgDir, { recursive: true });

const manifest = { createdAt: new Date().toISOString(), images: [], videos: [] };
const seenUrl = new Set();
const seenHash = new Set();
let n = 0;

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';

async function download(ctx, url, meta) {
  if (!url || seenUrl.has(url)) return;
  seenUrl.add(url);
  try {
    const res = await ctx.request.get(url, { timeout: 20_000, headers: { 'user-agent': UA, referer: meta.page || url } });
    if (!res.ok()) return;
    const type = res.headers()['content-type'] || '';
    if (!type.startsWith('image/')) return;
    const buf = await res.body();
    if (buf.length < MIN_BYTES) return;
    const hash = createHash('sha1').update(buf).digest('hex');
    if (seenHash.has(hash)) return;
    seenHash.add(hash);
    const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
    const file = `${String(++n).padStart(3, '0')}.${ext}`;
    fs.writeFileSync(path.join(imgDir, file), buf);
    manifest.images.push({ file: `images/${file}`, url, bytes: buf.length, ...meta });
    process.stdout.write('.');
  } catch {
    /* unreachable host, timeout: skip */
  }
}

async function bingImages(ctx, query) {
  const page = await ctx.newPage();
  await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`, { waitUntil: 'domcontentloaded' });
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(700);
  }
  const items = await page.$$eval('a.iusc', (els) =>
    els
      .map((a) => {
        try {
          const m = JSON.parse(a.getAttribute('m') || '{}');
          return { url: m.murl, thumb: m.turl, page: m.purl, title: m.t };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
  );
  await page.close();
  console.log(`\n[bing] "${query}": ${items.length} results`);
  for (const it of items.slice(0, PER_QUERY)) {
    const before = manifest.images.length;
    await download(ctx, it.url, { source: 'bing', query, page: it.page, title: it.title });
    // Full-size host blocked us: fall back to Bing's own (smaller) copy.
    if (manifest.images.length === before && it.thumb) await download(ctx, it.thumb, { source: 'bing-thumb', query, page: it.page, title: it.title });
  }
}

async function youtube(ctx, query) {
  const page = await ctx.newPage();
  await page.goto(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const vids = await page.evaluate(() => {
    const out = [];
    const walk = (o) => {
      if (!o || typeof o !== 'object') return;
      if (o.videoRenderer?.videoId) {
        const v = o.videoRenderer;
        out.push({
          id: v.videoId,
          title: v.title?.runs?.map((r) => r.text).join('') ?? '',
          channel: v.ownerText?.runs?.[0]?.text ?? '',
          published: v.publishedTimeText?.simpleText ?? '',
          length: v.lengthText?.simpleText ?? '',
        });
        return;
      }
      for (const k in o) walk(o[k]);
    };
    walk(window.ytInitialData);
    return out;
  });
  await page.close();
  console.log(`\n[youtube] "${query}": ${vids.length} videos`);
  for (const v of vids) {
    if (manifest.videos.some((x) => x.id === v.id)) continue;
    const mentions = /rohit|prasai|रोहित|प्रसाई/i.test(v.title);
    manifest.videos.push({ ...v, url: `https://www.youtube.com/watch?v=${v.id}`, mentionsName: mentions, query });
    await download(ctx, `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, { source: 'youtube-thumb', query, page: `https://www.youtube.com/watch?v=${v.id}`, title: v.title });
  }
}

async function facebook() {
  const ctx = await chromium.launchPersistentContext(path.resolve('.fb-session'), { headless: false, viewport: { width: 1280, height: 900 } });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  await page.goto(`${FB_PROFILE}/photos`, { waitUntil: 'domcontentloaded' });
  console.log('\n[facebook] If asked, log in in the opened window. Waiting up to 10 minutes for the photos grid…');
  await page.waitForSelector('a[href*="/photo"] img', { timeout: 600_000 });
  const urls = new Set();
  for (let i = 0; i < 40; i++) {
    (await page.$$eval('a[href*="/photo"] img', (imgs) => imgs.map((i) => i.src))).forEach((u) => urls.add(u));
    await page.mouse.wheel(0, 3000);
    await page.waitForTimeout(900);
  }
  console.log(`[facebook] ${urls.size} grid images, saving them, then opening each for full size…`);
  for (const u of urls) await download(ctx, u, { source: "facebook-grid", page: FB_PROFILE });
  const links = await page.$$eval('a[href*="/photo"]', (as) => [...new Set(as.map((a) => a.href))]);
  for (const href of links.slice(0, 150)) {
    try {
      await page.goto(href, { waitUntil: 'domcontentloaded' });
      const src = await page
        .waitForSelector('img[data-visualcompletion="media-vc-image"]', { timeout: 8000 })
        .then((el) => el.getAttribute('src'));
      await download(ctx, src, { source: 'facebook', page: href });
    } catch {
      /* photo page without a large image */
    }
  }
  await ctx.close();
}

/** Videos tab of the page: link, title, length and a cover image for each video or reel. */
async function facebookVideos() {
  const ctx = await chromium.launchPersistentContext(path.resolve('.fb-session'), { headless: false, viewport: { width: 1280, height: 900 } });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  for (const tab of ['videos', 'reels']) {
    await page.goto(`${FB_PROFILE}/${tab}`, { waitUntil: 'domcontentloaded' });
    console.log(`\n[facebook ${tab}] If asked, log in in the opened window…`);
    await page.waitForSelector('a[href*="/videos/"], a[href*="/reel/"], a[href*="watch"]', { timeout: 300_000 }).catch(() => null);
    for (let i = 0; i < 25; i++) {
      await page.mouse.wheel(0, 2500);
      await page.waitForTimeout(900);
    }
    const found = await page.$$eval('a[href*="/videos/"], a[href*="/reel/"]', (as) =>
      as.map((a) => {
        const img = a.querySelector('img');
        const text = (a.innerText || a.getAttribute('aria-label') || '').trim();
        return { href: a.href.split('?')[0], poster: img?.src ?? '', text };
      })
    );
    console.log(`[facebook ${tab}] ${found.length} links`);
    for (const v of found) {
      if (!/\/(videos|reel)\/\d+/.test(v.href) || manifest.videos.some((x) => x.url === v.href)) continue;
      const lines = v.text.split('\n').map((s) => s.trim()).filter(Boolean);
      const length = lines.find((l) => /^\d{1,2}:\d{2}(:\d{2})?$/.test(l)) ?? '';
      const title = lines.filter((l) => l !== length).join(' · ');
      const before = manifest.images.length;
      if (v.poster) await download(ctx, v.poster, { source: `facebook-${tab}-poster`, page: v.href, title });
      manifest.videos.push({ source: `facebook-${tab}`, url: v.href, title, length, poster: manifest.images.length > before ? manifest.images.at(-1).file : '' });
    }
  }
  await ctx.close();
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, locale: 'en-US' });
if (args.has('--videos')) {
  await browser.close();
  await facebookVideos().catch((e) => console.warn(`\n[facebook videos] ${e.message}`));
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\n\nSaved ${manifest.videos.length} videos (${manifest.images.length} covers) to ${outDir}`);
  process.exit(0);
}
if (args.has("--web")) for (const q of IMAGE_QUERIES) await bingImages(ctx, q).catch((e) => console.warn(`
[bing] ${q}: ${e.message}`));
if (args.has("--web")) for (const q of VIDEO_QUERIES) await youtube(ctx, q).catch((e) => console.warn(`
[youtube] ${q}: ${e.message}`));
await browser.close();
if (!args.has("--web") || args.has("--facebook")) await facebook().catch((e) => console.warn(`\n[facebook] ${e.message}`));

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n\nSaved ${manifest.images.length} images and ${manifest.videos.length} videos to ${outDir}`);
