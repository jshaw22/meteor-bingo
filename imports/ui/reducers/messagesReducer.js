import * as types from '../types';

export const initialState = {
	contactsArray: [],
	activeThread: {}
};

export default (state = initialState, action) => {

	switch (action.type) {
		case types.STORE_CONTACTS_ARRAY:
			return {
				...state,
				contactsArray: [...action.contactsArray]
			}
		case types.SET_ACTIVE_THREAD:
			return setActiveThread(state, action);
		default:
			return state;
	}
}

function setActiveThread (state, action) {
	let activeThread = state.contactsArray.find(item => {
		return item.contactKey === action.contactKey;
	});
	return {
		...state,
		activeThread: activeThread
	};
}