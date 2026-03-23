// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://imperviousgeneration.my.id";

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0], 
      changeFrequency: "monthly",
      priority: 1.0, 
    },
  ];
}
