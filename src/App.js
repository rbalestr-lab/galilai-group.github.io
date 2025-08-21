import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Research from './pages/Research';
import Publications from './pages/Publications';
import News from './pages/News';
import Contact from './pages/Contact';
import './App.css';
import Group from './pages/Group';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('/data/people.json')
      .then(response => response.json())
      .then(data => setPeople(data.people))
      .catch(error => console.error('Error fetching people data:', error));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >
        <Navbar />
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />}></Route>
          <Route path="/publications" element={<Publications />} />
          <Route path="/group" element={<Group people={people} />} />
          <Route path="/news" element={<News />}></Route>
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
