const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongod server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5ae207cb453de02dd43fac0b')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
        
    // }).catch((err) => {
    //     console.log('Unable to fetch to do',err);
    // });;

    // db.collection('Todos').find().count().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
        
    // }).catch((err) => {
    //     console.log('Unable to fetch to do',err);
    // });;

    db.collection('Users').find({name: 'DoubleK'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
        
    }).catch((err) => {
        console.log('Unable to fetch user',err);
        
    });
    client.close();
});