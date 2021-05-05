import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../UI/Input';
import * as actions from '../../store/actions';
import Spinner from '../UI/Spinner';
import { checkValidity } from '../../helpers/validation';
import Alert from '../UI/Alert';
import classes from '../../animation/animation.module.css';

class Editor extends Component {

	state = {
		article: {},
		submitted: false,
		loading: false,
		editMode: false,
		imageData: '',
		formReady: false,
		editorForm: {
			title: {
				elementType: 'input',
				elementConfig: {
					value: '',
					type: 'text',
					placeholder: 'Article Title'
				},
				validation: {
					require: true
				},
				valid: false,
				className: "form-control-lg"
			},
			body: {
				elementType: 'textarea',
				elementConfig: {
					value: '',
					placeholder: 'Article Content(you can use markdown)'
				},
				validation: {
					require: true
				},
				valid: false,
				className: "form-control-lg"
			},
			image: {
				elementType: 'input',
				elementConfig: {
					value: '',
					type: 'file',
					accept: "image/*",
					placeholder: "upload post image"
				},
				validation: {
					require: true
				},
				valid: false
			},
		}
	};

	componentDidMount(){
		const id = this.props.match.params.id;
		const articleLength = Object.keys(this.state.article).length;
		if(id && !articleLength){
			this.setState({editMode: true});
			this.props.getArticle(id, () => {
				this.updateAllControlValues();
			});
		}	
	}

	isValidForm(){
		let isValid = true;
		for(let control in this.state.editorForm){
			if(!isValid) break;
			isValid = checkValidity(this.state.editorForm[control]);
		}
		return isValid;
	}

	onChangedInput(e, element){
		const newEditorForm = {...this.state.editorForm};
		const newElement = {...newEditorForm[element]};		
		const newElementConfig = {...newElement.elementConfig};

		newElementConfig.value = typeof e === 'string' ? e : e.target.value;
		newElement.elementConfig = newElementConfig;
		newEditorForm[element] = newElement;

		this.setState({editorForm: newEditorForm});
	}

	updateAllControlValues(){
		const newEditorForm = {...this.state.editorForm};
		if(!Object.keys(this.props.article).length) return;
		for(let key in this.state.editorForm){
			const newElement = {...newEditorForm[key]};
			const newElementConfig = {...newElement.elementConfig};
			newElementConfig.value = this.props.article[key];
			newElement.elementConfig = newElementConfig;
			newEditorForm[key] = newElement;
		}
		this.setState({editorForm: newEditorForm});
	}

	submitEditorForm(e){
		e && e.preventDefault();
		this.setState({...this.state, submitted: true});
		if(!this.isValidForm()) return;

		this.setState({formReady: true, loading: true});
		if(this.state.imageData === 'start') return;

		const formValue = {};
		for(let control in this.state.editorForm){
			const controlVal = this.state.editorForm[control];
			formValue[control] = controlVal.elementConfig.value;
		}

		if(!this.state.editMode){
			const currentDate = new Date();
			const article = {
				...formValue,
				createdAt: currentDate.toJSON()
			}
			this.props.addArticle(article, () => {
				this.props.history.push('/');
			});
		}else{
			const article = {...this.props.article, ...formValue};
			this.props.updateArticle(article, () => {
				this.props.history.push('/');
			});
		}
	}

	render(){
		let content = (
			<div className="container">
			<div className="row">
				<div className="offset-lg-2"></div>
				<div className="col-lg-8">
					<form onSubmit={(e)=>this.submitEditorForm(e)}>
						{
							Object.keys(this.state.editorForm)
							.map(key => (
								<React.Fragment key={key}>
									<Input changed={e => this.onChangedInput(e, key)} {...this.state.editorForm[key]} />
									<Alert show={this.state.submitted && !checkValidity(this.state.editorForm[key])}>this filed required</Alert>
								</React.Fragment>
							))
						}

						<button 
							className="btn btn-success btn-lg editor-btn"
							disabled={this.state.loading}>
							<span>{this.state.editMode ? 'Update' : 'Add'} Article</span>
							{
								this.state.loading ?
								<span className="spinner-border spinner-border-sm"></span>
								: null
							}
						</button> 
					</form>				
				</div>
			</div>
		</div>
		);

		if(this.state.editMode && !Object.keys(this.props.article).length) content = <Spinner show={true} />;

		return (
			<section className={`editor ${classes.fadeIn}`}>
			{
				content
			}
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		article: state.article.singleArticle
	}
};
const mapDispatchToProps = dispatch => {
	return {
		addArticle: (article, cb) => dispatch(actions.addArticle(article, cb)),
		getArticle: (id, callBack) => dispatch(actions.getArticle(id, callBack)),
		updateArticle: (article, cb) => dispatch(actions.updateArticle(article, cb))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);