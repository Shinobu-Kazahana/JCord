/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil"
      });
  
      return config;
    },
    images: {
      domains: [
        "uploadthing.com",
        "utfs.io"
      ]
    },
    headers: async () => {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: 'frame-ancestors "self" https://sandbox.procore.com/',
            },
          ],
        },
      ];
    }
  }
  
  module.exports = nextConfig