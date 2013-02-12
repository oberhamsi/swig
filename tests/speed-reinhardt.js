var reinhardt = require('reinhardt'),
  tplF,
  tplS,
  array,
  output,
  d,
  i;
console.log();
console.log('Starting speed tests...');


var tpls = {
  'objLoop': '{% for foo in bar %}{{ forloop.counter }} - {{ foo }}{% endfor %}',
}
// register fake template loader for unit tests
var FakeTemplateLoader = function() {
  this.loadTemplateSource = function(templateName) {
      if (tpls[templateName]) {
            return tpls[templateName];
      }
      return null;
  }
  return this;
}

var reinEnv = new reinhardt.Environment({
  loader: new FakeTemplateLoader(),
});


tplF = reinEnv.getTemplate('objLoop');
/*
@@ OBJECT LOOP NOT SUPPORTED'@@
console.time('object loop');
i = 10000;
d = new Date();
while (i) {
  i -= 1;
  tplF.render({bar: { foo: 'bar', bar: 'baz', baz: 'bop' }});
}
console.timeEnd('object loop');
console.log("  ~ " + Math.round(1000000 / (new Date() - d)) + " renders per sec.");
*/

console.time('array loop');
i = 10000;
d = new Date();
while (i) {
  i -= 1;
  tplF.render({ bar: [ 'bar', 'baz', 'bop' ]});
}
console.timeEnd('array loop');
console.log("  ~ " + Math.round(1000000 / (new Date() - d)) + " renders per sec.");

/*
@@ there is no compile step @@
tplString = "{% for v in array %}" +
  "{% if 1 %}" +
  "{% for k in v %}" +
  "\n{{loop.index}} {{k}}: " +
  "{% if loop.index in 'msafas' %}" +
  "<p>Hello World {{k}}{{foo}}{{k}}{{foo}}{{k}}{{foo}}</p>" +
  "{% endif %}" +
  "{% endfor %}" +
  "{% endif %}" +
  "{% endfor %}";

i = 1000;
console.time('Compile one template 1000 times');
d = new Date();
while (i) {
  i -= 1;
  tplS = swig.compile(tplString);
}
console.timeEnd('Compile one template 1000 times');
console.log("  ~ " + Math.round(1000000 / (new Date() - d)) + " renders per sec.");
*/

reinEnv = new reinhardt.Environment({
  loader: module.resolve('./reinhardt/templates/'),
});

array = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { af: "s", baz: "d", d: "f" }, "zeus"];
tplF = reinEnv.getTemplate('include_base.html')

i = 1000;
console.time('Render 1000 Includes Templates');
d = new Date();
while (i) {
  i -= 1;
  tplF.render({ array: array, foo: "baz", "included": "included.html" });
}
// @@ to compare output
print(tplF.render({ array: array, foo: "baz", "included": "included.html" }))

console.timeEnd('Render 1000 Includes Templates');
console.log("  ~ " + Math.round(1000000 / (new Date() - d)) + " renders per sec.");

tplF = reinEnv.getTemplate("extends_2.html");

i = 1000;
console.time('Render 1000 Extends Templates');
d = new Date();
while (i) {
  i -= 1;
  tplF.render({ array: array, foo: "baz", "included": "included.html" });
}
console.timeEnd('Render 1000 Extends Templates');
console.log("  ~ " + Math.round(1000000 / (new Date() - d)) + " renders per sec.");
