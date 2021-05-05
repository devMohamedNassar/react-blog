import React from 'react';

import Comment from './Comment';

const comments = props => {
	return (
		<section className="comments">
			<h2 className="comments__title">Comments</h2>
			<div className="comments__wrap">
				{
					props.commentList.map(comment => <Comment {...comment} key={comment.id} />)
				}
			</div>
		</section>
	);
};

export default comments;