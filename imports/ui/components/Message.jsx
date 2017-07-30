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
		this.messageHandle = Meteor.subscribe('messageList');

		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = this.messageHandle.ready();
		  if (isReady){
		  	let messages = DBMessage.find({$or:[{'to._id':Meteor.userId()},{'fromuser':Meteor.userId()}]},{sort:{createdOn:-1}}).fetch();
		  	this.transformMessages(messages)
		  	this.setState({messages});
		  }		
		});
	}

	componentWillUnmount () {
		this.messageHandle.stop();
	}

	transformMessages(messages) {
		user_id = Meteor.userId();
		toUsers = messages.map((message) => message.to._id ).filter((id) => id != user_id);
		fromUsers = messages.map((message) => message.fromuser ).filter((id) => id != user_id);
		contacts = new Set(fromUsers.concat(toUsers));
		hash = {}
		contactMap = new Map();
		for (var contact_id of contacts) {
			contactMap.set(contact_id, this.messagesForContact(messages, contact_id) )
		}
		debugger
		this.setState({contactMap: contactMap})
	}

	messagesForContact(messages, contact_id) {
		return messages.filter(
			(message) => 
				message.fromuser == contact_id || message.to._id == contact_id
		)
	}


	renderConversations() {
		let conversations = []
		for (var conversation of this.state.contactMap) {
			converstations.push(<Conversation {conversation} />)
		}

		return conversations
	}

	render() {
		if (this.state.contactMap == null) {
			return null;
		}

		return {this.renderConversations()}

	}


	// render() {
	// 	let rows = this.state.messages.map((message) => {
	// 		let msgfrom = Meteor.users.findOne({_id: message.fromuser});
	// 		let timesince = moment(message.createdOn).fromNow();
	// 		let klass = "primary-font text-muted";
	// 		if(message.fromuser === Meteor.userId()) {
	// 			klass = "primary-font green text-muted";
	// 		}
	// 		let address = <strong className={klass}>{msgfrom && msgfrom.username} {message.fromuser === Meteor.userId()? ' -> ' + message.to.username + ' ':''}</strong>
	// 		return (
	// 			<li key={message._id} className="left clearfix">
	// 				<div className="chat-body clearfix">
	// 					<div className="header">
	// 						{address} <small className="pull-right text-muted">
	// 						{timesince} <span id={message._id}></span></small>
	// 					</div>
	// 					<p>{message.message}</p>
	// 				</div>
	// 			</li>
	// 		)
	// 	});

	// 	if(this.state.messages.length === 0) {
	// 		rows = <p>No messages</p>
	// 	}

	// 	return (
	// 		<div className= "column col-sm-7 col-xs-1">
	// 			{rows}
	// 		</div>
	// 	)
	// }
}

export default Messages;