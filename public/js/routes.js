import Layout from './components/Layout.js';
import Index from './components/Index.js';

const routes = {
	path: '',
	component: Layout,
	childRoutes: [
		{
			path: '/',
			component: Index
		}
	]
};

export {routes};