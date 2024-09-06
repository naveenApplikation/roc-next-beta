/** @type {import('next').NextConfig} */
import { default as withPWA } from "@ducanh2912/next-pwa";

const redirects = async () => [
  {
    source: "/summer", // The URL path to match
    destination: "https://hub.roc.je/jersey-summer-guide-2024", // The URL to redirect to
    permanent: true, // Set to true for a 308 Permanent Redirect
  },
  {
    source: "/upcoming", // The old path to match
    destination: "/eventCategory/upcoming", // The new path to redirect to
    permanent: true, // Set to true for a 308 Permanent Redirect
  },
  {
    source: "/categories/activity-list", // The old path
    has: [
      {
        type: "query",
        key: "search",
        value: "activity",
      },
      {
        type: "query",
        key: "modal",
        value: "(?<modal>.*)", // Captures the modal value
      },
    ],
    destination: "/activityCategory/all-activities?modal=:modal", // Redirect to the new path with the captured modal value
    permanent: true, // Set to true for a 308 Permanent Redirect
  },
];

// Combined Next.js configuration
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
  staticPageGenerationTimeout: 1000,
  redirects,
};

// PWA configuration
const withPwaConfig = withPWA({
  cacheOnFrontEndNav: true, // Enable caching on client-side navigation
  aggressiveFrontEndNavCaching: true, // Aggressive caching strategy for frontend
  reloadOnOnline: true, // Automatically reload if the app goes online
  swcMinify: true, // Enable SWC minification for faster builds
  disable: false, // Ensure the PWA is enabled
  dest: "public", // Destination for service worker and assets
  fallbacks: {
    document: "/offline", // Custom offline page
  },
  // Ensure the service worker updates immediately on new deployment
  register: true,
  skipWaiting: true, // Force the service worker to activate immediately
  clientsClaim: true, // Claim control over uncontrolled pages as soon as the service worker becomes active

  workboxOptions: {
    disableDevLogs: true, // Disable development logs in the service worker
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === "document", // Cache HTML documents with a network-first strategy
        handler: "NetworkFirst",
        options: {
          cacheName: "html-cache",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24, // Cache HTML for 24 hours
          },
        },
      },
      {
        urlPattern: ({ request }) =>
          request.destination === "script" || request.destination === "style", // Cache JS and CSS with a network-first strategy
        handler: "NetworkFirst",
        options: {
          cacheName: "js-css-cache",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "image", // Cache images with a cache-first strategy
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
          expiration: {
            maxEntries: 100, // Limit the number of cached images
            maxAgeSeconds: 60 * 60 * 24 * 30, // Cache images for 30 days
          },
        },
      },
      {
        urlPattern: /^https:\/\/api\.yourdomain\.com\/.*$/, // API caching (update this with your actual API URL)
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24, // Cache API responses for 24 hours
          },
        },
      },
    ],
  },

  reactStrictMode: true, // Enable React Strict Mode for development
  // ...other options you like
});

export default withPwaConfig(nextConfig);
