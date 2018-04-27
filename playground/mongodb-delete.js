const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongod server');
    const db = client.db('TodoApp');

    //DeleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    // });;

    //DeleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
        
    // });
    //Find one and delete
    //  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
         
    //  }).catch((err) => {
         
    //  });

    // db.collection('Users').deleteMany({name: 'DoubleK'}).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
        
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5ae290b57dc67d32a4fab89f')}).then((result) => {
        console.log(result);
    }).catch((err) => {
        
    });
    client.close();
});