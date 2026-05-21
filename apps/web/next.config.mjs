/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@synaptech/ui"],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
