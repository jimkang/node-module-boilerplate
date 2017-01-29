var restify = require('restify');
var callNextTick = require('call-next-tick');

function YetAnotherServer(done) {
  var server = restify.createServer({
    name: 'simple-example-server'
  });

  server.use(restify.CORS());
  server.use(restify.queryParser());

  server.get('/health', respondOK);
  server.head(/.*/, respondHead);

  // Do async init here, if needed, then call callback.
  callNextTick(done, null, server);
}

function respondOK(req, res, next) {
  res.send(200, 'OK!');
  next();
}

function respondHead(req, res, next) {
  res.writeHead(
    200, 
    {
      'content-type': 'application/json'
    }
  );
  res.end();
  next();
}

module.exports = YetAnotherServer;
