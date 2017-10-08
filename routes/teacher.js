var express = require('express');
var route = express.Router();

var models = require('../models')

route.get('/', function (req, res) {
  models.Teacher.findAll({
    include: [{
      model: models.Subject
    }],
    order: ['"first_name"']
  }).then(function(teachers) {
    res.render('teacher', {teachers:teachers, title:'Teacher Data'})
  }).catch(function(err){
    console.log(err);
  });
})

// add teacher
function renderTeacherAdd(req, res, errMsg){
  res.render('teacher-add', {title:'Add Teacher', alert:errMsg})
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
    res.render('teacher-edit', {teacher:data[0], subjects:data[1], id:req.params.id, title:'Edit Teacher'})
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
