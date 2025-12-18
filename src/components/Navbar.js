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
            src={withPublicUrl('/assets/logos/lab-logo.svg')}
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
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={handleNavClick('/')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className={`nav-link ${isActive('/news') ? 'active' : ''}`}
              onClick={handleNavClick('/news')}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/people"
              className={`nav-link ${isActive('/people') ? 'active' : ''}`}
              onClick={handleNavClick('/people')}
            >
              People
            </Link>
          </li>
          <li>
            <Link
              to="/publications"
              className={`nav-link ${isActive('/publications') ? 'active' : ''}`}
              onClick={handleNavClick('/publications')}
            >
              Publications
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
              onClick={handleNavClick('/projects')}
            >
              Projects
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
          <li>
            <Link
              to="/opportunities"
              className={`nav-link ${isActive('/opportunities') ? 'active' : ''}`}
              onClick={handleNavClick('/opportunities')}
            >
              Opportunities
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
