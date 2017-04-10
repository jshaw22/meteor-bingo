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
			zipCode: null
		}
		this.formChange = this.formChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
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
				return (<option key="default" value="default">Day</option>)
			}
			return (
				<option key={val.value} value={val.value}>{val.text}</option>
			)
		})
	}
	//TODO: use momentJS to calculate at least 18 years of age 
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
				return (<option key="default" value="default">Year</option>)
			return (
				<option key={val.value} value={val.value}>{val.text}</option>
			)
		})
	}

	formChange(e){
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change, () => console.log(this.state));
	}

	submitForm(e){
		e.preventDefault();
		let userInfo = {...this.state, avatar: 'http://placehold.it/150x150'};
		
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.info": userInfo}}, function(err){
			if(err){
				console.log("There was an error");
			}
			browserHistory.push('/profile');
		});
	}

	calcAge(){
		let dateOfBirth = `${this.state.bdayYear}-${this.state.bdayMonth}-${this.state.bdayDay}`;
		if (this.state.bdayYear !==null && this.state.bdayMonth !==null && this.state.bdayDay !== null) {
			let age = moment().diff(dateOfBirth, 'years');
			return `Ah, ${age}. What a great age to be childfree!`;
		}
	}

	findCityByZipCode() {
		const zip = parseInt(this.state.zipCode);
		if (zip.toString().length === 5) {
			this.props.actions.getZip(zip);
		}
	}

	showLocation() {
		const location = this.props.authentication.location;
		if (location === "error")
			return "Hmm, seems to be an error with this location."
		else if (location)
			return `Ah, ${location}. Hopefully some promising matches waiting for you there!`
		else
			return;
	}

	render() {
		return (
			<div> 
				<div className="container" onChange={this.formChange}>
					<h2>Lets get your profile set up</h2>
					When's your birthday?
					<form className="form-inline">
					    <div className="form-group">
					    	<select onChange={this.setMonth} name="bdayMonth" selected={this.state.bdayMonth} className="form-control" id="bdayMonth">
						        <option value='default'>Month</option>
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
					    	<select onChange={this.setYear} name="bdayYear" selected={this.state.bdayYear} className="form-control" id="bdayYear">
					    		{this.renderYears()}
					    	</select>
					    </div>
					 </form>
					 <p>{this.calcAge()}</p>
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
					    <option value='yes'>Yes</option>
					    <option value='no'>No</option>
					    <option value='plan'>Not yet, but plan to be</option>
					  </select>
					</div>
					Where are you from? Enter your zip code
					<div className="form-group">
						<input type="text" pattern="[0-9]*" maxLength="5" required name="zipCode" id="zip" />
						{this.findCityByZipCode()}
					</div>
					<p>{this.showLocation()}</p>
					<button onClick={this.submitForm} className="btn btn-primary">Submit</button>	
				</div>

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