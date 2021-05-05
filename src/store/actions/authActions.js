import axios from 'axios';
import axiosArticle from '../../axios-article';

import * as actionTypes from './actionTypes';

export const login = (userInfo, callback, errorCb) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2iOe5RaCPyd6aIFDDz98iFm2lBUzhhK4';
    return dispatch => {
        dispatch({type: actionTypes.START_LOGIN});
        axios.post(url, {...userInfo, returnSecureToken: true})
        .then(res => {
            const data = res.data;
            if(typeof callback === 'function') callback();
            dispatch({type: actionTypes.SUCCESS_LOGIN, token: data.idToken, userId: data.localId});
        })
        .catch(
            error => {
                let errorMsg = error.response.data.error && error.response.data.error.message;
                dispatch({type: actionTypes.FAIL_LOGIN, error: errorMsg});
            }
        );
    }
}

export const signup = (signupData, callback) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2iOe5RaCPyd6aIFDDz98iFm2lBUzhhK4';
    return dispatch => {
        dispatch({type: actionTypes.START_SIGNUP});
        axios.post(url, {email: signupData.email, password: signupData.password, returnSecureToken: true})
        .then(res => {
            const data = res.data;
            dispatch({type: actionTypes.SUCCESS_SIGNUP, token: data.idToken, userId: data.localId});
            const info = {...signupData, userId: data.localId};
            saveAuthorInfoAfterSignup(info, dispatch, callback);
        })
        .catch(
            error => {
                let errorMsg = error.response.data.error && error.response.data.error.message;
                dispatch({type: actionTypes.FAIL_SIGNUP, error: errorMsg})
            }
        );
    }
};

const saveAuthorInfoAfterSignup = (info, dispatch, callback) => {
    let {name, email, bio, image, userId} = info;
    axiosArticle.post('/authors.json', {name, email, bio, image, userId})
    .then(data => callback())
    .catch(error => dispatch({type: actionTypes.FAIL_SIGNUP, error}));
}