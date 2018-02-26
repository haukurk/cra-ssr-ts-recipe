'use strict';
// see https://github.com/remy/nodemon/issues/95#issuecomment-143423483
process.stdout.isTTY = true;

process.env['NODE_ENV'] = 'development';

const path = require('path');
const compiler = require('./utils/compiler').default;
const compilerConfig = require('./utils/compiler').config;
const spawnNodemon = require('./utils/nodemon').default;
const chalk = require('chalk');

console.log(
  chalk.magenta('\n[INFO]') + ' For correct work you have to start' +
  ' your ' + chalk.underline('create-react-app') + ' server with '+
  chalk.underline('npm start') + ' command.'
);

const bundlePath = path.resolve(
  compilerConfig.output.path,
  compilerConfig.output.filename
);

let nodemon;

console.log(chalk.cyan('\nWebpack starts to build and watch your files...\n'));

compiler.watch(null, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  const statsString = stats.toString({
    colors: true
  });

  console.log(statsString);

  console.log(
    chalk.magenta('[Webpack]') +
    ' Compiled' + chalk.grey(' [timestamp:' + Date.now() + ']')
  );
  // spawn nodemon process if it wasn't already spawned
  if (!nodemon){
    console.log(chalk.cyan('\nStarting nodemon...\n'));
    nodemon = spawnNodemon(bundlePath);
  }
});