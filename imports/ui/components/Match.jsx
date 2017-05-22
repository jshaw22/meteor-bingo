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
				"profile.myGender": this.state.selectMatchGender,
				"profile.age": {$gt: parseInt(this.state.selectAgeFrom), $lt: parseInt(this.state.selectAgeTo)},
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

					<div className="card m-2">
						<div className="card-block">
							<h5 className="card-title">
								<Link to={`/profile/${user.username}`}>{user.username}</Link>
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">{user.profile.location}</h6>
							<img className="img-thumbnail" src="http://placehold.it/100x100" id={`picture${index}`} alt="profile pic"/>
						</div>
					</div>


				</div>
			)
		});
	}

	render() {
		return (
			<div className="container">
				<div className="form-inline my-3" onChange={this.formChange}>
					<div className="form-group">
				    	<select className="form-control mr-2" name="selectMatchGender">
				    		<option value="" disabled selected>I am looking for a</option>
				    		<option value="Male">Male</option>
				    		<option value="Female">Female</option>
				        </select>

				        <select className="form-control mx-2" name="selectAgeFrom">
				        	{this.renderDays("from")}
				        </select>

				        <select className="form-control mx-2" name="selectAgeTo">
				        	{this.renderDays("to")}
				        </select>

					    <button id="searchbtn" type="submit" onClick={this.searchMatches} className="fa fa-search btn btn-primary  mx-2"></button>
					</div>
				</div>
				<div className="row">
					{this.showMatches()}
				</div>
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