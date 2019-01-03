import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAnsweredQuestions} from "../../utils/helpers";
import Question from "./Question";

class AnsweredQuestions extends Component {

	render() {
		const {answeredQuestions} = this.props
		return (
			<div className="row rounded-bottom">
				<div className="col-sm-8 offset-sm-2 border">
					{
						answeredQuestions.length === 0 &&
						<p className="m-3">No answered questions</p>
					}
					{
						answeredQuestions.length > 0 &&
							answeredQuestions.map((question) => (
								<Question key={question.id} question={question} />
							))
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, questions}) {
	const answeredQuestions = getAnsweredQuestions(authedUser, questions);
	return {
		"answeredQuestions": answeredQuestions.sort((a,b) => b.timestamp - a.timestamp),
	}
}

export default connect(mapStateToProps)(AnsweredQuestions)