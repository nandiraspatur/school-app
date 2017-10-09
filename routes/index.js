const express = require('express');
const route = express();
const session = require('express-session')
const models = require('../models')
const checkAuth = require('../helper/checkauth')

route.get('/', checkAuth, function (req, res) {
  res.send(req.session)
  // res.render('index', {title:'Home', user:req.session, role:req.session.role})
})

module.exports = route;
