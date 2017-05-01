import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';

/* Users page has very similar markup to "profile" page, but is used to display other
users and has components like "message", etc and doesn't allow you to edit profile */
class Users extends Component {
	constructor(props){
		super(props);
		this.state = {
			userExists: true,
			homeUser: {},
			messageCSS: 'row hide',
			status: '',
			message: ''
		}
		this.sendMessage = this.sendMessage.bind(this);
		this.showSendMessage = this.showSendMessage.bind(this);
		this.closeSendMessage = this.closeSendMessage.bind(this);
		this.setMessage = this.setMessage.bind(this);
		const handle = Meteor.subscribe('userList');
		
		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = handle.ready();
		  if(isReady){
		  	let userEnteredPage = Meteor.users.findOne({username: this.props.params.username});
		  	if (userEnteredPage === undefined) // no user exists
		  		this.setState({userExists:false})

		  	if (userEnteredPage._id === Meteor.userId()) {
		  		browserHistory.push('/profile')
		  	} else {
		  		this.setState({homeUser: userEnteredPage});
		  	}
		  }		
		});
	}

	setMessage(e){
		e.preventDefault();
		this.setState({message: e.target.value});

	}

	closeSendMessage(e) {
		e.preventDefault();
		this.setState({messageCSS: "row hide"});
	}

	showSendMessage(e) {
		e.preventDefault();
		let messageCSS = "row";
		console.log("state of message", this.state);
		if (this.state.messageCSS.indexOf("hide") === -1) {
			messageCSS = "row hide";
		}
		this.setState({messageCSS, status:''});
	}

	sendMessage(e) {
		e.preventDefault();
		Meteor.call('sendMessage', this.state.homeUser._id, this.state.message);
		this.setState({messageCSS:"row hide", status: "Message Sent"});
		console.log("Message sent with", this.state.message);
	}

	render(){
		if(!this.state.userExists)
			return (<h2>User doesn't exist!</h2>)
		return (
			<div>
				<div className="panel-body">
					<h2>{this.state.homeUser.username}</h2>
					<hr/>
					<button onClick={this.showSendMessage} type="button" className="btn btn-info btn-md" data-toggle="modal" data-target="#myModal">Send a message</button>
				</div>
				<h3>{this.state.status}</h3>
			
				<div className={this.state.messageCSS}>
					<div className="col-md-8">
						<div className="row">
							<div className="col-md-12">
								<div className="form-group">
									<label>To:</label>
									<div className="input-group">
									<input readOnly type="to" id="to" name="to" className="form-control" placeholder="Send Message To" value={this.state.homeUser && this.state.homeUser.username} />
								</div>
								<div className="form-group">
									<label>Message</label>
									<textarea value={this.state.value} onChange={this.setMessage} name="message" id="message" className="form-control" required="required" placeholder="Message"></textarea>
								</div>
								</div>
							</div>
						<div className="col-md-12">
							<div className="control-group">
								<label className="control-label" htmlFor="button1id"></label>
								<div className="btn-toolbar">
									<button onClick={this.closeSendMessage} id="button2id" name="button2id" className="btn btn-default ">Close</button>
									<button onClick={this.sendMessage} id="button1id" name="button1id" className="btn btn-success ">Send</button>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect()(Users);
