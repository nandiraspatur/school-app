var express = require('express');
var route = express.Router();

var models = require('../models')

route.get('/', function (req, res) {
  models.Subject.findAll({
    include: [{
      model: models.Teacher
    }],
    order: ['"id"']
  }).then(function(subjects) {
      res.render('subject', {subjects:subjects, title:'Subject Data'})
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
    res.render('enrolledstudents', {subject:subjectData, subjectId:req.params.id, title:subjectData.subject_name})
  })
})

function renderSubjectAdd(req, res, errMsg){
  res.render('subject-add', {title:'Add Subject', alert:errMsg})
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
    res.render('subject-edit', {subject:subjectData, id:req.params.id, title:'Edit Subject'})
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
    res.render('subject-addsubject', {subject:data[0], subjects:data[1], id:req.params.id, title:'Add Subject'})
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
      res.render('givescore', {subject:subjectData, title:'Give Score'})
  })
})

route.post('/:SubjectId/:StudentId/givescore', function (req, res) {
  models.StudentSubject.update(req.body, {where:req.params}).then(function() {
    res.redirect(`/subject/${req.params.SubjectId}/enrolledstudents`)
  })
})

module.exports = route;
