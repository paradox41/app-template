import gulp from 'gulp';
import bump from 'gulp-bump';
import git from 'gulp-git';
import filter from 'gulp-filter';
import tag from 'gulp-tag-version';

var release = function(importance) {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('chore(release): Bumps package version'))
        .pipe(filter('bower.json'))
        .pipe(tag());
};

gulp.task('patch', ['build'], function() {
    return release('patch');
});

gulp.task('minor', ['build'], function() {
    return release('minor');
});

gulp.task('major', ['build'], function() {
    return release('major');
});
