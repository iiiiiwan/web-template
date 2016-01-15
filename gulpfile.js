// ============================================
// CONFIG
// ============================================
var PROJECT_NAME       = 'Gulp-Template';
var ROOT               = './htdocs/';
var DEV_ROOT           = './src/';
var INCLUDE_PARTS_ROOT = './src_parts/';
var CONTENTS_SUB_ROOT  = 'assets/';
var PATH               = {
  jade     : 'jade/',
  js       : 'js/',
  jsLibs   : 'js/libs/',
  jsModule : 'js/module/',
  css      : 'css/',
  scss     : 'scss/',
  image    : 'img/'
};
var MODERN_JS_LIBS     = [
  'jquery-2.1.4.min.js',
  'jquery.easing.1.3.js',
  'velocity.min.js',
  'velocity.easeplus.min.js'
];
var LEGACY_JS_LIBS     = [
  'jquery-1.11.3.min.js',
  'jquery.easing.1.3.js',
  'velocity.min.js',
  'velocity.easeplus.min.js'
];
// ============================================
// MODULES
// ============================================
var gulp             = require('gulp');
var gulp_jade        = require('gulp-jade');
var gulp_data        = require('gulp-data');
var gulp_concat      = require('gulp-concat');
var gulp_sass        = require('gulp-sass');
var gulp_htmlmin     = require('gulp-htmlmin');
var gulp_strip_debug = require('gulp-strip-debug');
var gulp_uglify      = require('gulp-uglify');
var gulp_cssmin      = require('gulp-cssmin');
var gulp_plumber     = require('gulp-plumber');
var gulp_jsdoc       = require('gulp-jsdoc');
var gulp_imagemin    = require('gulp-imagemin');
var gulp_spritesmith = require('gulp.spritesmith');
var browserify       = require('browserify');
var through2         = require('through2');
var OUTPUT_TASK_LOG  = function(evt){
  console.log('\u001b[33m ------------------------------------------------------------ \u001b[0m');
  console.log('     [TASK] \u001b[32m' + evt.path.replace(__dirname + '\\', '') + '\u001b[0m [' + evt.type.toUpperCase() + ']');
  console.log('\u001b[33m ------------------------------------------------------------ \u001b[0m');
};
var OUTPUT_ERR_LOG = function(msg){
  console.log('\n\u001b[31m' + msg + '\u001b[0m\n');
};
// ============================================
// TASK - Concat JavaScript Library [modern]
// ============================================
gulp.task(
  'modern_jslibs_concat',
  function(){
    var tmpLibs = [];
    MODERN_JS_LIBS.forEach(function(libSrc){
      tmpLibs.push(DEV_ROOT +  CONTENTS_SUB_ROOT + PATH.jsLibs + libSrc);
    });
    gulp
      .src(tmpLibs)
      .pipe(
        gulp_concat('libs.js')
      )
      .pipe(
        gulp_uglify(
          {
            preserveComments : 'all'
          }
        )
      )
      .pipe(
        gulp.dest(ROOT + CONTENTS_SUB_ROOT + PATH.js)
      );
});
// ============================================
// TASK - Concat JavaScript Library [legacy]
// ============================================
gulp.task(
  'legacy_jslibs_concat',
  function(){
    var tmpLibs = [];
    LEGACY_JS_LIBS.forEach(function(libSrc){
      tmpLibs.push(DEV_ROOT +  CONTENTS_SUB_ROOT + PATH.jsLibs + libSrc);
    });
    gulp
      .src(tmpLibs)
      .pipe(
        gulp_concat('legacy.libs.js')
      )
      .pipe(
        gulp_uglify()
      )
      .pipe(
        gulp.dest(ROOT + CONTENTS_SUB_ROOT + PATH.js)
      );
});
// ============================================
// TASK - Compile .jade -> .html
// ============================================
gulp.task(
  'jade',
  function(){
    gulp
      .src(
        DEV_ROOT + '**/*.jade'
      )
      .pipe(
        gulp_plumber()
      )
      .pipe(
        gulp_data(function(file){
          return {
            'data' : require(INCLUDE_PARTS_ROOT + 'data.json')
          };
        })
      )
      .pipe(
        gulp_jade(
          {
            pretty  : false,
            basedir : INCLUDE_PARTS_ROOT + PATH.jade
          }
        )
      )
      .pipe(
        gulp_htmlmin()
      )
      .pipe(
        gulp.dest(ROOT)
      );
  }
);
// ============================================
// TASK - Build JavaScript
// ============================================
gulp.task(
  'browserify',
  function(){
    gulp
      .src(
        DEV_ROOT + CONTENTS_SUB_ROOT + PATH.jsModule + '*.js'
      )
      .pipe(
        gulp_plumber()
      )
      .pipe(
        through2.obj(
          function(file, encode, callBack){
            browserify(file.path).bundle(
              function(err, res){
                if(err){
                  OUTPUT_ERR_LOG(err.toString());
                  return;
                }else{
                  file.contents = res;
                  callBack(null, file)
                }
              }
            );
          }
        )
      )
      .pipe(
        gulp_uglify()
      )
      .pipe(
        gulp.dest(ROOT + CONTENTS_SUB_ROOT + PATH.js)
      );
  }
);
// ============================================
// TASK - Delete Console From JavaScript
// ============================================
gulp.task(
  'refine',
  function(){
    gulp
      .src(
        ROOT + CONTENTS_SUB_ROOT + PATH.js + '*.js'
      )
      .pipe(
        gulp_plumber()
      )
      .pipe(
        gulp_strip_debug()
      )
      .pipe(
        gulp_uglify()
      )
      .pipe(
        gulp.dest(ROOT + CONTENTS_SUB_ROOT + PATH.js)
      );
  }
);
// ============================================
// TASK - Compile SCSS
// ============================================
gulp.task(
  'sass',
  function(){
    gulp
      .src(
        DEV_ROOT + CONTENTS_SUB_ROOT + PATH.scss + '**/*.scss'
      )
      .pipe(
        gulp_plumber()
      )
      .pipe(
        gulp_sass(
          {
            outputStyle : 'expanded'
          }
        ).on(
          'error',
          gulp_sass.logError
        )
      )
      .pipe(
        gulp_cssmin()
      )
      .pipe(
        gulp.dest(ROOT + CONTENTS_SUB_ROOT + PATH.css)
      );
  }
);
// ============================================
// TASK - Sprite Image
// ============================================
gulp.task(
  'sprite',
  function(){
    var spriteData =
      gulp
        .src(
          DEV_ROOT + CONTENTS_SUB_ROOT + PATH.image + 'sprite/*.png'
        )
        .pipe(
          gulp_spritesmith(
            {
              imgName   : 'sprite.png',
              cssName   : '_sprite.scss',
              imgPath   : '/' + CONTENTS_SUB_ROOT + PATH.image + 'sprite.png',
              padding   : 10,
              cssFormat : 'scss',
              cssVarMap : function(sprite){
                sprite.name = 'sprite-' + sprite.name;
              }
            }
          )
        );
    spriteData.img
      .pipe(
        gulp.dest(ROOT + CONTENTS_SUB_ROOT + PATH.image)
      );
    spriteData.css
      .pipe(
        gulp.dest(DEV_ROOT + CONTENTS_SUB_ROOT + PATH.scss)
      );
  }
);
// ============================================
// TASK - Minify Image
// ============================================
gulp.task(
  'imagemin',
  function(){
    gulp
      .src(
        ROOT + CONTENTS_SUB_ROOT + PATH.image + '/**/*.+(jpg|jpeg|png|gif|svg)'
      )
      .pipe(
        gulp_imagemin()
      )
      .pipe(
        gulp.dest(ROOT + CONTENTS_SUB_ROOT + PATH.image)
      );
});
// ============================================
// TASK - Watch
// ============================================
gulp.task(
  'watch',
  function(){
    // -----------------------
    // .jade [module]
    // -----------------------
    gulp
      .watch(
        DEV_ROOT + '**/*.jade',
        ['jade']
      )
      .on(
        'change',
        OUTPUT_TASK_LOG
      );
    // -----------------------
    // .jade [include]
    // -----------------------
    gulp
      .watch(
        INCLUDE_PARTS_ROOT + PATH.jade + '**/*.jade',
        ['jade']
      )
      .on(
        'change',
        OUTPUT_TASK_LOG
      );
    // -----------------------
    // .jade [config]
    // -----------------------
    gulp
      .watch(
        INCLUDE_PARTS_ROOT + 'data.json',
        ['jade']
      )
      .on(
        'change',
        OUTPUT_TASK_LOG
      );
    // -----------------------
    // .scss [module]
    // -----------------------
    gulp
      .watch(
        DEV_ROOT + CONTENTS_SUB_ROOT + PATH.scss + '**/*.scss',
        ['sass']
      )
      .on(
        'change',
        OUTPUT_TASK_LOG
      );
    // -----------------------
    // .scss [include]
    // -----------------------
    gulp
      .watch(
        INCLUDE_PARTS_ROOT + PATH.scss + '**/*.scss',
        ['sass']
      )
      .on(
        'change',
        OUTPUT_TASK_LOG
      );
    // -----------------------
    // .js [module]
    // -----------------------
    gulp
      .watch(
        DEV_ROOT + CONTENTS_SUB_ROOT + PATH.jsModule + '*.js',
        ['browserify']
      )
      .on(
        'change',
        OUTPUT_TASK_LOG
      );
    // -----------------------
    // .js [include]
    // -----------------------
    gulp
      .watch(
        INCLUDE_PARTS_ROOT + PATH.js + '**/*.js',
        ['browserify']
      )
      .on(
        'change',
        OUTPUT_TASK_LOG
      );
  }
);
// ============================================
// TASK - Minify Image
// ============================================
gulp.task(
  'docs',
  function(){
    gulp
      .src(
        [
          'README.md',
          DEV_ROOT + CONTENTS_SUB_ROOT + PATH.jsModule + '*.js',
          INCLUDE_PARTS_ROOT + PATH.js + '**/*.js'
        ]
      )
      .pipe(
        gulp_jsdoc(
          './docs/',
          {
            path       : './src_parts/docs_template/',
            systemName : PROJECT_NAME,
            linenums   : true
          }
        )
      );
});
// ============================================
// TASK - Default [ Dev ]
// ============================================
gulp.task(
  'default',
  [
    // For JavaScript
    'modern_jslibs_concat',
    'legacy_jslibs_concat',
    'browserify',
    // For CSS(SCSS)
    'sass',
    // For HTML(Jade)
    'jade',
    // For Image
    'sprite',
    // For Watch
    'watch'
  ]
);
// ============================================
// TASK - Publish
// ============================================
gulp.task(
  'publish',
  [
    // For JavaScript
    'refine',
    // For Image
    'imagemin',
    // For Document
    'docs'
  ]
);