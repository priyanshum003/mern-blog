import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

const IndexPage = () => {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then(posts => {
        setPosts(posts);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <>
      {error && <div className="error">{error}</div>}
      {posts.length > 0 && posts.map(post => {
        return <Post {...post} key={post._id} />
      })}
    </>
  )
}

export default IndexPage;