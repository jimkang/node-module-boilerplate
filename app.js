var qs = require('qs');

((function go() {
  var div = document.createElement('div');
  div.innerText = 'Oh hay you need to make an app here.'
  document.body.appendChild(div);

  route();
})());

function route() {
  // Skip the # part of the hash.
  var routeDict = qs.parse(window.location.hash.slice(1));

  // Routing logic
}
