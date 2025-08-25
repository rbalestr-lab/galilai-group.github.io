import "./Teaching.css"

const courses = [
  {
    "id": "CSCI 2952X",
    "name": "Topics in Self-Supervised Learning",
    "years": ["Fall 2024", "Fall 2025"],
    "links": ["", "https://docs.google.com/document/d/1J958C6966RxQ3INqYqmso-cyMfpKnZG25f6COMjj_ac/edit?usp=sharing"]
  },
  {
    "id": "CSCI 2470",
    "name": "Deep Learning",
    "years": ["Spring 2026"],
    "links": [""]
  }
]

const tutorials = [
  {

  }
]

const Teaching = () => {
  return (
      <div className="teaching-container">
        <h1 className='teaching-header'>Teaching</h1>
        <p className="teaching-subtitle">A list of courses and tutorials are listed below.</p>
        <div className="teaching-subcontainer-courses">
          <h3 className='teaching-course-title'>Courses</h3>
          <ul>
            {courses.map(course => {
              const zippedLinks = course.years.map((a, i) => [a, course.links[i]]);

              // After zipping years and links together, we conditionally create href if a link is present or not.
              return (
                <li>
                  {course.id}: {course.name},
                  {zippedLinks.map((item, index) => (
                    <span key={index}>
                      {index === 0 && " "}
                      {item[1] ? (
                        <a href={item[1]} target="_blank" rel="noopener noreferrer">
                          {item[0]}
                        </a>
                      ) : (
                        item[0]
                      )}
                      {index < zippedLinks.length - 1 && ", "}
                    </span>
                  ))}
                </li>
              )
            })}
            </ul>
          </div>
      </div>
  )
}

export default Teaching;
