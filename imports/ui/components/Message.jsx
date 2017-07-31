import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import MessageThread from './MessageThread';

class Messages extends Component {
	constructor(props){
		super(props);
		this.state = {
			contactsArray: [],
			onePersonMessages: []
		}
		this.showThread = this.showThread.bind(this);
		let data = {};
		this.messageHandle = Meteor.subscribe('messageList');


		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = this.messageHandle.ready();
		  if (isReady){
		  	let messages = DBMessage.find({$or:[{'to._id':Meteor.userId()},{'fromuser':Meteor.userId()}]},{sort:{createdOn:1}}).fetch();
		  	this.transformMessages(messages)
		  	//this.setState({messages});
		  }		
		});
	}

	componentWillUnmount () {
		this.messageHandle.stop();
	}

	transformMessages(messages) {
		const user_id = Meteor.userId();
		let toUsers = messages.map((message) => message.to._id ).filter((id) => id != user_id);
		let fromUsers = messages.map((message) => message.fromuser ).filter((id) => id != user_id);
		let uniqueContacts = [...new Set(fromUsers.concat(toUsers))]; // ES6 get unique values
		let contactsArray = [];
		for (let i = 0; i < uniqueContacts.length; i++) {
			let messageInfo = {
				contactKey: uniqueContacts[i],
				contactName: this.contactUsername(messages, uniqueContacts[i]),
				messagesWithContact: this.messagesForContact(messages, uniqueContacts[i])
			}
			contactsArray.push(messageInfo);
		}
		this.setState({contactsArray}, ()=>console.log("state contactsarray", this.state.contactsArray));
	}

	contactUsername (messages, contact_id) {
		const messagesWithContact = this.messagesForContact(messages, contact_id);
		let username;
			// User was messaged first. Grab username of whoever messaged 
			if (messagesWithContact[0].fromuser !== Meteor.userId())
				username = messagesWithContact[0].fromUsername;
			//User messaged someone first. grab username of whoever messaged
			else if (messagesWithContact[0].fromuser === Meteor.userId())
				username = messagesWithContact[0].to.username; 
			else 
				console.error("messages structure was changed");
		return username; 
	}

	messagesForContact(messages, contact_id) {
		return messages.filter(
			(message) => 
				message.fromuser == contact_id || message.to._id == contact_id
		)
	}

	showThread (evt) {
		const contactKey = evt.currentTarget.dataset.id;
		let array = this.state.contactsArray.find(item => {
			return item.contactKey = contactKey;
		});
		this.setState({onePersonMessages: array});
	}

	renderMessageThread() {
		if (this.state.onePersonMessages.length > 0){
			return this.state.onePersonMessages.messagesWithContact.map(message => {
				console.log("message message", message.message)
				return (
					<div>{message.message}</div>
				)
			});
		}
	}
	
	renderMessageThreads() {
		return this.state.contactsArray.map((thread, index) => {
			return (
				<MessageThread threadClicked={this.showThread} thread={this.state.contactsArray[index]} />
			)
		});
	}

	render() {
		const contactMap = this.state.contactMap;
		if (contactMap && contactMap.size === 0) {
			return (<div>No messages to display</div>);
		}
		return (
			<div>
				<ul>{this.renderMessageThreads()}</ul>
				{this.renderMessageThread()}
			</div>
		)
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