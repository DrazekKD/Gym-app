import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {PasswordForgetForm} from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import {withAuthorization, withEmailVerification} from '../Session';

const AccountPage = ({authUser}) => (
			<div>
				<h1>Account Page {authUser.email}</h1>
				<PasswordForgetForm/>
				<PasswordChangeForm/>
			</div>
);

const mapStateToProps = state => ({
	authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

export default compose(
	connect(mapStateToProps),
	withEmailVerification,
	withAuthorization(condition),
)(AccountPage)