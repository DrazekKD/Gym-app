import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { connect } from 'react-redux';
import { withAuthorization, withEmailVerification } from '../Session';
import {withRouter,Link } from 'react-router-dom';
const TrainingPlansPage = ({authUser}) => (<TrainingPlansForm authUser={authUser}/>);

const INITIAL_STATE = {
	nameNewTraining: '',
	userTrainingPlans:[],
	loading: false,
	error: null
};
class TrainingPlansFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount() {
		this.setState({ landing: true });

		this.props.firebase.trainingPlans(this.props.authUser.uid)
			.once('value')
			.then(snapshot => {
				const trainingPlansObject = snapshot.val() || {}  ;

				const trainingPlansList = Object.keys(trainingPlansObject).map(key => ({
					...trainingPlansObject[key],
					uid:key
				}));

				this.setState({userTrainingPlans: trainingPlansList})
			})
	}


	onSubmit = event => {
		const { nameNewTraining } = this.state;
		event.preventDefault();
		this.props.firebase.trainingPlans(this.props.authUser.uid)
			.push({ nameTraining:nameNewTraining })
			.then(snapshot => {
				this.setState({nameNewTraining: ''});
				this.props.history.push(`${ROUTES.TRAINING_PLAN}/${snapshot.key}`);

			})
			.catch(error => this.setState({error}));
	};

	onChange = event => this.setState( { [event.target.name]: event.target.value } );

	deleteTraining = trainingId => {
		this.props.firebase
			.trainingPlan(this.props.authUser.uid, trainingId)
			.remove()
			.then(() => {
				const updateUserTrainingPlans = this.state.userTrainingPlans.filter(x => x.uid !== trainingId);
				this.setState({ userTrainingPlans: updateUserTrainingPlans })
			})
			.catch(error => this.setState({error}))
	};


	render() {
		const {nameNewTraining ,error, userTrainingPlans} = this.state;
		const isInValid = nameNewTraining === '';
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						name="nameNewTraining"
						onChange={this.onChange}
						value={nameNewTraining}
						placeholder="Training Name"/>
					<button type="submit" disabled={isInValid}>
						Create Training
					</button>
					{userTrainingPlans.map(trainingPlan =>(
						<div key={trainingPlan.uid}>
							<Link
								to={`${ROUTES.TRAINING_PLAN}/${trainingPlan.uid}`}>
								<p>{trainingPlan.nameTraining} {trainingPlan.uid}</p>
							</Link>
							<Link
								to={`${ROUTES.TRAINING_PLAN_GO_TRAINING}/${trainingPlan.uid}`}>
								<button type="button">Go Training</button>
							</Link>
							<button
								type="button"
								onClick={() => this.deleteTraining(trainingPlan.uid)}
							>Delete Training</button>
						</div>
					))}
					{error && <p>{error.message}</p>}
				</form>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

const TrainingPlansForm = compose(withRouter,withFirebase)(TrainingPlansFormBase);

export {TrainingPlansForm}

export default compose(
	connect(mapStateToProps),
	withEmailVerification,
	withAuthorization(condition))(TrainingPlansPage);


