import React from 'react';
import ReactApp from './build/ReactApp.min.js';

window.onload = function() {
	React.render( <ReactApp/>, document.getElementById('react-app') );
};