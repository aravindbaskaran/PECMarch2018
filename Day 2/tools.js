module.exports = {
  sum: function (a, b) {
    var areNumbers = (typeof a == 'number' && typeof b == 'number');
    var areNaNs = (isNaN(a) || isNaN(b));
    if(areNumbers && !areNaNs) {
      //1. Add isNaN check
      var result = a + b;
      console.log("Sum of " + a + " and " + b + " is", result);
      return result;
    } else {
      console.error("Invalid inputs");
      return {
        "err": "Invalid input",
        "cause": "areNumbers - " + areNumbers + " areNaNs - " + areNaNs
      };
    }
  },
  sumMulti: function (numArray) {
    var c = 0, errorNumArray = [];
    for(var i = 0; i < numArray.length; i++) {
      //1. Add isNaN check
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
    //2. Return valid error object
    if(errorNumArray.length > 0){
      console.error("Invalid inputs", errorNumArray);
    } else {
      console.log("Sum of " + numArray.join(','), "is", c);
      return c;
    }
  }
};
