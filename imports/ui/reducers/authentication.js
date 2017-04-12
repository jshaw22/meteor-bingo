import * as types from '../types';

export const initialState = {
	currentUser: null
};

export default (state = initialState, action) => {

	switch (action.type) {
		case types.LOGOUT:
			return {
				...initialState
			}
		case types.GET_CURRENT_USER:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					...action.currentUser
				},
				isAuthenticated: action.isAuthenticated
			};
		case types.DISPLAY_ZIPCODE:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					location: action.zipCode
				}
			}
		default:
			return state;
	}

}
