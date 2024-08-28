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

// Combined next.js configuration
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
  staticPageGenerationTimeout: 400,
  redirects,
};

const withPwaConfig = withPWA({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  dest: "public",
  fallbacks: {
    document: "/offline", // Fallback to a custom offline page
  },
  workboxOptions: {
    disableDevLogs: true,
  },
  reactStrictMode: true,
  // ...other options you like
});

export default withPwaConfig(nextConfig);
