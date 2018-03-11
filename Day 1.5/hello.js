/*
console.log("Hello!", typeof "Hello!");

console.log(1, typeof 1);
console.log(2.20, typeof 2.20);

console.log(true, typeof true);
console.log(false, typeof false);

console.log([], typeof []);
console.log({}, typeof {});

console.log(console.log, typeof console.log);
*/

// var x = "Hello!";
// console.log(x, typeof x);

function sum(a, b) {
  if(typeof a == 'number' && typeof b == 'number') {
    var result = a + b;
    console.log("Sum of " + a + " and " + b + " is", result);
    return result;
  } else {
    console.error("Invalid inputs");
  }
}

function sumMulti(numArray) {
  var c = 0, errorNumArray = [];
  for(var i = 0; i < numArray.length; i++) {
    if(typeof numArray[i] == 'number') {
      c = c + numArray[i];
    } else {
      // var errorNumObj = {};
      // errorNumObj.val = numArray[i];
      // errorNumObj.idx = i;
      // errorNumArray.push(errorNumObj);
      errorNumArray.push({
        "val": numArray[i],
        "idx": i
      });
    }
  }
  if(errorNumArray.length > 0){
    console.error("Invalid inputs", errorNumArray);
  } else {
    console.log("Sum of " + numArray.join(','), "is", c);
    return c;
  }
}


sumMulti([1, 2, 3, 4, 5, 6, 7, 8]);
sumMulti([5, 6, 7, 8]);
sumMulti([1, 2]);
sumMulti(["mystr", 2, "lets"]);


//var x = 10, y = 20;
//var result = sum(x, y);
//console.log("Sum of " + x + " and " + y + " is", result);
// sum(10, 20);

// var x = 30, y = 40;
// var result = sum(x, y);
// console.log("Sum of " + x + " and " + y + " is", result);
// sum(30, 40);

//50 + 60
// var x = 50, y = 60;
// var result = sum(x, y);
// console.log("Sum of " + x + " and " + y + " is", result);
// sum(50, 60);
// sum("mystr", 100);
