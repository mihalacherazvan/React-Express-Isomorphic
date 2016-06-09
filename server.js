import path from 'path';
import express from 'express';
import cons from 'consolidate';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RoutingContext} from 'react-router';

import {routes} from './routes.js';

var app = express();

// view engine setup
app.set('views', path.join(process.cwd(), 'public' , 'views'));
app.set('view engine', 'html');
app.engine('html', cons.handlebars);
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('*', (req, res) => {
	// routes is our object of React routes defined above
	match({ routes, location: req.url }, (err, redirectLocation, props) => {
		if (err) 
		{
			// something went badly wrong, so 500 with a message
			res.status(500).send(err.message);
		} 
		else if (redirectLocation) 
		{
			// we matched a ReactRouter redirect, so redirect from the server
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} 
		else if (props) 
		{
			// if we got props, that means we found a valid component to render
			// for the given route
			const serverRender = ReactDOMServer.renderToString(<RoutingContext {...props} />);

			// render `index.ejs`, but pass in the markup we want it to display
			res.render('index', { serverRender: serverRender });
		}
		else 
		{
			// no route match, so 404. In a real app you might render a custom
			// 404 view here
			res.sendStatus(404);
		}
	});
});

app.listen(3000, () => console.log('Server start'));