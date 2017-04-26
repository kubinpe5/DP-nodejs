// Originally from: https://benchmarkjs.com/
document.getElementById("prerequisities").innerHTML = "Benchmark.platform:";
console.log("Benchmark.platform:");

for (let key in Benchmark.platform) {
    if (Benchmark.platform.hasOwnProperty(key)) {
        console.log("    ", key, Benchmark.platform[key]);
    }
    if ( Benchmark.platform.hasOwnProperty(key) && 
    		key == "description" || key == "ua" || key == "" || key == "os" || 
    		key == "version" || key == "name" || key == "layout") {
    	var breakline = document.createElement("br");
        var node = document.createTextNode(key + ", " + Benchmark.platform[key]);
        document.getElementById("description").appendChild(node);
        document.getElementById("description").appendChild(breakline);
    }
}

var div = document.getElementById('prerequisities');
var innerDiv = document.createTextNode('Performance test to determine fastest is in progress; please wait...');
div.appendChild(document.createElement("br"));
div.appendChild(innerDiv);

console.log("\n Performance test to determine fastest is in progress; please wait...");

var suite = new Benchmark.Suite;

// add tests
suite.add('(a > b) - (a < b)', function() {
  var test = theArray.slice().sort(function(a, b) { return (a > b) - (a < b); });
  if (test.join() !== sortedResult) throw new Error("Error in test");
})
.add('(a < b) ? -1 : (a > b) ? 1 : 0', function() {
  var test = theArray.slice().sort(function(a, b) { return (a < b) ? -1 : (a > b) ? 1 : 0; });
  if (test.join() !== sortedResult) throw new Error("Error in test");
})
.add('a == b ? 0 : a < b ? -1 : 1', function() {
  var test = theArray.slice().sort(function(a, b) { return a == b ? 0 : a < b ? -1 : 1; });
  if (test.join() !== sortedResult) throw new Error("Error in test");
})
// add listeners
.on('cycle', function(event) {
  var obj = document.createTextNode(String(event.target), event);
  var breakline = document.createElement("br");
  document.getElementById("test_case").appendChild(obj);
  document.getElementById("test_case").appendChild(breakline);
  console.log(String(event.target), event);
})
.on('complete', function() {
  document.getElementById("result").innerHTML = 'Fastest is ' + this.filter('fastest').map('name') + "</br>";
  document.getElementById("result").innerHTML += 'Slowest is ' + this.filter('slowest').map('name');
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  console.log('Fastest is ' + this.filter('slowest').map('name'));
})
// run async
.run({ 'async': true });