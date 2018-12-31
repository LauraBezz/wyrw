import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUnansweredQuestions,} from "../../utils/helpers";
import Question from "./Question";


class UnansweredQuestions extends Component {
	render() {
		const {unansweredQuestions} = this.props
		return (
			<div className="row rounded-bottom">
				<div className="col-sm-8 offset-sm-2 border">
					{
						unansweredQuestions.length === 0 &&
						<p className="m-3">No unanswered questions</p>
					}
					{
						unansweredQuestions.length > 0 &&
							unansweredQuestions.map((question) => (
								<Question key={question.id} question={question} />
							))
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, questions}) {
	const unansweredQuestions = getUnansweredQuestions(authedUser, questions);
	return {
		"unansweredQuestions": unansweredQuestions.sort((a,b) => b.timestamp - a.timestamp),
	}
}

export default connect(mapStateToProps)(UnansweredQuestions)