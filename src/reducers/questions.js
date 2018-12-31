import {ADD_QUESTION_ANSWER, RECEIVE_QUESTIONS, ADD_QUESTION} from '../utils/constants'

export default function questions (state = {}, action) {
	switch(action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION :
			return {
				...state,
				[action.questions.id]: action.questions,
			}
		case ADD_QUESTION_ANSWER :
			return {
				...state,
				[action.questions.id]: {
					...state[action.questions.id],
					[action.questions.votes] : {
						...state[action.questions.id][action.questions.votes],
						votes: state[action.questions.id][action.questions.votes].votes.concat([action.questions.author]),
					}
				},
			}
		default :
			return state
	}
}