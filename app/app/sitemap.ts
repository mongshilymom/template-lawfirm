/**
 * sitemap.ts exports a list of routes for search engines.  This
 * improves SEO by explicitly listing pages and their update
 * frequencies.  Each object contains a URL relative to the site,
 * how often the content changes, and its priority for crawlers.
 */
export default function sitemap() {
  return [
    { url: 'https://template-lawfirm.vercel.app/', changefreq: 'weekly', priority: 1.0 },
    { url: 'https://template-lawfirm.vercel.app/about', changefreq: 'monthly', priority: 0.8 },
    { url: 'https://template-lawfirm.vercel.app/lawyers', changefreq: 'monthly', priority: 0.8 },
    { url: 'https://template-lawfirm.vercel.app/practice', changefreq: 'monthly', priority: 0.8 },
    { url: 'https://template-lawfirm.vercel.app/cases', changefreq: 'monthly', priority: 0.7 },
    { url: 'https://template-lawfirm.vercel.app/news', changefreq: 'weekly', priority: 0.6 },
    { url: 'https://template-lawfirm.vercel.app/contact', changefreq: 'yearly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/consultation', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/privacy', changefreq: 'yearly', priority: 0.3 },
    { url: 'https://template-lawfirm.vercel.app/terms', changefreq: 'yearly', priority: 0.3 },
    { url: 'https://template-lawfirm.vercel.app/calculator', changefreq: 'monthly', priority: 0.7 },
    { url: 'https://template-lawfirm.vercel.app/calculator/divorce', changefreq: 'monthly', priority: 0.6 },
    { url: 'https://template-lawfirm.vercel.app/calculator/inheritance', changefreq: 'monthly', priority: 0.6 },
    { url: 'https://template-lawfirm.vercel.app/calculator/criminal', changefreq: 'monthly', priority: 0.6 },
    { url: 'https://template-lawfirm.vercel.app/templates/contract', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/chatbot', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/academy', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/webinar', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/newsletter', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/careers', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/pro-bono', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/media', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/books', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/awards', changefreq: 'monthly', priority: 0.5 },
    { url: 'https://template-lawfirm.vercel.app/admin', changefreq: 'monthly', priority: 0.2 },
  ];
}