import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thepond-by-jhm.netlify.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
}
