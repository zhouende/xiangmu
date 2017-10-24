// 引入gulp
var gulp = require('gulp');
// 引入压缩html的插件
var htmlmin = require('gulp-htmlmin');
// 防止js报错是gulp停止工作
var plumber = require('gulp-plumber');
gulp.task('minify', function() {
    gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true,removeComments: true,removeStyleLinkTypeAttributes: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream:true
    }));
});
// 引入压缩js的插件
var uglify = require('gulp-uglify');
gulp.task('uglify',function(){
	gulp.src('src/js/**/*.js')
    .pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({
        stream:true
    }));
}); 

// 引入sass预编译
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
gulp.task('cssnano',function(){
	gulp.src('src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
	// .pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
        stream:true
    }));
}); 
// 引入压缩图片的插件
var imagemin = require('gulp-imagemin');
gulp.task('imagemin',function(){
	gulp.src(['src/images/**/*.jpg','src/images/**/*.png'])
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
        stream:true
    }));
}); 
// *****浏览器同步
var browserSync = require('browser-sync');
gulp.task('servers',function(){
	var obj = {
        server: {
            baseDir: ['dist/']
        }
    }
    function info(err,bs){
        console.log(bs.options.getIn(["urls", "local"]))
    }
    browserSync(obj,info);

    gulp.watch('src/*.html',['minify']);
    gulp.watch('src/js/**/*.js',['uglify']);
    gulp.watch('src/css/**/*.scss',['cssnano']);
    gulp.watch(['src/images/**/*.jpg','src/images/**/*.png'],['imagemin']);

}); 


gulp.task('default',['minify','uglify','cssnano','imagemin','servers']);
