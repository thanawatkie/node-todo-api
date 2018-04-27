const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {user} = require('./../server/model/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
    
// }).catch((err) => {
//     console.log(err);
// });
Todo.findByIdAndRemove('5ae33aded9c8434690645134').then((todo) => {
    console.log(todo);
})