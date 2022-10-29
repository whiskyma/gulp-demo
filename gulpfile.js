const gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    pug = require('gulp-pug'),
    { createProxyMiddleware } = require('http-proxy-middleware')

// 在每次开启新任务之前先把dist删掉
const delDist = () => del('dist')

// 先把所有的任务用到的文件源路径和目标路径做一个统一规划
const path = {
    pug: {
        src: 'src/**/*.pug',
        dest: 'dist'
    },
    css: {
        src: 'src/**/*.{css,styl,scss,less}',
        dest: 'dist'
    },
    js: {
        src: 'src/**/*.js',
        dest: 'dist'
    },
    img: {
        src: 'src/**/*.{png,jpg,jpeg,ico,mp4}',
        dest: 'dist'
  },
}

// 制定html任务：通过函数的方式
const html = () => {
    // 需要把任务代码return
    return gulp.src(path.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(path.pug.dest))
    .pipe(connect.reload())
}

// css任务：先把scss文件编译成css，再压缩
const css = () => {
    return gulp.src(path.css.src)
        .pipe(stylus())
        .pipe(cleanCss())
        .pipe(gulp.dest(path.css.dest))
        .pipe(connect.reload())
}

// js任务
const js = () => {
    return gulp.src(path.js.src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            compress: {
                drop_console: true //去掉console.log
           }
        }))
        .pipe(gulp.dest(path.js.dest))
        .pipe(connect.reload())
}

// img任务：复制到dist里
const img = () => gulp.src(path.img.src).pipe(gulp.dest(path.img.dest))

// libs任务
// const libs = () => gulp.src(path.libs.src).pipe(gulp.dest(path.libs.dest))

// server任务
const server = () => {
    connect.server({
        host: 'localhost',
        host: '192.168.1.2',
        root: 'dist',
        livereload: true,
        port: 2525,
        // 中间件：函数返回一个数组，数组配置跨域代理
        middleware () {
            return [
                // 将以/api为开头的请求代理到域 http://localhost
                createProxyMiddleware('/api', {
                target: 'http://localhost',
                changeOrigin: true
                })
            ]
        }
    })
}

// watch任务：监听一些文件的修改，一旦被修改了就自动重启对应的任务
const watch = () => {
    gulp.watch(path.pug.src, html)
    gulp.watch(path.css.src, css)
    gulp.watch(path.js.src, js)
}

// gulp.series 是同步执行任务，第一个执行完了才能执行第二个
// gulp.parallel 是异步执行任务，多个任务同时运行
module.exports.default = gulp.series(delDist, gulp.parallel(html, css, js, img, server, watch))