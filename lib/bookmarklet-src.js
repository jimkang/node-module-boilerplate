var createModule = require('./yet-another-bookmarklet/index').create;

var transformFunction = createModule();

function getAllNodesWithText() {
  var allNodes = document.querySelectorAll('body *');
  var nodesWithText = [];

  for (var i = 0; i < allNodes.length; ++i) {
    var node = allNodes[i];
    if (node.tagName !== 'BR' &&
      node.innerText &&
      (!node.children || node.children.length === 0)) {

      nodesWithText.push(node);
    }
  }

  return nodesWithText;
}

var nodesWithText = getAllNodesWithText();

nodesWithText.forEach(transform);

function transform(node) {
  transformFunction(node.innerText, updateNode);

  function updateNode(error, text) {
    if (!error) {
      node.innerText = text;
    }
  }
}
