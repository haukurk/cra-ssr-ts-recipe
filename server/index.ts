require('es6-promise').polyfill();
require('fetch-everywhere');

import app from './app';

const PORT = process.env.PORT || 3101;

// Why don't I need http createServer
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${PORT}!`);
});
app.on('error', onError);

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // tslint:disable-next-line:no-console
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // tslint:disable-next-line:no-console
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
