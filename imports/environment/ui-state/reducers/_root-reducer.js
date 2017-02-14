import { combineReducers } from 'redux'
import { globalData } from './'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  globalData,
  routing: routerReducer
})
