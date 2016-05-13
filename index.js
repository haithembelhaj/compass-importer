// imports
var resolve = require('path').resolve;
var sync = require('resolve').sync;

var compassPath = sync('@haithembelhaj/compass-mixins');
var libPath = resolve(compassPath, '..');

var compassRegexp = /^compass($|\/)|^animation($|\/)/;

// exports
module.exports = importer;

/**
 * The compass importer
 * redirects compass imports to the mixin file and
 * checks the installed mixins version
 *
 * @param path
 * @param _
 * @param done
 * @returns {*}
 */
function importer(path, _, done) {

  if (!compassRegexp.test(path))
    return done({file: path});

  return done({file: resolve(libPath,  path)})
}
