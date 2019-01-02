import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, Route} from "react-router-dom";
import UnansweredQuestions from "./UnansweredQuestions";
import AnsweredQuestions from "./AnsweredQuestions";


class Home extends Component {

	render() {
		return (
			<div className="container">
				<div className="row mt-3">
					<NavLink to='/' exact activeClassName='bg-primary text-white' className='col-sm-4 offset-sm-2 text-center border rounded-top p-2'>
						Unanswered questions
					</NavLink>
					<NavLink to='/answered-question' activeClassName='bg-primary text-white' className='col-sm-4 text-center border rounded-top p-2'>
						Answered questions
					</NavLink>
				</div>
				<Route exact path='/' component={UnansweredQuestions} />
				<Route exact path='/answered-question' component={AnsweredQuestions} />
			</div>
		)
	}
}

export default connect()(Home)