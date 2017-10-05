var express = require('express');
var route = express();

route.get('/', function (req, res) {
  res.render('index', {title:'School App'})
})

module.exports = route;
