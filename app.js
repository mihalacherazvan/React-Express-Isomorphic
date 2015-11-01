import React from 'react';
import ReactDOM from 'react-dom';
import ReactApp from './build/ReactApp.min.js';

window.onload = function() {
	ReactDOM.render( <ReactApp/>, document.getElementById('react-app') );
};