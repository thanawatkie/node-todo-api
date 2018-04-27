const express = require('express');
const bodyParser = require('body-parser');

var {mongooes} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {user} = require('./model/user');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }else{
        Todo.findById(id).then((result) => {
            if(!result){
                res.status(404).send();
            }else{
                res.send(JSON.stringify(result,undefined,2));
            }
        }).catch((err) => {
            res.status(400).send();
        });
    }
});

app.listen( process.env.PORT | 3000, () => {
    console.log('Starting on port 3000');
    
});

module.exports = {app};
