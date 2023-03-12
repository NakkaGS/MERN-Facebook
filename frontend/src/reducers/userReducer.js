//Cookies - get the data from cookie and write as INIT State
import Cookies from 'js-cookie'

import { 
    CREATE_USER_REQUEST, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

} from '../constants/userConstants'

export function userReducer(state = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null , action) {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;

        case 'VERIFY':
            return {...state, verified: action.payload};
    
        default:
            return state;
    }
}

//////////////////////////////////////////////
export const userLoginReducer = ( state = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null , action ) => {
    switch(action.type){

        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
                return {}

        default:
            return state;
    }
}