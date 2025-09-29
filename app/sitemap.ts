import { FIRM_CONFIG } from "../lib/config";
export default function sitemap(){
  return [
    { url: `${FIRM_CONFIG.siteUrl}/`, changefreq:"weekly", priority:1.0 },
    { url: `${FIRM_CONFIG.siteUrl}/about` },{ url: `${FIRM_CONFIG.siteUrl}/lawyers` },
    { url: `${FIRM_CONFIG.siteUrl}/practice` },{ url: `${FIRM_CONFIG.siteUrl}/cases` },
    { url: `${FIRM_CONFIG.siteUrl}/news` },{ url: `${FIRM_CONFIG.siteUrl}/consultation` },
    { url: `${FIRM_CONFIG.siteUrl}/calculator/divorce` },
    { url: `${FIRM_CONFIG.siteUrl}/calculator/inheritance` },
    { url: `${FIRM_CONFIG.siteUrl}/calculator/criminal` },
  ];
}
