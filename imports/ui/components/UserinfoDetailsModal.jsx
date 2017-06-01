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
					<div className="detailSection">
						<div>Ethnicity</div>
							<div className="modal-edit-checkboxes">
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Asian" />
									<span>Asian</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Indian" />
									<span>Indian</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Pacific Islander" />
									<span>Pacific Islander</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Black" />
									<span>Black</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Middle Eastern" />
									<span>Middle Eastern</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="White" />
									<span>White</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Hispanic / Latin" />
									<span>Hispanic / Latin</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Native American" />
									<span>Native American</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Other" />
									<span>Other</span>
								</label>
							</div>
					</div>
					<div className="detailSection">
						<div>Religion</div>
						<select name="sterilized" value={this.state.religion} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Agnostic">Agnostic</option>
							<option value="Atheist">Atheist</option>
							<option value="Christian">Christian</option>
							<option value="Catholic">Catholic</option>
							<option value="Islam">Islam</option>
							<option value="Hindu">Hindu</option>
							<option value="Buddhist">Buddhist</option>
							<option value="Christian">Christian</option>
							<option value="Sikh">Sikh</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div className="detailSection">
						<div>Religion</div>
						<select name="religion" value={this.state.religion} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Agnostic">Agnostic</option>
							<option value="Atheist">Atheist</option>
							<option value="Christian">Christian</option>
							<option value="Catholic">Catholic</option>
							<option value="Islam">Islam</option>
							<option value="Hindu">Hindu</option>
							<option value="Buddhist">Buddhist</option>
							<option value="Christian">Christian</option>
							<option value="Sikh">Sikh</option>
							<option value="Other">Other</option>
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