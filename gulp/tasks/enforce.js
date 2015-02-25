var fs = require('fs');

var gulp = require('gulp');

gulp.task('enforce', function() {
    var validateCommit = '.git/hooks/commit-msg';

    if (!fs.existsSync(validateCommit)) {
        // copy the file over
        fs.createReadStream('./validate-commit-msg.js')
            .pipe(fs.createWriteStream(validateCommit));
        // make it executable
        fs.chmodSync(validateCommit, '0755');
    }
});
