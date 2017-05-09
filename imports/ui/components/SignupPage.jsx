import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class SignupPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			error: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		let username = document.getElementById('signup-username').value;
		let password = document.getElementById('signup-password').value;
		Accounts.createUser({username, password}, (err)=>{
			if(err){
				this.setState({error: err.reason});
			} else {
				browserHistory.push('/onboarding');
			}
		});
	}

	render () {
		const error = this.state.error;
		return (
			<div className="">
				<div className="">
					<div className="">
						<div className="">
							<h1 className="text-center">Sign up</h1>
						</div>
						<div className="">
							{error.length > 0 ? 
								<div className="alert alert-danger">{error}</div>:''
							}
						<form
							id="login-form"
							className="form col-md-12 center-block"
							onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input
									type="text"
									id="signup-username"
									className="form-control input-lg"
									placeholder="username" />
							</div>
							<div className="form-group">
								<input
									type="password"
									id="signup-password"
									className="form-control input-lg"
									placeholder="password" />
							</div>
							<div className="form-group text-center">
								<input
									type="submit"
									id="login-button"
									className="btn btn-primary btn-lg btn-block"
									value="Sign Up" />
							</div>
							<div className="form-group text-center">
								<p className="text-center">Already have an account? Login <Link to="/login">here</Link></p>
							</div>
						</form>
					</div>
					<div className="" style={{borderTop:0}}></div>
				</div>
			</div>
			</div>
		);
	}
}

/*<div className="modal show">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="text-center">Sign up</h1>
						</div>
						<div className="modal-body">
							{error.length > 0 ? 
								<div className="alert alert-danger">{error}</div>:''
							}
						<form
							id="login-form"
							className="form col-md-12 center-block"
							onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input
									type="text"
									id="signup-username"
									className="form-control input-lg"
									placeholder="username" />
							</div>
							<div className="form-group">
								<input
									type="password"
									id="signup-password"
									className="form-control input-lg"
									placeholder="password" />
							</div>
							<div className="form-group text-center">
								<input
									type="submit"
									id="login-button"
									className="btn btn-primary btn-lg btn-block"
									value="Sign Up" />
							</div>
							<div className="form-group text-center">
								<p className="text-center">Already have an account? Login <Link to="/login">here</Link></p>
							</div>
						</form>
					</div>
					<div className="modal-footer" style={{borderTop:0}}></div>
				</div>
			</div>
		</div>
		*/