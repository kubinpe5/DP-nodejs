// Originally from: https://benchmarkjs.com/
var result = {
  result: [],

  addLine: function( line ) {
    this.result.push( line + "\n");
    return this;
  },

  getResult: function() {
    return this.result;
  }

};

document.getElementById("prerequisities").innerHTML = "Benchmark.platform:";
//console.log("Benchmark.platform:");

for (let key in Benchmark.platform) {
    if (Benchmark.platform.hasOwnProperty(key)) {
  //      console.log("    ", key, Benchmark.platform[key]);
    }
    if ( Benchmark.platform.hasOwnProperty(key) && 
    		key == "description" || key == "ua" || key == "" || key == "os" || 
    		key == "version" || key == "name" || key == "layout") {
    	var breakline = document.createElement("br");
        var node = document.createTextNode(key + ", " + Benchmark.platform[key]);
        result.addLine(key + ", " + Benchmark.platform[key]);
        document.getElementById("description").appendChild(node);
        document.getElementById("description").appendChild(breakline);
    }
}

var div = document.getElementById('prerequisities');
var innerDiv = document.createTextNode('Performance test to determine fastest is in progress; please wait...');
div.appendChild(document.createElement("br"));
div.appendChild(innerDiv);

//console.log("\n Performance test to determine fastest is in progress; please wait...");
result.addLine("\n Performance test to determine fastest is in progress; please wait...");

var suite = new Benchmark.Suite;

//suite.cycles = 1000;
// add tests
suite.add('For loop, basic', function() {
  for( var i = 0; i < array.length; i++ ) {
    myFunction(i);
  }
})
.add('For loop, cached', function() {
  for( var i = 0, length = array.length; i < length; i++ ) {
    myFunction(i);
  }
})
.add('For loop, reversed', function() {
  for( var i = array.length-1; i >= 0; i-- ) {
    myFunction(i);
  }
})
.add('For loop, jQuery', function() {
  $.each(array, function(i){
    myFunction(i);
  });
})
.add('For loop, underscore', function() {
  _.each(array, function(i){
    myFunction(i);
  });
})
.add('Foreach loop', function() {
  array.forEach(function(value, i, array){
    myFunction(i);
  });
})
.add('For in loop', function() {
  for( var i in array ) {
    myFunction(i);
  }
})
.add('While loop, basic', function() {
  var i = 0;
  while (i < array.length) {
    myFunction(i);
    i++;
  };
})
.add('While loop, cached', function() {
  var i = 0,
    length = array.length;
  while (i < length) {
    myFunction(i);
    i++;
  };
})
.add('While loop, reversed', function() {
  var i = array.length;
  while (i--) {
    myFunction(i);
  };
})
// add listeners
.on('cycle', function(event) {
  var obj = document.createTextNode(String(event.target), event);
  var breakline = document.createElement("br");
  document.getElementById("test_case").appendChild(obj);
  document.getElementById("test_case").appendChild(breakline);
  //console.log(String(event.target), event);
  result.addLine(String(event.target), event);
})
.on('complete', function() {
  document.getElementById("result").innerHTML = 'Fastest is ' + this.filter('fastest').map('name') + "</br>";
  document.getElementById("result").innerHTML += 'Slowest is ' + this.filter('slowest').map('name');
  //console.log('Fastest is ' + this.filter('fastest').map('name'));
  //console.log('Fastest is ' + this.filter('slowest').map('name'));
  result.addLine('Fastest is ' + this.filter('fastest').map('name'));
  result.addLine('Slowest is ' + this.filter('slowest').map('name'));
  console.log(result.getResult());
})
// run async
.run({ 'async': true });