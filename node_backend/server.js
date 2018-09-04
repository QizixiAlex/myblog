const http = require('http');
const app = require('./app');
const debug = require('debug')('node-angular');

const normalizedPort = val => {
  let port = parseInt(val,10);
  if (isNaN(port)) {
    //pipe
    return val;
  }else if (port >= 0) {
    //port number
    return port;
  }else {
    return false;
  }
};

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe" + port : "port" + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDTINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizedPort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
