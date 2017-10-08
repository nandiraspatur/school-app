var express = require('express');
var route = express.Router();

var models = require('../models')

route.get('/', function (req, res) {

  models.Student.findAll({
    include:[{
      model:models.Subject
    }],
    order: ['"first_name"']
  }).then(studentsRows => {
    res.render('student', {students:studentsRows, title:'Student Data'})
  })
})

// add student
function renderStudentAdd(req, res, errMsg){
  res.render('student-add', {title:'Add Student', alert:errMsg})
}

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

// edit student
route.get('/edit/:id', function (req, res) {
  models.Student.findById(req.params.id).then(studentData => {
    res.render('student-edit', {student:studentData, id:req.params.id, title:'Edit Student'})
  })
})

route.post('/edit/:id', function (req, res) {
  models.Student.update(req.body, {where:req.params}).then(function() {
    res.redirect('/student')
  })
})

//delete student
route.get('/delete/:id', function (req, res) {
  models.Student.destroy({where:req.params}).then(function() {
    res.redirect('/student')
  })
})

//add subject
route.get('/:id/addsubject', function (req, res) {
  Promise.all([
    models.Student.findById(req.params.id),
    models.Subject.findAll()
  ]).then(data => {
    res.render('student-addsubject', {student:data[0], subjects:data[1], id:req.params.id, title:'Add Subject'})
  })
})

route.post('/:id/addsubject', function (req, res) {
  models.StudentSubject.create({SubjectId:req.body.SubjectId, StudentId:req.params.id}).then(function() {
    res.redirect('/student')
  })
})

module.exports = route;
