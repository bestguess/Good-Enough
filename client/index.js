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

// Redux DevTools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Redux State Logger
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

// Importing React Components
import { SiteRouter, SignUp, LogIn } from './app/containers'

// Importing Redux Reducer
import rootReducer from './app/reducers'

// Loading CSS Files
import './css/core.css'

// Commented out for a day when we will refactor
// import configureStore from './app/store/configureStore'
// const store = configureStore()

// Middleware for Redux Router & Logger
const history = createHistory();
const routerMiddleware = syncHistory(history);
const loggerMiddleware = createLogger()

// Create Redux DevTools
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

// Connecting all the dots...
const finalCreateStore = compose(
  applyMiddleware(
  	routerMiddleware,
  	thunkMiddleware,
  	loggerMiddleware
  ),
  DevTools.instrument()
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
          		<Route path="LogIn" component={LogIn}/>
        	</Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
