import {RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER} from '../utils/constants'

export default function users (state = {}, action) {
	switch(action.type) {
		case RECEIVE_USERS :
			return {
				...state,
				...action.users
			}
		case ADD_USER_QUESTION :
			return {
				...state,
				[action.users.author]: {
					...state[action.users.author],
					questions: state[action.users.author].questions.concat([action.users.id])
				}
			}
		case ADD_USER_ANSWER :
			return {
				...state,
				[action.users.author]: {
					...state[action.users.author],
					answers : {
						...state[action.users.author].answers,
						[action.users.id] : [action.users.votes]
					}
				}
			}
		default :
			return state
	}
}