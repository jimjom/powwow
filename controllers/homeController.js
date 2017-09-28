var User = require('../models/user');

var async = require('async');

exports.user_get = function(req, res, next){
  var user_id = req.cookies['user_id'];
  console.log('user_id: '+user_id);
  res.render('user', {title: 'User', user_id: user_id});
};

exports.user_post = function(req, res, next){

  req.checkBody('userName', 'User name required').notEmpty();
  req.sanitize('userName').escape();
  req.sanitize('userName').trim();

  var user = new User( { userName: req.body.userName });
  
  var errors = req.validationErrors();

  if(errors){
    res.render('user', { title: 'User', errors: errors });
  }else {
    User.findOne({ 'userName': req.body.userName })
        .exec( function(err, found_user){
                 console.log('found_user: ' + found_user);
                 if (err) { return next(err); }

                 if (found_user) {
                     //Genre exists, redirect to its detail page
                     res.cookie('user_id', found_user._id).render('user', {title: 'Found User', user_id: found_user._id});
                 }
                 else {

                     user.save(function (err) {
                       if (err) { return next(err); }
                       //Genre saved. Redirect to genre detail page
                       res.cookie('user_id', user._id).render('user', {title: 'New User', user_id: user._id});
                     });

                 } 
        });
  }
};
