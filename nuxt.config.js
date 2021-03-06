module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wpnuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios',
    ],
    extractCSS: true,
    publicPath: 'https://d31ay4966vt32d.cloudfront.net/static/',
  },
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],
  css: [
    '@/assets/main.css',
  ],
  render: {
    gzip: false,
  }
}

