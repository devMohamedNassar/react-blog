import React from 'react';

import Input from '../UI/Input';

const setting = props =>  {
    return (
        <div className="setting-filed">
            <label>{props.elementConfig.placeholder}</label>
            <div className="setting-filed__wrap">
                <Input 
                    changed={props.changed} 
                    elementType={props.elementType} 
                    elementConfig={props.elementConfig} /> 
                {
                    !props.editMode && !props.loading ?
                    <button 
                        onClick={() => props.startEdit()}
                        disabled={props.loadingMode}
                        className="btn btn-link" 
                        >Edit</button> :
                    null
                } 
                {   props.editMode && !props.loading ?
                    <button 
                    onClick={props.onSave}
                    className="btn btn-link" 
                    >Save</button> :
                    null
                }
                {
                    props.loading ?
                    <div 
                        className="setting-filed__spinner">
                        <span className="spinner-border spinner-border-sm ml-3"></span>
                    </div>
                    : null
                }                  
            </div>
            {
                props.successMsg ?
                <p className="alert alert-success">{props.successMsg}</p>
                : null
            }
            {
                props.errorMsg ?
                <p className="alert alert-danger">{props.errorMsg}</p>
                : null
            }

        </div>

    );
};

export default setting;