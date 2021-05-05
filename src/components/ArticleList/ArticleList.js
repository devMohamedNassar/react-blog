import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import ArticlePreview from './ArticlePreview';
import Spinner from '../UI/Spinner';
import Alert from '../UI/Alert';

class ArticleList extends Component {
	state = {
		noArticles: false
	}
	componentDidMount(){
		this.props.getArticles(this.props.filter, data => {
			if(!Object.keys(data).length) this.setState({noArticles: true});
		});			
	}
	render(){

		const articleListContent = (
			<div className={this.props.notCenter ? null : "row"}>
				{
					this.props.notCenter ? null : <div className="offset-lg-2"></div>
				}
				<div className={this.props.notCenter ? null : "col-lg-8"}>
				{
					this.props.filter && this.props.filter.userId ? 
					<p className="posted-by">Articles posted by {this.props.filter.username}</p>
					: null
				}
				{
					this.props.articles.map(
						(article, index) => <ArticlePreview article={article} key={article.id} delay={0.2*index} />
					)
				}
				</div>
			</div>
		);

		return (
			<div className="article-list">
				<div className={this.props.notCenter ? null : "container"}>
					<Spinner show={!this.props.articles.length && !this.props.error && !this.state.noArticles} />
					<Alert type="danger" show={this.props.error}>Failed to load articles</Alert>
					{ this.props.articles.length ? articleListContent : null}
					<Alert type="success" show={this.state.noArticles} className="mb-5">There is no articles</Alert>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		articles: state.article.articles,
		error: state.article.error
	}
};
const mapDispatchToState = dispatch => {
	return {
		getArticles: (filter, cb) => dispatch(actions.getArticles(filter, cb))
	}
};

export default connect(mapStateToProps, mapDispatchToState)(ArticleList);