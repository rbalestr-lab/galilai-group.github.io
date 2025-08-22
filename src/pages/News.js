import React, {useEffect, useState} from 'react';
import './News.css';

const News = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('/data/news.json')
      .then(res => res.json())
      .then(setPosts)
      .catch(e => console.log(e));
  }, []);

  if(!posts) return (<div>Loading...</div>);

  const sortedPosts = posts.news.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="news-container">
      <h1 className="news-header">News</h1>
      <div className="news-listings">
        {sortedPosts.map((post, index) => (
          <div key={index} className="news-post">
            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.description}</p>
              <div className="post-meta">
                <span className="post-updated">Last updated on {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
                <span className="post-read-time">• 1 min read</span>
              </div>
            </div>
            {post.image && (
              <div className="post-image">
                <img src={post.image} alt={post.title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
