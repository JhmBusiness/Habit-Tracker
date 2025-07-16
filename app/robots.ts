// robots.ts is a text file that speaks to web crawlers. It tells them what parts of your site they should access, and what parts they shouldn't.
// --------------------
// import { MetadataRoute } from 'next'

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: '*', // Apply to all web crawlers
//       allow: '/',     // Allow crawling of everything by default
//       disallow: [     // Disallow specific paths (e.g., private user dashboards, API routes)
//         '/dashboard/',
//         '/settings/',
//         '/auth/',
//         '/api/',
//       ],
//     },
//     sitemap: 'https://yourdomain.com/sitemap.xml', // Tell crawlers where your sitemap is
//   }
// }
