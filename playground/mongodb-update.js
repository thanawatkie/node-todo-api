const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongod server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5ae2a5c789bbf31423e0f265')},
    // {$set : {
    //     completed: true
    // }}, {
    //     returnOriginal : true
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
        
    // });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5ae208da0d044c17308c6d47')}, {
        $set: {
            name: 'DoubleK'
        },
        $inc: {
            age: 10
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
        
    }).catch((err) => {
        
    });

    client.close();
});