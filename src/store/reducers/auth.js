import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-article';

const initState = {
    token: null,
    userId: null,
    loading: false,
    error: null
};
const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.START_LOGIN: 
        case actionTypes.START_SIGNUP:
            return {...state, loading: true, error: null};
            
        case actionTypes.SUCCESS_LOGIN:
        case actionTypes.SUCCESS_SIGNUP:
            axios.defaults.params = {auth: action.token};
            localStorage.setItem('token', action.token);
            localStorage.setItem('userId', action.userId);
            return {...state, loading: false, token: action.token, userId: action.userId};

        case actionTypes.FAIL_LOGIN:
        case actionTypes.FAIL_SIGNUP:
            return {...state, loading: false, error: action.error};

        case actionTypes.LOGOUT:
            axios.defaults.params = {};
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.reload();
            break;
            
        default:
            return state;
    }
};

export default reducer;