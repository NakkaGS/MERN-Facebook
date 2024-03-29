import { combineReducers } from 'redux'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
    user : userReducer,
    posts :  postReducer,
})

export default rootReducer;