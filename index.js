var resolve = require('path').resolve;

module.exports = function(path, prev, done) {

    var request, fs, oldHeaders;
    var self = this;
    var githubUrl = 'https://github.com/Igosuki/compass-mixins/archive/master.zip';

    this.cacheDirectory = this.cacheDirectory || resolve(__dirname + '/.compass');

    var file = resolve(this.cacheDirectory + '/compass-mixins-master/lib/' + path);
    var headerFile = resolve(this.cacheDirectory  + '/headers.json');

    if (!/^compass/.test(path))
        return done({file: path});

    fs = require('fs-extra');
    request = require('request');


    if (!fs.existsSync(headerFile))
        return download();

    done({file: file});

    oldHeaders = fs.readJsonSync(headerFile);

    console.log('verify compass version ...');

    request.head(githubUrl)
        .on('response', function (res) {
            if (oldHeaders.etag !== res.headers.etag)
                download()
        });


    function download() {

        var unzip = require('unzip');

        console.log('downloading compass ...');

        request
            .get(githubUrl)
            .on('response', function (res) {
                fs.writeJsonSync(headerFile, res.headers);
            })
            .pipe(unzip.Extract({path: self.cacheDirectory}))
            .on('close', function () {

                console.log('done');

                done({file: file})
            });
    }
}