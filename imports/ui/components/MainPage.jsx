import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MainPage extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		console.log("props", this.props.authentication);
		let currentUser = this.props.authentication.currentUser;
		let userDataAvailable = (currentUser != '');
		let loggedIn = (currentUser && userDataAvailable);
		return (
			<div> 
				<div className="container">
					<h1 className='text-center'>
						{loggedIn ? `Welcome to main page, ${currentUser.username}` : ""}
					</h1>
				</div>
			</div>
		);
	}
}

MainPage.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);