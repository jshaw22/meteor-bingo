import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

export default class SendMessageModal extends Component {
	constructor(props){
		super(props);
		this.state = {
			messageBody: '',
			status: ''
		};
		this.editText = this.editText.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	editText (e) {
		this.setState({messageBody: e.target.value});
	}

	sendMessage(e) {
		e.preventDefault();
		// server -> main.js 
		const context = this; //Need to retain this.setState context because it will be lost in Meteor.call function
		Meteor.call('sendMessage', this.props.toUser._id, this.state.messageBody, (error, response)=> {
			if(error)
				context.setState({status: error});
			else
				context.setState({status: "Message Sent!"});
				setTimeout(()=> {
					context.props.closeModal();
					context.setState({messageBody: '', status: ''});
				}, 1000);
		});
	}

	render () {
		return (
			<Modal
				isOpen={this.props.isOpen}
				onRequestClose={this.props.closeModal}
				contentLabel="Send message"
				style={customStyles}
			>
				<div className="modal-header">
					<h5 className="modal-title">Send message to {this.props.toUser.username}</h5>
			        <button type="button" className="close" onClick={this.props.closeModal} aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
				</div>
				<div className="modal-body">
					<div className="form-group mt-2">
						<label htmlFor="message">Message</label>
						<textarea id="message-text-area" className="form-control" onChange={this.editText} name="message-text-area" value={this.state.messageBody}></textarea>
					</div>
				</div>
				<div className="modal-footer">
					<p>{this.state.status}</p>
					<button className="btn btn-secondary" onClick={this.props.closeModal}>Close</button>
					<button className="btn btn-primary" onClick={this.sendMessage}>Send</button>
				</div>
			</Modal>
		)
	}
}

const customStyles = {
	content: {
		width: '500px',
		padding: '0',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '50',
	}
};