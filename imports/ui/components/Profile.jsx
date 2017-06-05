import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';
import ParagraphSection from './ParagraphSection';
import UserinfoBasics from './UserinfoBasics';
import UserinfoDetails from './UserinfoDetails';
import UserinfoDetailsModal from './UserinfoDetailsModal';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			//bingosmash logo goes here
			avatar: 'http://placehold.it/150x150',
			addHover: false,
			detailsModalOpen: false
		}
		this.uploadFile = this.uploadFile.bind(this);
		this.mouseOver = this.mouseOver.bind(this);
		this.mouseOut = this.mouseOut.bind(this);
		this.imageHandle = Meteor.subscribe('imageList');
		this.openDetailsModal = this.openDetailsModal.bind(this);
		this.closeDetailsModal = this.closeDetailsModal.bind(this);
		
		//Seems like the Tracker takes the place of componentWillMount
		Tracker.autorun(() => {
		  const isReady = this.imageHandle.ready();
		  if(isReady){
		  	const user = this.props.authentication.currentUser;
		  	let avatar = Images.findOne({_id: user.profile.avatar}).url();
		  	this.setState({avatar})
		  }		
		});
	}

	componentWillReceiveProps(nextProps){
		let avatar = Images.findOne({_id: Meteor.user().profile.avatar}).url();
		this.setState({avatar})
	}
	// meteor needs you to stop the subscription when you unmount otherwise it will throw 
	// console warnings
	componentWillUnmount () {
		this.imageHandle.stop();
	}

	uploadFile(e) {
		let that = this;
		e.preventDefault();
		FS.Utility.eachFile(e, function (file) {
			Images.insert(file, function (err, fileObj) {
				if(err)
					Meteor.error("Unable to upload picture");
				Meteor.call("changeAvatar", Meteor.user(), fileObj._id, function(err, res) {
					if(err) {
						Meteor.error("There was an issue changing the avatar");
					}
					that.setState({changeButtonClicked:false})
					that.setState({hover:false})
				});

			});
		});
	}

	openDetailsModal () {
		this.setState({detailsModalOpen: true});
	}

	closeDetailsModal () {
		this.setState({detailsModalOpen: false});
	}

	mouseOver (e) {
		this.setState({hover:true});
	}

	mouseOut () {
	  if (this.state.changeButtonClicked) {
	    return
	  }
	  this.setState({hover:false})
	}

	changePicClicked() {
	  document.getElementById("file").click()
	  this.setState({changeButtonClicked:true})
	}

	render() {
		const user = this.props.authentication.currentUser;

		if (!user.profile)
			return <div>Loading</div>

		let changePicButton;
		if (this.state.hover) {
		  changePicButton = <ChangePicButton 
		    changePicClicked={() => this.changePicClicked()}
		    uploadFile={(e) => this.uploadFile(e)}
		  />
		}

		//TODO: avatar should be scaled first from server? 
		return (
			<div>
				<div className="profile-header">
					<div className="inner-element">
						<div className="userinfo">
							<div className="userinfo-thumb" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
								<img className="img-rounded" src={this.state.avatar} />
								{ changePicButton }
							</div>
							<UserinfoBasics username={user.username} profileBasics={user.profile} />
						</div>
					</div>
				</div>
				<div className="profile-content">
					<div className="profile-content-main">
						<div className="profile-section">
							<ParagraphSection allowEdit={true} dbObjectName="aboutMe" sectionTitle="About me" paragraphContent={user.profile.aboutMe} />
							<ParagraphSection allowEdit={true} dbObjectName="whatILike" sectionTitle="What I like to do" paragraphContent={user.profile.whatILike} />
							<ParagraphSection allowEdit={true} dbObjectName="favStuff" sectionTitle="Favorite books, movies, shows, etc" paragraphContent={user.profile.favStuff} />
							<ParagraphSection allowEdit={true} dbObjectName="cfBecause" sectionTitle="I'm childfree because..." paragraphContent={user.profile.cfBecause} />
							<ParagraphSection allowEdit={true} dbObjectName="messageMeIf" sectionTitle="You should message me if..." paragraphContent={user.profile.messageMeIf} />
					</div>
				</div>
				<div className="profile-content-sidebar">
						<button className="details-section-edit">
							<UserinfoDetails user={user.profile} editDetailsClick={this.openDetailsModal} />
							<UserinfoDetailsModal isOpen={this.state.detailsModalOpen} closeModal={this.closeDetailsModal} />			
						</button>
					</div>
			</div>
		</div>

		)
	}
}

function ChangePicButton(props) {
  return (
    <div>
      <input className="btn btn-primary changePic" type="button" id="loadFileXml" value="Change" onClick={props.changePicClicked} />
      <input onChange={props.uploadFile} onClick={(e)=>{e.target.value=null}} type="file" style={{display:"none"}} id="file" name="file"/>
    </div>
  );
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
