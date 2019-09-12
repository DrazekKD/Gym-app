import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Account from "../Account";
import Admin from "../Admin";
import Home from "../Home";
import Landing from "../Landing";
import Navigation from '../Navigation';
import PasswordForget from "../PasswordForget";
import SignInPage from "../SignIn";
import SingUpPage from "../SignUp";
import {withAuthentication} from '../Session'


const App = () =>(
		<Router>
			<Navigation/>

			<hr/>
			<Route exact path={ROUTES.LANDING} component={Landing}/>
			<Route path={ROUTES.SIGN_UP} component={SingUpPage}/>
			<Route path={ROUTES.SIGN_IN} component={SignInPage}/>
			<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget}/>
			<Route path={ROUTES.HOME} component={Home}/>
			<Route path={ROUTES.ACCOUNT} component={Account}/>
			<Route path={ROUTES.ADMIN} component={Admin}/>
			<Route/>
		</Router>
);
export default withAuthentication(App);