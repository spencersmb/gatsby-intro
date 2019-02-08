import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import data from './products'

const reducers = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1,
    })
  }
  if (action.type === `PRODUCTS`) {
    console.log('action', action)
    return {
      ...state,
    }
  }
  return state
}

const initialState = { count: 0, products: [] }
if (data) {
  initialState.products = data
}

const env = process.env.NODE_ENV || 'development'
// const createStore = () => reduxCreateStore(reducer, initialState, devtools)
const createStore = () => {
  if (typeof window !== 'undefined' && env === 'development') {
    return reduxCreateStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware)),
    )
  } else {
    return reduxCreateStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware)),

      // applyMiddleware(thunkMiddleware),
    )
  }
}
export default createStore