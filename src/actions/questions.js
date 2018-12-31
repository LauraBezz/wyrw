import {showLoading, hideLoading} from 'react-redux-loading'
import {saveQuestionAnswer, saveQuestion} from '../utils/api'
import {addUserQuestion, addUserAnswer} from '../actions/users'
import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER, ADD_QUESTION} from '../utils/constants'

export function receiveQuestions(questions, users) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

export function addQuestion(questions) {
	return {
		type: ADD_QUESTION,
		questions
	}
}

export function addQuestionAnswer(questions) {
	return {
		type: ADD_QUESTION_ANSWER,
		questions,
	}
}

export function handleSaveQuestion(authedUser, optionOneText, optionTwoText, users) {
	return (dispatch, getState) => {
		dispatch(showLoading())
		return saveQuestion({
			author: authedUser,
			optionOneText,
			optionTwoText
		}).then((questions) => {
			dispatch(addUserQuestion(questions))
			dispatch(addQuestion(questions))
			return;
		}).then(() => dispatch(hideLoading()))
	}
}

export function handleSaveQuestionAnswer(authedUser, id, answer) {
	//console.log("handleSaveQuestionAnswer:: answer => "+id,answer)
	return (dispatch, getState) => {
		dispatch(showLoading())
		return saveQuestionAnswer({
			authedUser,
			qid: id,
			answer
		}).then((response) => {
			dispatch(addUserAnswer({author: authedUser, id: id, votes: answer}))
			dispatch(addQuestionAnswer({author: authedUser, id: id, votes: answer}))
			return;
		}).then(() => {
			dispatch(hideLoading())
		})
	}
}