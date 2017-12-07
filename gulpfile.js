var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),//sass的编译
    autoprefixer = require('gulp-autoprefixer'),//自动添加css前缀
    minifycss = require('gulp-minify-css'),//压缩css
    //jshint = require('gulp-jshint'),//js代码校验
    uglify = require('gulp-uglify'),//压缩js代码
    imagemin = require('gulp-imagemin'),//压缩图片
    rename = require('gulp-rename'),//文件重命名
    concat = require('gulp-concat'),//合并js文件
    notify = require('gulp-notify'),//更改提醒
    cache = require('gulp-cache'),//图片缓存，只有图片替换了才压缩
    livereload = require('gulp-livereload'),//自动刷新页面
    del = require('del'),//清除文件
    browserSync = require('browser-sync').create(),//服务器
    SSI = require('browsersync-ssi');


gulp.task('startApp', function() {
  	console.log("启动gulp-express-gulp项目");
  	return gulp.src("src/**/*.*").pipe(gulp.dest('dist/src'));
  	
});

gulp.task('delDist',function(){
    del.sync("./dist");
});

gulp.task('copyHtml',function(){
    return gulp.src("src/**/*.html").pipe(gulp.dest('dist/src'));
});

//图片压缩
gulp.task('images', function() {
  console.log("图片压缩");
  return gulp.src('src/images/**/*.*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/src/images'))
    .pipe(notify({ message: 'dist/src/images' }));
});

//压缩js代码
gulp.task('scripts', function() {
	console.log("js压缩");
    gulp.src(['src/scripts/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/src/scripts'))
        .pipe(notify({ message: 'dist/src/scripts' }))

    gulp.src(['src/templates/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/src/templates'))
        .pipe(notify({ message: 'dist/src/templates' }))

});

gulp.task('libs',function(){
    console.log("copy libs");
    return gulp.src(['src/lib/**/*.*'])
        .pipe(gulp.dest('dist/src/lib'))
        .pipe(notify({ message: 'dist/src/lib' }));
});

gulp.task('concatMinJs',function(){
    console.log("合并、压缩js");
    var homeScripts=[
        'src/scripts/app.js',
        'src/templates/home/router.js',
        'src/templates/home/service/homeService.js',
        'src/templates/home/controller/home.js'];
    return gulp.src(homeScripts)
        .pipe(concat('home-built'))
        .pipe(rename({suffix: '.min.js'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/src/app'))
        .pipe(notify({ message: 'dist/src/scripts' }));
});

//压缩css
gulp.task('minCss', function() {
	console.log("css压缩");
  return gulp.src('src/styles/**/*.css')
      .pipe(minifycss())
      .pipe(gulp.dest('dist/src/styles'))
      .pipe(notify({ message: 'dist/src/styles' }));
});

//压缩css
gulp.task('concatMinCss', function() {
    console.log("合并、压缩CSS");
    return gulp.src('src/styles/**/*.css')
        .pipe(concat('all-built'))
        .pipe(rename({suffix: '.min.css'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/src/styles'))
        .pipe(notify({ message: 'dist/src/styles' }));
});

// 静态服务器
gulp.task('serve', function() {
   	// 开始一个Browsersync静态文件服务器

    browserSync.init({
        server: {
            baseDir:["./dist/src"],
            middleware:SSI({
                baseDir:'./dist/src',
                ext:'.html',
                version:'2.10.0'
            })
        }
    });
});

//监听文件自动刷新
gulp.task('watch',function(){
    gulp.watch("src/**/*.html", ['startApp']);
    gulp.watch("src/styles/**/*.css", ['styles']);
    gulp.watch("src/services/**/*.js", ['scripts']);
    gulp.watch("src/scripts/**/*.js", ['scripts']);
    gulp.watch("src/images/**/*.*", ['images']);

});
gulp.task('default',['startApp','serve']);

gulp.task('test',['delDist','images','libs','scripts','minCss','copyHtml','serve']);

gulp.task('production',['delDist','concatMinCss','libs','concatMinJs','images','copyHtml','serve']);