import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSaveQuestion} from "../../actions/questions";
import {Redirect} from "react-router-dom";


class AddQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
		toView: false,
	}

	handleChange = (e) => {
		const optName = e.target.name
		const optValue = e.target.value
		this.setState(() => ({
			[optName]: optValue
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {authedUser, dispatch, users} = this.props
		const {optionOne, optionTwo} = this.state
		dispatch(handleSaveQuestion(authedUser, optionOne, optionTwo, users))
		this.setState(() => ({
			toView: true,
		}))
	}

	render() {
		const { toView } = this.state

		if (toView === true) {
			return <Redirect to='/' />
		}

		return (
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-8 offset-sm-2">
						<div className="card m-3">
							<h5 className="card-header">Create new question</h5>
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="col-sm-12">
											<h6>Complete the question:</h6>
											<h5 className="card-title">Would you rather..</h5>
											<input placeholder="Enter option one here" className="form-control" type="text" name="optionOne"  value={this.optionOne} onChange={this.handleChange} />
											<p className="divider"><span>OR</span></p>
											<input placeholder="Enter option two here" className="form-control" type="text" name="optionTwo"  value={this.optionTwo} onChange={this.handleChange} />
											<br />
											<button className='btn btn-primary col-sm-12' type='submit'>
												Submit
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, dispatch}, {users}) {
	return {
		authedUser: authedUser,
		dispatch: dispatch,
		users: users,
	}
}

export default connect(mapStateToProps)(AddQuestion)