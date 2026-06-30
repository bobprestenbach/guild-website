/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new (require('webpack').IgnorePlugin)({
        resourceRegExp: /^@react-email\/render$/,
      })
    )
    return config
  },
}

module.exports = nextConfig
