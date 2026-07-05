import { Phone, ScrollText } from "lucide-react";
import "./style/mainNavbar.css";

const PHONE_NUMBER = "+639123456789";
const FACEBOOK_URL = "https://facebook.com/yourprofile";

const Navbar = ({ activePage, navigateTo }) => {
  const handleContactClick = () => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      window.location.href = `tel:${PHONE_NUMBER}`;
    } else {
      window.open(FACEBOOK_URL, "_blank", "noopener,noreferrer");
    }
  };

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

        <div className="navbar-actions">
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download="Cy_Resume.pdf"
            className="navbar-resume-btn"
          >
            <ScrollText size={16} className="navbar-contact-icon me-2" />
            Download Resume</a>

          <button
            className="navbar-contact-btn"
            onClick={handleContactClick}
          >
            <Phone size={16} className="navbar-contact-icon" />
            <span>Contact Me</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;