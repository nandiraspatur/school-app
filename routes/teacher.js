var express = require('express');
var route = express.Router();

var models = require('../models')

route.get('/', function (req, res) {
  models.Teacher.findAll().then(teachersRows => {
    res.render('teacher', {teachers:teachersRows, title:'Teacher Data'})
  })
})

module.exports = route;
