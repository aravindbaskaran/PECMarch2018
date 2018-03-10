var express = require('express');
var app = express();
var tools = require('./tools');

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


app.listen(3000, function() {
  console.log("I am listening at port 3000");
});
