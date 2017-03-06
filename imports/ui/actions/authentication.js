import * as types from "../types";
import {createContainer} from 'meteor/react-meteor-data';

export const getCurrentUser = (currentUser, isAuthenticated) =>{
	return {
		type: types.GET_CURRENT_USER,
		currentUser,
		isAuthenticated
	}
}
