require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'WizIQ',
    description: 'WizIQ',
    head: {
      titleTemplate: 'WizIQ: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'WizIQ'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'WizIQ'},
        {property: 'og:description', content: 'WizIQ.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@WizIQ'},
        {property: 'og:creator', content: '@WizIQ'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ],
      link: [
        {'rel': 'stylesheet', 'type': 'text/css', 'href': '/static/assets/styles/material.min.css' },
        {'rel': 'stylesheet', 'type': 'text/css', 'href': 'assets/styles/animate.css'},
        {'rel': 'stylesheet/less', 'type': 'text/css', 'href': '/static/assets/styles/custom.less'}

      ]
    }
  },

}, environment);
