const mongooes = require('mongoose');

mongooes.Promise = global.Promise;
mongooes.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongooes};