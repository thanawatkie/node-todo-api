// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var user = {name: 'DoubleK', age: 25};
// var {name} = user;
// var {age} = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongod server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Sonething to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
        
    // });

    // db.collection('Users').insertOne({
    //     name: 'DoubleK',
    //     age: 22,
    //     location: 'Loei'
    // }, (err,result) => {
    //     if (err) {
    //         return console.log('Unable to insert User', err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });
    client.close();
});