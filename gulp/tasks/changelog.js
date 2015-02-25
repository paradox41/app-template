var fs = require('fs');

var gulp = require('gulp');

var changelog = require('conventional-changelog');

gulp.task('changelog', function(done) {
    function changeParsed(err, log) {
        if (err) {
            return done(err);
        }
        fs.writeFile('CHANGELOG.md', log, done);
    }
    fs.readFile('./package.json', 'utf8', function(err, data) {
        var ref$ = JSON.parse(data);
        var repository = ref$.repository;
        var version = ref$.version;

        changelog({
            repository: repository.url,
            version: version
        }, changeParsed);
    });
});
