var gulp  	= require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true });

var server_build_count = 0;
var react_app_build_count = 0;

gulp.task('running/restarting server', ['building server'],  function () {
    plugins.nodemon({
        script: 'build/server.js', 
        ext: 'js html', 
        env: { 'NODE_ENV': 'development' }
    })
})
 
gulp.task('building server', ['building components'], function () {
	console.log('Server build nb ' + server_build_count++);
    return gulp.src( './server.js' )
        .pipe( plugins.babel({
            presets: ['babel-preset-es2015'],
            plugins: ['babel-plugin-transform-es2015-modules-commonjs']
        }) )
        .pipe( plugins.jshint() )
        .pipe( plugins.concat('server.js') )
		//.pipe( plugins.uglify() )
        .pipe( gulp.dest('./build') );
});

gulp.task('building components', function () {
	console.log('React app build nb ' + react_app_build_count++);
    return gulp.src( './components/app.js' )
        .pipe( plugins.babel({
            presets: ['babel-preset-es2015', 'react'],
            plugins: ['babel-plugin-transform-es2015-modules-commonjs']
        }) )
        .pipe( plugins.concat('app.js') )
        //.pipe( plugins.uglify() )
        .pipe( gulp.dest('./build') );
});

gulp.task('building react client render', ['building components'], function () {
    return gulp.src( './client-render.js' )
        .pipe( plugins.babel({
            presets: ['babel-preset-es2015', 'react'],
            plugins: ['babel-plugin-transform-es2015-modules-commonjs']
        }) )
        .pipe( plugins.browserify({
    		debug: true
    	}) )
        .pipe( plugins.jshint() )
        .pipe( plugins.concat('bundle.js') )
        //.pipe( plugins.uglify() )
        .pipe( gulp.dest('./public/js/') );
});

gulp.task('watching', function() {
	gulp.watch( ['server.js'], ['building server'] );
    gulp.watch( ['./components/**/*.js', './client-render.js'], ['building react client render'] );
});

gulp.task('default', ['building react client render', 'building server', 'watching', 'running/restarting server'] );