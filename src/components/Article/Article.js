import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';

import * as actions from '../../store/actions';
import AuthorBox from '../UI/AuthorBox';
import Comments from './Comments';
import CommentForm from './CommentForm';
import ShowIfAuth from '../UI/ShowIfAuth';
import Spinner from '../UI/Spinner';
import classes from '../../animation/animation.module.css';

class Article extends Component {

	componentDidMount(){
		this.props.getArticle(this.props.match.params.id, data => {
			if(!data) this.props.history.replace('/');
		});
	}

	onEdit(id){
		this.props.history.push('/editor/' + id);
	}

	onDelete(id){
		let conf = window.confirm('Are you sure you want to delete this article');
		if(!conf) return;
		this.props.deleteArticle(id, () => {
			this.props.history.push('/');
		});
	}

	render(){
		const content = (
			<section className={`single-article ${classes.fadeIn}`}>
				<div className="container">
					<div className="single-article__main">
						<div className="single-article__wrap">
							<div className="single-article__header">
								<div className="single-article__info">
									<h1 className="single-article__title">{this.props.article.title}</h1>
									<AuthorBox 
										userId={this.props.article.userId} 
										date={this.props.article.createdAt}>
									</AuthorBox>
								</div>
								<ShowIfAuth showIfAuthor={this.props.article.userId}>
									<div className="single-article__options">
										<button 
											onClick={()=>this.onEdit(this.props.article.id)}
											className="btn btn-success btn-sm"
											>Edit</button>
										<button 
											onClick={()=>this.onDelete(this.props.article.id)}
											className="btn btn-danger btn-sm"
											>Delete</button>
									</div>
								</ShowIfAuth>									
							</div>
						</div>
						<img 
							src={this.props.article.image} 
							alt={this.props.article.title} />
						<div className="single-article__wrap">
							<div className="single-article__content">
								<div ref={elem => elem && (elem.innerHTML = marked(this.props.article.body))}></div>
							</div>
						</div>
						<div className="single-article__wrap">
							{
								this.props.comments.length ?
								<Comments commentList={this.props.comments} />
								: null
							}
							<ShowIfAuth>
								<CommentForm articleId={this.props.article.id} />								
							</ShowIfAuth>
							<ShowIfAuth hideIfAuth>
								<h2 className="comments__title">You must be <Link to="/login" className="text-primary">logged in</Link> to post a comment</h2>
							</ShowIfAuth>
						</div>
					</div>			
				</div>
			</section>
		);
		return(
			Object.keys(this.props.article).length ? content : <Spinner show={true} style={{marginTop: '30px'}} />
		);
	}

}

const mapStateToProps = state => {
	return {
		article: state.article.singleArticle,
		comments: state.comment.comments
	}
};

const mapDispatchToProps = dispatch => {
	return {
		getArticle: (id, cb) => dispatch(actions.getArticle(id, cb)),
		deleteArticle: (id, cb) => dispatch(actions.deleteArticle(id, cb))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);