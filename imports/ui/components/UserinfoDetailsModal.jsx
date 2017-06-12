import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

export default class UserinfoDetailsModal extends Component {
	constructor(props){
		super(props);
		this.state = {
		};
		this.onChange = this.onChange.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
		this.changeCheckbox = this.changeCheckbox.bind(this);
	}
	componentWillMount () {
		//grab the props and populate the state. 
		//TODO: Is there any way more efficient than copying over each prop? 
		for (var key in Meteor.user().profile){
			let value = Meteor.user().profile[key] === '' ? "--" : Meteor.user().profile[key];
			console.log("key-value", key, value);
			//If it's going to be something with a multi-select, need to set value as an array
			if ((key === 'ethnicity' || key === 'pets') && (value.length === 0))
				value = [];
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

	changeCheckbox (e) {
		let checkboxArr = this.state[e.target.name];
		let checkboxValue = e.target.value;
		if (e.target.checked) {
			checkboxArr.push(checkboxValue);
		}
		else {
			let index = checkboxArr.indexOf(checkboxValue);
	    checkboxArr.splice(index, 1);
	  }
		this.setState({[e.target.name]: checkboxArr});
	}

	saveDetails (e) {
		e.preventDefault();
		const context = this; //We lose the context to 'this' props inside the update function
		Meteor.call('saveDetails', this.state, (err, resp)=> {
			if(err)
				console.log("There was an error saving the details", err);
			context.props.closeModal();
		});
	}

	render () {
		console.log("This current state", this.state);
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
						<label htmlFor="matchGender">I am looking for a</label>
						<select className="form-control" name="matchGender" value={this.state.matchGender} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<label htmlFor="sterilized">Sterilization</label>
						<select className="form-control" name="sterilized" value={this.state.sterilized} onChange={this.onChange}>
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
									<input type="checkbox" name="ethnicity" value="Asian" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Asian')} />
									<span>Asian</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Indian" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Indian')}/>
									<span>Indian</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Pacific Islander" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Pacific Islander')}/>
									<span>Pacific Islander</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Black" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Black')}/>
									<span>Black</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Middle Eastern" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Middle Eastern')}/>
									<span>Middle Eastern</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="White" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('White')}/>
									<span>White</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Hispanic / Latin" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Hispanic / Latin')}/>
									<span>Hispanic / Latin</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Native American" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Native American')}/>
									<span>Native American</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Other" onChange={this.changeCheckbox} checked={this.state.ethnicity.includes('Other')}/>
									<span>Other</span>
								</label>
							</div>
					</div>
					<div className="form-group mt-2">
						<div>Religion</div>
						<select className="form-control" name="religion" value={this.state.religion} onChange={this.onChange}>
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
					<div className="form-group mt-2">
						<div>Relationship Status</div>
						<select className="form-control" name="relationshipStatus" value={this.state.relationshipStatus} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Single">Single</option>
							<option value="Taken">Taken</option>
							<option value="Open">Open</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<div>Body type</div>
						<select className="form-control" name="bodyType" value={this.state.bodyType} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Thin">Thin</option>
							<option value="Average">Average</option>
							<option value="Fit">Fit</option>
							<option value="Jacked">Jacked</option>
							<option value="Curvy">Curvy</option>
							<option value="Overweight">Overweight</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<div>Height</div>
						<select className="form-control" name="height" value={this.state.height} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="heightgoeshere">height goes here</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<div>Diet</div>
						<select className="form-control" name="diet" value={this.state.diet} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="Omnivore">Omnivore</option>
							<option value="Vegetarian">Vegetarian</option>
							<option value="Vegan">Vegan</option>
							<option value="Kosher">Kosher</option>
							<option value="Halal">Halal</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<div>Education</div>
						<select className="form-control" name="education" value={this.state.education} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="High school">High school</option>
							<option value="Some college">Some college</option>
							<option value="College">College</option>
							<option value="Masters">Masters</option>
							<option value="Doctorate">Doctorate</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<div>Drugs</div>
						<select className="form-control" name="drugs" value={this.state.drugs} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="None">None</option>
							<option value="Some">Some</option>
							<option value="Often">Often</option>
						</select>
					</div>
					<div className="form-group mt-2">
						<div>Drink</div>
						<select className="form-control" name="drugs" value={this.state.drugs} onChange={this.onChange}>
							<option value="--">--</option>
							<option value="None">None</option>
							<option value="Socially">Socially</option>
							<option value="Often">Often</option>
						</select>
					</div>
					<div className="detailSection">
						<div>Pets</div>
							<div className="modal-edit-checkboxes">
								<label className="modal-checkbox">
									<input type="checkbox" name="pets" value="Cats" onChange={this.changeCheckbox} checked={this.state.pets.includes('Cats')} />
									<span>Cats</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="pets" value="Dogs" onChange={this.changeCheckbox} checked={this.state.pets.includes('Dogs')} />
									<span>Dogs</span>
								</label>
							</div>
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
		overflow: 'scroll',
		height: '500px'
	}
};