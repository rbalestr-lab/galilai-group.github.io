import React, { useRef, useCallback, useState, useEffect } from 'react';
import './Home.css';
import { Award, Users, Microscope, Briefcase, DollarSign } from 'lucide-react';

const Home = () => {
  const newsRef = useRef(null);
  const [homeData, setHomeData] = useState(null);

  const scrollToNews = useCallback(() => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    fetch('/data/homeData.json')
      .then(response => response.json())
      .then(data => setHomeData(data))
      .catch(error => console.error('Error fetching home data:', error));
  }, []);

  if (!homeData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* Video Section */}
      <div className="video-container">
        <video autoPlay loop muted className="home-video">
          <source src="assets/videos/homepage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Home Text */}
      <div className="home-text">
        <h1>Welcome to Balestriero Lab</h1>
        <p>
          At Balestriero Lab, we are dedicated to advancing the frontiers of biomedical engineering and neuroscience.
          Our research focuses on developing innovative solutions to improve human health and well-being.
        </p>
        <div className="scroll-indicator" onClick={scrollToNews}>
          <span></span>
          <div className="arrow"></div>
        </div>
      </div>

      {/* News Section */}
      <section className="news-section" ref={newsRef}>
        <div className="section-header">
          <Award size={40} className="section-icon" />
          <h2>{homeData.news.sectionTitle}</h2>
        </div>
        <div className="news-content">
          <div className="news-item">
            <h3>{homeData.news.title}</h3>
            <ul>
              {homeData.news.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section className="funding-section">
        <div className="section-header">
          <DollarSign size={40} className="section-icon" />
          <h2>{homeData.funding.sectionTitle}</h2>
        </div>
        <div className="funding-content">
          <p>{homeData.funding.content}</p>
          <div className="funding-logos">
            {homeData.funding.logos.map((logo, index) => (
              <img key={index} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      </section>

      {/* Diversity Section */}
      <section className="diversity-section">
        <div className="section-header">
          <Users size={40} className="section-icon" />
          <h2>{homeData.diversity.sectionTitle}</h2>
        </div>
        <div className="diversity-content">
          <p>{homeData.diversity.content}</p>
          <div className="diversity-values">
            {homeData.diversity.values.map((value, index) => (
              <div key={index} className="value-item">{value}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="opportunities-section">
        <div className="section-header">
          <Briefcase size={40} className="section-icon" />
          <h2>{homeData.opportunities.sectionTitle}</h2>
        </div>
        <div className="opportunities-content">
          <div className="research-areas">
            {homeData.opportunities.areas.map((area, index) => (
              <div key={index} className="area-card">
                <Microscope size={30} />
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <a href={area.link} className="btn">{area.linkText}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
