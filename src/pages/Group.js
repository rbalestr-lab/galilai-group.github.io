import React, {useState, useEffect, useRef, useMemo} from 'react';
import './Group.css';
import { LinkedinIcon, GlobeIcon } from 'lucide-react';

const Group = ({ people }) => {
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef({});

  // Define categories for grouping people
  const categories = useMemo(() => [
    { title: "Principal Investigator", key: "pi" },
    { title: "Visiting Researchers", key: "visiting-researcher" },
    { title: "Postdoctoral Scholars", key: "postdoc" },
    { title: "PhDs", key: "phd" },
    { title: "Masters and Undergrads", key: "Masters & Undergrads" },
    { title: "Alumni", key: "alumni" }
  ], []);

  useEffect(() => {
    const observers = [];
    
    // Create intersection observer for each section
    categories.forEach(category => {
      const section = sectionRefs.current[category.key];
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(category.key);
            }
          },
          {
            rootMargin: '-20% 0px -60% 0px', // Adjust these values to fine-tune when sections become active
            threshold: 0.1
          }
        );
        
        observer.observe(section);
        observers.push(observer);
      }
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [people, categories]); // Re-run when people data changes

  return (
    <div className="group-container">
      <div className="group-header">
        <h1>Our Team</h1>
        <p>Innovative researchers pushing the boundaries of self-supervised learning.</p>
      </div>

      <div className="group-sidebar-tracker">
        {categories.map(category => (
          <a 
            key={category.key} 
            href={`#${category.key}`}
            style={{
                color: activeSection === category.key ? '#2c3e50' : '#666',
                borderLeft: `3px solid ${activeSection === category.key ? '#2c3e50' : 'transparent'}`,
                fontWeight: activeSection === category.key ? 'bold' : 'normal',
              }}
          >
            {category.title}
          </a>
        ))}
      </div>

      {categories.map((category) => {
        // Filter people based on their role
        const filteredPeople = people.filter(person => person.role.includes(category.key));

        if (filteredPeople.length === 0) return null;

        return (
          <div 
            key={category.key} 
            ref={el => sectionRefs.current[category.key] = el}
            className="group-section"
          >
            <h2 id={category.key} className="section-title">{category.title}</h2>
            <div className="people-grid">
              {filteredPeople.map((person, index) => (
                <div key={index} className="person-card">
                  <div className="person-image-circle">
                    <img src={person.image} alt={person.name} />
                    <div className="person-overlay">
                      <div className="person-socials">
                        {person.personalWebsite && (
                          <a href={person.personalWebsite} target="_blank" rel="noopener noreferrer">
                            <GlobeIcon size={20} />
                          </a>
                        )}
                        {person.linkedin && (
                          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                            <LinkedinIcon size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="person-details">
                    <h3>{person.name}</h3>
                    <p className="role">{person.role_title}</p>
                    <p className='role'>{person.now}</p>
                    <p className="research-interests">{person.researchInterests}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Group;
