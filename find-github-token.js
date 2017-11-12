var request = require('basic-browser-request');
var sb = require('standard-bail')();

// routeDict should be a dictionary derived from the URL route. It can be empty, but not undefined.
// store should be an object that behaves like localStorage. It can be empty, but not undefined.
function findGitHubToken({ code, appName, codeExchangeURL }, done) {
  var reqOpts = {
    method: 'GET',
    url: codeExchangeURL + '?code=' + code + '&app=' + appName
  };
  request(reqOpts, sb(extractToken, done));

  function extractToken(res, body) {
    if (res.statusCode === 200 && body) {
      done(null, body);
    } else {
      done(new Error('Could not get the token from token exchanger.'));
    }
  }
}

module.exports = findGitHubToken;
