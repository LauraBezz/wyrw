import {RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER} from '../utils/constants'

export function receiveUsers (users) {
	return {
		type: RECEIVE_USERS,
		users,
	}
}

export function addUserQuestion (users) {
	return {
		type: ADD_USER_QUESTION,
		users,
	}
}

export function addUserAnswer (users) {
	return {
		type: ADD_USER_ANSWER,
		users,
	}
}