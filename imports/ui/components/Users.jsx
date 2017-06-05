import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';
import SendMessageModal from './SendMessageModal';

/* Users page has very similar markup to "profile" page, but is used to display other
users and has components like "message", etc and doesn't allow you to edit profile */
class Users extends Component {
	constructor(props){
		super(props);
		this.state = {
			userExists: true,
			homeUser: '',
			messageCSS: 'row hide',
			status: '',
			message: '',
			avatar: '',
			messageModal: false
		}
		this.openMessageModal = this.openMessageModal.bind(this);
		this.closeMessageModal = this.closeMessageModal.bind(this);
		this.setMessage = this.setMessage.bind(this);
		const handle = Meteor.subscribe('userList');
		
		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
			const isReady = handle.ready();
			if(isReady){
				let userEnteredPage = Meteor.users.findOne({username: this.props.params.username});
				if (userEnteredPage === undefined) // no user exists
					this.setState({userExists:false})

				if (userEnteredPage._id === Meteor.userId()) {
					browserHistory.push('/profile');
				} else { //Save user object to local homeUser
						this.setState({homeUser: userEnteredPage});
						let avatar = Images.findOne({_id: userEnteredPage.profile.avatar}).url();
						this.setState({avatar});
					}
			}		
		});
	}

	openMessageModal () {
		this.setState({messageModalOpen: true});
	}

	closeMessageModal () {
		this.setState({messageModalOpen: false});
	}

	setMessage(e){
		e.preventDefault();
		this.setState({message: e.target.value});

	}

	render(){
		if(!this.state.userExists)
			return (<h2>User doesn't exist!</h2>)
		let homeUserProfile = this.state.homeUser.profile || 'loading...';
		return (
			<div>
				<div className="profile-header">
					<div className="inner-element">
						<div className="userinfo">
							<div className="userinfo-thumb">
								<img className="img-rounded" src={this.state.avatar} />
							</div>
							<div className="userinfo-basics">
								<div className="userinfo-basics-username">{this.state.homeUser.username}</div>
								<div className="userinfo-basics-asl">
									<span className="userinfo-basics-asl-age">{homeUserProfile.age}</span>
									<span className="userinfo-basics-asl-spacer">•</span>
									<span className="userinfo-basics-asl-location">{homeUserProfile.location}</span>
								</div>
							</div>
						</div>
						<div className="user-actions">
								<button onClick={this.openMessageModal} className="btn btn-info btn-md">Message</button>
								<SendMessageModal toUser={this.state.homeUser} isOpen={this.state.messageModalOpen} closeModal={this.closeMessageModal} />
							</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect()(Users);
