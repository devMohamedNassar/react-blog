import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import * as actionTypes from '../../store/actions/actionTypes';

const layout = props => {
	//auto login when start
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	if(token && userId) props.autoLogin({token, userId});

	return (
		<React.Fragment>
			<Header />
			{props.children}
			<Footer />
		</React.Fragment>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		autoLogin: info => dispatch({type: actionTypes.SUCCESS_LOGIN, token: info.token, userId: info.userId})
	};
};

export default connect(null, mapDispatchToProps)(layout);