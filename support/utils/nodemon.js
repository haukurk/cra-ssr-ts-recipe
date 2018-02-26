const nodemon = require('nodemon');
const chalk = require('chalk');

function spawnNodemon(filePath){
  nodemon({
    script: filePath,
    ext: 'js json'
  });

  nodemon
    .on('start', function () {
      console.log(
        chalk.yellow('[nodemon]') +
        ' App has started'
      );
    })
    .on('quit', function () {
      console.log(
        chalk.yellow('[nodemon]') +
        ' App has quit'
      );
    })
    .on('restart', function (files) {
      console.log(
        chalk.yellow('[nodemon]') +
        ' App restarted due to: ' +
        files
      );
    });

  process.once('SIGINT', function() {
    nodemon.once('exit', function() {
      process.exit();
    });
  });

  return nodemon;
}

exports.default = spawnNodemon;