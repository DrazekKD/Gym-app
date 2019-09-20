import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from "../Firebase";
import { connect } from 'react-redux';
import { withAuthorization, withEmailVerification } from '../Session'
import Exercises from '../Exercises';

const TrainingPlansPage = ({authUser}) => (<TrainingPlansForm authUser={authUser}/>);

const INITIAL_STATE = {
	name: '',
	quantityExercises: 0,
	error: null
};
class TrainingPlansFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };


	}

	onSubmit = event => {
		const { name } = this.state;
		event.preventDefault();
		this.props.firebase.trainingPlan(this.props.authUser.uid)
			.push({name})
			.then(() => this.setState({...INITIAL_STATE}))
			.catch(error => this.setState({error}));
	};

	onChange = event => this.setState( { [event.target.name]: event.target.value } );

	incrementExercises = () => {

		this.setState( {
			quantityExercises: this.state.quantityExercises + 1

		});
	}


	decrementExercises = () => this.setState( { quantityExercises: this.state.quantityExercises - 1 });

	render() {
		const {name ,error} = this.state;

		const isInValid = name === '';

		const exercisesForms = [];
		for (var i = 0; i < this.state.quantityExercises; i += 1) {
			exercisesForms.push(<Exercises key={i}/>);
		};

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						name="name"
						onChange={this.onChange}
						value={name}
						placeholder="Training Name"/>
					<button  type="button" onClick={this.incrementExercises}>
						Add Exercises
					</button>
					{exercisesForms}
					<button type="submit" disabled={isInValid}>
						Save New Training
					</button>
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

const TrainingPlansForm = compose(withFirebase)(TrainingPlansFormBase);

export {TrainingPlansForm}

export default compose(
	connect(mapStateToProps),
	withEmailVerification,
	withAuthorization(condition))(TrainingPlansPage);


