import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestionCard} from "../../utils/helpers";
import {NavLink} from "react-router-dom";


class Question extends Component {

	render() {
		const {question} = this.props
		let dateQuestion = new Intl.DateTimeFormat('en-US').format(question.timestamp)
		return (
			<div className="card m-3">
				<h5 className="card-header">{question.authorName} asked:</h5>
				<div className="card-body">
					<div className="row">
						<div className="col-sm-5 border-right text-center">
							<img src={question.avatarURL} className="card-avatar" alt="avatar" />
						</div>
						<div className="col-sm-7">
							<h5 className="card-title">Would you rather</h5>
							<p className="card-text">...{question.textone}...</p>

							<NavLink to={"/question/"+question.id} className="btn btn-outline-primary col-sm-12">
								View pull
							</NavLink>
						</div>
					</div>

				</div>
				<div className="card-footer text-muted">
					{dateQuestion}
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, users}, {question}) {
	//console.log("question => ", question)
	return {
		question: formatQuestionCard(question, users[question.author], authedUser)
	}
}

export default connect(mapStateToProps)(Question)