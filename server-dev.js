// WOW ! Check this fancy es6 shitty server out.
import path from 'path';
import express from 'express';
import cons from 'consolidate';
import React from 'react';

import ReactApp from './ReactApp.min.js';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', cons.handlebars);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index', { serverRender: React.renderToString(React.createElement(ReactApp)) });
});

app.listen(3000, () => console.log('Server restart'));