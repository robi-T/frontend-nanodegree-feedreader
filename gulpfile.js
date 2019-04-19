const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const eslint = require('gulp-eslint');
const jasmineBrowser = require('gulp-jasmine-browser');
const concat = require('gulp-concat');
const terser = require('gulp-terser'); // instead of uglify
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant')



gulp.task('watch', gulp.series(watchfiles));
gulp.task('start-server', gulp.series(startServer));
gulp.task('default', gulp.series(styles, copyHtml, copyImg, startServer));
gulp.task('dist', gulp.series(copyHtml, copyImg, styles, lint, scriptsDist));

gulp.task('tests', gulp.series(tests));
gulp.task('styles', gulp.series(styles));
gulp.task('lint', gulp.series(lint));
gulp.task('copy-html', gulp.series(copyHtml));
gulp.task('copy-img', gulp.series(copyImg));
gulp.task('scripts', gulp.series(scripts));
gulp.task('scripts-dist', gulp.series(scriptsDist));


// BrowserSync
function startServer(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 3000
    });
    done();
}

// Watch files
function watchfiles() {
    gulp.watch("sass/**/*.scss", styles);
    gulp.watch("js/**/*.js", lint);
    gulp.watch("/index.html", copyHtml);
    gulp.watch(".dist/index.html").on('change', browserSync.reload);
    // startServer();
}


function styles() {
    return gulp
        .src("sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}



function lint() {
    return gulp
        .src(['js/**/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());

}


function copyHtml() {

    return gulp
        .src('./index.html')
        .pipe(gulp.dest("./dist"));

}

function copyImg() {

    return gulp
        .src('img/*')
        //.pipe(imagemin())
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest("./dist/img"));

}

function scripts() {

    return gulp
        .src("js/**/*.js")
        .pipe(concat('all.js'))
        .pipe(gulp.dest("dist/js"));

}

function scriptsDist() {

    return gulp
        .src("js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/js"));

}


function tests() {
    return gulp
        .src('jasmine/spec/feedreader.js')
        .pipe(jasmineBrowser.specRunner({ console: true }))
        // .pipe(jasmineBrowser.headless({ driver: 'chrome' })) -- not working with hedless
        .pipe(jasmineBrowser.server({ port: 3001 }));
}