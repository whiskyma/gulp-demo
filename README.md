# 简介 - Gulp-demo
简单实用的前端自动化工作流配置，基于 Gulp4.x ,区别与Gulp3.x
Simple and practical front-end automated workflow configuration based on Gulp4.x

## 特性 - Features
* pug(语法)            (npm i gulp-pug -D)
* stylus(样式)         (npm i gulp-stylus -D)
* cleanCss(css压缩)    (npm i gulp-clean-css -D)
* uglify(js压缩)       (npm i gulp-uglify -D)
* connect(热启动)      (npm i gulp-connect -D)
* ES6转换(babel)       (npm i gulp-babel -D)
* 清除任务(del)         (npm i gulp-del -D)
* 跨域代理(proxy)       { createProxyMiddleware } = require('http-proxy-middleware')

## 目录结构 - Directory structure
```
+ gulp-demo
    + dist
        - etc...
    + src
        - js
        - css
        - images
        - index.pug
        - layout.pug
        + hd_video
            - js
            - css
            - images
            - index.pug
        + 目录名(可自行增加目录)
- .gitignore
- gulpfile.js
- package.json
- README.md
```
## gulpfile.js - The basic configuration
```
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
```

## 环境要求 - Pre Required

如果你已经全局安装了 gulp 请先删除旧版本后再安装(本项目gulp版本号：^4.0.2)
If you've previously installed gulp globally, please remove the old version

```bash
$ npm rm --global gulp
# or
$ yarn global remove gulp
```

全局安装 gulp-cli  
Install the gulp command line utility

```bash
$ npm install --global gulp-cli
# or
$ yarn global add gulp-cli
```

## 安装方式 - Installation

```bash
# 安装 - Using npm or yarn
$ npm i ublue-gulp-config
# or
$ yarn add ublue-gulp-config

# 安装依赖 - Install dependency
$ npm install
# or
$ yarn install
```

## 使用方法 - Used

```bash
# 项目初始化 - Project initialization
$ gulp init

# 环境启动 - Start it
$ gulp
```

## 环境切换 - Using environment variables

```bash
# 发布测试环境 - Build for test environment
$ gulp init --test

# 发布生产环境 - Build for production environment
$ gulp init --build

# 清理生产目录 - Clean up development or production
$ gulp clean

# 清理指定环境目录 - Clean up the specified environment directory
$ gulp clean --test
```

### 预览图如下：
![Pandao editor.md](https://github.com/whiskyma/gulp-demo/blob/main/src/hd_video/images/demo.jpg "Pandao editor.md")

