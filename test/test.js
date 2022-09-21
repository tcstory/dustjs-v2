const dust = require('../lib/index')

var compiled = dust.compile(`<p>Hello {world}!</p>`, 'hello');
// console.log('compiled', compiled)
// dust.loadSource(compiled);
// dust.render('hello', { world: "Venus" }, function(err, out) {
//   // `out` contains the rendered output.
//   console.log(out);
// });
