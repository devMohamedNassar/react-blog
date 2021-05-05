import React from 'react';
import { connect } from 'react-redux';

import Setting from './Setting';
import * as actions from '../../store/actions';
import store from '../../store/store';
import UploadImg from '../UI/UploadImg';
import Login from '../Auth/Login';
import fireErrorMsg from '../../helpers/firebaseError';
import classes from '../../animation/animation.module.css';

class Settings extends React.Component {

    state = {
        settings: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                    value: '',
                    disabled: true
                },
                editMode: false,
                loading: false,
                successMsg: null,
                errorMsg: null
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                    value: '',
                    disabled: true
                },
                editMode: false,
                loading: false,
                successMsg: null,
                errorMsg: null
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    value: '******',
                    disabled: true
                },
                editMode: false,
                loading: false,
                successMsg: null,
                errorMsg: null
            },
            bio: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Bio',
                    value: '',
                    disabled: true
                },
                editMode: false,
                loading: false,
                successMsg: null,
                errorMsg: null
            },
        },
        loadingMode: false,
        author: null,
        loadingProfileImg: false,
        updateImgSuccessMsg: '',
        updateImgFailMsg: '',
        loginDone: false
    }

    componentDidMount(){
        const userId = store.getState().auth.userId;
        if(!userId) return;
        this.props.fetchAuthor(userId, () => {
            const author = this.props.authors[userId];
            this.setState({author});
            if(!author) return;
            //update value
            const copiedSettings = {...this.state.settings};
            for(let key in this.state.settings){
                if(key in author){
                   this.updateProp(copiedSettings, key, {}, {value: author[key]}); 
                }
            }
            this.setState({settings: copiedSettings});
        });
    }

    updateElement(key, newElem, newConfig){
        const copiedSettings = {...this.state.settings};
        const copiedElement = {...copiedSettings[key], ...newElem};
        const copiedConfig = {...copiedElement.elementConfig, ...newConfig};

        copiedElement.elementConfig = copiedConfig;
        copiedSettings[key] = copiedElement;
        this.setState({settings: copiedSettings});
    }

    updateProp(obj, key, newElem, newConfig){
        const copiedElement = {...obj[key], ...newElem};
        const copiedConfig = {...copiedElement.elementConfig, ...newConfig};
        copiedElement.elementConfig = copiedConfig;
        obj[key] = copiedElement;
    }

    startEdit(index, key){
        const copiedSettings = {...this.state.settings};
        //update current to true
        this.updateProp(copiedSettings, key, {editMode: true, errorMsg: null, successMsg: null}, {disabled: false});
        if(key === 'password') this.updateProp(copiedSettings, key,{}, {value: ''});
        //update other to false
        for(let objKey in this.state.settings){
            if(objKey === key) continue;
            this.updateProp(copiedSettings, objKey, {editMode: false}, {disabled: true});
        }
        //update state
        this.setState({settings: copiedSettings});
    }

    saveSetting(key){
        const elem = {loading: true};
        const config = {};
        this.updateElement(key, elem, config);
        this.setState({loadingMode: true});

        const val = this.state.settings[key].elementConfig.value;
        const data = {};
        data[key] = val;

        if(key === 'email' || key === 'password'){
            this.props.updateEmailOrPass(data, this.state.author.id, () => {
                this.setSuccessUpdateMsg(key);
            }, error => this.setErrorMsg(key, error));            
        }
        if(key === 'name' || key === 'bio'){
            this.props.updateInfo(data, this.state.author.id, () => {
                this.setSuccessUpdateMsg(key);
            }, error => this.setErrorMsg(key, error))
        }


    }

    setErrorMsg(key, error){
        let errorResponse = error.response && error.response.data && error.response.data.error && error.response.data.error.message;
        let errorMsg = fireErrorMsg(errorResponse) || `Fail to update your ${key}`;
        const copiedSettings = {...this.state.settings};
        this.updateProp(copiedSettings, key, {editMode: false, loading: false, errorMsg}, {disabled: true});
        this.setState({loadingMode: false, settings: copiedSettings});
    }

    setSuccessUpdateMsg(key){
        const successMsg = `Your ${key} updated`;
        const copiedSettings = {...this.state.settings};
        this.updateProp(copiedSettings, key, {editMode: false, loading: false, successMsg}, {disabled: true});
        this.setState({loadingMode: false, settings: copiedSettings});
    }

    inputChanged(e, key){
        const elem = {};
        const config = {value: e.target.value};
        this.updateElement(key, elem, config);
    }

    updateProfileImg(src){
        this.props.updateInfo({image: src}, this.state.author.id, () => {
            //success case
            this.setState({updateImgSuccessMsg: 'You Profile image updated'})
        }, () => {
            //fail case
            this.setState({updateImgFailMsg: 'Fail to update your profile image'})
        })
    }

    render(){
        const settings = (
            <section className={`settings ${classes.fadeIn}`}>
                <div className="container">
                    <div className="settings__wrap">
                        <div className="settings__inner">
                            {
                                this.state.author ?
                                Object.entries(this.state.settings)
                                .map((item, index) => 
                                    <Setting  
                                        loadingMode={this.state.loadingMode}
                                        startEdit={()=>this.startEdit(index, item[0])} 
                                        onSave={()=>this.saveSetting(item[0])}
                                        changed={(e)=>this.inputChanged(e,item[0])}
                                        key={item[0]} 
                                        {...item[1]} />
                                )
                                : <div className="text-center"><span className="spinner-border spinner-border"></span></div>
                            }
                            {
                                this.state.author ?
                                <UploadImg 
                                    width="80px" 
                                    height="80px"
                                    src={this.state.author.image}
                                    getLink={src => this.updateProfileImg(src)}>Update profile image</UploadImg>
                                : null
                            }
                            {
                                this.state.updateImgSuccessMsg ?
                                <p className="alert alert-success mt-2">{this.state.updateImgSuccessMsg}</p>
                                : null
                            }
                            {
                                this.state.updateImgFailMsg ?
                                <p className="alert alert-danger mt-2">{this.state.updateImgFailMsg}</p>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
        return (
            !this.state.author || this.state.loginDone ?
            settings : 
            <Login 
                settingsMode 
                author={this.state.author} 
                loginDone={()=>this.setState({loginDone: true})}></Login>
        );
    }
}

const mapStateToProps = state => {
    return {
        authors: state.author.authors
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAuthor: (userId, cb) => dispatch(actions.fetchAuthor(userId, cb)),
        updateEmailOrPass: (newData, id, cb, errorCb) => dispatch(actions.updateEmailOrPass(newData, id, cb, errorCb)),
        updateInfo: (newData, id, cb, errorCb) => dispatch(actions.updateUserInfo(newData, id, cb, errorCb))      
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);