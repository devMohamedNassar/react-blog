import React from 'react';

import classes from '../../animation/animation.module.css';

const alert = props => {
	const alertContent = <div className={`${classes.scaleDown} ${props.className || null}`}>
							<p className={`alert alert-${props.type || 'danger'}`}>{props.children}</p>
						</div>
	return props.show ? alertContent : null;
}

export default alert;