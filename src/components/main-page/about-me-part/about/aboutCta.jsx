import { useState } from "react";
import { Download, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../styles/aboutCTA.css";

const AboutCTA = ({
  cvSrc = `${import.meta.env.BASE_URL}Inigo_CyrilAnne_CV.pdf`,
  githubHref = "https://github.com/AnonymouslyCuteAndSlayed",
  linkedinHref = "https://www.linkedin.com/in/cyril-inigo-profile",
  myEmail = "cyrilinigo1504@gmail.com",
}) => {
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();

    const subject = `Portfolio Contact from ${senderEmail || "a visitor"}`;
    const body = `${message}\n\n---\nReply to: ${senderEmail}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      myEmail
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="about-cta-section">
      <div className="about-cta-decor about-cta-decor-left">✦</div>
      <div className="about-cta-decor about-cta-decor-right">✦</div>

      <div className="about-cta-container">
        <div className="about-cta-grid">
          {/* LEFT COLUMN */}
          <div className="about-cta-left">
            <span className="about-cta-badge">Open to work</span>

            <h2 className="about-cta-title">Let's create something lovely together</h2>

            <p className="about-cta-text">
              I'm currently seeking opportunities as a Frontend Developer. If
              you'd like to collaborate or discuss an opportunity, feel free to
              get in touch. 🌸
            </p>

            <form className="about-cta-form" onSubmit={handleSend}>
              <input
                type="email"
                required
                placeholder="Your email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="about-cta-input"
              />
              <textarea
                required
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="about-cta-textarea"
                rows={4}
              />
              <button type="submit" className="about-cta-button about-cta-button-primary border-0">
                <Send size={18} />
                Send Message
              </button>
            </form>

            <div className="about-cta-buttons">
              <a href={cvSrc} download className="about-cta-button about-cta-button-secondary">
                <Download size={18} />
                Download CV
              </a>

              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-button about-cta-button-secondary"
              >
                <FaGithub size={18} />
                GitHub
              </a>

              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-button about-cta-button-secondary"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="about-cta-right">
            <div
              className="about-cta-image-wrapper"
            >
              <div className="about-cta-image-blob" />
              <img
                src={`${import.meta.env.BASE_URL}coffee.png`}
                alt="Cyril Anne Inigo"
                className={`about-cta-image about-cta-image-base ${
                  isImageHovered ? "about-cta-image-hidden" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AboutCTA;