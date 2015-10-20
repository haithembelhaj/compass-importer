[![Build Status](https://travis-ci.org/haithembelhaj/compass-importer.svg)](https://travis-ci.org/haithembelhaj/compass-importer)
# compass-importer

A node-sass importer for compass. 
This package will download an uptodate [compass-mixin](https://github.com/Igosuki/compass-mixins) and link all declarations of @import 'compass' to the mixins.
The Compass will also automagically update the [compass-mixin](https://github.com/Igosuki/compass-mixins) from Github.
The result is all the power of [compass](http://compass-style.org/) with the speed of [libsass](http://libsass.org/).

## Install

```
$ npm install --save-dev compass-importer
```


## Usage

You can use this importer in node-sass or any project that depends on node-sass.
the only thing you need to do to make this work is add the importer to the options and include the '.compass' folder.
 
### node-sass

```js
var sass = require('node-sass');
var compass = require('compass-importer')

sass.render({
  data: '@import "compass"; .transition { @include transition(all); }',
  importer: compass
});

```

### grunt-sass


```js
var compass = require('compass-importer')


grunt.initConfig({
    
    sass:{
       
        options: {
            importer: compass
        },
        ...        
    }

})
```

### gulp-sass


```js
var gulp = require('gulp')
var sass = require('gulp-sass')
var compass = require('compass-importer')


gulp.task('sass', function()
{
    return gulp.src('sass/**/*.scss')
      .pipe(sass({ importer: compass }).on('error', sass.logError))
      .pipe(gulp.dest('./css'));

});
```


## License

MIT
