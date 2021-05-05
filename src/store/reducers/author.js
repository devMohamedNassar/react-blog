import * as actionTypes from '../actions/actionTypes';

const initState = {
	authors: {},
	profileLoading: false,
	error: null
};

const reducer = (state = initState, action) => {
	switch(action.type){
		case actionTypes.START_FETCH_AUTHOR:
			return {...state, profileLoading: true};

		case actionTypes.SUCCESS_FETCH_AUTHOR: {
			const authors = {...state.authors};
			authors[action.author.userId] = action.author;
			return {...state, authors, profileLoading: false};
		}

		case actionTypes.UPDATE_LOCAL_AUTHOR_INFO:
			let userId = Object.keys(state.authors).find(key => state.authors[key].id === action.id);
			let author = {...state.authors[userId], ...action.info};
			let authors = {...state.authors};
			authors[userId] = author;
			return {...state, authors};

		case actionTypes.FAIL_FETCH_AUTHOR:
			return {...state, profileLoading: false, error: action.error};

		default: return state;
	}
}

export default reducer;