import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Home extends Component {
	constructor(props){
		super(props);
	}

	render() {
		
		return (
			<div> 
				<div className="container">
					<h1 className='text-center'>
						You logged in, bro!!
					</h1>
					<h3 className="text-center">I'm not sure what to put here. Maybe a newsfeed?</h3>
				</div>
			</div>
		);
	}
}

Home.PropTypes = {
	username: React.PropTypes.string
}

function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(actions, dispatch),
	};
}
const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);