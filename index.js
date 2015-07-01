module.exports = function(url, prev, done) {

    var request, fs, oldHeaders;
    var githubUrl = 'https://github.com/Igosuki/compass-mixins/archive/master.zip';

    if (!/^compass$/.test(url))
        return done({file: url});

    fs = require('fs-extra');
    request = require('request');


    if (!fs.existsSync('.compass/headers.json'))
        return download();

    done({file: 'compass-mixins-master/lib/' + url});

    oldHeaders = fs.readJsonSync('.compass/headers.json');

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
                fs.writeJsonSync('.compass/headers.json', res.headers);
            })
            .pipe(unzip.Extract({path: '.compass'}))
            .on('close', function () {

                console.log('done');

                done({file: 'compass-mixins-master/lib/' + url})
            });
    }
}