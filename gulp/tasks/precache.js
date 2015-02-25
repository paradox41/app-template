var config = require('../config');

var fs = require('fs');
var path = require('path');

var gulp = require('gulp');

var precache = require('sw-precache');

gulp.task('generate-service-worker', function(callback) {

    precache({
        staticFileGlobs: [config.build + '/**/*.{js,html,css,tff,woff,woff2,ico,txt,png,svg,jpg,jpeg,json,geojson,csv}'],
        stripPrefix: config.build
    }, function(error, swFileContents) {
        if (error) {
            return callback(error);
        }
        fs.writeFile(path.join(config.build, config.serviceWorker.name), swFileContents, callback);
    });
});
