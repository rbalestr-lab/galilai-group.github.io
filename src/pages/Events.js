import React, {useState} from 'react'

import "./Events.css"

const upcomingEvents = [
  {
    title: "Self-Supervised Learning: The Final Frontier of AI",
    date: "2025-09-15",
    time: "08:00 - 18:00",
    location: "Simons Foundation, New York",
    description: "Join us for an in-depth exploration of self-supervised learning techniques and their implications for the future of artificial intelligence.",
    // category: "AI Research",
    link: "https://www.simonsfoundation.org/event/self-supervised-learning-the-final-frontier-of-ai/",
    // status: "Registration Open"
  },
]

const EventsCard = () => {
  return (
    <div>
    </div>
  )
}

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  return (
    <div className='events-container'>
      <h1 className='events-header'>Events</h1>

      <div className='events-grid'>
        <div className='events-tabs'>
          <button onClick={() => setActiveTab('upcoming')}>
            Upcoming
          </button>
          <button onClick={() => setActiveTab('previous')}>
            Previous
          </button>
        </div>
        {/* <h2>Coming soon!</h2> */}
      </div>
    </div>
  )
}


export default Events;
