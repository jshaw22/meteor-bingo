import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';
import SendMessageModal from './SendMessageModal';
import ParagraphSection from './ParagraphSection';
import UserinfoDetails from './UserinfoDetails';

/* Users page has very similar markup to "profile" page, but is used to display other
users and has components like "message", etc and doesn't allow you to edit profile */
class Users extends Component {
	constructor(props){
		super(props);
		this.state = {
			userExists: true,
			homeUser: '',
			messageCSS: 'row hide',
			message: '',
			avatar: '',
			messageModalOpen: false
		}
		this.openMessageModal = this.openMessageModal.bind(this);
		this.closeMessageModal = this.closeMessageModal.bind(this);
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

	formatCheckbox (checkbox) {
		if (checkbox && checkbox.length > 1) {
			let formattedCheckbox = checkbox.join(', ');
			return formattedCheckbox;
		} else {
			return checkbox || '--';
		}
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
								{Meteor.user() ? <button onClick={this.openMessageModal} className="btn btn-info btn-md">Message</button> : <div></div>}
								<SendMessageModal toUser={this.state.homeUser} isOpen={this.state.messageModalOpen} closeModal={this.closeMessageModal} />
						</div>
					</div>
				</div>
				<div className="profile-content">
					<div className="profile-content-main">
						<div className="profile-section">
							<ParagraphSection dbObjectName="aboutMe" sectionTitle="About me" paragraphContent={homeUserProfile.aboutMe} />
							<ParagraphSection dbObjectName="whatILike" sectionTitle="What I like to do" paragraphContent={homeUserProfile.whatILike} />
							<ParagraphSection dbObjectName="favStuff" sectionTitle="Favorite books, movies, shows, etc" paragraphContent={homeUserProfile.favStuff} />
							<ParagraphSection dbObjectName="cfBecause" sectionTitle="I'm childfree because..." paragraphContent={homeUserProfile.cfBecause} />
							<ParagraphSection dbObjectName="messageMeIf" sectionTitle="You should message me if..." paragraphContent={homeUserProfile.messageMeIf} />						
						</div>
					</div>
					<div className="profile-content-sidebar">
						<div className="details-section-edit">
							<div className="details-section">
							  <span className="icon fa fa-id-card-o mr-2"/><div className="details-title">Profile Details</div>
							  <div className="details-section-filled">
							    <div className="details-block"><span className="fa fa-user-o" /><div className="details-element">{homeUserProfile.myGender}</div></div>
							    <div className="details-block"><span className="fa fa-venus-mars" /><div className="details-element">Looking for: {homeUserProfile.matchGender}</div></div>
							    <div className="details-block"><span className="fa fa-scissors"/><div className="details-element">Sterilized: {homeUserProfile.sterilized}</div></div>
							    <div className="details-block"><span className="fa fa-globe"/><div className="details-element">Ethnicity: {this.formatCheckbox(homeUserProfile.ethnicity)}</div></div>
							    <div className="details-block"><span className="fa fa-building-o"/><div className="details-element">Religion: {homeUserProfile.religion}</div></div>
							    <div className="details-block"><span className="fa fa-heart"/><div className="details-element">Relationship status: {homeUserProfile.relationshipStatus}</div></div>
							    <div className="details-block"><span className="fa fa-balance-scale"/><div className="details-element">Body Type: {homeUserProfile.bodyType}</div></div>
							    <div className="details-block"><span className="fa fa-level-up"/><div className="details-element">Height: {homeUserProfile.height}</div></div>
							    <div className="details-block"><span className="fa fa-cutlery"/><div className="details-element">Diet: {homeUserProfile.diet}</div></div>
							    <div className="details-block"><span className="fa fa-graduation-cap"/><div className="details-element">Education: {homeUserProfile.diet}</div></div>
							    <div className="details-block"><span className="fa fa-flask"/><div className="details-element">Drugs: {homeUserProfile.drugs}</div></div>
							    <div className="details-block"><span className="fa fa-glass"/><div className="details-element">Drinking: {homeUserProfile.drink}</div></div>
							    <div className="details-block"><span className="fa fa-paw"/><div className="details-element">Pets: {this.formatCheckbox(homeUserProfile.pets)}</div></div>
							  </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect()(Users);
