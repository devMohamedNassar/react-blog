import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ShowIfAuth from '../UI/ShowIfAuth';
import * as actionTypes from '../../store/actions/actionTypes';

const Header = props => {
	const [activeClass, setActiveClass] = useState('');
	const toggleMobMenu = () => setActiveClass(prev => prev === 'active' ? '' : 'active');
	return (
		<nav>
			<div className="container">
				<div className="row align-items-center">
					<div className="col-md">
						<div className="wrapper">
							<h3 className="logo">Mqalah</h3>
							<div className={`hamburger ${activeClass}`} onClick={toggleMobMenu}>
								<span></span>
								<span></span>
								<span></span>
							</div>					
						</div>
					</div>
					<div className="col-md-auto">
						<div className={`menu-list__wrap ${activeClass}`}>
							<ul className="menu-list d-flex list-unstyled">
								<li className="menu-list__item">
									<NavLink 
										to="/"
										exact
										className="menu-list__item-link">articles</NavLink>
								</li>
								<li className="menu-list__item">
									<NavLink 
										to={`${props.isAuth ? '/editor' : '/login'}`}
										className="menu-list__item-link">add article</NavLink>
								</li>
								<ShowIfAuth>
									<li className="menu-list__item">
										<NavLink 
											to="/settings"
											className="menu-list__item-link">settings</NavLink>
									</li>									
								</ShowIfAuth>
							</ul>
							<ShowIfAuth hideIfAuth>
								<button className="btn btn-success" onClick={()=>props.history.push('/login')}>login</button>
							</ShowIfAuth>
							<ShowIfAuth hideIfAuth>
								<button className="btn btn-outline-success" onClick={()=>props.history.push('/signup')}>signup</button>
							</ShowIfAuth>
							<ShowIfAuth>
								<button className="btn btn-danger" onClick={props.logout}>Logout</button>	
							</ShowIfAuth>			
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

const mapStateToProps = state => {
	return {
		isAuth: !!state.auth.token
	}
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch({type: actionTypes.LOGOUT})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));