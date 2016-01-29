// React & Redux Libraries
import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'

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
import './css/core.css'
import './css/profile.css'
import './css/match.css'

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

// Unsure if the importance of these
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
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
