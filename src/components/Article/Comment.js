import React from 'react';
import { connect } from 'react-redux';

import AuthorBox from '../UI/AuthorBox';
import * as actions from '../../store/actions';
import ShowIfAuth from '../UI/ShowIfAuth';

const comment = props => {
	return (
		<div className="comment">
			<div className="row">
				<div className="col-md">
					<div className="comment__author">
						<AuthorBox 
							userId={props.userId} 
							date={props.createdAt}>
						</AuthorBox>								
					</div>
					<div className="comment__content">
						<p>{props.body}</p>
					</div>				
				</div>
				<ShowIfAuth showIfAuthor={props.userId} >
					<div className="col-md-auto">
						<button 
							onClick={props.removeComment.bind(null, props.id, props.articleId)}
							disabled={props.loading}
							className="btn btn-sm btn-danger mt-3">Delete</button>	
					</div>					
				</ShowIfAuth>
			</div>

		</div>
	);
}

const mapStateToProps = state => {
	return {
		loading: state.comment.loadingRemoveComment
	}
};
const mapDispatchToProps = dispatch => {
	return {
		removeComment: (id, articleId) => {
			if(window.confirm('Are you sure you want to delete this comment')) dispatch(actions.removeComment(id, articleId));
		} 
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(comment);