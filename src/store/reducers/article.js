import * as actionTypes from '../actions/actionTypes';

const initState = {
	articles: [],
	singleArticle: {},
	error: false
};

const reducer = (state=initState, action) => {
	switch(action.type){
		case actionTypes.START_GET_ARTICLES:
			return{...state, articles: [], singleArticle: {}};
		case actionTypes.SAVE_ARTICLES:
			return {...state, articles: action.articles.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)) ), error: false};
		case actionTypes.REQUEST_FAIL: 
			return {...state, error: true}
		case actionTypes.SAVE_ARTICLE:
			return {...state, singleArticle: action.article}
		default:
			return state;
	}
}

export default reducer;