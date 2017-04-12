import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Welcome extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount () {
		if(Meteor.userId() !== null)
			browserHistory.push('/home');
	}

	render() {
		return (
			<div> 
				<div className="container">
					<h1 className='text-center'>
						Welcome to Bingo Smash! Get an account or log in!
					</h1>
				</div>
			</div>
		);
	}
}

Welcome.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);