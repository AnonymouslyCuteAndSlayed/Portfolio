import { useState, useEffect, Fragment} from "react";
import "./styles/skillsMain.css";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <img src={`${import.meta.env.BASE_URL}monitor.png`} alt="Frontend" className="sp-cat-icon-img" />,
    desc: "UI & interaction",
    skills: ["React", "JavaScript", "HTML", "CSS", "Bootstrap"],
    projects: [
      {
        emoji: "💼",
        name: "Portfolio Website",
        desc: "Personal portfolio built with React, featuring smooth page transitions and responsive layout.",
        techs: ["React", "CSS", "JavaScript"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}portfolio_ss.png`,
      },
      {
        emoji: "🎫",
        name: "Hrizolve UI",
        desc: "User interface design for the Hrizolve: Ticketing system platform.",
        techs: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}Hrizolve_ss.png`,
      },
      {
        emoji: "",
        name: "WEEPAY: Project Calculator UI",
        desc: "UI/UX design for a project budgeting tool that simplifies cost estimation and financial planning.",
        techs: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}weepay_proj.png`,
      },
      {
        emoji: "🎮",
        name: "Late night fly with Lena UI",
        desc: "A casual side-scrolling game where players guide Lena through obstacles and aim for the highest score.",
        techs: ["python", "pygame"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}game_lena.png`,
      },
      {
        emoji: "🧙‍♂️",
        name: "Attack on Titangel UI",
        desc: "UI design for a fantasy defense game featuring a wizard tasked with protecting a princess from enemy invasions.",
        techs: ["python", "pygame"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}titangel.png`,
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: <img src={`${import.meta.env.BASE_URL}design.png`} alt="Design" className="sp-cat-icon-img" />,
    desc: "UI/UX & visuals",
    skills: ["Figma", "UI/UX Design", "Responsive Design", "Wireframing"],
    projects: [
      {
        emoji: "💼",
        name: "Portfolio Website",
        desc: "Personal portfolio built with React, featuring smooth page transitions and responsive layout.",
        techs: ["Figma", "UI/UX Design"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}portfolio_ss.png`,
      },
      {
        emoji: "",
        name: "WEEPAY: Project Calculator UI",
        desc: "UI/UX design for a project budgeting tool that simplifies cost estimation and financial planning.",
        techs: ["Figma", "UI/UX Design"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}weepay_proj.png`,
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <img src={`${import.meta.env.BASE_URL}backend.png`} alt="Backend" className="sp-cat-icon-img" />,
    desc: "APIs & logic",
    skills: ["C#", ".NET", "REST APIs", "SQL"],
    projects: [
      {
        emoji: "",
        name: "WEEPAY: Project Calculator UI",
        desc: "Backend logic for a project budgeting tool, handling cost computation and financial data management using C# and SQL.",
        techs: ["C#", "SQL"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}weepay_proj.png`,
      },
       {
        emoji: "🎫",
        name: "Hrizolve: Ticketing System Backend",
        desc: "RESTful backend for a ticketing platform, managing ticket lifecycle and data persistence with MongoDB, Express, and Node.",
        techs: ["MongoDB", "Express", "Node"],
        status: "done",
        previewImg: `${import.meta.env.BASE_URL}Hrizolve_ss.png`,
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: <img src={`${import.meta.env.BASE_URL}tools.png`} alt="Tools" className="sp-cat-icon-img" />,
    desc: "Dev workflow",
    skills: ["Git", "Azure Repos", "VS Code", "Postman"],
    projects: [
      {
        emoji: "💼",
        name: "Github",
        desc: "Used Git for version control and collaboration on various projects, enabling efficient code management and teamwork.",
        techs: ["Git", "Azure Repos"],
        previewImg: `${import.meta.env.BASE_URL}git.png`,
      },
      {
        emoji: "🔧",
        name: "Azure DevOps",
        desc: "Utilized Azure DevOps for project management, CI/CD pipelines, and code repositories, streamlining development processes and team collaboration.",
        techs: ["Azure DevOps"],
        previewImg: `${import.meta.env.BASE_URL}azure.png`,
      }
    ],
  },
];

const Skills = () => {
  const [activeId, setActiveId] = useState("frontend");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 860);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const active = categories.find((c) => c.id === activeId);

  const handleCategoryClick = (id) => {
    setActiveId(id);
    setSelectedProject(null);
  };

  const handleProjectClick = (proj) => {
    setSelectedProject((prev) => (prev?.name === proj.name ? null : proj));
  };

  const renderPreviewBody = () => (
    <>
      <div className="sp-preview-img">
        <img
          src={selectedProject.previewImg}
          alt={`${selectedProject.name} preview`}
        />
        <span className={`sp-preview-badge ${selectedProject.status}`}>
          {selectedProject.status === "done" && "Completed"}
        </span>
      </div>

      <div className="sp-preview-title">{selectedProject.name}</div>
      <div className="sp-preview-desc">{selectedProject.desc}</div>

      <p className="sp-section-label">Built with</p>
      <div className="sp-preview-techs">
        {selectedProject.techs.map((t) => (
          <span className="sp-preview-tech" key={t}>{t}</span>
        ))}
      </div>
    </>
  );

  return (
    <div className="sp-wrapper">
      <div className="sp-header">
        <h1 className="skills-title">Skills <em>&</em> Projects</h1>
        <p className="skills-description">Click a category to see the tools I use and the projects I've built with them.</p>
      </div>

      <div className="sp-body">
        <nav className="sp-sidebar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`sp-cat-btn ${activeId === cat.id ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <span className="sp-cat-icon">{cat.icon}</span>
              <span className="sp-cat-label">
                <strong>{cat.label}</strong>
                <span>{cat.desc}</span>
              </span>
            </button>
          ))}
        </nav>

        <div className="sp-folder">
          <img
            key={activeId}
            src={`${import.meta.env.BASE_URL}ribbon.png`}
            alt="Profile"
            className="sp-folder-avatar"
          />
          <div className="sp-detail" key={activeId}>
            <div className={`sp-detail-inner ${selectedProject && !isMobile ? "has-preview" : ""}`}>

              <div className="sp-main-col">
                <div className="sp-detail-header">
                  <div className="sp-detail-icon">{active.icon}</div>
                  <div>
                    <h2>{active.label}</h2>
                    <p>{active.skills.length} skills · {active.projects.length} projects</p>
                  </div>
                </div>

                <p className="sp-section-label">Technologies</p>
                <div className="sp-tags">
                  {active.skills.map((s) => (
                    <span className="sp-tag" key={s}>{s}</span>
                  ))}
                </div>

                <p className="sp-section-label">Projects</p>
                {active.projects.length === 0 ? (
                  <div className="sp-empty">
                    <div className="sp-empty-icon">🚧</div>
                    <p>No projects listed yet for this category.</p>
                  </div>
                ) : (
                  <div className="sp-projects-grid">
                    {active.projects.map((proj) => (
                      <Fragment key={proj.name}>
                        <div
                          className={`sp-project-card ${selectedProject?.name === proj.name ? "selected" : ""}`}
                          onClick={() => handleProjectClick(proj)}
                        >
                          <div className="sp-project-top">
                            <span className="sp-project-emoji">{proj.emoji}</span>
                            <span className={`sp-project-status ${proj.status}`}>
                              {proj.status === "done" && "Completed"}
                            </span>
                          </div>
                          <h4>{proj.name}</h4>
                          <p>{proj.desc}</p>
                          <div className="sp-project-techs">
                            {proj.techs.map((t) => (
                              <span className="sp-project-tech" key={t}>{t}</span>
                            ))}
                          </div>
                        </div>

                        {isMobile && selectedProject?.name === proj.name && (
                          <div className="sp-preview-inline">
                            <div className="sp-preview-close">
                              <button onClick={() => setSelectedProject(null)}>✕ close</button>
                            </div>
                            {renderPreviewBody()}
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>

              {selectedProject && !isMobile && (
                <div className="sp-preview-panel">
                  <div className="sp-preview-close">
                    <button onClick={() => setSelectedProject(null)}>✕ close</button>
                  </div>
                  {renderPreviewBody()}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;