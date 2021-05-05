import React from 'react';

import UploadImg from '../UI/UploadImg';
import Alert from './Alert';

const input = props => {

	const classes = `form-control ${props.className ? props.className : ''}`;
	const validation = obj => {
		if(!props.showError) return null;
		
		return Object.keys(obj).map((key, index) => {
			switch(key){
				case 'email': {
					const cond =  props.error && props.error.require !== props.error.email;
					return cond ? <Alert key={key+index} show >this is not valid email</Alert> : null;
				}
				case 'minlength': {
					const cond =  props.error && props.error.require !== props.error.minlength;
					return cond ? <Alert key={key+index} show >Password should be at least {obj[key]} characters</Alert> : null;
				}
				case 'require':
				default:
					return props.error && props.error.require ? <Alert key={key+index} show >this filed required</Alert>  : null; 
			}
		})
	};

	switch(props.elementType){
		case 'input':
			return <React.Fragment>
				{
					(props.elementConfig.type === 'file' && props.elementConfig.accept.includes('image')) ?
					<UploadImg 
						getLink={props.changed} 
						src={props.elementConfig.value} 
						width="200px">{props.elementConfig.placeholder}</UploadImg>
					: <input 
							onChange={props.changed} {...props.elementConfig} 
							className={classes} />
				}
				{
					validation(props.validation)
				}
			</React.Fragment>
		case 'textarea':
			return <React.Fragment>
						<textarea 
							onChange={props.changed} {...props.elementConfig} 
							className={classes} />
						{
							validation(props.validation)
						}
					</React.Fragment>
		default:
			return <React.Fragment>
						<input 
						onChange={props.changed} {...props.elementConfig} 
						className={classes} />
						{
							validation(props.validation)
						}
					</React.Fragment>
	}
}

export default input;