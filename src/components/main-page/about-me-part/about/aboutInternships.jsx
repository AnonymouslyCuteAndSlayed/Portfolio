import { Briefcase, Calendar, MapPin } from "lucide-react";
import "../styles/aboutInternships.css";

const internships = [
  {
    company: "Stronghold Insurance Company Incorporated",
    role: "IT Support and Frontend Developer",
    duration: "February 2025 — May 2025",
    location: "Buendia Branch",
    tasks: [
      "Handled encoding and data entry of insurance documents and records",
      "Assisted in organizing and managing physical and digital paperwork",
      "Designed and developed the official website for the Buendia Branch",
    ],
  },
  {
    company: "Weepay Payment Processing Corporation",
    role: "UI/UX Designer and Frontend Developer",
    duration: "August 2025 — October 2025",
    tasks: [
      "Built and designed the company website and a project calculator web application from the ground up",
      "Took ownership of frontend development and UI/UX design, crafting responsive and user-friendly interfaces",
      "Developed using React, CSS, and Bootstrap for consistent and modern UI components",
      "Managed source code and collaborated on the team repository using Microsoft Azure Repos",
      "Contributed to backend integration with light C# work, bridging the gap between design and functionality",
    ],
    stack: ["React", "CSS", "Bootstrap", "C#", "Azure Repos"],
  },
];

const AboutInternships = () => {
  return (
    <section className="about-internships-section">
      <div className="about-internships-container">
        <div className="about-internships-header">
          <span className="about-internships-eyebrow">Experience</span>
          <h2 className="about-internships-title">Internships & Journey</h2>
          <p className="about-internships-bio">
            A few of the places I've learned, built, and grown as a developer
            and designer along the way.
          </p>
        </div>

        <div className="about-internships-timeline">
          {internships.map((item, index) => (
            <div className="about-internships-item" key={item.company + item.duration}>
              <div className="about-internships-marker">
                <span className="about-internships-marker-dot">{index + 1}</span>
                {index !== internships.length - 1 && (
                  <span className="about-internships-marker-line" />
                )}
              </div>

              <div className="about-internships-card">
                <div className="about-internships-card-top">
                  <div className="about-internships-card-icon-wrapper">
                    <Briefcase size={18} className="about-internships-card-icon" />
                  </div>
                  <div className="about-internships-card-heading">
                    <h3 className="about-internships-role">{item.role}</h3>
                    <p className="about-internships-company">{item.company}</p>
                  </div>
                </div>

                <div className="about-internships-meta">
                  <span className="about-internships-meta-item">
                    <Calendar size={14} className="about-internships-meta-icon" />
                    {item.duration}
                  </span>
                  {item.location && (
                    <span className="about-internships-meta-item">
                      <MapPin size={14} className="about-internships-meta-icon" />
                      {item.location}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="about-internships-description">{item.description}</p>
                )}

                {item.tasks && item.tasks.length > 0 && (
                  <ul className="about-internships-tasks">
                    {item.tasks.map((task) => (
                      <li className="about-internships-task" key={task}>
                        {task}
                      </li>
                    ))}
                  </ul>
                )}

                {item.stack && item.stack.length > 0 && (
                  <div className="about-internships-stack">
                    {item.stack.map((tech) => (
                      <span className="about-internships-stack-chip" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutInternships;