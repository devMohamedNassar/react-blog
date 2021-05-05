import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../UI/Input';
import * as actions from '../../store/actions';
import { isValidForm, checkValidity } from '../../helpers/validation';
import FireErrorMsg from '../../helpers/firebaseError';
import classes from '../../animation/animation.module.css';

class Login extends React.Component {

    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Email',
                    type: 'text',
                    value: '',
                    disabled: false
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
                    value: '',
                    disabled: false
                },
                validation: {
                    require: true
                },
                valid: false
            }
        },
        submitted: false,
        userImg: null,
        userName: null,
        settingsMode: false
    }

    componentDidMount(){
        if(this.props.settingsMode){
            this.settingsMode();
        }
    }

    settingsMode(){
        const currentUser = this.props.author;
        const copiedLoginForm = {...this.state.loginForm};
        for(let key in copiedLoginForm){
            const copiedElement = {...copiedLoginForm[key]};
            const copiedConfig = {...copiedElement.elementConfig};
            if(key === 'email') {
                copiedConfig.value = currentUser.email;
                copiedConfig.disabled = true;
            }
            copiedElement.elementConfig = copiedConfig;
            copiedLoginForm[key] = copiedElement;
        }
        this.setState({
            loginForm: copiedLoginForm, 
            userImg: currentUser.image, 
            userName: currentUser.name,
            settingsMode: true
        })            
    }

    changedInput(e, key){
        const copiedLoginForm = {...this.state.loginForm};
        const copiedElement = {...copiedLoginForm[key]};
        const copiedElementConfig = {...copiedElement.elementConfig};
        copiedElementConfig.value = e.target.value;
        copiedElement.elementConfig = copiedElementConfig;
        if(this.state.submitted){
            checkValidity(copiedElement);            
        }
        copiedLoginForm[key] = copiedElement;
        this.setState({loginForm: copiedLoginForm});
    }

    getFormValue(){
        const value = {};
        for(let key in this.state.loginForm){
            value[key] = this.state.loginForm[key].elementConfig.value;
        }
        return value;
    }

    submitForm(e){
        e.preventDefault();
        this.setState({submitted: true});
        if(!isValidForm('loginForm', this.state.loginForm, this.setState.bind(this))) return;

        this.props.login(this.getFormValue(), () => {
            if(this.state.settingsMode){
                this.props.loginDone();
            }else{
                this.props.history.replace('/');
            }
            
        });
        
    }

    render(){
        return (
            <section className={`login ${classes.fadeUp}`}>
                <div className="container">
                    <form className="login__form" onSubmit={e => this.submitForm(e)}>
                        <div className="img-wrapper text-center">
                            <img 
                                src={this.state.userImg || "assets/images/user.svg"} 
                                style={this.state.settingsMode ? {padding: 0}: null}
                                alt="icon" />
                        </div>
                        <h5 className="login__form-title">{this.state.userName || "Member Login"}</h5>
                        <p className="login__form-subtitle">Enter your {!this.state.settingsMode ? "email and" : null} password</p>
                        {
                            Object.keys(this.state.loginForm).map(key => <Input showError={this.state.submitted} changed={e => this.changedInput(e, key)} key={key} {...this.state.loginForm[key]} />)
                        }
                        <button className="btn btn-success btn-block" disabled={this.props.loading}>
                            {
                                this.props.loading ? 
                                <span className="spinner-border spinner-border-sm"></span> : 
                                <span>{!this.state.settingsMode ? "Login" : "Continue"}</span>
                            }
                        </button>
                        {
                            this.props.error ?
                            <p className="alert alert-danger">{FireErrorMsg(this.props.error) || 'Fail to login'}</p>
                            : null
                        }
                        {
                            !this.state.settingsMode ?
                            <p className="text-muted">
                                Don't have an account? 
                                <Link to="/signup" className="text-primary">Signup Now</Link>
                            </p>   
                            : null                     
                        }
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
        login: (userInfo, cb) => dispatch(actions.login(userInfo, cb))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);