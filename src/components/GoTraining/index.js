import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { connect } from 'react-redux';
import { withAuthorization, withEmailVerification } from '../Session';
import {Link, withRouter} from 'react-router-dom';

const INITIAL_STATE = {
	nameTraining: '',
	trainingPlanExercises:[],
	idPlan: null,
	error: null,
	loading:false,
};

class GoTraining extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...INITIAL_STATE,
			idPlan: this.props.history.location.pathname.split('/')[2]
		}

	}

	componentDidMount() {
		this.setState({ loading:true });
		this.props.firebase.trainingPlan(this.props.authUser.uid, this.state.idPlan)
			.on('value', snapshot => {
				const trainingPlanObject = snapshot.val() || {};
				if (!!Object.keys(trainingPlanObject).length) {
					let trainingPlanExercisesList = null;

					trainingPlanObject.exercises ?
						trainingPlanExercisesList = Object.keys(trainingPlanObject.exercises).map(key => ({
							...trainingPlanObject.exercises[key],
							id: key
						})) : trainingPlanExercisesList = {};

					this.setState({
						trainingPlanExercises: trainingPlanExercisesList,
						nameTraining: trainingPlanObject.nameTraining,
						loading: false
					});
				} else this.props.history.push(ROUTES.TRAINING_PLANS);

			})
	}

	render() {
console.log(this.props.match)
		return (
			<div>
				{this.state.trainingPlanExercises.map(exercise => (
					<Link
						key={exercise.id}
						to={`${ROUTES.TRAINING_PLAN_GO_TRAINING}/${this.state.idPlan}/${exercise.id}`}>
						<div>
							{exercise.name},{exercise.moves},{exercise.series}
						</div>
					</Link>
				))}
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
	withAuthorization(condition))(GoTraining);


