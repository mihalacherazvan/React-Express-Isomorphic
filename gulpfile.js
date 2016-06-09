var gulp        = require('gulp'),
	plugins     = require('gulp-load-plugins')({ camelize: true }),
    browserify  = require('browserify'),
    buffer      = require('vinyl-buffer'),
    source      = require('vinyl-source-stream'),
    spawn       = require('child_process').spawn,
    node;

var client_render_count = 1;

var paths = {
    client : ['./public/js/app.js', './public/js/components/**/*.js'],
};

gulp.task('running/restarting server', ['building react client render'], function () {
    if (node) 
    { 
        node.kill();
    }

    node = spawn('node', ['index.js'], {stdio: 'inherit'});

    node.on('close', function (code) {
        if (code === 8) 
        {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('building react client render', function () {
    console.log('Client render build ', client_render_count++);
    return browserify({
            entries: './public/js/app.js'
        }).
        transform("babelify", { presets: ["es2015", "react"] })
        .bundle()
        .pipe( source('./public/js/app.js') )
        .pipe( buffer() )
        .pipe( plugins.jshint() )
        .pipe( plugins.concat('bundle.js') )
        //.pipe( plugins.uglify() )
        .pipe( gulp.dest('./public/js/') );
});

gulp.task('watching', function() {
    gulp.watch( paths.client, ['building react client render', 'running/restarting server'] );
});

gulp.task('default', ['building react client render', 'watching', 'running/restarting server'] );