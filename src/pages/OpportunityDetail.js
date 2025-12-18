import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './OpportunityDetail.css';
import { withPublicUrl } from '../utils/publicUrl';

const OpportunityDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user came from home page
  const fromHome = location.state?.from === 'home';

  useEffect(() => {
    fetch(withPublicUrl('/data/opportunities.json'))
      .then(res => res.json())
      .then(data => {
        const item = data.items.find(entry => entry.id === id);
        setOpportunity(item);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching opportunity data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="opportunity-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="opportunity-detail-container">
        <div className="error-message">
          <h2>Opportunity not found</h2>
          <Link to="/opportunities">Back to Opportunities</Link>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    const scrollKey = fromHome ? 'homeScroll' : 'opportunitiesScroll';
    // Mark as returning and pass scroll key
    return {
      returning: true,
      scrollKey: scrollKey
    };
  };

  return (
    <div className="opportunity-detail-container">
      <Link 
        to={fromHome ? "/" : "/opportunities"} 
        className="back-link"
        state={handleBackClick()}
      >
        ← {fromHome ? "Back to Home" : "Back to Opportunities"}
      </Link>
      <article className="opportunity-detail">
        <header className="opportunity-detail-header">
          <h1>{opportunity.title}</h1>
          <div className="opportunity-meta">
            <time>
              {new Date(opportunity.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </header>

        <div className="opportunity-detail-content">
          <p>{opportunity.description}</p>
          {opportunity.content && opportunity.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default OpportunityDetail;

