import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from "../Firebase";
import { connect } from 'react-redux';
import { withAuthorization, withEmailVerification } from '../Session'
import { Link, withRouter } from 'react-router-dom';
import Exercises from '../Exercises'

const TrainingPlanPage = ({authUser}) => (<TrainingPlanForm authUser={authUser}/>);

const INITIAL_STATE = {
	nameTraining: '',
	trainingPlanExercises:[],
	idPlan: null,
	error: null
};

const INITIAL_EXERCISE = {
	name: '',
	moves: '',
	series: ''
};

class TrainingPlanFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...INITIAL_STATE,
			idPlan: this.props.history.location.pathname.split('/')[2]
		};
	}

	componentDidMount(){

		this.props.firebase.trainingPlan(this.props.authUser.uid, this.state.idPlan)
			.on('value', snapshot => {
				const trainingPlanObject = snapshot.val() || {};
				let trainingPlanExercisesList = null;

				trainingPlanObject.exercises ?
				 trainingPlanExercisesList = Object.keys(trainingPlanObject.exercises).map(key => ({
					...trainingPlanObject.exercises[key],
					id:key
				})) :  trainingPlanExercisesList = {};

				this.setState({
					trainingPlanExercises:trainingPlanExercisesList,
					nameTraining: trainingPlanObject.nameTraining
				})
			})
	}

	addExercises = () => {
		this.props.firebase.trainingPlanExercises(this.props.authUser.uid, this.state.idPlan)
			.push({ ...INITIAL_EXERCISE })
			.catch(error => this.setState({error}));
	};

	deleteExercises = (exerciseId) => {
		this.props.firebase
			.trainingPlanExercise(this.props.authUser.uid, this.state.idPlan, exerciseId)
			.remove(e => console.log(e))
	};

	render() {
		const {nameTraining,trainingPlanExercises} = this.state;
		return (
			<div>
				{nameTraining}
				<button type="button" onClick={this.addExercises}>
					Add Exercises
				</button>
				{trainingPlanExercises.length && trainingPlanExercises.map(exercise => (
					<Exercises
						key={exercise.id}
						id={exercise.id}
						deleteExercise={() => this.deleteExercises(exercise.id)}/>
				))}
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


