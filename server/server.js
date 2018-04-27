const express = require('express');
const bodyParser = require('body-parser');

var {mongooes} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {user} = require('./model/user');

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

app.listen( process.env.PORT | 3000, () => {
    console.log('Starting on port 3000');
    
})



