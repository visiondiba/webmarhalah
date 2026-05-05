import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "tinacms",
    "@tinacms/cli",
    "@graphql-codegen/visitor-plugin-common"
  ],

  // Opsional: Jika kamu menggunakan App Router dan ingin memastikan 
  // TinaCMS berjalan lancar dengan React Server Components
  experimental: {
    // serverComponentsExternalPackages: ["@tinacms/cli"],
  },

  // Konfigurasi lainnya seperti images, redirects, dll.
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

export default nextConfig;
