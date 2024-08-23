/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','randomuser.me'],
      },
      experimental:{
        reactRoot: true,
        suppressHydrationWarning: true,
      }
}

module.exports = nextConfig
