const gulp = require('gulp')
const webpack = require('webpack-stream')
const browserSync = require('browser-sync').create()
const TerserPlugin = require('terser-webpack-plugin')
const multipipe = require('multipipe')
const gulpIf = require('gulp-if')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
let mode = 'development'

function module() {
  return gulp.src('src/index.js')
    .pipe(webpack({
      mode,
      output: { filename: 'bundle.js' },
      module: {
        rules: [
          {
            test: /\.html?$/,
            loader: 'creaton-loader'
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false
              },
              keep_classnames: true,
              keep_fnames: true
            },
            extractComments: false
          })
        ]
      }
    }))
    .pipe(gulp.dest('server/public'))
}

function styles() {
  return gulp.src('src/styles/style.scss')
    .pipe(sass())
    .pipe(gulpIf(mode === 'production', multipipe(
      autoprefixer(),
      cleanCSS()
    )))
    .pipe(gulp.dest('server/public'))
}

function serve(done) {
  browserSync.init({
    proxy: 'http://localhost:3000',
    notify: false
  })
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function watch() {
  gulp.watch('server/**', gulp.series(reload))
  gulp.watch('src/**/*.{js,htm}', gulp.series(module, reload))
  gulp.watch('src/**/*.scss', gulp.series(styles, reload))
}

const dev = gulp.series(module, styles, serve, watch)
const build = gulp.series(done => (mode = 'production', done()), dev)

gulp.task('default', dev)
gulp.task('build', build)
