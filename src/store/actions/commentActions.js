import axios from '../../axios-article';
import * as actionTypes from './actionTypes';

export const successFetchComments = comments => {
	return {type: actionTypes.SUCCESS_FETCH_COMMENTS, comments};
};

export const addComment = (comment, cb) => {
	return dispatch => {
		dispatch({type: actionTypes.START_ADD_COMMENT});
		axios.post('/articles/' + comment.articleId + '/comments.json', comment)
		.then(response => {
			dispatch({type: actionTypes.SUCCESS_ADD_COMMENT, comment: {...comment, id: response.data.name}});
			if(typeof cb === 'function') cb();
		})
		.catch(error => dispatch({type: actionTypes.FAIL_ADD_COMMENT, error}));
	}
	
};

export const removeComment = (id, articleId) => {
	return dispatch => {
		dispatch({type: actionTypes.START_REMOVE_COMMENT});
		axios.delete(`/articles/${articleId}/comments/${id}.json`)
		.then(res => dispatch({type: actionTypes.SUCCESS_REMOVE_COMMENT, id}))
		.catch(error => dispatch({type: actionTypes.FAIL_REMOVE_COMMENT, error}))
	}
};

