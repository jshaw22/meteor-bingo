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
		Tracker.autorun(() => {
			const currentUser = Meteor.user();
			this.props.actions.getCurrentUser(currentUser);
		})
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
		this.setState({error:''})
		this.props.actions.logout();  // this double call seems to be clunky
		browserHistory.push('/');
	}

	renderErrors () {
		if(this.state.error.length > 0)
			return <div className="alert alert-danger ml-2" role='alert'>{this.state.error}</div>
	}

	loginLogOut (loggedIn) {
		if (loggedIn){
			const currentUser = this.props.authentication.currentUser;
			return (
				<ul className="navbar-nav navbar-right">
					<li className="nav-item">Welcome, {currentUser.username}&nbsp;</li>
					<li className="nav-item"><a href="#" onClick={this.logout}>Logout</a></li>
				</ul>
			)
		} else {
			return (
				<div className="navbar-nav ml-auto">
					<div className="p-1" ><Link to="/signup">Sign Up</Link></div>
				    <form className="form-inline my-2 my-lg-0  ml-3">
				      <input type="text" ref="username" placeholder="username" id="username" className="form-control ml-2" />
				      <input type="password" ref="password" placeholder="password" id="password" className="form-control ml-2"/>
				      <button onClick={this.handleLogin} className="btn btn-primary ml-2">Log in</button>
				    </form>
				    {this.renderErrors()}
				</div>
			)
		}
	}

	displayLinksForUser (loggedIn) {
		if(!loggedIn)
			return;
		return (
		    <ul className="navbar-nav mr-auto">
		      <li className="nav-item">
		        <Link className="nav-link" to="/profile">Profile</Link>
		      </li>
		      <li className="nav-item">
		        <Link className="nav-link" to="/messages">Messages</Link>
		      </li>
		      <li className="nav-item">
		        <Link className="nav-link" to="/match">Browse Matches</Link>
		      </li>
		    </ul>
		)
	}

	render() {
		let currentUser = this.props.authentication.currentUser;
		let loggedIn = (currentUser && currentUser.hasOwnProperty("_id"));
		console.log("User logged in?", loggedIn);
		return (
			<div>


				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>

				  <div className="navbar-brand"><Link to="/">Bingo Smashers</Link></div>

				  <div className="collapse navbar-collapse" id="navbarSupportedContent">

				            {this.displayLinksForUser(loggedIn)}
				            {this.loginLogOut(loggedIn)}

				  </div>
				</nav>



{/*				<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
				  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>

				  <div className="navbar-brand"><Link to="/">Bingo Smashers</Link></div>

				  <div className="collapse navbar-collapse" id="navbarSupportedContent">

				            {this.displayLinksForUser(loggedIn)}
				            {this.loginLogOut(loggedIn)}

				  </div>
				</nav>*/}
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