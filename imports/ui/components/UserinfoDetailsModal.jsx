import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

export default class UserinfoDetailsModal extends Component {
	constructor(props){
		super(props);
		this.state = {
		};
		this.onChange = this.onChange.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
	}
	componentWillMount () {
		//grab the props and populate the state. 
		//TODO: Is there any way more efficient than copying over each prop? 
		for (var key in Meteor.user().profile){
			let value = Meteor.user().profile[key] === '' ? "--" : Meteor.user().profile[key];
			this.setState({
				[key]: value
			});
		}
	}

	onChange (e) {
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change);
	}

	saveDetails (e) {
		e.preventDefault();
		const context = this; //We lose the context to 'this' props inside the update function
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile": this.state}}, function(err){
			if(err){
				console.log("There was an error saving user details");
			}
			context.props.closeModal();
		});
	}

	render () {
		return (
			<Modal
				isOpen={this.props.isOpen}
				onRequestClose={this.props.closeModal}
				contentLabel="Edit User Details"
				style={customStyles}
			>
				<div className="modalHeader">
					<div>User Details</div>
					<div><span className="fa fa-times" onClick={this.props.closeModal}/></div>
				</div>
				<div className="modalBody">
					<div className="detailSection">
						<div>I am looking for a</div>
						<select name="matchGender" value={this.state.matchGender} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
					<div className="detailSection">
						<div>Sterilization</div>
						<select name="sterilized" value={this.state.sterilized} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
							<option value="Not yet, but plan to be">Not yet, but plan to be</option>
						</select>
					</div>
				</div>
				<div className="modalButtons">
					<button onClick={this.props.closeModal}>Close</button>
					<button onClick={this.saveDetails}>Save</button>
				</div>
			</Modal>
		)
	}
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '50'
	}
};