import React, { Component }from 'react';

import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import  { withFirebase } from "../Firebase";

const PasswordForgetPage = () => (
	<div>
		<h1>Password Forget</h1>
		<PasswordForgetForm/>
	</div>
);

const INITIAL_STATE = {
	email: '' ,
	error: ''
};

class PasswordForgetBase extends Component{
	constructor(props){
		super(props);

		this.state = { ...INITIAL_STATE }
	}


	onSubmit = event => {
		const { email } = this.state

		this.props.firebase
			.doPasswordReset(email)
			.then(()=>{
				this.setState({ ...INITIAL_STATE })
			})
			.catch(error => {
				this.setState({error})
			});

		event.preventDefault();

	};

	onChange = event => {
		this.setState({[event.target.name]: event.target.value})
	};


	render (){
		const {email, error} = this.state;

		const isInValid = email === '';
		return(
			<form onSubmit={this.onSubmit}>
				<input
					name="email"
					type="text"
					value={email}
					onChange={this.onChange}
					placeholder="Email Addres"
				/>
				<button disabled={isInValid} type="submit">
					Reset My Password
				</button>
				{error&& <p>{error.message}</p>}
			</form>
		);
	}

}


const PasswordForgetLink = () => (
	<p>
		<Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
	</p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetBase);

export {PasswordForgetForm, PasswordForgetLink}
