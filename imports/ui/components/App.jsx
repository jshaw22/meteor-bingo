import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from "react-router";
import * as actions from '../actions/authentication.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



class App extends Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.state = this.loggedIn();
	}

	loggedIn () {
		return {
			isAuthenticated: Meteor.userId() !== null
		}
	}

	componentWillMount () {
		console.log("component mounted", this.state);
		//React state differs from meteor fetch state
		Tracker.autorun(() => {
			const currentUser = Meteor.user();

			this.props.actions.getCurrentUser(currentUser);
		})
		// if(!this.state.isAuthenticated) 
		// 	browserHistory.push('/login');
	}

	componentDidUpdate(prevProps, nextProps) {
		// if(!this.state.isAuthenticated) 
		// 	browserHistory.push('/login');
	}

	logout(e){
		e.preventDefault();
		Meteor.logout();
		browserHistory.push('/');
	}

	loginLogOut () {
		let currentUser = this.props.authentication.currentUser;
		let userDataAvailable = (this.props.authentication.currentUser != '');
		let loggedIn = (currentUser && userDataAvailable);
		if (loggedIn){
			return (
				<ul className="nav navbar-nav navbar-right">
					<li>Welcome, {currentUser.username}</li>
					<a href="#" onClick={this.logout}> Logout</a>
				</ul>
			)
		} else {
			return (
				<ul className="nav navbar-nav navbar-right">
					<li><Link to="/login">Sign In</Link></li>
					<li><Link to="/signup">Sign Up</Link></li>
				</ul>
			)
		}
	}

	render() {
		let currentUser = this.props.authentication.currentUser;
		let userDataAvailable = (this.props.authentication.currentUser != '');
		let loggedIn = (currentUser && userDataAvailable);

		return (
			<div>
				<nav className="navbar navbar-default navbar-static-top">
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">Bingo Smashers</a>
						</div>
						<div className="navbar-collapse">
							{this.loginLogOut()}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);