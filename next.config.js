/** @type {import('next').NextConfig} */

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
    domains: ['firebasestorage.googleapis.com','cdn.jersey.com'],
    // formats: ['image/jpeg', 'image/png'],
    // unoptimized: true, 
  },
};

export default nextConfig;
