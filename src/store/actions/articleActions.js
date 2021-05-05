import * as actionTypes from './actionTypes';
import axios from '../../axios-article';
import store from '../../store/store';
import { successFetchComments } from './commentActions';

export const getArticles = (filter, callback) => {
	const params = {};
	if(filter && filter.userId){
		params.orderBy = '"userId"';
		params.equalTo = `"${filter.userId}"`;
	}
	return dispatch => {
		dispatch({type: actionTypes.START_GET_ARTICLES});
		axios.get('/articles.json', {params})
		.then(res => {
			dispatch(saveArticles(res.data));
			if(typeof callback === 'function') callback(res.data);
		})
		.catch(err => dispatch(requestFail()))
	} 
}

export const saveArticles = articlesData => {
	const articles = [];
	for(let key in articlesData){
		const obj = {...articlesData[key]};
		obj.id = key;
		articles.push(obj);
	}
	return {type: actionTypes.SAVE_ARTICLES, articles}
}

export const requestFail = () => {
	return {type: actionTypes.REQUEST_FAIL};
}

export const getArticle = (id, cb) => {
	return dispatch => {
		axios.get(`articles/${id}.json`)
		.then(res => {
			if(typeof cb === 'function') cb(res.data);
			if(!res.data) return;
			const comments = [];
			for(let key in res.data.comments){
				const obj = {...res.data.comments[key]};
				obj.id = key;
				comments.push(obj);
			}
			dispatch(successFetchComments(comments));
			dispatch(saveArticle({...res.data, id}));
		})
	}
}

export const saveArticle = (article) => {
	return {type: actionTypes.SAVE_ARTICLE, article};
}

export const addArticle = (article, callBack) => {
	const userId = store.getState().auth.userId;
	article.userId = userId;
	return dispatch => {
		axios.post('/articles.json', article)
		.then(() => {
			if(typeof callBack === 'function') callBack();
		});
	};
}

export const deleteArticle = (id, callBack) => {
	return dispatch => {
		axios.delete(`/articles/${id}.json`)
		.then(() => {
			if(typeof callBack === 'function') callBack();
		});
	}
}

export const updateArticle = (article, cb) => {
	return dispatch => {
		axios.put(`/articles/${article.id}.json`, article)
		.then(res => {
			if(typeof cb === 'function') cb();
		});
	}
}

