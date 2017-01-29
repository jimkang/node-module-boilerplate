#!/usr/bin/env node

/* global process */

var YetAnotherServer = require('./yet-another-server');
var logFormat = require('log-format');
const port = 6666;

YetAnotherServer(useServer);

function useServer(error, server) {
  if (error) {
    process.stderr.write(error);
    process.exit(1);
    return;
  }
  
  server.listen(port, onReady);

  function onReady(error) {
    if (error) {
      process.stderr.write(error);
    }
    else {
      process.stdout.write(logFormat(server.name, 'listening at', server.url));
    }
  }
}
