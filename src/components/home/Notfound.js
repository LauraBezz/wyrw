import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";

class ViewAnswer extends Component {

	render() {
		return (
			<div className="row">
				<div className="col-sm-6 offset-sm-4 p-5 mt-5">
					<h1>404</h1>
					<p>The page you are looking for can't be found</p>
					<NavLink to='/' className='btn btn-warning text-white' >Return to home </NavLink>
				</div>
			</div>
		)
	}
}

export default connect()(ViewAnswer)