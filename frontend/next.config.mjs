const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:caminho*",
        destination: "http://localhost:3001/api/:caminho*",
      },
    ];
  },
};

export default nextConfig;
