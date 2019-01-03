import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatUser} from "../../utils/helpers";


class Score extends Component {

	render() {
		const {user} = this.props
		return (
			<div className="col-sm-8 offset-sm-2">

				<div className="card m-3">
					<div className="card-body">
						<div className="row">
							<div className="col-sm-3 border-right text-center">
								<img src={user.avatarURL} className="card-avatar" alt="avatar" />
							</div>
							<div className="col-sm-6 border-right">
								<h5>{user.name}</h5>
								<p className="m-0 mt-4">Answered questions <span className="float-right">{user.answered}</span></p>
								<hr className="m-0" />
								<p className="m-0">Created questions <span className="float-right">{user.question}</span></p>
							</div>
							<div className="col-sm-3">
								<div className="card">
									<h6 className="card-header">Score</h6>
									<div className="card-body ">
										<h5 className="text-center rounded-circle bg-primary text-light user-score">{user.score}</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

function mapStateToProps({authedUser, users}, {id}) {
	//console.log("users => ", users)
	return {
		authedUser,
		user: formatUser(users[id]),
	}
}

export default connect(mapStateToProps)(Score)