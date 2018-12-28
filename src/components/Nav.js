import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {setAuthedUser} from "../actions/authedUser";
import connect from "react-redux/es/connect/connect";
import {getUserInfo} from "../utils/helpers";

class Nav extends Component {

	handleLogout = (e) => {
		e.preventDefault()
		const {dispatch} = this.props
		dispatch(setAuthedUser(""))
	}

	render() {
		const {userInfo} = this.props
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav text-muted">
						<li className="nav-item">
							<NavLink to='/' exact activeClassName="text-primary" className='nav-link' >
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to='/add' activeClassName="text-primary" className='nav-link'>
								New question
							</NavLink>
						</li>
						<li className="nav-item" >
							<NavLink to='/leaderboard' activeClassName="text-primary" className='nav-link'>
								Leader board
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="text-right">
					{
						userInfo && (
							<span>Hello, {userInfo.name} <img src={userInfo.avatarURL} className="nav-avatar" alt="avatar" /></span>
						)
					}

					<button className='btn btn-primary' onClick={this.handleLogout}>
						Logout
					</button>

				</div>
			</nav>
		)
	}
}

function mapStateToProps({authedUser, users}) {
	return {
		"userInfo": getUserInfo(authedUser, users)
	}
}
export default connect(mapStateToProps)(Nav)