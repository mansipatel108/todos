import mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema ({
    name: String,
    completed: Boolean,
    username: String,
    note: String,
    updated_at: {type:Date, default: Date.now}
}, {
    collection: 'todos'
});

// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
export var Todo = mongoose.model('Todo', TodoSchema);