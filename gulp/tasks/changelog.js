import fs from 'fs';

import gulp from 'gulp';

import changelog from 'conventional-changelog';

gulp.task('changelog', function(done) {
    function changeParsed(err, log) {
        if (err) {
            return done(err);
        }
        fs.writeFile('CHANGELOG.md', log, done);
    }
    fs.readFile('./package.json', 'utf8', function(err, data) {
        if (err) {
            return done(err);
        }

        let ref = JSON.parse(data);
        let {repository, version} = ref;

        changelog({
            repository: repository.url,
            version: version
        }, changeParsed);
    });
});
