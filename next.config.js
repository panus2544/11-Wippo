const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

const evnconfig = {
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
}

module.exports = withPlugins([
  [withCSS]
], evnconfig)
