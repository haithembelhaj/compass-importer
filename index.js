module.exports = function(url, prev, done) {

    var request, fs, unzip;
    var githubUrl = 'https://github.com/Igosuki/compass-mixins/archive/master.zip';


    if (!/^compass$/.test(url))
        return done({file: url});

    fs = require('fs-extra');
    request = require('request');


    if (!fs.existsSync('.compass/headers.json'))
        return download();

    var oldHeaders = fs.readJsonSync('.compass/headers.json');

    console.log('verify compass version ...');

    request.head(githubUrl)
        .on('response', function (res) {
            if (oldHeaders.etag === res.headers.etag)
                return done({file: 'compass-mixins-master/lib/' + url});

            download()
        });


    function download() {

        unzip = require('unzip');

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