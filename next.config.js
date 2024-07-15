/** @type {import('next').NextConfig} */
import { default as withPWA } from "@ducanh2912/next-pwa";

const rewrites = () => {
  return [
    {
      source: "/restaurants",
      destination: "/screens/resturants", // Redirect to the original URL
    },
    {
      source: "/eco_dining",
      destination: "/screens/ecoDining", // Redirect to the original URL
    },
    {
      source: "/wellbeing",
      destination: "/screens/wellbeing", // Redirect to the original URL
    },
    {
      source: "/events",
      destination: "/screens/events", // Redirect to the original URL
    },
    {
      source: "/stays",
      destination: "/screens/stays", // Redirect to the original URL
    },
    {
      source: "/scaffolding",
      destination: "/screens/scaffolding", // Redirect to the original URL
    },
    {
      source: "/experiences",
      destination: "/screens/experiences", // Redirect to the original URL
    },
    {
      source: "/attractions",
      destination: "/screens/attractions", // Redirect to the original URL
    },
    {
      source: "/financial",
      destination: "/screens/financial", // Redirect to the original URL
    },
  ];
};

/** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: "export",
//   reactStrictMode: false,
//   compiler: {
//     styledComponents: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   rewrites: rewrites,
// };

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
  staticPageGenerationTimeout:120,
};

const withPwaConfig = withPWA({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  dest: "public",
  fallbacks: {
    document: "/offline", // if you want to fallback to a custom page rather than /_offline
  },
  workboxOptions: {
    disableDevLogs: true,
  },

  reactStrictMode: true,
  // ... other options you like
});

export default withPwaConfig(nextConfig);
// export default nextConfig;

// export default nextConfig;
