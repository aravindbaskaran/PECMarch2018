var express = require('express');
var app = express();
var tools = require('./tools');

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongocourseadmin:XoTczFpO5FSMkQHY@csemarch2018-shard-00-00-jvub0.mongodb.net:27017,csemarch2018-shard-00-01-jvub0.mongodb.net:27017,csemarch2018-shard-00-02-jvub0.mongodb.net:27017/test?ssl=true&replicaSet=CSEMarch2018-shard-0&authSource=admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Mongoose Connected!');
});



var bodyParser = require('body-parser');
// to support JSON-encoded bodies
app.use( bodyParser.json() );
// to support URL-encoded bodies
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.get('/', function(req, res){
  res.send("Hello from CSE");
});

app.get('/echo/:strinput', function(req, res){
  // Read parameters
  console.log(req.params.strinput);
  // Send them back
  res.send("Echo - " + req.params.strinput);
});

// Eg: abcd.com/:param1/:param2/test/:param3
// abcd.com/myfirstparam/mysecondparam/test/mythirdparam
// param1 = myfirstparam
// param2 = mysecondparam
// param3 = mythirdparam

// http://localhost:3000/sum/10/20
// Prints 30
// http://localhost:3000/sum/310/200
// Prints 510
app.get('/sum/:a/:b', function(req, res) {
  var a = parseInt(req.params.a);
  var b = parseInt(req.params.b);

  console.log(a, typeof a);
  console.log(b, typeof b);

  var s = tools.sum(a, b);
  res.send("The sum is " + JSON.stringify(s));
});

app.get('/sumMulti/:numArray', function(req, res) {
  var numArray = req.params.numArray.split(',');

  console.log(numArray);

  var s = tools.sumMulti(numArray);
  res.send("The sum is " + JSON.stringify(s));
});

// Create post, we want to get the post data and
// later store in mongodb

app.post('/test-post', function(req, res) {
    var name = req.body.name,
        color = req.body.color;
    // Store in mongodb
    res.send("You sent - " + JSON.stringify(req.body));
});

app.get('/kittens/:name', function(req, res) {
  var kittenName = req.params.name;
  findKitten(kittenName, res);
});


app.listen(3000, function() {
  console.log("I am listening at port 3000");
});



var kittySchema = mongoose.Schema({
  name: String,
  color: String
});
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  greeting = greeting + (
    this.color ? ("My color is " + this.color)
    : ""
  );
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

function createFluffy(){
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
}

function createTom(){
  var tom = new Kitten({ name: 'tom' });
  tom.speak(); // "Meow name is fluffy"

  tom.save(function (err, tom) {
    if (err) return console.error(err);
    tom.speak();
  });
}
//createTom();

function findKittens() {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
}

function findKitten(name, res) {
  Kitten.find({ name: name }, function (err, kittens) {
    if (err) return console.error(err);
    console.log(name, kittens);
    res.send(JSON.stringify(kittens));
  });
}

function updateToms() {
  Kitten.find({ name: 'tom' }, function (err, kittens) {
    if (err) return console.error(err);
    console.log('tom', kittens);
    try {
      //for(var i = 0; i < kittens.length; i++)
      kittens.forEach(function(tom) {
        tom.color = 'grey';
        tom.save(function (err, tom) {
          if (err) return console.error(err);
          tom.speak();
        });
      });
    } catch(err) {
      console.log('Error saving toms', err);
    }
  });
}
