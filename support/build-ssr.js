'use strict';

process.env['NODE_ENV'] = 'production';

const compiler = require('./utils/compiler').default;
const chalk = require('chalk');

console.log(
  chalk.magenta('[INFO]') +
  ' Before running SSR production build you have to run ' +
  chalk.underline('npm run build') +
  ' to create an optimized production build of your ' +
  chalk.underline('create-react-app') + ' application.'
);

console.log(chalk.cyan('\nCreating production SSR build...\n'));

compiler.run((err, stats) => {
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

  console.log(chalk.green('\nBuild successful!'));
});