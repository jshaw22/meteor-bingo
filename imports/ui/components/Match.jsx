import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Match extends Component {
	constructor(props){
		super(props);
		this.state = {
			matchGender: null,
			ageFrom: null,
			ageTo: null
		}
	}

	componentWillMount(){
		var userHandle = Meteor.subscribe('userList');
		console.log("user handle", userHandle);
		console.log("users", this.props.users);
	}

	formChange(e){
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change, () => console.log(this.state));
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

	showNewUsers () {
		const users = this.props.users;
		return users.map((user, index) =>{
			return (
				<div className="col-xs-4" key={`user${index}`}>
					<div>{user.username}</div>
					<div>{user.profile.info.location}</div>
					<img src="http://placehold.it/100x100" id={`picture${index}`} className="img-responsive" />
				</div>
			)
		});
	}

	render() {
		return (
			<div className="form-inline" onChange>
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
			        <button id="searchbtn" type="submit" className="form-control"><span className="glyphicon glyphicon-search"></span></button>
			    </div>
			</div>
		)

	}
}

Match.PropTypes = {
	username: React.PropTypes.string
}

function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(actions, dispatch),
	};
}
const mapStateToProps = (state) => {
	return {
		authentication: state.authentication,
		users: Meteor.users.find({}).fetch()
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Match);