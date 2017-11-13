var YAML = require('yamljs');
var GitHubFile = require('github-file');
var request = require('basic-browser-request');

function SaveYAMLData({ gitRepoOwner, repo, token, githubFilePath }) {
  var githubFile = GitHubFile({
    branch: 'gh-pages',
    gitRepoOwner,
    gitToken: token,
    repo,
    request
  });

  return saveYAMLData;

  function saveYAMLData(data, done) {
    var yamlString = YAML.stringify(data, 10, 2);
    githubFile.update({ filePath: githubFilePath, content: yamlString }, done);
  }
}

module.exports = SaveYAMLData;
