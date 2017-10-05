var express = require('express');
var route = express.Router();

var models = require('../models')

function renderStudentAdd(req, res, errMsg){
  res.render('student-add', {title:'Add Student Data', alert:errMsg})
}

route.get('/', function (req, res) {
  models.Student.findAll().then(studentsRows => {
    res.render('student', {students:studentsRows, title:'Student Data'})
  })
})

route.get('/add', function (req, res) {
  renderStudentAdd(req, res, '')
})

route.post('/add', function (req, res) {
  models.Student.create(req.body).then(function() {
    res.redirect('/student');
  }).catch(reject => {
    renderStudentAdd(req, res, reject.message)
  });
})

route.get('/edit/:id', function (req, res) {
  models.Student.findById(req.params.id).then(studentData => {
    res.render('student-edit', {student:studentData, id:req.params.id, title:'Edit Student Data'})
  })
})

route.post('/edit/:id', function (req, res) {
  console.log(req.body);
  models.Student.update(req.body, {where:req.params}).then(function() {
    res.redirect('/student')
  })
})

route.get('/delete/:id', function (req, res) {
  models.Student.destroy({where:req.params}).then(function() {
    res.redirect('/student')
  })
})

module.exports = route;
