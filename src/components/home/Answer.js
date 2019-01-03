import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatAnswerCard} from "../../utils/helpers";
import {handleSaveQuestionAnswer} from "../../actions/questions";
import {NavLink, Redirect} from 'react-router-dom'

class Answer extends Component {
	state = {
		answer: "optionOne",
		answered: false,
	}

	handleOptionChange = (e) => {
		const answer = e.target.value
		this.setState(() => ({
			answer
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { answer } = this.state
		const { dispatch, authedUser, id } = this.props

		dispatch(handleSaveQuestionAnswer(authedUser, id, answer))
		this.setState(() => ({
			answered: answer ? true : false,
		}))
	}

	render() {
		const { answered, answer } = this.state
		const {question} = this.props

		if (question === "NOTFOUND") {
			return <Redirect to='/notfound' />
		}

		if (question.alreadyVote > 0) {
			let percentOne = question.countone?(question.countone/(question.countone+question.counttwo))*100:0
			let percentTwo = question.counttwo?(question.counttwo/(question.countone+question.counttwo))*100:0
			return (
				<div className="row">
					<div className="col-sm-8 offset-sm-2">
						<div className="card m-3">
							<h5 className="card-header">{question.authorName} asked:</h5>
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="col-sm-4 border-right text-center">
											<img src={question.avatarURL} className="card-avatar" alt="avatar" />
										</div>
										<div className="col-sm-8">
											<h5 className="card-title">Results:</h5>

											<div className="position-relative border border-info text-info p-3 mt-3 rounded bg-light">
												{question.alreadyVote === 1 &&  <div className="your-vote">your vote</div>}
												<strong>Would you rather {question.textone}?</strong> <br />
												<div className="progress mt-3">
													<div className="progress-bar bg-info p-2" role="progressbar" style={{ width: `${percentOne}%` }} aria-valuenow={percentOne} aria-valuemin="0" aria-valuemax="100">{percentOne.toFixed(1)}%</div>
												</div>
												<strong className="text-dark">{question.countone} out of {question.countone+question.counttwo} votes</strong>
											</div>

											<div className="position-relative border border-info text-info mt-3  p-3 rounded bg-light">
												{question.alreadyVote === 2 &&  <div className="your-vote">your vote</div>}
												<strong>Would you rather {question.texttwo}?</strong>  <br />
												<div className="progress mt-3">
													<div className="progress-bar bg-info p-2" role="progressbar" style={{ width: `${percentTwo}%` }} aria-valuenow={percentTwo} aria-valuemin="0" aria-valuemax="100">{percentTwo.toFixed(1)}%</div>
												</div>
												<strong className="text-dark">{question.counttwo} out of {question.countone+question.counttwo} votes</strong>
											</div>

										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)
		}

		if (answered === true || question.alreadyVote > 0) {
			return (
				<div className="row">
					<div className="col-sm-8 offset-sm-2">
						<div className="card m-3">
							<h5 className="card-header">{question.authorName} asked:</h5>
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="col-sm-4 border-right text-center">
											<img src={question.avatarURL} className="card-avatar" alt="avatar" />
										</div>
										<div className="col-sm-8">
											<h5 className="card-title">You would rather</h5>
											{
												answer === 'optionOne' &&
													<div>{question.textone}</div>
											}
											{
												answer === 'optionTwo' &&
												<div>{question.texttwo}</div>
											}
											<NavLink to="/" className="btn btn-outline-primary col-sm-12 mt-5">
												Back
											</NavLink>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className="row">
				<div className="col-sm-8 offset-sm-2">
					<div className="card m-3">
						<h5 className="card-header">{question.authorName} asked:</h5>
						<div className="card-body">
							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="col-sm-4 border-right text-center">
										<img src={question.avatarURL} className="card-avatar" alt="avatar" />
									</div>
									<div className="col-sm-8">
										<h5 className="card-title">Would you rather</h5>
										<div className="radio">
											<label>
												<input type="radio" value="optionOne" className="mr-2" checked={this.state.answer === 'optionOne'} onChange={this.handleOptionChange} />
												 {question.textone}
											</label>
										</div>
										<div className="radio">
											<label>
												<input type="radio" value="optionTwo" className="mr-2" checked={this.state.answer === 'optionTwo'} onChange={this.handleOptionChange} />
												 {question.texttwo}
											</label>
										</div>
										<br />
										<button className='btn btn-outline-primary col-sm-12' type='submit'>
											Submit
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, users, questions}, props) {
	const {id} = props.match.params
	//console.log("id question => ", id)
	return {
		id: id,
		question: formatAnswerCard(id, questions, users, authedUser),
		authedUser: authedUser,
	}
}

export default connect(mapStateToProps)(Answer)