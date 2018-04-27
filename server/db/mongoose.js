const mongooes = require('mongoose');

mongooes.Promise = global.Promise;
mongooes.connect('mongodb://node-web-rest:61Fb4YGJUqJ8jFjfSvxlU7wjlLrHZg4HsX4FvZNxy5Rd3TeznzEu2Ihparz4mX346KZEFM5bs3nizPQIrzT9CA%3D%3D@node-web-rest.documents.azure.com:10255/?ssl=true/TodoApp' ||'mongodb://localhost:27017/TodoApp');

module.exports = {mongooes};