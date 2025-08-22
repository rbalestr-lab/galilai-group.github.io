/* eslint-disable no-multi-str */
// import React, {useEffect, useState} from 'react';
import './Research.css'

const Research = () => {
  const projects = [
    {
      "title": "Self-Supervised Learning Theory and Applications",
      "description": "We study the foundations of self-supervised learning, aiming to understand \
                    why and how these methods succeed. Our work bridges rigorous theory with practical algorithms, \
                    enabling scalable AI systems that learn from raw, unlabeled data and drive advances in vision, \
                    speech, and multimodal applications.",
      "image": "/assets/images/ssl-overview.png",
    },
    {
      "title": "Large Language Models",
      "description": "We explore the capabilities and limitations of large language models, focusing on their \
                      training dynamics, emergent behaviors, and adaptability across tasks. By combining theoretical \
                      insights with practical evaluation, our research seeks to improve the efficiency, reliability, \
                      and interpretability of these models in real-world deployments.",
      "image": "/assets/images/transformer-architecture.png",
    }
  ]
  
  return (
    <div className="research-container">
      <h1 className="research-header">Current Research</h1>
      <div className="research-projects">
        {projects.map(project => (
          <div key={project.title} className="research-topic-container">
            <div className='research-project-content'>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>

            <img className="research-project-image"
              src={project.image} 
              alt={project.title}
              onError={e => {
                e.target.src = '/assets/images/fallback_image.png'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Research;
