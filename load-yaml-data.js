var YAML = require('yamljs');
var request = require('basic-browser-request');
var sb = require('standard-bail')();

function loadYAMLData(
  { ghPagesBaseURL, repo, githubFilePath, yamlParseFn },
  loadDone
) {
  if (!yamlParseFn) {
    yamlParseFn = YAML.parse;
  }

  var reqOpts = {
    url: ghPagesBaseURL + '/' + repo + '/' + githubFilePath,
    method: 'GET'
  };
  request(reqOpts, sb(parseFile, loadDone));

  function parseFile(res, body, done) {
    var parsed = yamlParseFn(body);
    done(null, parsed);
  }
}

module.exports = loadYAMLData;
