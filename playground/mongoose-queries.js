const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {user} = require('./../server/model/user');

var id = '5ae2defc3ff3bb3e40384f13';

user.findById(id).then((user) => {
    if(!user){
        return console.log('No User Found');
    }

    console.log(user);
    
}).catch((err) => {
    console.log(err);
    
});

// if(!ObjectID.isValid(id)){
//     return console.log('ID is incorrect');
// }
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not Found');
        
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => {
//     console.log(e);
// });

