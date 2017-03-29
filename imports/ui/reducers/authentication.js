import * as types from '../types';

export const initialState = {
	currentUser: null,
	location: null
};

export default (state = initialState, action) => {

	switch (action.type) {
		case types.GET_CURRENT_USER:
			return {
				...state,
				currentUser: action.currentUser,
				isAuthenticated: action.isAuthenticated
			};
		case types.DISPLAY_ZIPCODE:
			return {
				...state,
				location: action.zipCode
			}
		default:
			return state;
	}
}
