import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Home extends Component {
	constructor(props){
		super(props);
	}

	showNewUsers () {
		const users = this.props.users;
		if(!users)
			return
		return users.map((user, index) =>{
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
			<div> 
				<div className="container">
					<h1 className='text-center'>
						You logged in, bro!!
					</h1>
					<h3 className="text-center">I'm not sure what to put here. Maybe a newsfeed?</h3>
					<h3>Recent users</h3>
					<div className="row">
						{this.showNewUsers()}
					</div>
				</div>
			</div>
		);
	}
}

Home.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);