var gulp  	= require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');

var server_build_count = 0;
var react_app_build_count = 0;

var paths = {
    server      : ['./index.js'],
    client      : ['./client-render.js', './components/**/*.js'],
};

gulp.task('running/restarting server',  function () {
    plugins.nodemon({
        script: './index.js',
        ext: 'js html', 
        env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('building react client render', function () {
    return browserify({
            entries: './client-render.js'
        }).
        transform("babelify", { presets: ["es2015", "react"] })
        .bundle()
        .pipe( source('./client-render.js') )
        .pipe( buffer() )
        .pipe( plugins.jshint() )
        .pipe( plugins.concat('bundle.js') )
        //.pipe( plugins.uglify() )
        .pipe( gulp.dest('./public/js/') );
});

gulp.task('watching', function() {
	//gulp.watch( paths.server, ['building server'] );
    gulp.watch( paths.client, ['building react client render'] );
});

gulp.task('default', ['building react client render', 'watching', 'running/restarting server'] );