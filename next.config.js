const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.alias['@organism'] = path.join(__dirname, 'src/components/organism/')
    return config
  },
}
