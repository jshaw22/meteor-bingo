import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment'; 
import * as actions from '../actions/authentication';

class Onboarding extends Component {
	constructor(props){
		super(props);
		this.state = {
			myGender: null,
			matchGender: null,
			bdayDay: null,
			bdayMonth: null,
			bdayYear: null,
			sterilized: null,
			zipCode: null,
		}
		this.formChange = this.formChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
	}

	renderDays() {
		let daysOptions = [];
		for (var i = 0; i<=31; i++) {
			daysOptions.push({
				value: i,
				text: `${i}`
			});
		}
		return daysOptions.map((val)=>{
			if(val.value === 0){
				return (<option key="default" value="" selected disabled>Day</option>)
			}
			return (
				<option key={val.value} value={val.value}>{val.text}</option>
			)
		})
	}
	//TODO: use momentJS to calculate at least 18 years of age to use site
	renderYears() {
		let yearOptions = [];
		for (var i = 1999; i>1920; i--) {
			yearOptions.push({
				value: i,
				text: `${i}`
			});
		}
		return yearOptions.map((val)=>{
			if( val.value === 1999) // TODO change this to be more dynamic with Moment
				return (<option key="default" value="" selected disabled>Year</option>)
			return (
				<option key={val.value} value={val.value}>{val.text}</option>
			)
		})
	}

	formChange(e){
		let change = {};
		change[e.target.name] = e.target.value;
		console.log("e target name, value", e.target.name, e.target.value)
		this.setState(change, ()=>console.log("state is now", this.state))
	}

	submitForm(e){
		e.preventDefault();
		//Needs to be a more elegant way of sending avatar hash. because it gets uploaded first before form submit
		user = this.props.authentication.currentUser;
		let userInfo = {
			...this.state, 
			avatar: user.profile.info.avatar,
			location: user.location,
		};

		
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.info": userInfo}}, function(err){
			if(err){
				console.log("There was an error");
			}
			browserHistory.push('/profile');
		});
	}

	showAge() {
		if (this.state.bdayYear !==null && this.state.bdayMonth !== null && this.state.bdayDay !== null) {
			let dateOfBirth = `${this.state.bdayYear}-${this.state.bdayMonth}-${this.state.bdayDay}`;
			let age = moment().diff(dateOfBirth, 'years');
			return `Ah, ${age}. What a great age to be childfree!`;
		}
	}

	findCityByZipCode() {
		const zip = parseInt(this.state.zipCode);
		if (zip.toString().length === 5 && !this.props.authentication.currentUser.location) {
			this.props.actions.getZip(zip);
		}
	}

	showLocation() {
		const location = this.props.authentication.currentUser.location;
		if (location === "error")
			return "Hmm, seems to be an error with this location."
		else if (location)
			return `Ah, ${location}. Hopefully some promising matches waiting for you there!`
		else
			return;
	}
	
	uploadFile(e) {
		e.preventDefault();
		FS.Utility.eachFile(e, function (file) {
			Images.insert(file, function (err, fileObj) {
				if(err)
					Meteor.error("Unable to upload picture");
				Meteor.call("changeAvatar", Meteor.user(), fileObj._id);
			});
		});
	}

	render() {
		this.findCityByZipCode();
		return (
			<div> 
				<div className="container" onChange={this.formChange}>
					<h2>Lets get your profile set up</h2>
					When's your birthday?
					<form className="form-inline">
					    <div className="form-group">
					    	<select name="bdayMonth" selected={this.state.bdayMonth} className="form-control" id="bdayMonth">
						        <option value="" selected disabled>Month</option>
						        <option value='1'>Jan</option>
						        <option value='2'>Feb</option>
						        <option value='3'>Mar</option>
						        <option value='4'>Apr</option>
						        <option value='5'>May</option>
						        <option value='6'>Jun</option>
						        <option value='7'>Jul</option>
						        <option value='8'>Aug</option>
						        <option value='9'>Sep</option>
						        <option value='10'>Oct</option>
						        <option value='11'>Nov</option>
						        <option value='12'>Dec</option>
					     	</select>
					    </div>
					    <div className="form-group">
					    	<select name="bdayDay" selected={this.state.bdayDay} className="form-control" id="bdayDay">
					    		{this.renderDays()}
					    	</select>
					    </div>
					    <div className="form-group">
					    	<select name="bdayYear" selected={this.state.bdayYear} className="form-control" id="bdayYear">
					    		{this.renderYears()}
					    	</select>
					    </div>
					 </form>
					 <p>{this.showAge()}</p>
					I am a
					<div className="form-group">
					  <select name="myGender" selected={this.state.myOrientation} className="form-control" id="myGender">
					     <option value='default'>Choose one</option>
					    <option value='male'>Male</option>
					    <option value='female'>Female</option>
					    <option value='other'>Other</option>
					  </select>
					</div>
					Looking for a
					<div className="form-group">
					  <select name="matchGender" selected={this.state.matchOrientation} className="form-control" id="matchGender">
					    <option value='default'>Choose one</option>
					    <option value='male'>Male</option>
					    <option value='female'>Female</option>
					    <option value='other'>Other</option>
					  </select>
					</div>	
					Sterilized? 
					<div className="form-group">
					  <select name="sterilized" selected={this.state.sterilized} className="form-control" id="sterilized">
					    <option value='default'>Choose one</option>
					    <option value='true'>Yes</option>
					    <option value='false'>No</option>
					    <option value='plan'>Not yet, but plan to be</option>
					  </select>
					</div>
					Where are you from? Enter your zip code
					<div className="form-group">
						<input type="text" pattern="[0-9]*" maxLength="5" required name="zipCode" id="zip" />
					</div>
					<p>{this.showLocation()}</p>
				</div>
				Lastly, upload your beautiful mug(s)
					<input id="avatar" onChange={this.uploadFile} type="file" />
					<button onClick={this.submitForm} className="btn btn-primary">Submit</button>	
			</div>
		);
	}
}

Onboarding.PropTypes = {
	username: React.PropTypes.string
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}
const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);