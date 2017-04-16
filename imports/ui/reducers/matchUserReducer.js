import * as types from '../types';

export const initialState = {
	matchedUsers: []
};

export default (state = initialState, action) => {

	switch (action.type) {
		case types.SAVE_MATCHED_USERS:
			return {
				...state,
				matchedUsers: [...action.matchedUsers]
			}
		default:
			return state;
	}
}
