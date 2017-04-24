import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';

class Users extends Component {
	constructor(props){
		super(props);
		this.state = {
			userExists: true
		}
		const handle = Meteor.subscribe('userList');
		
		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = handle.ready();
		  if(isReady){
		  	let userEnteredPage = Meteor.users.findOne({username: this.props.params.username});
		  	if (userEnteredPage === undefined) // no user exists
		  		this.setState({userExists:false})

		  	if (userEnteredPage._id === Meteor.userId()){
		  		browserHistory.push('/profile')
		  	}
		  }		
		});
	}

	render(){
		if(!this.state.userExists)
			return (<h2>User doesn't exist!</h2>)
		return (
			<div>this is {this.props.params.username} page</div>
		)
	}

}

export default connect()(Users);
