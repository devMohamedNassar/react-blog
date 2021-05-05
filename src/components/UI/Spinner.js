import React from 'react';

const spinner = props => {
	const spinnerContent = (
		<div className="text-center" style={props.style ? props.style : null}>
			<div className="spinner-border"></div>
		</div>
	);
	return props.show ? spinnerContent : null;
};

export default spinner;