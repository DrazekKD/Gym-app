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

	onChange = event => this.setState( { [event.target.name]: event.target.value } );


	render() {
		const {name ,moves, series} = this.state;
		return(
			<div>
				<input
					type="text"
					name="name"
					value={name}
					onChange={this.onChange}
					placeholder="Exercises Name"
				/>
				<input
					type="text"
					name="moves"
					value={moves}
					onChange={this.onChange}
					placeholder="Number of movies in the series"
				/>
				<input
					type="text"
					name="series"
					value={series}
					onChange={this.onChange}
					placeholder="Number of series"/>

				<button type="button" onClick={this.props.deleteExercise}>
					Delete Exercise
					{this.props.id}
				</button>
			</div>
		)
	}

}

export default Exercises;