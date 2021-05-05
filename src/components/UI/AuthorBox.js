import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import dateFormat from '../../helpers/dateFormat';

class AuthorBox extends Component {

	componentDidMount(){
		if(!this.props.authors[this.props.userId]){
			this.props.fetchAuthor(this.props.userId);			
		}
	}

	render(){
		let author = {};
		if(this.props.authors[this.props.userId]) author = this.props.authors[this.props.userId];
		return (
			<div className="article__author">
				<div className="article__author-img-wrap">
					<img className={`article__author-img ${!author.image ? 'opacity-zero' : ''}`} 
						src={`${author.image || ''}`} 
						alt={author.name}/>
				</div>
				<div className="article__author-wrap">
					<h4 className="article__author-name">
						<Link to={`/profile/${author.id}`}>
							{author.name}
						</Link>
					</h4>
					<span 
						className="article__date">{dateFormat(this.props.date)}
					</span>
				</div>	
			</div>
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
		fetchAuthor: (userId) => dispatch(actions.fetchAuthor(userId))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorBox);