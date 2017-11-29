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
    browserSync = require('browser-sync').create();//服务器


gulp.task('startApp', function() {
  	console.log("启动gulp-express-gulp项目");
  	del.sync("./dist");
  	return gulp.src("src/views/**/*.html").pipe(gulp.dest('dist'));
  	
});
//图片压缩
gulp.task('images', function() {
  console.log("图片压缩");
  return gulp.src('src/images/**/*')
    //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
//压缩ng代码
gulp.task('scripts', function() {
	console.log("js压缩");
  return gulp.src(['src/services/**/*.js','src/scripts/**/*.js'])
    /*.pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))*/
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
//压缩css
gulp.task('styles', function() {
	console.log("css压缩");
  return gulp.src('src/styles/**/*.css')
//  .pipe(sass({ style: 'expanded' }))
//  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});
// 静态服务器
gulp.task('serve', function() {
   	// 开始一个Browsersync静态文件服务器
	browserSync.init({
	    server: "./dist"

	})
});

//监听文件自动刷新
gulp.task('watch',function(){

    gulp.watch("src/styles/*.css", ['styles']);
	
});
gulp.task('default',['startApp','images','scripts','styles','watch','serve']);


