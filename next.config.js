/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: "/community/:slug*",
      destination: "/screens/community/:slug*", // Redirect to the original URL
    },
    {
      source: "/categories/:slug*",
      destination: "/screens/categories/:slug*", // Redirect to the original URL
    },
  ];
};

const nextConfig = {
  output: "export",
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  rewrites: rewrites,
};

export default nextConfig;
