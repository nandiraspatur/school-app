const express = require('express');
const route = express.Router();
const session = require('express-session')
const models = require('../models')
const checkAuth = require('../helper/checkauth')

route.use(checkAuth)

route.use(function (req, res, next) {
  if(req.session.role == 'academic' || req.session.role == 'headmaster'){
    next()
  }else{
    res.redirect('/')
  }
})

route.get('/', function (req, res) {
  models.Subject.findAll({
    include: [{
      model: models.Teacher
    }],
    order: ['"id"']
  }).then(function(subjects) {
      res.render('subject', {subjects:subjects, title:'Subject Data', role:req.session.role})
    }).catch(function(err){
      console.log(err);
    });
})

route.get('/:id/enrolledstudents', function (req, res) {
  models.Subject.findById(
    req.params.id,
    {
      include:[{
        model: models.Student
      }]
    }
  ).then(subjectData => {
    res.render('enrolledstudents', {subject:subjectData, subjectId:req.params.id, title:subjectData.subject_name, role:req.session.role})
  })
})

function renderSubjectAdd(req, res, errMsg){
  res.render('subject-add', {title:'Add Subject', alert:errMsg, role:req.session.role})
}

//add subject
route.get('/add', function (req, res) {
  renderSubjectAdd(req, res, '')
})

route.post('/add', function (req, res) {
  models.Subject.create(req.body).then(function() {
    res.redirect('/subject');
  }).catch(reject => {
    renderSubjectAdd(req, res, reject.message)
  });
})

// edit subject
route.get('/edit/:id', function (req, res) {
  models.Subject.findById(req.params.id).then(subjectData => {
    res.render('subject-edit', {subject:subjectData, id:req.params.id, title:'Edit Subject', role:req.session.role})
  })
})

route.post('/edit/:id', function (req, res) {
  models.Subject.update(req.body, {where:req.params}).then(function() {
    res.redirect('/subject')
  })
})

//delete subject
route.get('/delete/:id', function (req, res) {
  models.Subject.destroy({where:req.params}).then(function() {
    res.redirect('/subject')
  })
})

//add subject
route.get('/:id/addsubject', function (req, res) {
  Promise.all([
    models.Subject.findById(req.params.id),
    models.Subject.findAll()
  ]).then(data => {
    res.render('subject-addsubject', {subject:data[0], subjects:data[1], id:req.params.id, title:'Add Subject', role:req.session.role})
  })
})

route.post('/:id/addsubject', function (req, res) {
  models.SubjectSubject.create({SubjectId:req.body.SubjectId, SubjectId:req.params.id}).then(function() {
    res.redirect('/subject')
  })
})

route.get('/:SubjectId/:StudentId/givescore', function (req, res) {
  models.Subject.findById(
    req.params.SubjectId,
    {include: [{
      model: models.Student,
      where: {id:req.params.StudentId}
    }]}).then(subjectData => {
      res.render('givescore', {subject:subjectData, title:'Give Score', role:req.session.role})
  })
})

route.post('/:SubjectId/:StudentId/givescore', function (req, res) {
  models.StudentSubject.update(req.body, {where:req.params}).then(function() {
    res.redirect(`/subject/${req.params.SubjectId}/enrolledstudents`)
  })
})

module.exports = route;
