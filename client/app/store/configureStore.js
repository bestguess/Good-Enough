import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
 )(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
