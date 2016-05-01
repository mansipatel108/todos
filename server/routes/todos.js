"use strict";
var express = require('express');
var router = express.Router();
var todoModel = require('../models/todo');
var Todo = todoModel.Todo;
/* Utility Function to check if user is authenticated */
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
/* READ TODOS */
router.get('/', requireAuth, function (req, res, next) {
    Todo.find(function (err, todos) {
        if (err) {
            return next(err);
        }
        res.json(todos);
    });
});
/* CREATE TODOS */
router.post('/', requireAuth, function (req, res, next) {
    Todo.create(req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});
/* READ /todos/id */
router.get('/:id', requireAuth, function (req, res, next) {
    Todo.findById(req.params.id, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});
/* UPDATE /todos/:id */
router.put('/:id', requireAuth, function (req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});
/* DELETE /todos/:id */
router.delete('/:id', requireAuth, function (req, res, next) {
    Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});
module.exports = router;

//# sourceMappingURL=todos.js.map
