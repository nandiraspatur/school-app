var express = require('express');
var route = express.Router();

var models = require('../models')

route.get('/', function (req, res) {
  models.Subject.findAll().then(subjectsRows => {
    res.render('subject', {subjects:subjectsRows, title:'Subject Data'})
  })
})

module.exports = route;
