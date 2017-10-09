const express = require('express');
const route = express.Router();
const session = require('express-session')
const models = require('../models')
const checkAuth = require('../helper/checkauth')

route.use(checkAuth)

route.use(function (req, res, next) {
  if(req.session.role == 'headmaster'){
    next()
  }else{
    res.redirect('/')
  }
})

route.get('/', function (req, res) {
  models.Teacher.findAll({
    include: [{
      model: models.Subject
    }],
    order: ['"first_name"']
  }).then(function(teachers) {
    res.render('teacher', {teachers:teachers, title:'Teacher Data', role:req.session.role})
  }).catch(function(err){
    console.log(err);
  });
})

// add teacher
function renderTeacherAdd(req, res, errMsg){
  res.render('teacher-add', {title:'Add Teacher', alert:errMsg, role:req.session.role})
}

route.get('/add', function (req, res) {
  renderTeacherAdd(req, res, '')
})

route.post('/add', function (req, res) {
  models.Teacher.create(req.body).then(function() {
    res.redirect('/teacher');
  }).catch(reject => {
    renderTeacherAdd(req, res, reject.message)
  });
})

// edit techer
route.get('/edit/:id', function (req, res) {
  Promise.all([
    models.Teacher.findById(
      req.params.id,
      {include: [{
        model: models.Subject
      }]}),
    models.Subject.findAll()
  ]).then(data => {
    res.render('teacher-edit', {teacher:data[0], subjects:data[1], id:req.params.id, title:'Edit Teacher', role:req.session.role})
  })
})

route.post('/edit/:id', function (req, res) {
  console.log(req.body);
  models.Teacher.update(req.body, {where:req.params}).then(function() {
    res.redirect('/teacher')
  })
})

//delete teacher
route.get('/delete/:id', function (req, res) {
  models.Teacher.destroy({where:req.params}).then(function() {
    res.redirect('/teacher')
  })
})

module.exports = route;
