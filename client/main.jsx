import React from 'react';
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../imports/ui/reducers/index';
import { Provider } from 'react-redux';

//render routes
import { renderRoutes } from '../imports/startup/client/routes.jsx';

//setup store 
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

Meteor.startup(() => {
	render(
  <Provider store={store}>
    {renderRoutes(store)}
  </Provider>
  , document.getElementById('target'));
});


// ReactDOM.render(
//   <Provider store={store}>
//     {renerRoutes()}
//   </Provider>
//   , document.querySelector('.container'));



// Meteor.startup(() => {
// 	render(renderRoutes(), document.getElementById('target'));
// });