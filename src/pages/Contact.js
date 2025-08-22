import React, { useEffect, useState } from 'react';
import './Contact.css';
import { Microscope, Briefcase, Twitter, Linkedin, Github } from 'lucide-react';

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.378 2H21.5L14.872 10.406L22 21.5H15.935L11.262 14.962L5.936 21.5H2.814L9.91 12.528L3 2H9.221L13.467 8.028L18.378 2ZM17.254 19.836H18.883L7.392 3.609H5.675L17.254 19.836Z"
      fill="currentColor"
    />
  </svg>
);

const Contact = () => {

  const [homeData, setHomeData] = useState(null);
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
    <div className="contact-page">
      {/* Section 1: Google Form Contact Option */}
      <section className="contact-google-form">
        <h1>Get in Touch</h1>
        <p>
          We’d love to hear from you! Use our online form to send us your questions or comments, and we’ll get back to you ASAP.
        </p>
        <a
          href="https://forms.gle/example"
          target="_blank"
          rel="noopener noreferrer"
          className="google-form-button"
        >
          Open Contact Form
        </a>
      </section>

      {/* Section 2: Research Opportunities */}
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

      {/* Section 3: Location / Google Maps */}
      <section className="map-section">
        <h2>Our Location</h2>
        <div className="map-content">
          <div className="map-container">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.062467248616!2d-71.3995786!3d41.826953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4453b5275469d%3A0xc48a812b6cfb273!2sDepartment%20of%20Computer%20Science!5e0!3m2!1sen!2sin&hl=en"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="map-details">
            <h3>Visit Us</h3>
            <p>
              453 CIT, 115 Waterman St, Providence, RI 02906<br />
              Phone: +1 (555) 123-4567<br />
              Email: contact@example.com
            </p>
            <p>
              Our office is in the heart of Brown University's campus, easily accessible by public transit and with ample parking.
            </p>
            <button onClick={() => window.open('https://www.google.com/maps/place/Department+of+Computer+Science/@41.826953,-71.3995786,17z/data=!3m1!4b1!4m6!3m5!1s0x89e4453b5275469d:0xc48a812b6cfb273!8m2!3d41.826953!4d-71.3995786!16s%2Fg%2F1hhwdn5zz?entry=ttu&g_ep=EgoyMDI1MDIyNS4wIKXMDSoASAFQAw%3D%3D&hl=en', '_blank')}>
              Open in Google Maps
            </button>
          </div>
        </div>
      </section>

      <div className="developer-watermark">
        <p className="dev-title">Meet Our Developers</p>
        <div className="dev-info-container">
          <div className="dev-info">
            <span className="dev-name">Kyle Lam</span>
            <div className="dev-social">
              <a
                href="https://twitter.com"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          
        </div>
      </div>

    </div>
  );
};

export default Contact;
