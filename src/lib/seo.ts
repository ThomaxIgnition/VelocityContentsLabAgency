import { useEffect } from 'react';

const SITE = 'https://velocitycontentlabs.com';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Sets the page title, description, Open Graph tags, canonical URL and optional JSON-LD. */
export function usePageMeta(meta: { title: string; description?: string | null; path: string; image?: string; jsonLd?: object } | null) {
  const json = meta?.jsonLd ? JSON.stringify(meta.jsonLd) : '';
  useEffect(() => {
    if (!meta) return;
    document.title = meta.title;
    const url = SITE + meta.path;
    if (meta.description) {
      setMeta('name', 'description', meta.description);
      setMeta('property', 'og:description', meta.description);
    }
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:url', url);
    if (meta.image) setMeta('property', 'og:image', SITE + meta.image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let script: HTMLScriptElement | null = null;
    if (json) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.page = 'true';
      script.textContent = json;
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
      canonical?.remove();
    };
  }, [meta?.title, meta?.description, meta?.path, meta?.image, json]);
}
