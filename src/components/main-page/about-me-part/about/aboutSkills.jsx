import { Code2, Server, Database, Wrench } from "lucide-react";
import "../styles/aboutSkills.css";

const AboutSkills = () => {
  const skillGroups = [
    {
      icon: Code2,
      title: "Frontend",
      skills: [
        "React",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      icon: Server,
      title: "Backend",
      skills: ["Node.js", "Express", "Firebase", "REST APIs"],
    },
    {
      icon: Database,
      title: "Database",
      skills: ["MySQL", "MongoDB"],
    },
    {
      icon: Wrench,
      title: "Tools",
      skills: ["Git", "GitHub", "VS Code", "Azure DevOps", "Figma", "Vite", "npm"],
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
              {skills.map((skill) => (
                <span key={skill} className="about-skills-pill">
                  {skill}
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