var gulp  	= require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true });

var server_build_count = 0;
var react_app_build_count = 0;

gulp.task('running/restarting server', ['building server'],  function () {
    plugins.nodemon({
        script: 'server.js', 
        ext: 'js html', 
        env: { 'NODE_ENV': 'development' }
    })
})
 
gulp.task('building server', ['building components'], function () {
	console.log('Server build nb ' + server_build_count++);
    return gulp.src( './server-dev.js' )
        .pipe( plugins.babel() )
        .pipe( plugins.jshint() )
        .pipe( plugins.concat('server.js') )
		//.pipe( plugins.uglify() )
        .pipe( gulp.dest('./') );
});

gulp.task('building components', function () {
	console.log('React app build nb ' + react_app_build_count++);
    return gulp.src( './components/ReactApp.js' )
        .pipe( plugins.babel() )
        .pipe( plugins.concat('ReactApp.min.js') )
        //.pipe( plugins.uglify() )
        .pipe( gulp.dest('./build') );
});

gulp.task('building react client app', ['building components'], function () {
    return gulp.src( './app.js' )
        .pipe( plugins.babel() )
        .pipe( plugins.browserify({
    		debug: true
    	}) )
        .pipe( plugins.jshint() )
        .pipe( plugins.concat('bundle.js') )
        //.pipe( plugins.uglify() )
        .pipe( gulp.dest('./public/js/') );
});

gulp.task('watching', function() {
	gulp.watch( ['server-dev.js'], ['building server'] );
    gulp.watch( ['./components/**/*.js'], ['building react client app'] );
});

gulp.task('default', ['building react client app', 'building server', 'watching', 'running/restarting server'] );