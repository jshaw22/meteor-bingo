import * as types from '../types';

export const initialState = {
	currentUser: null
};

export default (state = initialState, action) => {

	switch (action.type) {
		case types.GET_CURRENT_USER:
			return {
				...state,
				currentUser: action.currentUser
			};
		default:
			return state;
	}
}
