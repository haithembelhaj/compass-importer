var sass = require('node-sass');
var compass = require('../index.js');
var expect = require('chai').expect;

describe('test importer', function(){

  it('should convert compass sass', function(done){

    this.timeout(10000);

    sass.render({
      data: '@import "compass"; .transition { @include transition(all); }',
      importer: compass
    }, function(err, result){

      expect(result.css.toString()).to.equal('.transition {\n  -webkit-transition: all;\n  -moz-transition: all;\n  -o-transition: all;\n  transition: all; }\n');

      done(err);
    });
  })

  it('should convert compass sass synchronisly', function(){

    var result = sass.renderSync({
      data: '@import "compass"; .transition { @include transition(all); }',
      importer: compass
    })

    expect(result.css.toString()).to.equal('.transition {\n  -webkit-transition: all;\n  -moz-transition: all;\n  -o-transition: all;\n  transition: all; }\n');
  })

  it('should convert css3 animations', function(done){

    this.timeout(10000);

    sass.render({
      data: '@import "compass"; @import "compass/css3/animation"; @include keyframes(test) { from {background-color: red;} to {background-color: yellow; } } .animation { @include animation(test 1s); }',
      importer: compass,
      outputStyle: 'compressed'
    }, function(err, result){

      expect(result.css.toString()).to.equal('@-moz-keyframes test{from{background-color:red}to{background-color:yellow}}@-webkit-keyframes test{from{background-color:red}to{background-color:yellow}}@-o-keyframes test{from{background-color:red}to{background-color:yellow}}@-ms-keyframes test{from{background-color:red}to{background-color:yellow}}@keyframes test{from{background-color:red}to{background-color:yellow}}.animation{-webkit-animation:test 1s;-moz-animation:test 1s;-ms-animation:test 1s;-o-animation:test 1s;animation:test 1s}\n');

      done(err);
    });

  })

});