import { Code2, Server, Database, Wrench, Gem } from "lucide-react";
import "../styles/aboutSkills.css";

const AboutSkills = () => {
  const skillGroups = [
    {
      icon: Code2,
      title: "Frontend",
      skills: [
        { name: "React" },
        { name: "JavaScript" },
        { name: "TypeScript", learning: true },
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "Tailwind CSS", learning: true },
        { name: "Bootstrap" },
      ],
    },
    {
      icon: Server,
      title: "Backend",
      skills: [
        { name: "Node.js" },
        { name: "Express" },
        { name: "REST APIs" },
      ],
    },
    {
      icon: Database,
      title: "Database",
      skills: [{ name: "MySQL" }, { name: "MongoDB" }],
    },
    {
      icon: Wrench,
      title: "Tools",
      skills: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "VS Code" },
        { name: "Azure DevOps" },
        { name: "Figma" },
        { name: "Vite" },
        { name: "npm" },
      ],
    },
  ];

  return (
    <div className="about-skills">
      <h3 className="about-skills-title">Skills & Tech Stack</h3>

      <div className="about-skills-grid">
        {skillGroups.map(({ icon: Icon, title, skills }) => (
          <div key={title} className="about-skills-category">
            <div className="about-skills-category-header">
              <div className="about-skills-category-icon-wrapper">
                <Icon size={18} className="about-skills-category-icon" />
              </div>
              <h4 className="about-skills-category-title">{title}</h4>
            </div>

            <div className="about-skills-pills">
              {skills.map(({ name, learning }) => (
                <span key={name} className="about-skills-pill-wrapper">
                  <span className="about-skills-pill">{name}</span>
                  {learning && (
                    <span className="about-skills-learning-badge">
                      <Gem size={11} className="about-skills-learning-icon" />
                      <span className="about-skills-learning-tooltip">
                        Still learning this!
                      </span>
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSkills;