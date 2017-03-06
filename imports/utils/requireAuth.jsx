import React from 'react';


export default function(ComposedComponent){

	class Authenticate extends React.Component {

		componentWillMount () {
			if (Meteor.userId() === null) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if(Meteor.userId() === null)
				this.context.router.push('/');
		}

		render(){
			return (
			<ComposedComponent {...this.props} />
			)
		}
	}

	Authenticate.contextTypes = {
		router: React.PropTypes.object.isRequired
	}


	return Authenticate;
} 