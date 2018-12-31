/* trasformo gli utenti in un array di utenti*/
export function formatUserOption (users) {
	return Object.values(users)
}

/* get users info */
export function getUserInfo (idUser, users) {
	if (idUser) {
		return users[idUser]
	} else {
		return ""
	}
}

/* get unanswered questions */
export function getUnansweredQuestions (authedUser, questions) {
	//console.log("questions    => ", questions)
	let unansweredQuestions = Object.values(questions)
		.filter(question => !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
	//console.log("unansweredQuestions => ", unansweredQuestions)
	return unansweredQuestions
}

/* get  answered questions */
export function getAnsweredQuestions (authedUser, questions) {
	let answeredQuestions = Object.values(questions)
		.filter(question =>
			question.optionOne.votes.includes(authedUser)
			|| question.optionTwo.votes.includes(authedUser)
		)
	//console.log("answeredQuestions => ", answeredQuestions)
	return answeredQuestions
}

/* get  answered questions */
export function formatQuestionCard (question, author, authedUser) {
	const { id, optionOne, optionTwo, timestamp } = question
	let alreadyVote = 0;

	alreadyVote = optionOne.votes.includes(authedUser)? 1: alreadyVote;
	alreadyVote = optionTwo.votes.includes(authedUser)? 2: alreadyVote;
	return {
		id: id,
		authorId: author.id,
		authorName: author.name,
		avatarURL: author.avatarURL,
		textone: optionOne.text,
		countone: optionOne.votes.length,
		texttwo: optionTwo.text,
		counttwo: optionTwo.votes.length,
		timestamp: timestamp,
		alreadyVote: alreadyVote,
	}
}

export function formatAnswerCard (id, questions, users, authedUser) {
	if (typeof questions[id] !== "undefined")
		return formatQuestionCard (questions[id], users[questions[id].author], authedUser)
	return "NOTFOUND"
}

/* format users list */
export function formatUsers (users) {
	let usersFormatted = Object.values(users).map((user) => {
		return {
			id: user.id,
			name: user.name,
			avatarURL: user.avatarURL,
			answered: Object.keys(user.answers).length,
			question: user.questions.length,
			score: Object.keys(user.answers).length+user.questions.length,
		}
	})
	return usersFormatted
}
/* format users list */
export function formatUser (user) {
	//console.log("user => ", user)
	return {
			id: user.id,
			name: user.name,
			avatarURL: user.avatarURL,
			answered: Object.keys(user.answers).length,
			question: user.questions.length,
			score: Object.keys(user.answers).length+user.questions.length,
		}
}
