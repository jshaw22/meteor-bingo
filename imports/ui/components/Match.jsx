import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/matchUserActions';

class Match extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectMatchGender: null,
			selectAgeFrom: null,
			selectAgeTo: null
		}
		this.formChange = this.formChange.bind(this);
		this.searchMatches = this.searchMatches.bind(this);
	}


	//gonna need to save sessions so user doesn't have to filter every time
	searchMatches () {
		let filteredUsers = Meteor.users.find(
			{
				_id: {$not: Meteor.userId()},
				"profile.info.myGender": this.state.selectMatchGender,
				"profile.info.age": {$gt: parseInt(this.state.selectAgeFrom), $lt: parseInt(this.state.selectAgeTo)},
		}).fetch(); 
		if (filteredUsers) 
			this.props.actions.matchedUsers(filteredUsers);
	}
	
	formChange(e){
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change);
	}

	renderDays(fromTo) {
		let daysOptions = [];
		for (var i = 17; i<=100; i++) {
			daysOptions.push({
				value: i,
				text: `${i}`
			});
		}
		return daysOptions.map((val)=>{
			if(val.value === 17){
				return (<option key="default" value="" disabled selected>Age {fromTo}</option>)
			}
			return (
				<option key={val.value} value={val.value}>{val.text}</option>
			)
		})
	}

	showMatches () {
		const matches = this.props.matchUsers.matchedUsers;
		if(!matches)
			return;
		return matches.map((user, index) =>{
			return (
				<div className="col-xs-4" key={`user${index}`}>
					<div><Link to={'profile/'+user.username}>{user.username}</Link></div>
					<div>{user.profile.info.location}</div>
					<img src="http://placehold.it/100x100" id={`picture${index}`} className="img-responsive" />

				</div>
			)
		});
	}

	render() {
		return (
			<div>
				<div className="form-inline" onChange={this.formChange}>
				    <div className="input-group">
				    	<select className="form-control" name="selectMatchGender">
				    		<option value="" disabled selected>I am looking for a</option>
				    		<option value="male">Male</option>
				    		<option value="female">Female</option>
				    		<option value="other">Other</option>
				        </select>
				    </div>
				    <div className="input-group">
				        <select className="form-control" name="selectAgeFrom">
				        	{this.renderDays("from")}
				        </select>
				    </div>
				    <div className="input-group">
				        <select className="form-control" name="selectAgeTo">
				        	{this.renderDays("to")}
				        </select>
				    </div>
				    <div className="input-group" style={{width:"105px"}}>
				        <button id="searchbtn" type="submit" onClick={this.searchMatches} className="fa fa-search"></button>
				    </div>
				</div>
				{this.showMatches()}
			</div>
		)

	}
}

Match.PropTypes = {
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),


	};
}
const mapStateToProps = (state) => {
	return {
		authentication: state.authentication,
		users: Meteor.users.find({}).fetch(),
		matchUsers: state.matchUserReducer
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Match);