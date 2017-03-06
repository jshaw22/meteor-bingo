import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Onboarding extends Component {
	constructor(props){
		super(props);
		this.state = {
			myOrientation: "Choose your gender",
			matchOrientation: "Choose gender",
			bdayDay: "Day",
			bdayMonth: "Month",
			bdayYear: "Year"

		}
		this.setMyGender = this.setMyGender.bind(this);
	}
	
	setMyGender(e) {
		e.preventDefault();
		this.setState({myOrientation: e.currentTarget.value});
	}

	setMatchGender(e) {
		e.preventDefault();
		this.setState({matchOrientation: e.currentTarget.value});
	}

	setMonth(e){
		e.preventDefault();
		this.setState({bdayMonth: e.currentTarget.value});
	}

	setDay(e){
		e.preventDefault();
		this.setState({bdayDay: e.currentTarget.value});
	}

	setYear(e){
		e.preventDefault();
		this.setState({bdayYear: e.currentTarget.value});
	}

	renderDays() {
		let daysOptions = [];
		for (var i = 1; i<=31; i++) {
			daysOptions.push({
				value: i,
				text: `${i}`
			});
		}
		return daysOptions.map((val)=>{
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
			return (
				<option key={val.value} value={val.value}>{val.text}</option>
			)
		})
	}

	render() {
		return (
			<div> 
				<div className="container">
					<h2>Lets get your profile set up</h2>
					When's your birthday?
					<form className="form-inline">
					    <div className="form-group">
					    	<select onChange={this.setMonth} selected={this.state.bdayMonth} className="form-control" id="bdayMonth">
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
					    	<select onChange={this.setDay} selected={this.state.bdayDay} className="form-control" id="bdayDay">
					    		{this.renderDays()}
					    	</select>
					    </div>
					    <div className="form-group">
					    	<select onChange={this.setYear} selected={this.state.bdayYear} className="form-control" id="bdayYear">
					    		{this.renderYears()}
					    	</select>
					    </div>

					 </form>
					I am a
					<div className="form-group">
					  <select onChange={this.setMyGender} selected={this.state.myOrientation} className="form-control" id="yourGender">
					    <option value='male'>Male</option>
					    <option value='female'>Female</option>
					    <option value='other'>Other</option>
					  </select>
					</div>
					Looking for a
					<div className="form-group">
					  <select onChange={this.setMatchGender} selected={this.state.matchOrientation} className="form-control" id="yourGender">
					    <option value='male'>Male</option>
					    <option value='female'>Female</option>
					    <option value='other'>Other</option>
					  </select>
					</div>		
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