import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import articleReducer from './reducers/article';
import authorReducer from './reducers/author';
import commentReducer from './reducers/comment';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
	article: articleReducer,
	author: authorReducer,
	comment: commentReducer,
	auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
