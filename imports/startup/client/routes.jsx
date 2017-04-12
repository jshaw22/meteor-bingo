import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../../ui/components/App.jsx';
import requireAuth from '../../utils/requireAuth.jsx';

//pages
import SignupPage from '../../ui/components/SignupPage.jsx';
import LoginPage from '../../ui/components/LoginPage.jsx';
import Home from '../../ui/components/Home.jsx';
import Welcome from '../../ui/components/Welcome.jsx';
import PageNotFound from '../../ui/components/PageNotFound.jsx';
import Onboarding from '../../ui/components/Onboarding.jsx';
import Profile from '../../ui/components/Profile.jsx';
import Match from '../../ui/components/Match.jsx';
import Message from '../../ui/components/Message.jsx'

export const renderRoutes = (store) => (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Welcome} />
			<Route path="login" component={LoginPage} />
			<Route path="signup" component={SignupPage} />
			<Route path='home' component={requireAuth(Home)} />
			<Route path='onboarding' component={requireAuth(Onboarding)} />
			<Route path='profile' component={requireAuth(Profile)} />
			<Route path='match' component={requireAuth(Match)} />
			<Route path='message' component={requireAuth(Message)} />
		</Route>
		<Route path='*' component={PageNotFound} />
	</Router>
	);