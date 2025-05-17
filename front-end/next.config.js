/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "@/scss/mixin.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',                // tudo que bater em /api/...
        destination: 'https://5a79-2804-7f4-3d40-d495-7c3d-253d-b47e-4590.ngrok-free.app/:path*'  
      }
    ];
  },
};

module.exports = nextConfig;
