import * as types from '../types';

export const initialState = {
	contactsArray: [],
};

export default (state = initialState, action) => {

	switch (action.type) {
		case types.STORE_CONTACTS_ARRAY:
			return {
				...state,
				contactsArray: [...action.contactsArray]
			}
		default:
			return state;
	}
}