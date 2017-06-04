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
				<div className="modal-header">
					<h5 className="modal-title">User Details</h5>
			        <button type="button" className="close" onClick={this.props.closeModal} aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
				</div>
				<div className="modal-body">
					<div className="form-group mt-2">
						<label for="matchGender">I am looking for a</label>
						<select className="form-control" name="matchGender" value={this.state.matchGender} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<label for="sterilized">Sterilization</label>
						<select className="form-control" name="sterilized" value={this.state.sterilized} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
							<option value="Not yet, but plan to be">Not yet, but plan to be</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<label for="ethnicity">Ethnicity</label>
						<select className="form-control" name="ethnicity" value={this.state.ethnicity} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Asian">Asian</option>
							<option value="Black">Black</option>
							<option value="Hispanic">Hispanic</option>
							<option value="White">White</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<label for="religion">Religion</label>
						<select className="form-control" name="religion" value={this.state.religion} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Christianity">Christianity</option>
							<option value="Islam">Islam</option>
							<option value="Hinduism">Hinduism</option>
							<option value="Buddhism">Buddhism</option>
							<option value="None">None</option>
							<option value="Other">Other</option>
						</select>
					</div>
				</div>
				<div className="modal-footer">
					<button className="btn btn-secondary" onClick={this.props.closeModal}>Close</button>
					<button className="btn btn-primary" onClick={this.saveDetails}>Save</button>
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