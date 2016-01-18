// Redux DevTools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Redux State Logger
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './app/containers/App'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncHistory, routeReducer } from 'redux-simple-router'
import rootReducer from './app/reducers'

// import configureStore from './app/store/configureStore'
// const store = configureStore()

// Loading CSS Files
import './css/core.css'

import LogIn from './app/containers/LogIn'
import SiteRouter from './app/containers/Router'

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

const finalCreateStore = compose(
  applyMiddleware(
  	routerMiddleware,
  	thunkMiddleware,
  	loggerMiddleware
  ),
  DevTools.instrument()
)(createStore);
const store = finalCreateStore(rootReducer);
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./app/reducers', () => {
      const nextReducer = require('./app/reducers')
      store.replaceReducer(nextReducer)
    })
  }
routerMiddleware.listenForReplays(store);

render(
  <Provider store={store}>
    <div>
    	<Router history={history}>
        	<Route path="/" component={SiteRouter}>
        		<IndexRoute component={App}/>
          		<Route path="LogIn" component={LogIn}/>
        	</Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
