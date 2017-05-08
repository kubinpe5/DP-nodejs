var result = {
  result: [],

  addLine: function( line ) {
    this.result.push( line );
    return this;
  },

  getResult: function() {
    return this.result;
  }

};

document.getElementById("prerequisities").innerHTML = "Benchmark.platform:";
console.log("Benchmark.platform:");

for (let key in Benchmark.platform) {
    if ( Benchmark.platform.hasOwnProperty(key) && 
        key == "description" || key == "ua" || key == "" || key == "os" || 
        key == "version" || key == "name" || key == "layout") {
      var breakline = document.createElement("br");
        var node = document.createTextNode(key + ", " + Benchmark.platform[key]);
        document.getElementById("description").appendChild(node);
        document.getElementById("description").appendChild(breakline);
        result.addLine(key + ", " + Benchmark.platform[key]);
    }
}

var div = document.getElementById('prerequisities');
var innerDiv = document.createTextNode('Performance test to determine fastest is in progress; please wait...');
div.appendChild(document.createElement("br"));
div.appendChild(innerDiv);

console.log("\n Performance test to determine fastest is in progress; please wait...");

var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
.add('String#match', function() {
  !!'Hello World!'.match(/o/);
})
// add listeners
.on('cycle', function(event) {
  var obj = document.createTextNode(String(event.target), event);
  var breakline = document.createElement("br");
  document.getElementById("test_case").appendChild(obj);
  document.getElementById("test_case").appendChild(breakline);
  console.log(String(event.target), event);
  result.addLine(String(event.target), event);
})
.on('complete', function() {
  document.getElementById("result").innerHTML = 'Fastest is ' + this.filter('fastest').map('name') + "</br>";
  document.getElementById("result").innerHTML += 'Slowest is ' + this.filter('slowest').map('name');
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  console.log('Fastest is ' + this.filter('slowest').map('name'));
  result.addLine('Fastest is ' + this.filter('fastest').map('name'));
  result.addLine('Slowest is ' + this.filter('slowest').map('name'));
  axios.post('/results', { results: result });
})
// run async
.run({ 'async': true });