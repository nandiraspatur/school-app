const express = require('express');
const route = express();
const session = require('express-session')
const models = require('../models')
const checkAuth = require('../helper/checkauth')
const encrypt = require('../helper/encrypt')

function renderUser(req, res, errMsg){
  res.render('login', {title:'Login', alert:errMsg, role:req.session.role})
}

route.get('/login', function (req, res) {
  renderUser(req, res)
})

route.post('/login', function (req, res) {
  models.User.findOne({
    where:{
      username:req.body.username
    }
  }).then(result=>{
    let password = encrypt(req.body.password,result.secret)
    if(password == result.password){
      req.session.role = result.role;
      req.session.username = result.username;
      req.session.auth = true;
      res.redirect('/')
    }else{
      renderUser(req, res, 'Username atau Password salah!!')
    }
  })
})

route.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    res.redirect('/login')
  })
})

function secretGen() {
  let string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 8; i++){
    result += string[Math.floor(Math.random() * string.length)];
  }
  return result;
}

function checkRole(req,res,next){
  if(req.session.role == 'headmaster'){
    next();
  }else{
    res.redirect('/')
  }
}

function renderAddUser(req, res, errMsg){
  res.render('user-add', {title:'Add User', alert:errMsg, role:req.session.role})
}

route.get('/user/add', checkAuth, checkRole, function(req, res){
  renderAddUser(req, res)
})

route.post('/user/add', checkAuth, checkRole, function(req, res){
  req.body.secret = secretGen()
  if (req.body.username == '' || req.body.password == '' || req.body.role == '' || req.body.secret == '') {
    renderAddUser(req, res, 'Silakan isi semua data dengan lengkap!')
  }else{
    models.User.create(req.body).then(function(){
      res.redirect('/')
    }).catch(reject => {
      renderAddUser(req, res, reject.message)
    })
  }

  console.log(req.body);
})

module.exports = route;
