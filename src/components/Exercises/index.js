import React, { Component } from 'react';
import { withFirebase } from "../Firebase";
const INITIAL_STATE = {
	name: '',
	moves: '',
	series: ''
};
class Exercises extends Component{
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE }
	}

	componentDidMount(){

		this.props.firebase.trainingPlanExercise(this.props.uid, this.props.idPlan, this.props.id)
			.once('value')
			.then(snapshot => {
				const exerciseObject = snapshot.val();
				Object.keys(exerciseObject).map(key => (
					this.setState({[key]:exerciseObject[key]})
				));
			})
	}

	onChange = event => this.setState( { [event.target.name]: event.target.value } );

	setChangeExercises = event => {
		this.props.firebase
			.trainingPlanExercise(this.props.uid, this.props.idPlan, this.props.id)
			.update({ [event.target.name]: event.target.value})
	};

	render() {
		const {name ,moves, series} = this.state;
		return(
			<div>
				<input
					type="text"
					name="name"
					value={name}
					onChange={this.onChange}
					onBlur={this.setChangeExercises}
					placeholder="Exercises Name"
				/>
				<input
					type="number"
					name="moves"
					value={moves}
					onChange={this.onChange}
					onBlur={this.setChangeExercises}
					placeholder="Number of movies in the series"
				/>
				<input
					type="number	"
					name="series"
					value={series}
					onChange={this.onChange}
					onBlur={this.setChangeExercises}
					placeholder="Number of series"/>

				<button type="button" onClick={this.props.deleteExercise}>
					Delete Exercise
					{this.props.id}
				</button>
			</div>
		)
	}

}

export default withFirebase(Exercises);