import * as types from "../types";
import {createContainer} from 'meteor/react-meteor-data';



export const getCurrentUser = () =>{
	return function(dispatch) {
			const currentUser = Meteor.user();
			console.log("dispatch called", currentUser);
			dispatch({
				type: types.GET_CURRENT_USER,
				currentUser
			});
	}
}

