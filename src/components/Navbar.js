import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';
import { withPublicUrl } from '../utils/publicUrl';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandActive, setBrandActive] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    const fromHome = location.state?.from === 'home';
    
    if (path === '/') {
      // Home is active if on home page OR if on a detail page and came from home
      return location.pathname === '/' || (fromHome && (location.pathname.startsWith('/news/') || location.pathname.startsWith('/opportunities/')));
    }
    
    // If user came from home, don't highlight News or Opportunities on detail pages
    if (fromHome) {
      if (path === '/news' && location.pathname.startsWith('/news/')) {
        return false;
      }
      if (path === '/opportunities' && location.pathname.startsWith('/opportunities/')) {
        return false;
      }
    }
    
    // Special case: Opportunities page includes opportunity detail pages (only if not from home)
    if (path === '/opportunities') {
      return location.pathname === '/opportunities' || (!fromHome && location.pathname.startsWith('/opportunities/'));
    }
    
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleNavClick = (path) => (event) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Entire brand (logo + title) is now clickable */}
        <Link
          to="/"
          className={`navbar-brand ${brandActive ? 'brand-active' : ''}`}
          onClick={(event) => {
            setBrandActive(false);
            handleNavClick('/')(event);
          }}
          onMouseEnter={() => setBrandActive(true)}
          onMouseLeave={() => setBrandActive(false)}
          onFocus={() => setBrandActive(true)}
          onBlur={() => setBrandActive(false)}
        >
          <img
            src={withPublicUrl('/assets/logos/lab-logo-white.svg')}
            alt="Galilai Group Logo"
            className="navbar-logo"
          />
          <span className="brand-title">Galilai Group</span>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX className="menu-close-icon" /> : <FiMenu className="menu-open-icon" />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={handleNavClick('/')}
            >
              <span className="nav-link-text">Home</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/news') ? 'active' : ''}`}>
            <Link
              to="/news"
              className={`nav-link ${isActive('/news') ? 'active' : ''}`}
              onClick={handleNavClick('/news')}
            >
              <span className="nav-link-text">News</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/people') ? 'active' : ''}`}>
            <Link
              to="/people"
              className={`nav-link ${isActive('/people') ? 'active' : ''}`}
              onClick={handleNavClick('/people')}
            >
              <span className="nav-link-text">People</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/publications') ? 'active' : ''}`}>
            <Link
              to="/publications"
              className={`nav-link ${isActive('/publications') ? 'active' : ''}`}
              onClick={handleNavClick('/publications')}
            >
              <span className="nav-link-text">Publications</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
            <Link
              to="/projects"
              className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
              onClick={handleNavClick('/projects')}
            >
              <span className="nav-link-text">Projects</span>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/teaching"
              className={`nav-link ${isActive('/teaching') ? 'active' : ''}`}
              onClick={handleNavClick('/teaching')}
            >
              Teaching
            </Link>
          </li> */}
          <li className={`nav-item ${isActive('/opportunities') ? 'active' : ''}`}>
            <Link
              to="/opportunities"
              className={`nav-link ${isActive('/opportunities') ? 'active' : ''}`}
              onClick={handleNavClick('/opportunities')}
            >
              <span className="nav-link-text">Opportunities</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

