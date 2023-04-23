import React from 'react'
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ _id,title, summary, cover, content, createdAt, author }) => {

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={`${process.env.REACT_APP_API_URL}/${cover}`} />
                </Link>
            </div>

            <div className="text">
                <Link to={`/post/${_id}`}>
                    <h2> {title} </h2>
                </Link>
                <p className="info">
                    <a className="author" href='#'>{author.username} </a>
                    <time> {formatISO9075(new Date(createdAt))} </time>
                </p>
                <p className="summary"> {summary} </p>
            </div>
        </div>
    )
}

export default Post