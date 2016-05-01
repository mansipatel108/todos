// Load modules
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tscConfig = require('./tsconfig.json');
var open = require('gulp-open');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

// Declare file sources
var publicSRC = './public/';
var serverSRC = './server/';
var serverTSC = serverSRC + '**/*.ts';
var publicTSC = publicSRC + '**/*.ts';
var HTMLSRC = publicSRC + '**/*.html';
var CSSSRC = publicSRC + '**/*.css';

// server TypeScript
gulp.task('serverTSC', function(){
   return gulp
   .src(serverTSC)
   .pipe(sourcemaps.init())
   .pipe(typescript(tscConfig.compilerOptions))
   .pipe(sourcemaps.write('.'))
   .pipe(gulp.dest(serverSRC)) 
});

// public TypeScript
gulp.task('publicTSC', function(){
   return gulp
   .src(publicTSC)
   .pipe(sourcemaps.init())
   .pipe(typescript(tscConfig.compilerOptions))
   .pipe(sourcemaps.write('.'))
   .pipe(gulp.dest(publicSRC)) 
});

gulp.task('develop', function () {
  livereload.listen(35729);
  nodemon({ script: 'server.js'
          , ext: 'html ts css ejs'
          , tasks: ['serverTSC', 'publicTSC'] })
    .on('restart', function () {
        gulp.src('./server.js');
    });
});

// This task opens Chrome within the local connect server
gulp.task('open', function () {
    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:3000'}));
});

// This is the default task that runs everything
gulp.task("default", ["serverTSC", "publicTSC", "develop",  "open"]);
