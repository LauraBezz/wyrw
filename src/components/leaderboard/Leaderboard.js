import React, {Component} from 'react'
import {connect} from 'react-redux'
import Score from "../leaderboard/Score";
import {formatUsers} from "../../utils/helpers";

class Leaderboard extends Component {

	render() {
		const {usersFormatted} = this.props
		return (
			<div className="container">
				<div className="row mt-3">
					{
						usersFormatted.length > 0
						usersFormatted.map((user) => (
							<Score key={user.id} id={user.id} />
						))
					}
				</div>
			</div>
		)
	}
}
function mapStateToProps({authedUser, users}) {
	const usersFormatted = formatUsers(users);
	return {
		authedUser: authedUser,
		"usersFormatted": usersFormatted.sort((a,b) => b.score - a.score),
	}
}

export default connect(mapStateToProps)(Leaderboard)