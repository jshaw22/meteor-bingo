import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			//bingosmash logo goes here
			avatar: 'http://placehold.it/150x150',
			data: {},
			user: {}
		}
		this.uploadFile = this.uploadFile.bind(this);
	}

	componentDidMount(){
		
	}
	componentWillUpdate(nextProps){
		console.log("component willUpdate", nextProps);
		const user = nextProps.authentication;
		let data = {};
		if (user) {
			data.img = Images.findOne({_id: user.currentUser.profile.info.avatar}).url();
			//this.setState({user: user.currentUser}); //I don't like the lifecycle for this. fix later	
		}
		//this.setState({data});
	}

	uploadFile(e) {
		e.preventDefault();
		FS.Utility.eachFile(e, function (file) {
			Images.insert(file, function (err, fileObj) {
				if(err)
					Meteor.error("Unable to upload picture");
				Meteor.call("changeAvatar", Meteor.user(), fileObj._id);
			});
		});
	}

	render() {
		const user = this.props.authentication.currentUser;
		var avatar = this.state.avatar;
		let picData = {};
		if (user && user.profile) {
			picData.img = Images.findOne({_id: user.profile.info.avatar}).url();
		}

		if (picData.hasOwnProperty("img")){
			avatar = picData.img;
		}
		if (!user.profile)
			return <div>Loading</div>

		//TODO: avatar should be scaled first from server? 
		return (
			<div className="row">
				<div className="col-md-2 hidden-xs">
					Avatar
					<img src={avatar} width="200px" height="200px" />
						<div>
							<label>
								<div className="inputWrapper">
									<input type="file" id="avatar" onChange={this.uploadFile} name="avatar" className="file"></input>
								</div>
							</label>
						</div>
					</div>
					<div className="col-md-9 col-xs-9">
						<h2>{user.username}</h2>
						<table className="table table-user-information">
							<tbody>
							<tr>
								<td>Hailing from {user.profile.info.location}</td>
							</tr>
							</tbody>
						</table>
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
