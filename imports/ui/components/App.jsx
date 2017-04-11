import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from "react-router";
import * as actions from '../actions/authentication.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



class App extends Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.state = 
			{
				isAuthenticated: Meteor.userId() !== null,
				error: ""
			}
		this.handleLogin = this.handleLogin.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentWillMount () {
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

	handleLogin(e){
		e.preventDefault();
		let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;
		Meteor.loginWithPassword(username, password, (err) => {
			if(err)
				this.setState({error:err.reason});
			else {
				browserHistory.push('/home');
			}
		});
	}

	logout(e){
		e.preventDefault();
		Meteor.logout();
		this.props.actions.logout();  // this double call seems to be clunky
		browserHistory.push('/');
	}

	renderErrors () {
		if(this.state.error.length > 0)
			return <li className="alert alert-danger fade in">{this.state.error}</li>
	}

	loginLogOut (loggedIn) {
		if (loggedIn){
			const currentUser = this.props.authentication.currentUser;
			return (
				<ul className="nav navbar-nav navbar-right">
					<li>Welcome, {currentUser.username}</li>
					<li><a href="#" onClick={this.logout}>Logout</a></li>
				</ul>
			)
		} else {
			return (
				<ul className="nav navbar-nav navbar-right">
					<form role="form" id="signin" className="navbar-form navbar-right">
						<div className="input-group">
							<span className="input-group-addon">
								<i className="fa fa-user"></i>
							</span>
							<input type="text" ref="username" placeholder="username" id="username" className="form-control"></input>
						</div>
						<div className="input-group">
							<span className="input-group-addon">
								<i className="fa fa-user"></i>
							</span>
							<input type="password" ref="password" placeholder="password" id="password" className="form-control"></input>
						</div>
						<button onClick={this.handleLogin} className="btn btn-primary">Log in</button>
					</form>
					<li><Link to="/signup">Sign Up</Link></li>
					{this.renderErrors()}	
				</ul>

			)
		}
	}

	render() {
		let currentUser = this.props.authentication.currentUser;
		let loggedIn = (currentUser && currentUser.hasOwnProperty("_id"));
		return (
			<div>
				<nav className="navbar navbar-default navbar-static-top">
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand" href="#"><Link to="/">Bingo Smashers</Link></a>
						</div>
						<div className="navbar-collapse collapse">
							<ul className="nav navbar-nav">
								<li><Link to="/profile">Profile</Link></li>
								<li><Link to="/messages">Messages</Link></li>
								<li><Link to="/matches">Browse Matches</Link></li>
							</ul>
							{this.loginLogOut(loggedIn)}
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