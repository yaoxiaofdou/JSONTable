/**
 * Created by Administrator on 2017/5/5.
 */
// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    $ = require('gulp-load-plugins')();   //自动require你在package.json中声明的依赖
    browserSync = require("browser-sync");
// HTML处理
gulp.task('html', function() {
    gulp.src('src/static/*.html')
        // .pipe($.htmlmin({collapseWhitespace: true}))  //压缩html成一行
        .pipe(gulp.dest('dist/static'))
        .pipe(browserSync.reload({stream:true}))
});
// 字体图标处理
gulp.task('fonts', function() {
    gulp.src('src/fonts/*.*')
    // .pipe($.htmlmin({collapseWhitespace: true}))  //压缩html成一行
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({stream:true}))
});

// LESS样式处理
gulp.task('less', function () {
    gulp.src('src/less/*.less')
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.autoprefixer({      //浏览器兼容前缀自动加上
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe($.sourcemaps.write('map'))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}))
});

// CSS处理
gulp.task('css', function() {
    gulp.src('src/css/**/*.css')
        .pipe($.autoprefixer())
        .pipe($.cleanCss({compatibility: 'ie8'}))      //压缩css
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}))
});

// 图片处理
gulp.task('images', function(){
    gulp.src('src/images/**/*')
        .pipe($.imagemin())     //图片压缩(压缩比不大3M->2.8M)压缩png、jpg、gif、svg格式图片
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}))
})

// js处理
gulp.task('scripts', function () {
    gulp.src('src/scripts/**/*.js')
        // .pipe($.concat("all.js"))       //合并文件
        // .pipe($.rename('all.min.js'))   //重命名
        // .pipe($.uglify())       //压缩js
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({stream:true}))
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['dist/fonts', 'dist/css', 'dist/scripts', 'dist/images'], {read: false})
        .pipe($.clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', function(){
    gulp.start('serve', 'watch');
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: './src/'
        }
    });
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    gulp.watch('src/static/*.html', ["html"]);  // 监听html
    gulp.watch('src/fonts/*.*', ["fonts"]);  // 监听less
    gulp.watch('src/less/*.less', ["less"]);  // 监听less
    gulp.watch('src/css/**/*.css', ["css"]);  // 监听css
    gulp.watch('src/images/**/*', ["images"]);  // 监听images
    gulp.watch('src/scripts/**/*.js', ["scripts"]);  // 监听js
});