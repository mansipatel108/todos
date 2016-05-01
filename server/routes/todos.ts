import express = require('express');
import passport = require('passport');
var router = express.Router();

// db references
import mongoose = require('mongoose');

import todoModel = require('../models/todo');
import Todo = todoModel.Todo;

/* Utility Function to check if user is authenticated */
function requireAuth(req:express.Request, res:express.Response, next: any) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* READ TODOS */
router.get('/', requireAuth, (req:express.Request, res:express.Response, next:any) => {
  Todo.find((err:Error, todos) => {
     if(err)
     {
         return next(err);
     }
      res.json(todos);
  });
});

/* CREATE TODOS */
router.post('/', requireAuth, (req:express.Request, res:express.Response, next:any) => {
   Todo.create(req.body, (err:Error, post:mongoose.PassportLocalDocument) => {
      if(err){
        return next(err);}

      res.json(post);
   });
});

/* READ /todos/id */
router.get('/:id', requireAuth, (req:express.Request, res:express.Response, next:any) => {
   Todo.findById(req.params.id, (err:Error, post:mongoose.PassportLocalDocument) => {
      if(err) {
        return next(err);}
       res.json(post);
   });
});

/* UPDATE /todos/:id */
router.put('/:id', requireAuth, (req:express.Request, res:express.Response, next:any) => {
   Todo.findByIdAndUpdate(req.params.id, req.body, (err:Error, post:mongoose.PassportLocalDocument) => {
      if(err) {
          return next(err);
        }
       res.json(post);
   }); 
});

/* DELETE /todos/:id */
router.delete('/:id', requireAuth, (req:express.Request, res:express.Response, next:any) => {
   Todo.findByIdAndRemove(req.params.id, req.body, (err:Error, post:mongoose.PassportLocalDocument) => {
      if(err) {
          return next(err);
          }
       res.json(post);
   });
});

module.exports = router;