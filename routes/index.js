var express = require('express');
var route = express();

route.get('/', function (req, res) {
  res.render('index', {title:'Home'})
})

module.exports = route;
