const { withNextVideo } = require('next-video\process')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "img.clerk.com"
    ]
  }
}

module.exports = withNextVideo(nextConfig)
