const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.alias['@organism'] = path.join(__dirname, 'src/components/organism/')
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components/')
    return config
  },
}
