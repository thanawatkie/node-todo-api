var mongooes = require('mongoose');

var Todo = mongooes.model('Todo', {
    text: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};