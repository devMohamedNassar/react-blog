import axios from 'axios';

import axiosArticle from '../../axios-article';
import store from '../store';
import * as actionTypes from './actionTypes';

export const updateEmailOrPass = (newData, id, cb, errorCb) => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA2iOe5RaCPyd6aIFDDz98iFm2lBUzhhK4';
    const token = store.getState().auth.token;
    return dispatch => {
        const payload = {idToken: token, returnSecureToken: true, ...newData};
        axios.post(url, payload)
        .then(response => {
            const data = response.data;
            //update current token if you get new token
            if(data.idToken) dispatch({type: actionTypes.SUCCESS_LOGIN, token: data.idToken, userId: data.localId});
            if('password' in newData){
                if(typeof cb === 'function') cb();
                return;
            }
            updateEmailOnDatabase(newData, id, cb);
        })
        .catch(error => typeof errorCb === 'function' ? errorCb(error) : null)
    }

};

const updateEmailOnDatabase = (newData, id, cb, errorCb) => {
    updateUserInfo(newData, id, cb, errorCb)();
}

export const updateUserInfo = (info, id, cb, errorCb) => {
    return dispatch => {
        axiosArticle.patch('/authors/' + id + '.json', info)
        .then(res =>  {
            dispatch = dispatch || store.dispatch;
            dispatch({type: actionTypes.UPDATE_LOCAL_AUTHOR_INFO, info, id})
            if(typeof cb === 'function') cb();
        })
        .catch(error => typeof errorCb === 'function' ? errorCb(error) : null)        
    }
};
