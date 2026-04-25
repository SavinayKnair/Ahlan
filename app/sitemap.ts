import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ahlanandaman.in";
  const now = new Date();
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
    { url: "/blog/best-time-to-visit-andaman-2026", priority: 0.7, changeFreq: "yearly" as const },
    { url: "/blog/top-10-homestays-port-blair", priority: 0.7, changeFreq: "yearly" as const },
    { url: "/blog/why-choose-ahlan-homestays", priority: 0.7, changeFreq: "yearly" as const },
    { url: "/blog/andaman-honeymoon-guide", priority: 0.7, changeFreq: "yearly" as const },
    { url: "/blog/family-trip-andaman-guide", priority: 0.7, changeFreq: "yearly" as const },
    { url: "/blog/how-to-reach-havelock-island", priority: 0.7, changeFreq: "yearly" as const },
  ];
  return pages.map((p) => ({ url: `${base}${p.url}`, lastModified: now, changeFrequency: p.changeFreq, priority: p.priority }));
}
