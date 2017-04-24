import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Messages extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
		let data = {};
		let messageHandle = Meteor.subscribe('messageList');
		data.messages = DBMessage.find(
			{
				$or:[{'to._id': Meteor.userId()}, {'fromuser': Meteor.userId()}]
			},
			{
				sort:{createdOn:-1}
			}).fetch();
	}

	render() {
		return (<div>messages</div>)
	}

}

export default Messages;