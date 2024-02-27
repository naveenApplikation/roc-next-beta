module.exports = {
  async rewrites() {
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
  },
};

const nextConfig = {
  output: "export",
};

module.exports = nextConfig;
