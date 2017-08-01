import React, { Component, PropTypes } from 'react';
import moment from 'moment';


class MessageThread extends Component {
	constructor(props){
		super(props);
	}

	renderThread() {
		const { threads } = this.props;
	}

	render() {
		const {thread, index} = this.props;
		let timesince = moment(thread.messagesWithContact[thread.messagesWithContact.length-1].createdOn).fromNow();
		return (
			<li>
				<a onClick={()=>this.props.threadClicked(thread.contactKey)} className="inner">{thread.contactName} {thread.messagesWithContact[0].message} {timesince}</a>
			</li>
		);
	}
}

MessageThread.PropTypes = {
	thread: React.PropTypes.object.isRequired,
	threadClicked: React.PropTypes.func.isRequired
}

export default MessageThread;