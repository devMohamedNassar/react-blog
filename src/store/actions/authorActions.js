import axios from '../../axios-article';
import * as actionTypes from './actionTypes';

export const fetchAuthor = (userId, cb) => {
	return dispatch => {
		const params = {
			"orderBy": '"userId"',
			"equalTo": `"${userId}"`
		};
		axios.get('/authors.json', {params})
		.then(res => {
			dispatch(successFetchAuthor(res.data));
			if(typeof cb === 'function') cb();
		});	
	}

};

export const successFetchAuthor = authorData => {
	let author = {};
	for(let key in authorData){
		author = {...authorData[key]};
		author.id = key;
	}

	return {type: actionTypes.SUCCESS_FETCH_AUTHOR, author};
};

export const fetchAuthorByFirebaseId = id => {
	return dispatch => {
		dispatch({type: actionTypes.START_FETCH_AUTHOR});
		axios.get('/authors/' + id + '.json')
		.then(res => {
			dispatch(successFetchAuthorByfireId({...res.data, id}));
		})
		.catch(error => dispatch({type: actionTypes.FAIL_FETCH_AUTHOR, error}));
	}
};

export const successFetchAuthorByfireId = author => {
	return {type: actionTypes.SUCCESS_FETCH_AUTHOR, author};
};

