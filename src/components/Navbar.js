import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Entire brand (logo + title) is now clickable */}
        <Link to="/" className="navbar-brand" onClick={toggleMenu}>
          <img
            src="/assets/logos/brown-logo.png"
            alt="Borton Lab Logo"
            className="navbar-logo"
          />
          <span className="brand-title">Balestriero Lab</span>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX className="menu-close-icon" /> : <FiMenu className="menu-open-icon" />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/research" className='nav-link' onClick={toggleMenu}>
              Research
            </Link>
          </li>
          <li>
            <Link to="/publications" className="nav-link" onClick={toggleMenu}>
              Publications
            </Link>
          </li>
          <li>
            <Link to="/group" className="nav-link" onClick={toggleMenu}>
              Group
            </Link>
          </li>
          <li>
            <Link to="/news" className='nav-link' onClick={toggleMenu}>
              News
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
