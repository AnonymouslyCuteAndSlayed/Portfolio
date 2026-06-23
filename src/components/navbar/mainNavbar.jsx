import "./style/mainNavbar.css";

const Navbar = ({ activePage, navigateTo }) => {
  return (
    <nav>
      <div className="navbar-container">
       <div className="navbar-logo">
          <img src={`${import.meta.env.BASE_URL}/logo.png`} alt="My Logo" className="logo-image" />
          <span className="navbar-logo-text">Cy's Portfolio</span>
        </div>

        <div className="navbar-links">
          <button
            className={`navbar-link ${activePage === "about" ? "active" : ""}`}
            onClick={() => navigateTo("about")}
          >About Me</button>
          <button
            className={`navbar-link ${activePage === "skills" ? "active" : ""}`}
            onClick={() => navigateTo("skills")}
          >Skills & Projects</button>
          <button
            className={`navbar-link ${activePage === "projects" ? "active" : ""}`}
            onClick={() => navigateTo("projects")}
          >Certifications</button>
          <button
            className={`navbar-link ${activePage === "contact" ? "active" : ""}`}
            onClick={() => navigateTo("contact")}
          >Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;