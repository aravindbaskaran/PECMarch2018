// TODO Make it a module and refer the methods in index.js
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

function findFluffy() {
  Kitten.find({ name: 'fluffy' }, function (err, kittens) {
    if (err) return console.error(err);
    console.log('fluffy', kittens);
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
