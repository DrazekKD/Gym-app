import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { connect } from 'react-redux';
import { withAuthorization, withEmailVerification } from '../Session'
import { Link, withRouter } from 'react-router-dom';
const TrainingPlanPage = ({authUser}) => (<TrainingPlanForm authUser={authUser}/>);

const INITIAL_STATE = {
	nameNewTraining: '',
	userTrainingPlans:[],
	loading: false,
	error: null
};
class TrainingPlanFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}




	render() {

		return (
			<div>
				plan
			</div>
		)
	}
}


const mapStateToProps = state => ({
	authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

const TrainingPlanForm = compose(withRouter,withFirebase)(TrainingPlanFormBase);

export {TrainingPlanForm}

export default compose(
	connect(mapStateToProps),
	withEmailVerification,
	withAuthorization(condition))(TrainingPlanPage);


