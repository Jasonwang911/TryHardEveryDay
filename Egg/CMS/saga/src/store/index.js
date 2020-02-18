import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

function createStore(reducer, initialState, enchancer) {
  return enchancer(createStore)(reducer, initialState)
}
// 等同于  const store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store