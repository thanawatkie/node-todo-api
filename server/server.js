const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
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
        Todo.findById(id).then((todo) => {
            if(!todo){
                res.status(404).send();
            }else{
                res.send({todo});
            }
        }).catch((err) => {
            res.status(400).send();
        });
    }
});

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }else{
        Todo.findByIdAndRemove(id).then((todo) => {
            if(!todo){
                res.status(404).send();
            }else{
                res.send({todo});
            }
        }).catch((err) => {
            res.status(400).send();
        });
    }
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    else{
        if(_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        }else{
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, {$set: {
            text: body.text,
            completed: body.completed,
            completedAt: body.completedAt
        }}, {new: true}).then((todo) => {
            if(!todo){
                res.status(404).send();
            }else{
                res.send({todo});
            }
        }).catch((err) => {
            res.status(400).send();
        });
    }
})

var port = process.env.PORT || 3000;
app.listen( port, () => {
    console.log(`Starting on port ${port}`);
    
});

module.exports = {app};
