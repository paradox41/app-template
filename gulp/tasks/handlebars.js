import config from '../config';

import fs from 'fs';

import gulp from 'gulp';
import rename from 'gulp-rename';
import handlebars from 'gulp-compile-handlebars';

var handlebarOpts = {
    helpers: {
        assets: function(path, context) {
            return [context.data.root[path]].join('/');
        }
    }
};

gulp.task('handlebars', function() {
    var manifest = JSON.parse(fs.readFileSync(`${config.app}/rev-manifest.json`, 'utf8'));

    return gulp.src(`${config.app}/index.hbs`)
        .pipe(handlebars(manifest, handlebarOpts))
        .pipe(rename(`${config.build}/index.html`))
        .pipe(gulp.dest('./'));
});
