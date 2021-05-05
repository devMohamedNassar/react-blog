import axios from 'axios';

import store from './store/store';
import { LOGOUT } from './store/actions/actionTypes';

const axiosInstance = axios.create({
	baseURL: 'https://blog-api-d772f.firebaseio.com'
})

axiosInstance.interceptors.response.use(response =>  response, error => {
	if((error.response && error.response.status) === 401){
		if(store.getState().auth.token) store.dispatch({type: LOGOUT});
	}
	return Promise.reject(error);
})

export default axiosInstance;