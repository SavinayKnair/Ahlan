import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ahlanandaman.in";
  const now = new Date(); // Forces a fresh 'lastmod' signal for Google
  const pages = [
    { url: "/", priority: 1.0, changeFreq: "daily" as const },
    { url: "/rooms", priority: 0.9, changeFreq: "weekly" as const },
    { url: "/packages", priority: 0.9, changeFreq: "weekly" as const },
    { url: "/things-to-do", priority: 0.8, changeFreq: "monthly" as const },
    { url: "/blog", priority: 0.8, changeFreq: "weekly" as const },
    { url: "/contact", priority: 0.8, changeFreq: "monthly" as const },
    { url: "/best-homestay-port-blair", priority: 0.9, changeFreq: "monthly" as const },
    { url: "/andaman-honeymoon-stay", priority: 0.9, changeFreq: "monthly" as const },
    { url: "/family-stay-andaman", priority: 0.85, changeFreq: "monthly" as const },
    { url: "/deluxe-rooms-port-blair", priority: 0.85, changeFreq: "monthly" as const },
    { url: "/near-airport-stay-port-blair", priority: 0.85, changeFreq: "monthly" as const },
    { url: "/near-cellular-jail-stay", priority: 0.85, changeFreq: "monthly" as const },
    { url: "/havelock-tour-package-stay", priority: 0.85, changeFreq: "monthly" as const },
  ];
  
  return pages.map((p) => ({ 
    url: `${base}${p.url}`, 
    lastModified: now, // This tells Google the page was updated TODAY
    changeFrequency: p.changeFreq, 
    priority: p.priority 
  }));
}
