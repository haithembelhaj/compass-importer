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

      expect(result.css.toString()).to.equal('.transition {\n  -webkit-transition: all false false;\n  -moz-transition: all false false false;\n  -o-transition: all false false false;\n  transition: all; }\n');

      done(err);
    });

  })

});