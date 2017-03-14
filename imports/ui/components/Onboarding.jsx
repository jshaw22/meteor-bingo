import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Onboarding extends Component {
	constructor(props){
		super(props);
		this.state = {
			myGender: "Choose your gender",
			matchGender: "Choose gender",
			bdayDay: "Day",
			bdayMonth: "Month",
			bdayYear: "Year",
			sterilized: "Pick one",

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
				return (<option value="default">Day</option>)
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
				return (<option value="default">Year</option>)
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
		Meteor.call("updateUser", this.state);
	}

	render() {
		// Use Moment to render age 
		const age = 28;
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
					 <p>Ah, {age}. Great age to be child free!</p> 
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
		//actions: bindActionCreators(actions, dispatch),
	};
}
const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);