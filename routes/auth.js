const useAuthRoute = (app) => {
  app.post('/auth', (req, res) => {
    res.end('fuck you')
  })
}

module.exports =  useAuthRoute


// const MongoClient = require('mongodb').MongoClient
// const {saveUser} = require('../db/user')
//
// const controller = require('../utils/controllers')
//
// var proxyaddr = require('proxy-addr')
//
//
// module.exports = function(router) {
//
//   router.post('/auth', (req, res) => {
//     // res.end('cao ni ma bi')
//     res.end(200)
//   })
//
//   router.get('/', (req, res) => {
//     console.log('proxyaddr: ', proxyaddr(req, 'loopback'));
//
//
//     console.log('ip: ', req.ip);
//     console.log('ips: ', req.ips);
//
//     console.log('xff: ', req.headers['X-Forwarded-For']);
//
//     res.end(`IP - ${req.ip}\nIPS - ${req.ips}\n`)
//   })
//
//   return router
//
// }
