import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getSeoConfigForPath,
  generateStructuredDataGraph,
  PageSEO,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
} from '../../utils/seoConfig';

interface SEOProps {
  customSEO?: Partial<PageSEO>;
}

export const SEO: React.FC<SEOProps> = ({ customSEO }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const defaultSEO = getSeoConfigForPath(pathname);
    const seo: PageSEO = { ...defaultSEO, ...customSEO };

    // 1. Update Document Title (50-60 chars target)
    document.title = seo.title;

    // Helper to safely set/update a <meta> tag by name or property
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Set Standard Meta Tags
    setMetaTag('name', 'description', seo.description);
    if (seo.keywords && seo.keywords.length > 0) {
      setMetaTag('name', 'keywords', seo.keywords.join(', '));
    }
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', SITE_NAME);

    // 3. Set Canonical URL Tag
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.canonicalUrl);

    // 4. Set Open Graph Social Tags
    const ogImg = seo.ogImage || DEFAULT_OG_IMAGE;
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:type', seo.ogType || 'website');
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', seo.canonicalUrl);
    setMetaTag('property', 'og:image', ogImg);
    setMetaTag('property', 'og:image:alt', `${SITE_NAME} — Enterprise AI & Software Engineering`);

    // 5. Set Social Share Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', ogImg);

    // 6. Set / Update Dynamic JSON-LD Structured Data Graph
    const schemaData = generateStructuredDataGraph(seo);
    let scriptTag = document.querySelector<HTMLScriptElement>('#seo-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [pathname, customSEO]);

  return null;
};
