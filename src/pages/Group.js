import React from 'react';
import './Group.css';
import { LinkedinIcon, GlobeIcon } from 'lucide-react';

const Group = ({ people }) => {
  return (
    <div className="group-container">
      <div className="group-header">
        <h1>Our Team</h1>
        <p>Innovative researchers pushing the boundaries of biomedical engineering and neuroscience</p>
      </div>
      <div className="people-grid">
        {people.map((person, index) => (
          <div key={index} className="person-card">
            <div className="person-image-circle">
              <img src={person.image} alt={person.name} />
              <div className="person-overlay">
                <div className="person-socials">
                  {person.personalWebsite && (
                    <a 
                      href={person.personalWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <GlobeIcon size={20} />
                    </a>
                  )}
                  {person.linkedin && (
                    <a 
                      href={person.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="person-details">
              <h3>{person.name}</h3>
              <p className="role">{person.role}</p>
              <p className="research-interests">{person.researchInterests}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;