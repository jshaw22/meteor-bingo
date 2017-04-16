import * as types from "../types";

export const matchedUsers = (matchedUsers) =>{
	return {
		type: types.SAVE_MATCHED_USERS,
		matchedUsers
	};
}
