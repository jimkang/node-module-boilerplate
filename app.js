var RouteState = require('route-state');
var handleError = require('handle-error-web');
var redirectToAuth = require('./redirect-to-auth');
var qs = require('qs');

var routeState = RouteState({
  followRoute: followRoute,
  windowObject: window
});

((function go() {
  routeState.routeFromHash();
  window.onerror = reportTopLevelError;
})());

function followRoute(routeDict) {
  if (!routeDict.access_token) {
    redirectToAuth(routeDict);
    return;
  }

  if (routeDict.state) {
    var thawedDict = unpackRoute(routeDict.state);
    thawedDict.access_token = routeDict.access_token;
    routeState.overwriteRouteEntirely(thawedDict);
    return;
  }

  console.log(routeDict.code);
  // Use the code to get an access token.
  // TODO: Look at the key-value pairs in routeDict and decide how your app should respond based on that.
}

function unpackRoute(encodedStateFromRedirect) {
  return qs.parse(decodeURIComponent(encodedStateFromRedirect));
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
