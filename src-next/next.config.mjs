/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, {isServer}) => {
    // Add rule to handle the canvas.node binary module
    config.module.rules.push({
      test: /\.node$/, use: 'raw-loader'
    });
    if (!isServer) config.externals.push('canvas');
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
