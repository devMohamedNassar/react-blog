import React from 'react';
import { Link } from 'react-router-dom';

import AuthorBox from '../UI/AuthorBox';
import { excerpt } from '../../helpers/excerpt';
import classes from '../../animation/animation.module.css';

const articlePreview = props => {
	return (
		<article className={classes.fadeDown} style={{animationDelay: `${props.delay}s`}}>
			<div className="row no-gutters">
				<div className="col-md-4">
					<div className="article__img-wrap">
						<img 
							className="article__img" 
							src={props.article.image} 
							alt={props.article.title} />
					</div>
				</div>
				<div className="col-md-8">
					<div className="article__wrap">
						<h2 className="article__title">
							<Link to={`/articles/${props.article.id}`}>
								{props.article.title}
							</Link>
						</h2>
						<p 
							className="article__excerpt">
							{excerpt(props.article.body)}
						</p>
						<div className="article__footer">
							<AuthorBox 
								userId={props.article.userId} 
								date={props.article.createdAt} />
							<Link 
								to={`/articles/${props.article.id}`} 
								className="article__read-more-btn btn btn-dark">
								read more
							</Link>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default articlePreview;