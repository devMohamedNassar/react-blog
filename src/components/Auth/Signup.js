import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../UI/Input';
import UploadImg from '../UI/UploadImg';
import * as actions from '../../store/actions';
import { isValidForm, checkValidity } from '../../helpers/validation';
import FireErrorMsg from '../../helpers/firebaseError';
import classes from '../../animation/animation.module.css';
import Alert from '../UI/Alert';

class Signup extends React.Component {
    state = {
        signupForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Name',
                    type: 'text',
                    value: ''
                },
                validation: {
                    require: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Email',
                    type: 'text',
                    value: ''
                },
                validation: {
                    require: true,
                    email: true
                },
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Password',
                    type: 'password',
                    value: ''
                },
                validation: {
                    require: true,
                    minlength: 6
                },
                valid: false
            },
            bio: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'More Info',
                    type: 'text',
                    value: ''
                },
                validation: {
                    require: true
                },
                valid: false
            }
        },
        submitted: false,
        imgLink: ''
    }

    changedInput(e, key){
        const copiedSignupForm = {...this.state.signupForm};
        const copiedElement = {...copiedSignupForm[key]};
        const copiedElementConfig = {...copiedElement.elementConfig};
        copiedElementConfig.value = e.target.value;
        copiedElement.elementConfig = copiedElementConfig;
        if(this.state.submitted){
            checkValidity(copiedElement);            
        }
        copiedSignupForm[key] = copiedElement;
        this.setState({signupForm: copiedSignupForm});
    }

    getFormValue(){
        const value = {};
        for(let key in this.state.signupForm){
            value[key] = this.state.signupForm[key].elementConfig.value;
        }
        value.image = this.state.imgLink;
        return value;
    }

    submitForm(e){
        e.preventDefault();
        this.setState({submitted: true});
        if(!isValidForm('signupForm', this.state.signupForm, this.setState.bind(this)) || !this.state.imgLink) return;

        this.props.signup(this.getFormValue(), () => {
            this.props.history.replace('/');
        })
    }

    getImgLink(link){
        if(!link) return;
        this.setState({imgLink: link});
    }

    render(){
        return (
            <section className={`signup ${classes.fadeUp}`}>
                <div className="container">
                    
                    <form  onSubmit={e => this.submitForm(e)} className="signup__form">
                        <h5 className="signup__form-title">create account</h5>
                        {
                            Object.keys(this.state.signupForm).map(key => <Input showError={this.state.submitted} changed={e => this.changedInput(e, key)} key={key} {...this.state.signupForm[key]} />)
                        }
                        <UploadImg width="80px" height="80px" getLink={link => this.getImgLink(link)} />
                        {
                            !this.state.imgLink && this.state.submitted ?
                            <Alert show>Please select image for your profile</Alert>
                            : null
                        }
                        <button disabled={this.props.loading} className="btn btn-success btn-block">
                        {
                            this.props.loading ?
                            <span className="spinner-border spinner-border-sm"></span> :
                            <span>Signup</span>
                        }
                        </button>
                        {
                            this.props.error ?
                            <p className="alert alert-danger">{FireErrorMsg(this.props.error) || 'Fail to signup'}</p>
                            : null
                        }
                        <p className="text-muted">Already have an account? 
                            <Link to="/login" className="text-primary">Login Now</Link>
                        </p>
                    </form>
                </div>
            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        signup: (signupData, cb) => dispatch(actions.signup(signupData, cb))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);