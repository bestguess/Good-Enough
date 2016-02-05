// React & Redux Libraries
import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'

// ES6 Promises and Isomorphic Fetch
require('es6-promise').polyfill();
import 'isomorphic-fetch'

// React/Redux Router
import { Router, Route, IndexRoute } from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'
import { createHistory } from 'history'

// Redux State Logger
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

// Importing React Components
import { SiteRouter, SignUp, LogIn, Profile, Match, UsernamePasswordReset, PasswordResetForm } from './app/containers'

// Importing Redux Reducer
import rootReducer from './app/reducers'

// Loading CSS Files
import '!style!css!sass!./css/core.scss'
import '!style!css!sass!./css/profile.scss'
import '!style!css!sass!./css/match.scss'

// Middleware for Redux Router & Logger
const history = createHistory();
const routerMiddleware = syncHistory(history);
const loggerMiddleware = createLogger()

// Connecting all the dots...
const finalCreateStore = compose(
  applyMiddleware(
  	routerMiddleware,
  	thunkMiddleware,
  	loggerMiddleware
  )
)(createStore);

const store = finalCreateStore(rootReducer);

// Enables Hot Reload for Redux
if (module.hot) {
    // Enable Webpack Hot Module Replacement for Reducers
    module.hot.accept('./app/reducers', () => {
      const nextReducer = require('./app/reducers')
      store.replaceReducer(nextReducer)
    })
  }
  
routerMiddleware.listenForReplays(store);



// React Render
render(
  <Provider store={store}>
    <div>
    	<Router history={history}>
        	<Route path="/" component={SiteRouter}>
        		<IndexRoute component={SignUp}/>
          		<Route path="logIn" component={LogIn}/>
              <Route path="recover-password" component={UsernamePasswordReset}/>
              <Route path="/reset-password/:token" component={PasswordResetForm}/>
              <Route path="profile" component={Profile}/>
              <Route path="/:match_id" component={Match}/>
        	</Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
