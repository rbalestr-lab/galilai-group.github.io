import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';
import './News.css';
import { withPublicUrl } from '../utils/publicUrl';

const Home = () => {
  const newsRef = useRef(null);
  const location = useLocation();
  const [newsData, setNewsData] = useState(null);
  const [opportunitiesData, setOpportunitiesData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fetch news data
    fetch(withPublicUrl('/data/news.json'))
      .then(response => response.json())
      .then(data => setNewsData(data))
      .catch(error => console.error('Error fetching news data:', error));
    
    // Fetch opportunities data
    fetch(withPublicUrl('/data/opportunities.json'))
      .then(response => response.json())
      .then(data => setOpportunitiesData(data))
      .catch(error => console.error('Error fetching opportunities data:', error));
  }, []);

  // Auto-play video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
      
      // Add error handling
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        console.error('Video source:', videoRef.current?.src);
      });
      
      videoRef.current.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });
    }
  }, []);

  // Restore scroll position if returning from detail page
  useEffect(() => {
    if (location.state?.returning && location.state?.scrollKey === 'homeScroll') {
      const savedScroll = sessionStorage.getItem('homeScroll');
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll, 10));
          sessionStorage.removeItem('homeScroll');
        }, 100);
      }
    }
  }, [location.state]);

  // Save scroll position before navigating
  const handleLinkClick = (e, path) => {
    sessionStorage.setItem('homeScroll', window.scrollY.toString());
  };

  if (!newsData || !opportunitiesData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* Homepage Video Section */}
      <div className="home-group-photo">
        <div className="video-container">
          <video
            ref={videoRef}
            className="homepage-video"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Galilai Group video"
          >
            <source src={withPublicUrl('/assets/videos/galilai_broll_v3.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Intro Section */}
      <div className="home-text">
        <h1 className="publication-heading">Welcome to Galilai Group</h1>
        <p className="home-intro-body">
        At Galilai Group, we study both the theory and practice of deep learning. We use theory to guide practice, and use practical observations to inform new theory.
        </p>
      </div>

      {/* News Section */}
      <section className="news-section" ref={newsRef}>
        <div className="section-header">
          <h2 className="publication-heading">News</h2>
        </div>
        <div className="news-content">
          <div className="news-listings card-list home-news-list">
            <ul>
              {newsData.news
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((item, index) => (
                  <li key={item.id || index} className="news-post">
                    <div className="post-content-wrapper">
                      <h2 className="post-title">
                        <Link 
                          to={`/news/${item.id}`} 
                          state={{ from: 'home' }}
                          onClick={(e) => handleLinkClick(e, `/news/${item.id}`)}
                        >
                          {item.title}
                        </Link>
                      </h2>
                      <div className="post-meta">
                        <span className="post-updated">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className="post-description"
                          dangerouslySetInnerHTML={{
                            __html: item.description.split('\n\n')[0]
                          }}
                        />
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="opportunities-section">
        <div className="section-header">
          <h2 className="publication-heading">{opportunitiesData.sectionTitle}</h2>
        </div>
        <div className="opportunities-content">
          <div className="news-listings card-list home-opportunities-list">
            <ul>
              {opportunitiesData.items
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((item, index) => (
                  <li key={item.id || index} className="news-post opportunity-post">
                    <div className="post-content-wrapper">
                      <h2 className="post-title">
                        <Link 
                          to={`/opportunities/${item.id}`} 
                          state={{ from: 'home' }}
                          onClick={(e) => handleLinkClick(e, `/opportunities/${item.id}`)}
                        >
                          {item.title}
                        </Link>
                      </h2>
                      <div className="post-meta">
                        <span className="post-updated">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className="post-description"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
