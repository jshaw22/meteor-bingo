import React, { Component, PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/authentication';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-2 hidden-xs">
					Avatar
						<div>
							<label>
								<div className="inputWrapper">
									<input type="file" id="avatar" name="avatar" className="file"></input>
								</div>
							</label>
						</div>
					</div>
					<div className="col-md-9 col-xs-9">
						<h2>Justin Shaw</h2>
						<table className="table table-user-information">
							<tbody>
							<tr>
								<td>Email</td>
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

/*
return (
			<div className="row">
				<div align="center" className="col-md-2 hidden-xs">
					Avatar
						<div>
							<label>
								<div className="inputWrapper">
									<input type="file" id="avatar" name="avatar" className="file"></input>
								</div>
							</label>
						</div>
					</div>
					<div className="col-md-9 col-xs-9">
						<h2>Justin Shaw</h2>
						<table className="table table-user-information">
							<tbody>
							<tr>
								<td>Email</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
		)
		*/