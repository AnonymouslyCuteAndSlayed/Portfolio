import { useRef, useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import Navbar from "./../../navbar/mainNavbar";
import WatercolorCloudBackground from "../../../assets/background/background";
import AboutExtended from "./about/aboutMePart";
import AboutSkills from "./about/aboutSkills";
import AboutInternships from "./about/aboutInternships";
import AboutCollege from "./about/aboutCollege";
import AboutCTA from "./about/aboutCta";

import "../about-me-part/styles/aboutMain.css";

const AboutMain = () => {
  const nextRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);
  const [activePage, setActivePage] = useState("about");
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const navigateTo = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsBottom(window.scrollY > window.innerHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      nextRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const hearts = [0, 1, 2, 3, 4, 5];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/Cycycutie15",
      icon: FaFacebook,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/yourprofile",
      icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/cyril-inigo-profile",
      icon: FaLinkedin,
    },
    {
      name: "Gmail",
      href: "mailto:cyrilinigo1504@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <div className="about-main-container">
      <WatercolorCloudBackground seed={7} />
      <Navbar activePage={activePage} navigateTo={navigateTo} />

      <main className="about-main-content">
        <section className="about-hero-section">
          <div className="about-hero-text">
            <h1 className="about-hero-title">
              Hi, I'm{" "}
              <span
                className="about-hero-name"
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
              >
                Cy
                {isNameHovered && (
                  <span className="heart-container">
                    {hearts.map((i) => (
                      <span key={i} className={`heart heart-${i}`}>
                        ❤
                      </span>
                    ))}
                  </span>
                )}
              </span>
              ! <br />
              <span className="about-hero-subtitle">A Passionate Frontend Developer and UI/UX Designer</span>
            </h1>
            <p className="about-hero-tagline">
              Making the internet a little more beautiful, one pixel at a time 🌸
            </p>

            <div className="about-hero-socials">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-hero-social-link"
                >
                  <Icon size={18} className="about-hero-social-icon" />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="about-hero-image-wrapper">
            <div
              className="about-hero-image-box"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <img
                src={`${import.meta.env.BASE_URL}pose1.png`}
                alt="Your Name"
                className={`about-hero-image about-hero-image-base ${
                  isImageHovered ? "about-hero-image-hidden" : ""
                }`}
              />
              <img
                src={`${import.meta.env.BASE_URL}pose2.png`}
                alt="Your Name alternate pose"
                className={`about-hero-image about-hero-image-hover ${
                  isImageHovered ? "about-hero-image-visible" : ""
                }`}
              />
            </div>
          </div>
        </section>

        <AboutExtended ref={nextRef} />
        <AboutSkills />
        <AboutInternships />
        <AboutCollege/>
        <AboutCTA />

      </main>
    </div>
  );
};

export default AboutMain;