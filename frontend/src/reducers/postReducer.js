//Cookies - get the data from cookie and write as INIT State
import Cookies from 'js-cookie'

import { 
    POSTS_REQUEST, 
    POSTS_SUCCESS, 
    POSTS_FAIL,

} from '../constants/postConstant'

//////////////////////////////////////////////
export const getAllPostsReducer = ( state = {}, action ) => {
    switch(action.type){

        case POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case POSTS_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case POSTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}