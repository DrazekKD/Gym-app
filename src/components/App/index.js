import React from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountPage from "../Account";
import Admin from "../Admin";
import HomePage from "../Home";
import Landing from "../Landing";
import Navigation from '../Navigation';
import PasswordForget from "../PasswordForget";
import SignInPage from "../SignIn";
import SingUpPage from "../SignUp";
import TrainingPlansPage from "../TrainingPlans";
import TrainingPlanPage from "../TrainingPlan";
import GoTraining from "../GoTraining"
import {withAuthentication} from '../Session'


const App = () =>(
		<Router>
			<Navigation/>

			<hr/>
			<Route exact path={ROUTES.LANDING} component={Landing}/>
			<Route path={ROUTES.SIGN_UP} component={SingUpPage}/>
			<Route path={ROUTES.SIGN_IN} component={SignInPage}/>
			<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget}/>
			<Route path={ROUTES.HOME} component={HomePage}/>
			<Route path={ROUTES.ACCOUNT} component={AccountPage}/>
			<Route path={ROUTES.ADMIN} component={Admin}/>
			<Switch>
				<Route path={ROUTES.TRAINING_PLAN} component={TrainingPlanPage}/>
				<Route path={ROUTES.TRAINING_PLANS} component={TrainingPlansPage}/>
			</Switch>
			<Route path={ROUTES.TRAINING_PLAN_GO_TRAINING} component={GoTraining}/>
		</Router>
);
export default withAuthentication(App);