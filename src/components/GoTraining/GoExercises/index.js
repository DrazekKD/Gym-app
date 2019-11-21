import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from "../../Firebase";
import { connect } from 'react-redux';
import { withAuthorization, withEmailVerification } from '../../Session';
import {withRouter } from 'react-router-dom';


class GoExercises extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}

	}

	componentDidMount() {
		console.log('test');
	}

	render() {
		console.log(this.props)
		return (
			<div>
				GoExercises
			</div>
		)
	}
}


const mapStateToProps = state => ({
	authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

export default compose(
	withRouter,
	withFirebase,
	connect(mapStateToProps),
	withEmailVerification,
	withAuthorization(condition))(GoExercises);


