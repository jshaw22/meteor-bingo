import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

class Messages extends Component {
	constructor(props){
		super(props);
		this.state = {
			messages: []
		}
		let data = {};
		let messageHandle = Meteor.subscribe('messageList');

		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = messageHandle.ready();
		  if (isReady){
		  	let messages = DBMessage.find({$or:[{'to._id':Meteor.userId()},{'fromuser':Meteor.userId()}]},{sort:{createdOn:-1}}).fetch();
		  	this.setState({messages});
		  }		
		});
	}

	render() {
		let rows = this.state.messages.map((message) => {
			let msgfrom = Meteor.users.findOne({_id: message.fromuser});
			let timesince = moment(message.createdOn).fromNow();
			let klass = "primary-font text-muted";
			if(message.fromuser === Meteor.userId()) {
				klass = "primary-font green text-muted";
			}
			let address = <strong className={klass}>{msgfrom && msgfrom.username} {message.fromuser === Meteor.userId()? ' -> ' + message.to.username + ' ':''}</strong>
			return (
				<li key={message._id} className="left clearfix">
					<div className="chat-body clearfix">
						<div className="header">
							{address} <small className="pull-right text-muted">
							{timesince} <span id={message._id}></span></small>
						</div>
						<p>{message.message}</p>
					</div>
				</li>
			)
		});

		if(this.state.messages.length === 0) {
			rows = <p>No messages</p>
		}

		return (
			<div className= "column col-sm-7 col-xs-1">
				{rows}
			</div>
		)
	}
}

export default Messages;