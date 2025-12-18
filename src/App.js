import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Research from './pages/Research';
import Publications from './pages/Publications';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import OpportunityDetail from './pages/OpportunityDetail';
// import Teaching from './pages/Teaching';
import Opportunities from './pages/Opportunities';
import Projects from './pages/Projects';
import './App.css';
import People from './pages/People';
import { routerBasename, withPublicUrl } from './utils/publicUrl';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Check if we're returning from a detail page
    const isReturning = state?.returning;
    
    if (isReturning) {
      // Don't scroll to top - let the page component handle restoration
      return;
    }
    
    // Default: scroll to top for new navigation
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
};

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch(withPublicUrl('/data/people.json'))
      .then(response => response.json())
      .then(data => setPeople(data.people))
      .catch(error => console.error('Error fetching people data:', error));
  }, []);

  return (
    <Router basename={routerBasename()}>
      <ScrollToTop />
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >
        <Navbar />
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/people" element={<People people={people} />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities/:id" element={<OpportunityDetail />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/teaching" element={<Teaching />} /> */}
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
