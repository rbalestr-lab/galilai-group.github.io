import React, { useMemo, useState } from 'react';
import './People.css';
import { withPublicUrl } from '../utils/publicUrl';

const People = ({ people }) => {
  const [clickedCard, setClickedCard] = useState(null);
  // Define categories for grouping people
  const categories = useMemo(() => [
    { title: "Faculty", key: "faculty" },
    { title: "Visiting Researchers", key: "visiting-researcher" },
    { title: "Postdoctoral Scholars", key: "postdoc" },
    { title: "PhDs", key: "phd" },
    { title: "Masters and Undergrads", key: "Masters & Undergrads" },
    { title: "Alumni", key: "alumni" }
  ], []);

  const availableCategories = useMemo(() => (
    categories.filter(category =>
      category.key !== 'faculty' && people.some(person => person.role.includes(category.key))
    )
  ), [categories, people]);

  // Find Randall separately to render as floating profile
  const randallPerson = useMemo(() => 
    people.find(p => p.name === 'Randall Balestriero' && p.role.includes('faculty')),
    [people]
  );

  return (
    <div className="people-container">
      {/* Render Randall's floating profile separately */}
      {randallPerson && (
        <div 
          className="person-card randall-card"
          onMouseLeave={() => setClickedCard(null)}
        >
          {randallPerson.personalWebsite ? (
            <a 
              href={randallPerson.personalWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="person-image-link"
              onClick={(e) => {
                setClickedCard(`faculty-randall`);
                e.target.blur();
              }}
            >
              <div className="person-image-circle">
                <img src={withPublicUrl(randallPerson.image)} alt={randallPerson.name} />
              </div>
            </a>
          ) : (
            <div className="person-image-circle">
              <img src={withPublicUrl(randallPerson.image)} alt={randallPerson.name} />
            </div>
          )}
          <div className="person-details">
            <h3>
              {randallPerson.personalWebsite ? (
                <a 
                  href={randallPerson.personalWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    setClickedCard(`faculty-randall`);
                    e.target.blur();
                  }}
                >
                  {randallPerson.name}
                </a>
              ) : (
                randallPerson.name
              )}
            </h3>
            <p className="role">{randallPerson.role_title}</p>
            {randallPerson.now && (
              <p className='role'>
                Now: {randallPerson.now}
              </p>
            )}
          </div>
        </div>
      )}

      {availableCategories.map((category) => {
        // Filter people based on their role
        const filteredPeople = people.filter(person => person.role.includes(category.key));

        if (filteredPeople.length === 0) return null;

        return (
          <div 
            key={category.key} 
            className="people-section"
          >
            <h2 id={category.key} className="section-title">{category.title}</h2>
            <div
              className={`people-grid ${filteredPeople.length === 3 ? 'people-grid-three' : ''}`}
            >
              {filteredPeople.map((person, index) => {
                const personLink = person.personalWebsite || person.linkedin || null;
                const cardKey = `${category.key}-${index}`;
                const isClicked = clickedCard === cardKey;
                return (
                  <div 
                    key={index} 
                    className={`person-card ${isClicked ? 'card-clicked' : ''}`}
                    onMouseLeave={() => setClickedCard(null)}
                  >
                    {personLink ? (
                      <a 
                        href={personLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="person-image-link"
                        onClick={(e) => {
                          setClickedCard(cardKey);
                          e.target.blur();
                        }}
                      >
                        <div className="person-image-circle">
                          <img src={withPublicUrl(person.image)} alt={person.name} />
                        </div>
                      </a>
                    ) : (
                      <div className="person-image-circle">
                        <img src={withPublicUrl(person.image)} alt={person.name} />
                      </div>
                    )}
                    <div className="person-details">
                      <h3>
                        {personLink ? (
                          <a 
                            href={personLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              setClickedCard(cardKey);
                              e.target.blur();
                            }}
                          >
                            {person.name}
                          </a>
                        ) : (
                          person.name
                        )}
                      </h3>
                      <p className="role">{person.role_title}</p>
                      {person.now && (
                        <p className='role'>
                          {category.key === 'alumni' ? 'Now: ' : ''}{person.now}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default People;

