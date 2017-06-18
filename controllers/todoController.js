var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;

//Connect to the database
//mongoose.connect('mongodb://shwb:a35224851*@shwb-todo-shard-00-00-sgy9x.mongodb.net:27017,shwb-todo-shard-00-01-sgy9x.mongodb.net:27017,shwb-todo-shard-00-02-sgy9x.mongodb.net:27017/shwb-todo?ssl=true&replicaSet=shwb-todo-shard-0&authSource=admin')
mongoose.connect('mongodb://localhost/shwbtodo');

//Create a schema -this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

//Create a model named 'Todo'
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  //get data from mongodb and pass it to view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  });
});

app.post('/todo',urlencodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item', function(req, res){
  //delete the responsed item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
    res.json(data);

  })
});
}
