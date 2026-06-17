import "./styles/aboutRight.css";

const techStack = ["NODE", "React", "HTML", "CSS", "Bootstrap", "Express", "MongoDB"];

const skills = [
  "FRONTEND DEVELOPMENT", "BACKEND DEVELOPMENT",
  "TOOLS AND TECHNOLOGIES", "DESIGN & CREATIVE SKILLS"
];

const strengths = [
  "CORE SOFT SKILLS", "WORK & COLLABORATION",
  "GROWTH & WORK ETHIC", "DEVELOPER-FOCUSED SOFT SKILLS"
];

const AboutRight = () => {
  return (
    <div className="about-right">

      <div className="about-heading">
        <h1>Hello, I'm <span className="highlight">CY</span>!</h1>
        <h2><span className="highlight">Frontend</span> Developer and <span className="highlight">UI/UX</span> Designer</h2>
      </div>

      <p className="about-bio">
        <span className="quote-mark">"</span>
        I develop scalable and user-focused web applications using Node.js, React, and HTML and CSS,
        with a strong emphasis on clean design and a growing focus on animation and 3D.
        <span className="quote-mark">"</span>
      </p>

      <div className="about-section">
        <span className="section-label">Tech Stack:</span>
        <div className="tag-group">
          {techStack.map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
      </div>

      <div className="about-section">
        <span className="section-label">Skills:</span>
        <div className="tag-group">
          {skills.map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
      </div>

      <div className="about-section">
        <span className="section-label">Professional Strengths:</span>
        <div className="tag-group">
          {strengths.map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutRight;