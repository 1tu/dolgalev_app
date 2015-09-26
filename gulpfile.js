var gulp = require('gulp'), 
    jade = require('gulp-jade'), 
    stylus = require('gulp-stylus'), 
    csso = require('gulp-csso'), 
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'), 
    riot = require('gulp-riot'), 
    connect = require('gulp-connect');


// Собираем Stylus
gulp.task('stylus', function() {
  gulp.src('./assets/css/importer.styl')
    .pipe(stylus()) 
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./www/css/')) // записываем css
    .pipe(connect.reload()); // даем команду на перезагрузку css
});


// Собираем html из Jade
gulp.task('jade', function() {
  gulp.src(['./*.jade', '!./_*.jade'])
      .pipe(jade({
          pretty: true
      }))  // Собираем Jade только в папке ./assets/template/ исключая файлы с _*
      .on('error', console.log) // Если есть ошибки, выводим и продолжаем
  .pipe(gulp.dest('./www/')) // Записываем собранные файлы
  .pipe(connect.reload()); // даем команду на перезагрузку страницы
}); 


// Собираем JS
gulp.task('js', function() {
  gulp.src([
           './assets/js/fn.js',
           './assets/js/stores.js',
           './assets/js/router.js',
           './assets/js/**/*.js', 
           './assets/js/mounting.js',
           '!./assets/js/libs/**/*.js'
           ])
  .pipe(concat('app.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('./www/js'))
  .pipe(connect.reload()); // даем команду на перезагрузку страницы
});


// Собираем Tags
gulp.task('tag', function() {
  gulp.src(['./assets/tag/**/*.tag'])
    .pipe(riot({compact: true}))
    .pipe(concat('tags.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./www/js'))
    .pipe(connect.reload()); // даем команду на перезагрузку страницы
});


// Локальный сервер для разработки
gulp.task('server', function() {
  connect.server({
    root: './www/',
    livereload: true
  });
});


gulp.task('watch', function() {
  // Предварительная сборка проекта

  gulp.watch(['assets/css/**/*.styl'],['stylus']);
  gulp.watch(['*.jade'], ['jade']);
  gulp.watch(['assets/js/**/*.js'], ['js']);
  gulp.watch(['assets/tag/**/*.tag'], ['tag']);
});

gulp.task('default', ['stylus', 'js', 'tag', 'server', 'watch'])