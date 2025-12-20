import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './News.css';
import { withPublicUrl } from '../utils/publicUrl';

const News = () => {
  const location = useLocation();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(withPublicUrl('/data/news.json'))
      .then(res => res.json())
      .then(setPosts)
      .catch(e => console.log(e));
  }, []);

  // Restore scroll position if returning from detail page
  useEffect(() => {
    if (location.state?.returning && location.state?.scrollKey === 'newsScroll') {
      const savedScroll = sessionStorage.getItem('newsScroll');
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll, 10));
          sessionStorage.removeItem('newsScroll');
        }, 100);
      }
    }
  }, [location.state]);

  // Save scroll position before navigating
  const handleLinkClick = () => {
    sessionStorage.setItem('newsScroll', window.scrollY.toString());
  };

  if(!posts) return (<div>Loading...</div>);

  const sortedPosts = posts.news.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="news-container">
      <div className="news-grid">
          {sortedPosts.map((post, index) => (
                  <Link 
            key={index}
                    to={`/news/${post.id}`}
                    onClick={handleLinkClick}
            className={`news-card ${post.thumbnail_image ? 'news-card-with-image' : ''}`}
            style={post.thumbnail_image ? { backgroundImage: `url(${withPublicUrl(post.thumbnail_image)})` } : {}}
          >
            <div className="news-card-content">
              <h2 className="news-card-title">{post.title}</h2>
              {post.summary && (
                <p className="news-card-summary">{post.summary}</p>
              )}
                </div>
          </Link>
          ))}
      </div>
    </div>
  );
}

export default News;

