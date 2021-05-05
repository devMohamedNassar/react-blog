import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleList from '../ArticleList/ArticleList';
import Spinner from '../UI/Spinner';
import * as actions from '../../store/actions';

class Profile extends Component {

	componentDidMount(){
		const authorId = this.props.match.params.id;
		const cond = Object.keys(this.props.authors).some(key => this.props.authors[key].id === authorId);
		if(!cond){
			this.props.fetchAuthorData(authorId);
		}
	}

	getAuthorById(id){
		let author = {};
		for(let key in this.props.authors){
			if(this.props.authors[key].id === id) author = this.props.authors[key];
		}
		return author;
	}

	render(){

		const id = this.props.match.params.id;
		const author = this.getAuthorById(id);

		let authorInfoContent = (
			<div className="author-info__wrap">
				<img className="author-info__img" src={author.image} alt={author.name} />
				<h3 className="author-info__name">{author.name}</h3>
				<p className="author-info__bio">{author.bio}</p>
			</div>
		);

		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<div className="author-info">
						{ this.props.loading ? <Spinner show /> : authorInfoContent }
						</div>
					</div>
					<div className="col-lg-8">
						{
							author.userId ?
							<ArticleList notCenter filter={{userId: author.userId, username: author.name}} />
							: null
						}
						
					</div>
				</div>
			</div>
		);		
	}

}

const mapStateToProps = state => {
	return {
		loading: state.author.profileLoading,
		authors: state.author.authors
	}
};
const mapDispatchToProps = dispatch => {
	return {
		fetchAuthorData: (id) => dispatch(actions.fetchAuthorByFirebaseId(id))
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);