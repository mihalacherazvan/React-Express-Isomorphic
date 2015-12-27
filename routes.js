import ReactApp from './components/app.js';
import IndexComponent from './components/IndexComponent.js';

const routes = {
	path: '',
	component: ReactApp,
	childRoutes: [
		{
			path: '/',
			component: IndexComponent
		}
	]
};

export {routes};