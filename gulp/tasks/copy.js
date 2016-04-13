import config from '../config';

import gulp from 'gulp';

import debug from 'gulp-debug';

gulp.task('copy', function() {
  let files = [
    './app/**/*.{tff,woff,woff2,ico,txt,png,svg,jpg,jpeg,json,geojson,csv}'
  ];
  let opts = {
    base: config.app
  };

  return gulp.src(files, opts)
    .pipe(debug({
      title: '[copy]'
    }))
    .pipe(gulp.dest(config.build));
});
