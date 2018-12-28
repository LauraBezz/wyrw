import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Nav from './Nav'
import LoginBox from './LoginBox'
import Home from './home/Home'
import AddQuestion from './add/AddQuestion'
import Leaderboard from './leaderboard/Leaderboard'
import Answer from "./home/Answer";
import Notfound from "./home/Notfound";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		const {authedUser} = this.props
		return (
			<Router>
				<Fragment>
					<div className='container'>
						<Nav />
						{
							this.props.loading === true
							? null
							: (authedUser === ''
								?
								<div>
									<Route component={LoginBox} />
								</div>
								:
								<div>
									<Route exact path='/' component={Home} />
									<Route exact path='/answered-question' component={Home} />
									<Route path='/question/:id' component={Answer} />
									<Route path='/add' component={AddQuestion} />
									<Route path='/leaderboard' component={Leaderboard} />
									<Route path='/notfound' component={Notfound} />
								</div>
								)
						}
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps({authedUser}) {
	return {
		"loading": authedUser === null,
		"authedUser": authedUser,
	}
}

export default connect(mapStateToProps)(App)
