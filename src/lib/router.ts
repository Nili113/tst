import React, { useEffect, useState } from 'react';
import { smoothScrollTo } from './smoothScroll';

/** Minimal client-side routing on the History API: enough for a handful of pages. */
const EVENT = 'app:navigate';

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const samePath = url.pathname === window.location.pathname;
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event(EVENT));
  // Let the new page render, then land on the anchor (or the top).
  requestAnimationFrame(() => {
    const el = url.hash ? document.getElementById(url.hash.slice(1)) : null;
    if (el) smoothScrollTo(el, { immediate: !samePath });
    else if (!samePath) smoothScrollTo(0, { immediate: true });
  });
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const on = () => setPath(window.location.pathname);
    window.addEventListener('popstate', on);
    window.addEventListener(EVENT, on);
    return () => {
      window.removeEventListener('popstate', on);
      window.removeEventListener(EVENT, on);
    };
  }, []);
  return path;
}

/** onClick for <a href>: client-side navigation, but ctrl/cmd-click still opens a new tab. */
export function linkClick(e: React.MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const href = e.currentTarget.getAttribute('href');
  if (!href || /^(https?:|mailto:|tel:)/.test(href)) return;
  // Same-page anchors: one smooth glide (no native jump), and keep the hash in the URL.
  if (href.startsWith('#')) {
    const el = href === '#home' ? null : document.getElementById(href.slice(1));
    if (!el && href !== '#home') return;
    e.preventDefault();
    history.replaceState(null, '', href);
    smoothScrollTo(el ?? 0);
    return;
  }
  e.preventDefault();
  navigate(href);
}
