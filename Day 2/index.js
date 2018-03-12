var express = require('express');
var app = express();
var mustache = require('mustache');
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
app.use(bodyParser.urlencoded({
  extended: true
}));

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
  findKitten(kittenName, function(kittens){
    res.send(JSON.stringify(kittens));
  });
});
app.post('/kittens', function(req, res) {
  var kittenName = req.body.name;
  var color = req.body.color;
  findKitten(kittenName, function(kittens){
    if(kittens.length == 0) {
      var newKitten = new Kitten({ name: kittenName, color: color });
      newKitten.save(function(err) {
        if (err) return console.error(err);
        res.send('New kitten adopted');
      });
    }
  });
});
var kittenFormTmpl = '\
<html>\
  <head>\
    <title>Adopt a kitten!</title>\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\
    <style>\
      body {\
        font-family: Verdana, "Helevetica", Arial, sans-serif;\
        color: #333;\
      }\
      .form-element {\
        margin: 10px;\
      }\
      .form-element input {\
        margin: 10px;\
        font-size: 20px;\
        -webkit-appearance: none;\
        border: none;\
        border-bottom: 1px solid;\
      }\
      form.form-container {\
        max-width: 600px;\
        margin: auto;\
        text-align: center;\
        font-size: 20px;\
      }\
      .form-element button {\
        -webkit-appearance: none;\
        padding: 20px;\
        font-size: 15px;\
        margin: 10px;\
      }\
    </style>\
  </head>\
  <body>\
    <h3>Adopt a kitten</h3>\
    <form action="/kittens" method="POST" class="form-container">\
      <div class="form-element">\
        <label>Name</label>\
        <input name="name" required minlength="2"/>\
      </div>\
      <div class="form-element">\
        <label>Color</label>\
        <input name="color" required/>\
      </div>\
      <div class="form-element">\
        <button type="submit">Submit</button>\
        <button type="cancel">Cancel</button>\
      </div>\
    </form>\
  </body>\
</html>\
';
app.get('/kittens/create/new', function(req, res){
  res.send(mustache.render(kittenFormTmpl, {}));
});

var tmpl = '<html>\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\
    <style>\
    body {\
      font-family: Verdana, "Helevetica", Arial, sans-serif;\
      color: #333;\
    }\
    ul{list-style: none;padding: 10px;border: 1px solid;}\
    li{padding: 20px;}\
    </style>\
    <ul>\
    {{#kittens}}\
      <li style="background: {{color}}">\
        My name is <strong>{{name}}</strong> and\
        my color is\
        <span>{{color}}</span></li>\
    {{/kittens}}\
    </ul>\
  </html>';

app.get('/kittens/see/:name', function(req, res) {
  var kittenName = req.params.name;
  findKitten(kittenName, function(data){
    var renderedTmpl = mustache.render(tmpl, {"kittens": data});
    //console.log(renderedTmpl);
    res.send(renderedTmpl);
  });
});
app.get('/kittens/all/see', function(req, res) {
  var kittenName = req.params.name;
  findKittens(function(data){
    var renderedTmpl = mustache.render(tmpl, {"kittens": data});
    //console.log(renderedTmpl);
    res.send(renderedTmpl);
  });
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

function findKittens(callback) {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    //console.log(kittens);
    callback(kittens);
  });
}

function findKitten(name, callback) {
  Kitten.find({ name: name }, function (err, kittens) {
    if (err) return console.error(err);
    //console.log(name, kittens);
    callback(kittens);
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
