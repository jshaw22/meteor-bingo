import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

export default class UserinfoDetailsModal extends Component {
	constructor(props){
		super(props);
		this.state = {
		};
		this.onChange = this.onChange.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
		this.changeEthnicity = this.changeEthnicity.bind(this);
	}
	componentWillMount () {
		//grab the props and populate the state. 
		//TODO: Is there any way more efficient than copying over each prop? 
		for (var key in Meteor.user().profile){
			let value = Meteor.user().profile[key] === '' ? "--" : Meteor.user().profile[key];
			if (key == 'ethnicity' && (value == "--"))
				value = []
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

	changeEthnicity (e) {
		let ethnicityArr = this.state.ethnicity;
		ethnicity = e.target.value;
		if (e.target.checked) {
			ethnicityArr.push(ethnicity);
		}
		else {
			index = ethnicityArr.indexOf(ethnicity);
	    ethnicityArr.splice(index, 1);
	  }
		this.setState({ethnicity: ethnicityArr});
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
									<input type="checkbox" name="ethnicity" value="Asian" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Asian')} />
									<span>Asian</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Indian" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Indian')}/>
									<span>Indian</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Pacific Islander" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Pacific Islander')}/>
									<span>Pacific Islander</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Black" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Black')}/>
									<span>Black</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Middle Eastern" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Middle Eastern')}/>
									<span>Middle Eastern</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="White" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('White')}/>
									<span>White</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Hispanic / Latin" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Hispanic / Latin')}/>
									<span>Hispanic / Latin</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Native American" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Native American')}/>
									<span>Native American</span>
								</label>
								<label className="modal-checkbox">
									<input type="checkbox" name="ethnicity" value="Other" onChange={this.changeEthnicity} checked={this.state.ethnicity.includes('Other')}/>
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