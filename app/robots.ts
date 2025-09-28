import { FIRM_CONFIG } from "../lib/config";
export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${FIRM_CONFIG.siteUrl}/sitemap.xml` };
}
