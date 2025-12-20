import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './NewsDetail.css';
import { withPublicUrl } from '../utils/publicUrl';

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user came from home page
  const fromHome = location.state?.from === 'home';

  useEffect(() => {
    fetch(withPublicUrl('/data/news.json'))
      .then(res => res.json())
      .then(data => {
        const item = data.news.find(news => news.id === id);
        setNewsItem(item);
        setLoading(false);
      })
      .catch(e => {
        console.error('Error fetching news:', e);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="news-detail-container"><div className="loading">Loading...</div></div>;
  }

  if (!newsItem) {
    return (
      <div className="news-detail-container">
        <div className="error-message">
          <h2>News not found</h2>
          <Link to="/news">Back to News</Link>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    const scrollKey = fromHome ? 'homeScroll' : 'newsScroll';
    // Mark as returning and pass scroll key
    return {
      returning: true,
      scrollKey: scrollKey
    };
  };

  return (
    <div className="news-detail-container">
      <Link 
        to={fromHome ? "/" : "/news"} 
        className="back-link"
        state={handleBackClick()}
      >
        ← {fromHome ? "Back to Home" : "Back to News"}
      </Link>
      
      <article className="news-detail">
        <header className="news-detail-header">
          <h1>{newsItem.title}</h1>
          <div className="news-meta">
            <time>{new Date(newsItem.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</time>
          </div>
        </header>

        {newsItem.image && (
          <div className="news-detail-image">
            <img src={withPublicUrl(newsItem.image)} alt={newsItem.title} />
          </div>
        )}

        <div className="news-detail-content">
          {newsItem.description.split('\n\n').map((paragraph, index) => (
            <p 
              key={index} 
              className="news-description"
              dangerouslySetInnerHTML={{ __html: paragraph.trim() }}
            />
          ))}
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;


