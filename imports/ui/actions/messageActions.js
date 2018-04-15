import * as types from "../types";

export const storeContactsArray = (contactsArray) =>{
	return {
		type: types.STORE_CONTACTS_ARRAY,
		contactsArray
	};
}