import { GraduationCap, Target } from "lucide-react";

import "../styles/aboutCollege.css";

const AboutCollege = ({
  university = "Rizal Technological University (RTU)",
  location = "Mandaluyong City, Philippines",
  graduationDate = "July 2026",
  degree = "Bachelor of Science in Computer Science",
  coursework = [
    "Frontend Development",
    "UI/UX Design",
    "Web Development",
    "Human-Computer Interaction",
  ],
  photoSrc = `${import.meta.env.BASE_URL}gradpic.jpg`,
  imagePosition = "side",
  careerGoals = "I'm looking to grow as a frontend developer while deepening my UI/UX design skills through real-world product work. I want to join a team where design and code meet, and keep exploring new tools, frameworks, and AI-assisted workflows along the way.",
}) => {
  return (
    <>
      <section
        className={`about-college-section about-college-section-${imagePosition}`}
      >
        <div className="about-college-image-wrapper">
          <div className="about-college-image-box">
            <img
              src={photoSrc}
              alt={`${university} campus or graduation photo`}
              className="about-college-image"
            />
          </div>
        </div>

        <div className="about-college-text">
          <span className="about-college-eyebrow">
            <GraduationCap size={18} className="about-college-eyebrow-icon" />
            Education
          </span>

          <h2 className="about-college-university">{university}</h2>
          <p className="about-college-location">{location}</p>

          <p className="about-college-degree">{degree}</p>
          <p className="about-college-graduation">
            Graduating <span className="about-college-graduation-date">{graduationDate}</span>
          </p>

          {coursework?.length > 0 && (
            <div className="about-college-coursework">
              <p className="about-college-coursework-label">Relevant Coursework</p>
              <div className="about-college-coursework-pills">
                {coursework.map((course) => (
                  <span key={course} className="about-college-coursework-pill">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {careerGoals && (
        <section className="about-career-section">
          <span className="about-career-eyebrow">
            <Target size={18} className="about-career-eyebrow-icon" />
            Looking Ahead
          </span>
          <h2 className="about-career-title">Career Goals</h2>
          <p className="about-career-text">{careerGoals}</p>
        </section>
      )}
    </>
  );
};

export default AboutCollege;