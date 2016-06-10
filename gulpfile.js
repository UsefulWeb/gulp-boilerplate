var gulp = require("gulp"),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    sprity = require('sprity'),
    gulpif = require('gulp-if'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css')
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    jade = require('gulp-jade');

gulp.task('templates', function() {
  // watch('src/templates/**/**/**/*.jade', function() {
    gulp.src('src/templates/**/**/**/*.jade')
      .pipe(jade({
        
      }))
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(gulp.dest('dist'))
      .pipe(reload({stream:true}))
    // })
  
});

gulp.task('less', function () {
  // watch('src/less/*.less', function() {
    gulp.src('src/less/*.less')
      .pipe(less({
        //paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(gulp.dest('src/css'));
    // })
  
});

gulp.task('sprites', function () {
  //watch('src/sprites/*', function() {
      sprity
      .src({
          src: './src/sprites/*.{png,jpg}',
          cssPath: '../img',
          style: './sprites.css',
        })
        .pipe(gulpif('*.png', gulp.dest('./src/img/'), gulp.dest('./src/css/')))
    //})
  
});

gulp.task('fonts', function () {
  gulp
    .src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    //.pipe(concat('production.css'))
    //.pipe(cleanCSS({
    //  compatibility: 'ie8',
    //  }))
    //.pipe(gulp.dest('dist/css'))
    //.pipe(reload({stream:true}))
    //.src('src/css/**/*.css.map')
    //.pipe(gulp.dest('dist/css'))
  

});
gulp.task('css', function () {
  gulp
    .src('src/css/**/*')
    .pipe(gulp.dest('dist/css'))

    //.pipe(concat('production.css'))
    //.pipe(cleanCSS({
    //  compatibility: 'ie8',
    //  }))
    //.pipe(gulp.dest('dist/css'))
    //.pipe(reload({stream:true}))
    //.src('src/css/**/*.css.map')
    //.pipe(gulp.dest('dist/css'))
  

});

gulp.task('images', function () {
  return gulp.src('src/img/*')
      .pipe(gulp.dest('dist/img'))
});

gulp.task('stylus', function () {
  // watch('src/stylus/**/*.styl', function() {
    gulp.src('src/stylus/**/*.styl')
      .pipe(sourcemaps.init())
      .pipe(stylus({
        'include css': true,
        compress: true
        }))
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('src/css'));
    // })
  
});

gulp.task('babel', function(){
  // watch('src/babel/**/*.js', function() {
    return gulp.src("src/babel/**/*.js")
      .pipe(babel({
        presets: ['es2015'],
        plugins: ['add-module-exports']
        }))
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(gulp.dest("dist/js"));
    // })
  
});

gulp.task('templates-styles', function(){
  // watch('src/templates/**/**/**/*.styl', function() {
   gulp.src("src/templates/desktop.blocks/**/**/*.styl")
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      compress: true
      }))
    .pipe(concat('desktop.template.css'))
    .on('error', function(e) {
      console.log('>>> ERROR', e);
      // emit here
      this.emit('end');
    })
    .pipe(sourcemaps.write('.', {
        mapSources: function(sourcePath) {
          // source paths are prefixed with '../src/' 
          return '../../src/templates/' + sourcePath;
        }
      }))
    .pipe(gulp.dest("src/css"));

    gulp.src("src/templates/mobile.blocks/**/**/*.styl")
     .pipe(sourcemaps.init())
     .pipe(stylus({
       'include css': true,
       compress: true
       }))
     .pipe(concat('mobile.template.css'))
     .on('error', function(e) {
       console.log('>>> ERROR', e);
       // emit here
       this.emit('end');
     })
     .pipe(sourcemaps.write('.', {
         mapSources: function(sourcePath) {
           // source paths are prefixed with '../src/' 
           return '../../src/templates/' + sourcePath;
         }
       }))
     .pipe(gulp.dest("src/css"));

     gulp.src("src/templates/tablet.blocks/**/**/*.styl")
      .pipe(sourcemaps.init())
      .pipe(stylus({
        'include css': true,
        compress: true
        }))
      .pipe(concat('tablet.template.css'))
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(sourcemaps.write('.', {
          mapSources: function(sourcePath) {
            // source paths are prefixed with '../src/' 
            return '../../src/templates/' + sourcePath;
          }
        }))
      .pipe(gulp.dest("src/css"));

  // })
});

gulp.task("default", ['templates', 'templates-styles', 'stylus', 'less', 'sprites', 'babel', 'images', 'fonts'], function () {
  watch('src/templates/**/**/**/*.styl', function() {
    gulp.start('templates-styles');
    });
  watch('src/babel/**/*.js', function() {
    gulp.start('babel');
    });

  watch('src/stylus/**/*.styl', function() {
    gulp.start('stylus');
    });  

  watch('src/css/**/*.css', function() {
    gulp.start('css');
    });

  watch('src/sprites/*', function() {
    gulp.start('sprites');
    })

  watch('src/img/*', function() {
    gulp.start('images');
    })

  watch('src/less/*.less', function() {
    gulp.start('less');
    });

  watch('src/templates/**/**/**/*.jade', function() {
    gulp.start('templates');
    });
});

