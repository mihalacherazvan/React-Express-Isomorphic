import React from 'react';

export default class ReactApp extends React.Component {	
	render () {
		return (
			<div>
				<h1>Welcome to the Isomorphic React App Boilerplate!</h1>
				{ this.props.children }
			</div>
		);
	}
};