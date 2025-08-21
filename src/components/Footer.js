import React from 'react';
import './Footer.css';
import { Twitter, Linkedin, Github } from 'lucide-react';

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.378 2H21.5L14.872 10.406L22 21.5H15.935L11.262 14.962L5.936 21.5H2.814L9.91 12.528L3 2H9.221L13.467 8.028L18.378 2ZM17.254 19.836H18.883L7.392 3.609H5.675L17.254 19.836Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        {/* Empty cell for left-side symmetry on desktop */}
        <div className="footer-left"></div>
        <div className="footer-text">
          © {new Date().getFullYear()} Balestriero Lab. All Rights Reserved.
        </div>
        <div className="footer-social">
        <a
            href="https://twitter.com/randall_balestr"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/randallbalestriero/"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/rbalestr-lab"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
