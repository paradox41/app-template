var config = require('../config');

var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch([config.js.files, config.html.files], ['browserify:dev']);
    gulp.watch([config.scss.files], ['scss:dev']);
    gulp.watch('./app/*.hbs', ['handlebars:dev', 'reload']);
});
