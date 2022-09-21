const compiler = require('./compiler');

const pkg = require('../package.json')


const dust = {
    "version": pkg.version,
  },
  NONE = 'NONE', ERROR = 'ERROR', WARN = 'WARN', INFO = 'INFO', DEBUG = 'DEBUG',
  EMPTY_FUNC = function() {};

dust.compiler = compiler;
dust.compile = function (...args) {
  return compiler.compile(...args)
}

module.exports = dust;
