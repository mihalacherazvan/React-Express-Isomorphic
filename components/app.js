import React from 'react';

export default class ReactApp extends React.Component {	
	render () {
		return (
			<div>
				<h1>Hello, Dave! You're looking well today.</h1>
				{ this.props.children }
			</div>
		);
	}
};