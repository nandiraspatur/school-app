const express = require('express');
const route = express.Router();
const session = require('express-session')
const models = require('../models')
const checkAuth = require('../helper/checkauth')

route.use(checkAuth)

route.use(function (req, res, next) {
  if(req.session.role == 'academic' || req.session.role == 'headmaster' || req.session.role == 'teacher'){
    next()
  }else{
    res.redirect('/')
  }
})

route.get('/', function (req, res) {
  console.log(req.session);
  models.Student.findAll({
    include:[{
      model:models.Subject
    }],
    order: ['"first_name"']
  }).then(studentsRows => {
    res.render('student', {students:studentsRows, title:'Student Data', role:req.session.role})
  })
})

// add student
function renderStudentAdd(req, res, errMsg){
  res.render('student-add', {title:'Add Student', alert:errMsg, role:req.session.role})
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
    res.render('student-edit', {student:studentData, id:req.params.id, title:'Edit Student', role:req.session.role})
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
    res.render('student-addsubject', {student:data[0], subjects:data[1], id:req.params.id, title:'Add Subject', role:req.session.role})
  })
})

route.post('/:id/addsubject', function (req, res) {
  models.StudentSubject.create({SubjectId:req.body.SubjectId, StudentId:req.params.id}).then(function() {
    res.redirect('/student')
  })
})

module.exports = route;
