// imports
var fs = require('fs-extra');
var request = require('request');
var unzip = require('unzip');
var resolve = require('path').resolve;

// vars
var githubUrl = 'https://github.com/Igosuki/compass-mixins/archive/master.zip';
var importRegexp = /^compass/;

// dirs and files
var cacheDirectory = resolve(__dirname + '/.compass');
var libPath = resolve(cacheDirectory + '/compass-mixins-master/lib/');
var headerFile = resolve(cacheDirectory  + '/headers.json');

var headers = fs.existsSync(headerFile) && fs.readJsonSync(headerFile);

var safeUpdate = once(update);

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

  var file = resolve(libPath +'/'+ path);

  if (!importRegexp.test(path))
    return done({file: path});

  if (!headers)
    return download(callback);

  safeUpdate();
  callback();

  function callback(){

    done({file: file})
  }
}

/**
 * update the installed version of compass only if not uptodate
 * @param callback
 */
function update(callback){

  request.head(githubUrl).on('response', function (res) {

    console.log('verifying compass ...');

    if(headers.etag !== res.headers.etag)
      download(callback)
  });
}

/**
 * downolad the latest version on compass
 * @param callback
 */
function download(callback) {

  console.log('downloading compass ...');

  request
    .get(githubUrl)
    .on('error', console.log.bind(console))
    .on('response', function (res) {

      headers = res.headers;

      fs.writeJson(headerFile, res.headers);
    })
    .pipe(unzip.Extract({path: cacheDirectory}))
    .on('close', function () {

      console.log('latest version installed');

      if(callback) callback();
    });
}

// execute a function only if it's not in progress
function once(fn){

  var progress = false;

  return function(callback){

    if(progress) return;

    progress = true;

    fn(function(){

      progress = false;

      if(callback) callback();
    })
  }
}