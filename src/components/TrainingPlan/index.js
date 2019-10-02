import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { connect } from 'react-redux';
import { withAuthorization, withEmailVerification } from '../Session'
import { withRouter } from 'react-router-dom';
import Exercises from '../Exercises'
import * as Util from '../../util'

const TrainingPlanPage = ({authUser}) => (<TrainingPlanForm authUser={authUser}/>);

const INITIAL_STATE = {
	nameTraining: '',
	trainingPlanExercises:[],
	idPlan: null,
	error: null,
	loading:false,
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
		this.setState({ loading:true });

		this.props.firebase.trainingPlan(this.props.authUser.uid, this.props.match.params.id)
			.on('value', snapshot => {
				const trainingPlanObject = snapshot.val();

				if (trainingPlanObject) {
					this.setState({
						trainingPlanExercises: Util.getArrayObjectFromFirebase(trainingPlanObject.exercises),
						nameTraining: trainingPlanObject.nameTraining,
						loading: false
					})
				} else this.props.history.push(ROUTES.TRAINING_PLANS);

			})
	}

	componentWillUnmount() {
		this.props.firebase.trainingPlan(this.props.authUser.uid, this.props.match.params.id).off();
	}

	addExercises = () => {
		this.props.firebase.trainingPlanExercises(this.props.authUser.uid, this.props.match.params.id)
			.push({ ...INITIAL_EXERCISE })
			.catch(error => this.setState({error}));
	};

	deleteExercises = (exerciseId) => {
		this.props.firebase
			.trainingPlanExercise(this.props.authUser.uid, this.props.match.params.id, exerciseId)
			.remove()
			.catch(error => this.setState({error}))
	};


	render() {
		const {nameTraining,trainingPlanExercises,loading} = this.state;
		return (
			<div>
				{nameTraining}
				<button type="button" onClick={this.addExercises}>
					Add Exercises
				</button>
				{loading && <div>Loading...</div>}
				{!!trainingPlanExercises.length && trainingPlanExercises.map(exercise => (
					<Exercises
						key={exercise.id}
						id={exercise.id}
						uid={this.props.authUser.uid}
						idPlan={this.props.match.params.id}
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


