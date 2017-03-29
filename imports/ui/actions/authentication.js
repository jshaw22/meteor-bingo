import * as types from "../types";
import {createContainer} from 'meteor/react-meteor-data';
import { HTTP } from 'meteor/http';

export const getCurrentUser = (currentUser, isAuthenticated) =>{
	return {
		type: types.GET_CURRENT_USER,
		currentUser,
		isAuthenticated
	}
}

export const getZip = (zip) => {
	return function(dispatch) {
		//Using old school node callback style. The current convention is via promises:
		// +zip).then(res => {...}).catch((err)=>{}).
		HTTP.call( 'GET', 'http://api.zippopotam.us/us/'+zip, function ( error, response ) {
			if (error) {
	  			dispatch({
	  				type: types.DISPLAY_ZIPCODE,
	  				zipCode: "error"
	  			});
	  		} else {
				dispatch({
					type: types.DISPLAY_ZIPCODE,
					zipCode: response.data.places[0]['place name']
				});
			}
		});
	}
}