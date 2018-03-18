import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import MessageThread from './MessageThread';
import Conversation from './Conversation';
import * as actions from '../actions/messageActions';


class Messages extends Component {
	constructor(props){
		super(props);

		this.threadClicked = this.threadClicked.bind(this);
		this.inputKeyPress = this.inputKeyPress.bind(this);
		
		let data = {};
		this.messageHandle = Meteor.subscribe('messageList');
		this.state = {
		  activeThreadKey: ""
		}

		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = this.messageHandle.ready();
		  if (isReady){
		  	let messages = DBMessage.find({$or:[{'to._id':Meteor.userId()},{'fromuser':Meteor.userId()}]},{sort:{createdOn:1}}).fetch();
		  	this.transformMessages(messages)
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

		/* group together toUsers and fromUsers as an object in the same array, then messages
		for each contactsArray are iterated on to display conversation between the two users */
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
		this.props.actions.storeContactsArray(contactsArray);
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

	threadClicked(contactKey) {
		this.setState({
		  activeThreadKey: contactKey
		})
	}

	//render actual message thread between two users
	renderMessageThread() {
		if (this.state.activeThreadKey != ""){
			const activeThread = this.props.messages.contactsArray.find((a)=> {return a.contactKey == this.state.activeThreadKey})
			return (
				<div className='conversation-container'>
					<Conversation individualConversations={activeThread.messagesWithContact} userId={this.props.currentUser._id}/>
					<input type="text" onKeyDown={this.inputKeyPress}/>
				</div>
			)
		}
	}

	inputKeyPress(e){
	   if (e.keyCode == 13){
	      Meteor.call(
	      	'sendMessage',
	      	this.state.activeThreadKey,
	      	e.target.value,
	      );
	   }
	}


	
	//Render thread previews on the side
	renderMessageThreads() {
		const contactsArray = this.props.messages.contactsArray;
		return contactsArray.map((thread) => {
			const active = this.state.activeThreadKey == thread.contactKey
			return (
				<MessageThread 
					key={thread.contactKey}
					threadClicked={this.threadClicked}
					thread={thread}
					active={active}
				/>
			)
		});
	}

	render() {
		const contactsArray = this.props.messages.contactsArray;
		if (contactsArray && contactsArray.length === 0) {
			return (<div>No messages to display</div>);
		}
		return (
			<div className="messageContainer">
				<div className="threads">
					<ul>{this.renderMessageThreads()}</ul>
				</div>
				{this.renderMessageThread()}
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}
const mapStateToProps = (state) => {
	return {
		messages: state.messagesReducer,
		currentUser: state.authentication.currentUser
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);