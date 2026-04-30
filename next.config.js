/** @type {import('next').NextConfig} */
// Static export — produces a fully static `out/` directory that can be deployed
// to any static host (Hostinger shared, S3, Netlify, GitHub Pages, etc).
// No Node.js runtime needed in production.
module.exports = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    // Static export requires unoptimized images (no Next Image Optimization API at runtime).
    unoptimized: true,
  },
}
