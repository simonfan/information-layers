var path = require('path');

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var less        = require('gulp-less');

// compile less task
gulp.task('less', function () {
  gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: path.join(__dirname, 'src/less')
    }))
    // prevent less compilation errors from breaking stuff
    .on('error', function (error) {

      console.log(error.toString());

      this.emit('end');
    })
    .pipe(gulp.dest('./src/assets/css'));
});


// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });

  gulp.watch(['**/*.html', 'assets/**/*.css', '**/*.js'], {cwd: 'src'}, browserSync.reload);
});

// let the watch task be saparate from the serve task
// in order not to break the development server down
// when the compilations break.
gulp.task('watch', function () {
  // watch for less changes
  gulp.watch('./src/less/**/*.less', ['less']);
})


gulp.task('default', ['watch', 'serve']);