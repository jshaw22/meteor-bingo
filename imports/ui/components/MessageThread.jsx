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
		const {thread} = this.props;
		let timesince = moment(thread.createdOn).fromNow();
		return (
			<li>
				<a onClick={this.props.threadClicked} data-id={thread.contactKey} className="inner">{thread.contactName} {thread.messagesWithContact[0].message} {timesince}</a>
			</li>
		);
	}
}

MessageThread.PropTypes = {
	thread: React.PropTypes.object.isRequired 
}

export default MessageThread;