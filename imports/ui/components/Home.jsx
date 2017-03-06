import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Home extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount () {
		// if(Meteor.userId() === null)
		// 	browserHistory.push('/');
	}

	render() {
		
		return (
			<div> 
				<div className="container">
					<h1 className='text-center'>
						You logged in, bro!!
					</h1>
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
		authentication: state.authentication
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);