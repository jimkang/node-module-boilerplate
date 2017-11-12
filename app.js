var RouteState = require('route-state');
var handleError = require('handle-error-web');
var redirectToAuth = require('./redirect-to-auth');
var qs = require('qs');
var findGitHubToken = require('./find-github-token');
var sb = require('standard-bail')();
var config = require('./config');

var routeState = RouteState({
  followRoute,
  windowObject: window
});

(function go() {
  window.onerror = reportTopLevelError;
  routeState.routeFromHash();
})();

function followRoute(routeDict) {
  if (routeDict.token) {
    if (routeDict.state) {
      var thawedDict = unpackRoute(routeDict.state);
      routeState.overwriteRouteEntirely(thawedDict);
    } else {
      followRouteUsingToken(routeDict);
    }
  } else {
    let queryDict = qs.parse(window.location.search.slice(1));
    if (queryDict.code) {
      findGitHubToken(
        {
          code: queryDict.code,
          codeExchangeURL: config.github.codeExchangeURL,
          appName: config.github.appName
        },
        sb(addTokenToRoute, handleError)
      );
    } else {
      redirectToAuth({
        routeDict,
        clientId: config.github.clientId,
        scopes: ['public_repo']
      });
    }
  }
}

function followRouteUsingToken(routeDict) {
  // TODO: Look at the key-value pairs in routeDict and decide how your app
  // should respond based on that.
  console.log(routeDict.token);
}

function addTokenToRoute(token) {
  routeState.addToRoute({ token });
}

function unpackRoute(encodedStateFromRedirect) {
  return qs.parse(decodeURIComponent(encodedStateFromRedirect));
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
