import * as actionTypes from '../actions/actionTypes';

const initState = {
	comments: [],
	loading: false,
	errorAddComment: null,
	loadingRemoveComment: false,
	errorRemoveComment: null
};

const reducer = (state = initState, action) => {
	switch(action.type){
		case actionTypes.SUCCESS_FETCH_COMMENTS: 
			return {...state, comments: action.comments};

		case actionTypes.START_ADD_COMMENT:
			return {...state, loading: true, errorAddComment: null};
			
		case actionTypes.SUCCESS_ADD_COMMENT:
			let copiedComments = state.comments.slice();
			copiedComments.push(action.comment);
			return {...state, comments: copiedComments, loading: false};

		case actionTypes.FAIL_ADD_COMMENT:
			return {...state, loading: false, errorAddComment: action.error};

		case actionTypes.START_REMOVE_COMMENT:
			return {...state, loadingRemoveComment: true, errorRemoveComment: null};

		case actionTypes.SUCCESS_REMOVE_COMMENT:
			let updatedComments = state.comments.filter(item => item.id !== action.id);
			return {...state, comments: updatedComments, loadingRemoveComment: false};

		case actionTypes.FAIL_REMOVE_COMMENT:
			return {...state, loadingRemoveComment: false, errorRemoveComment: action.error};

		default: return state;
	}
	
}

export default reducer;