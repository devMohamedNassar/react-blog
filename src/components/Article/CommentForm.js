import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class CommentForm extends React.Component {
	state = {
		value: '',
		submitted: false
	}
	changed(e){
		this.setState({value: e.target.value});
	}
	addComment(){
		this.setState({submitted: true});
		if(!this.state.value) return;

		const date = new Date();
		let comment = {
			body: this.state.value,
			createdAt: date.toJSON(),
			userId: localStorage.getItem('userId'),
			articleId: this.props.articleId
		}
		this.props.addComment(comment, () => {
			this.setState({value: '', submitted: false});
		});
	}
	render(){
		return (
			<div className="comment-form">
				<h2 className="comments__title">Add Comment</h2>
				<textarea 
					value={this.state.value}
					onChange={e=>this.changed(e)}
					className="form-control comment-form__textarea" 
					placeholder="Write your comment here">
				</textarea>
				{
					!this.state.value && this.state.submitted ?
					<p className="alert alert-danger">Write your comment first!</p>
					: null
				}
				{
					this.props.error && this.state.submitted ?
					<p className="alert alert-danger">Fail to add the comment!</p>
					: null
				}
				<button 
					onClick={()=>this.addComment()} 
					disabled={this.props.loading} 
					className="btn btn-success" 
					style={{minWidth: '190px'}}>
					{
						this.props.loading ? 
						<span className="spinner-border spinner-border-sm"></span>
						: <span>Add Comment</span>
					}
				</button>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		loading: state.comment.loading,
		error: state.comment.errorAddComment
	}
};
const mapDispatchToProps = dispatch => {
	return {
		addComment: (comment, cb) => dispatch(actions.addComment(comment, cb))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);