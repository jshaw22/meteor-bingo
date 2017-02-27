import React, { Component, PropTypes } from 'react';
import {browserHistory} from "react-router";
import * as actions from '../actions/authentication.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



class AppContainer extends Component {
	constructor(props){
		super(props);
		this.state = this.getMeteorData();
		this.logout = this.logout.bind(this);
	}

	getMeteorData () {
		return {
			isAuthenticated: Meteor.userId() !== null,
		}
	}
	componentWillMount () {
		this.props.actions.getCurrentUser();
		if(!this.state.isAuthenticated) 
			browserHistory.push('/login');
	}

	componentDidUpdate(prevProps, nextProps) {
		if(!this.state.isAuthenticated) 
			browserHistory.push('/login');
	}

	logout(e){
		e.preventDefault();
		Meteor.logout();
		browserHistory.push('/login');
	}

	render() {
		let currentUser = this.props.authentication.currentUser;
		let userDataAvailable = (currentUser != '');
		let loggedIn = (currentUser && userDataAvailable);
		return (
			<div>
				<nav className="navbar navbar-default navbar-static-top">
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">Bingo Smashers</a>
						</div>
						<div className="navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<li>{loggedIn ? `Welcome, ${currentUser.username}` : ""}</li>
								<a href="#" onClick={this.logout}>Logout</a>
							</ul>
						</div>
					</div>
				</nav>
				{this.props.children}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}
const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);