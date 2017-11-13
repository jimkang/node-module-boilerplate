var SaveYAMLData = require('../save-yaml-data');
var loadYAMLData = require('../load-yaml-data');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();

const ghPagesBaseURL = 'http://jimkang.com';
const gitRepoOwner = 'jimkang';
const repo = 'github-file-test';
const githubFilePath = 'directory-a/test.yaml';

function readWriteFromStoreFlow({ token }) {
  var saveYAMLData = SaveYAMLData({
    gitRepoOwner,
    repo,
    token,
    githubFilePath
  });
  loadYAMLData(
    { ghPagesBaseURL, repo, token, githubFilePath },
    sb(modifyData, handleError)
  );

  function modifyData(data) {
    console.log('Loaded YAML data:', data);
    data.push({
      text: 'The secret code to enter the tower is: ' + ~~(Math.random * 1000),
      topics: ['secrets', 'tower']
    });
    saveYAMLData(data, sb(logSaveResult));
  }

  function logSaveResult() {
    console.log(
      'Saved data! Check out:',
      ghPagesBaseURL + '/' + repo + '/' + githubFilePath
    );
  }
}

module.exports = readWriteFromStoreFlow;
