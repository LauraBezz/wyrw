import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatUserOption} from '../utils/helpers'
import { setAuthedUser } from '../actions/authedUser'


class LoginBox extends Component {

	handleSubmit = (e) => {
		e.preventDefault()
		const { dispatch } = this.props
		dispatch(setAuthedUser(e.target.authedUser.value))
	}

	render() {
		const {users, authedUser} = this.props
		return (
			<div className="row mt-3">
				<div className="col-sm-6 offset-sm-3">
					<div className="card">
						<h5 className="card-header"><strong>Welcome to the Would Your Rather App</strong><br />Please sign in to continue</h5>
						<div className="card-body">
							<div className="col-sm-6 offset-sm-3">
								<img className="card-img-top" src="/images/reactredux.jpg" alt="Logo react+redux" />
							</div>
							<h2 className="card-title text-info">Sign in</h2>
							<form className='login' onSubmit={this.handleSubmit}>
								<div className="input-group mb-3">
									<select className="custom-select" id="authedUser" value={authedUser}>
										<option>Choose...</option>
										{
											users.map((user) =>(
												<option key={user.id} value={user.id} style={{ backgroundImage : `url(${user.avatarURL})`, height: `35px`, width: `35px` }}>
													{user.name}
												</option>
											))
										}
									</select>
									<div className="input-group-append">
										<label className="input-group-text" htmlFor="inputGroupSelect02">Users</label>
									</div>
								</div>

								<button
									className='btn btn-primary col-sm-12'
									type='submit'
									disabled={authedUser === ''}>
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({users}) {
	return {
		"users": formatUserOption(users)
	}
}

export default connect(mapStateToProps)(LoginBox)