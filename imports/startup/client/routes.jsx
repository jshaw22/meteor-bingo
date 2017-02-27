import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//containers
import AppContainer from '../../ui/components/AppContainer.jsx';
import MainPage from '../../ui/components/MainPage.jsx';

//pages
import SignupPage from '../../ui/components/SignupPage.jsx';
import LoginPage from '../../ui/components/LoginPage.jsx';

export const renderRoutes = (store) => (
	<Router history={browserHistory}>
		<Route path="login" component={LoginPage} />
		<Route path="signup" component={SignupPage} />
		<Route path="/" component={AppContainer}>
			<IndexRoute component={MainPage} /> 
		</Route>
	</Router>
	);