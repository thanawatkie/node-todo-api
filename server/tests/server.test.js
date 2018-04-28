const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 444
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done()).catch((e) => {
        console.log(e);
    });
})


describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
                expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
              return done(err);
            }

            Todo.find().then((result) => {
                expect(result.length).toBe(3);
                expect(result[2].text).toBe(text);
                done();
            }).catch((err) => done(err));   
        });
    });

    it('should not create to with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find().then((result) => {
                expect(result.length).toBe(2);
                done();
            }).catch((err) => done(err));

        });
    });

    describe('Get /todos', () => {
        it('should get all todos', (done) => {
            request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
        })
    })


    describe('Get /todos/:id', () => {
        it('should return todo doc', (done) => {
            request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
                
            })
            .end(done);
        });

        it('should return 404 if todo not found', (done) => {
            var id = new ObjectID();
            request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
        });

        it('should return 404 for non-object ids', (done) => {
            var id = 1234;
            request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
        })
    });

    describe('Delete /todos/:id', () => {

        it('should remove a todo', (done) => {
            var hexId = todos[1]._id.toHexString();
            
            request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }
            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((err) => {
                done(err);
            });
            }); 
        });

        it('should return 404 if todo not found', (done) => {
            var hexId = new ObjectID().toHexString();
            request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
        });

        it('should return 404 for non-object ids', (done) => {
            var id = 1234;
            request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
        });
    });

    describe('Patch /todos/:id', () => {
        it('should update the todo', (done) => {
            var hexId = todos[0]._id.toHexString();

            request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text: 'This come from mocha test',
                completed: true
            })
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe('This come from mocha test');
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
        });
        it('should clear completedAt when to is not completed', (done) => {

            var hexId = todos[1]._id.toHexString();

            request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text: 'This come from mocha test again',
                completed: false
            })
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe('This come from mocha test again');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
        });

        it('should return 404 for non-object ids', (done) => {
            var id = 1234;
            request(app)
            .patch(`/todos/${id}`)
            .expect(404)
            .end(done);
        });
    });
}) 