/**
 * robots.ts defines crawling rules for search engines.  By default we
 * allow all crawlers and reference our sitemap for better indexing.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://template-lawfirm.vercel.app/sitemap.xml',
  };
}