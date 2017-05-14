import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';
import ParagraphSection from './ParagraphSection';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			//bingosmash logo goes here
			avatar: 'http://placehold.it/150x150',
			addHover: false
		}
		this.uploadFile = this.uploadFile.bind(this);
		this.mouseOver = this.mouseOver.bind(this);
		this.mouseOut = this.mouseOut.bind(this);
		this.editAboutMe = this.editAboutMe.bind(this);

		this.imageHandle = Meteor.subscribe('imageList');
		
		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = this.imageHandle.ready();
		  if(isReady){
		  	const user = this.props.authentication.currentUser;
		  	let avatar = Images.findOne({_id: user.profile.info.avatar}).url();
		  	this.setState({avatar})
		  }		
		});
	}

	componentWillUpdate(nextProps){
		// const user = nextProps.authentication;
		// let data = {};
		// if (user) {
		// 	data.img = Images.findOne({_id: user.currentUser.profile.info.avatar}).url();
		// 	//this.setState({user: user.currentUser}); //I don't like the lifecycle for this. fix later	
		// }
		// //this.setState({data});
	}
	// meteor needs you to stop the subscription when you unmount otherwise it will throw 
	// console warnings
	componentWillUnmount () {
		this.imageHandle.stop();
	}

	editAboutMe(e) {
		e.preventDefault();
		console.log("editaboutmeclicked")
	}

	uploadFile(e) {
		debugger;
		e.preventDefault();
		FS.Utility.eachFile(e, function (file) {
			Images.insert(file, function (err, fileObj) {
				if(err)
					Meteor.error("Unable to upload picture");
				Meteor.call("changeAvatar", Meteor.user(), fileObj._id);
			});
		});
	}

	mouseOver (e) {
		this.setState({hover:true});
	}

	mouseOut () {
		this.setState({hover:false})
	}

	renderPicChange (){
		if(this.state.hover){
			return (
				<div>
				  <label htmlFor="files" className="btn btn-primary changePic">Change</label>
				  <input onChange={this.uploadFile} onClick={(e)=>{e.target.value=null}} id="files" style={{visibility:"hidden"}} type="file" />
				</div>
			)
		}
	}

	render() {
		const user = this.props.authentication.currentUser;

		if (!user.profile)
			return <div>Loading</div>

		//TODO: avatar should be scaled first from server? 
		return (
			<div>
				<div className="profile-header">
					<div className="inner-element">
						<div className="userinfo">
							<div className="userinfo-thumb" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
								<img className="img-rounded" src={this.state.avatar} />
								{this.renderPicChange()}
							</div>
							<div className="userinfo-basics">
								<div className="userinfo-basics-username">{user.username}</div>
								<div className="userinfo-basics-asl">
									<span className="userinfo-basics-asl-age">{user.profile.info.age}</span>
									<span className="userinfo-basics-asl-spacer">•</span>
									<span className="userinfo-basics-asl-location">{user.profile.info.location}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="profile-content">
					<div className="profile-content-main">
						<div className="profile-section">
							<div className="paragraph">
								<button onClick={this.editAboutMe} className="paragraph-title profile-section-title">
									<span>About me</span>
									<span className="edit-title">Edit</span>
								</button>
								<div className="paragraph-content">
									{user.profile.info.aboutMe === '' ? <i>Say something about youreslf!</i> : `${user.profile.info.aboutMe}` }
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

Profile.PropTypes = {
	//username: React.PropTypes.string
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}
const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
