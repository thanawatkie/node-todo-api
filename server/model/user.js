const mongooes = require('mongoose');

var user = mongooes.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1
    }
});

module.exports = {user};