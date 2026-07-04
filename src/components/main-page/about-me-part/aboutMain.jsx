import { useRef, useState, useEffect } from "react";
import { CircleChevronDown, CircleChevronUp } from 'lucide-react';
import AboutRight from "./aboutRight";
import "./styles/aboutMain.css";
import "./styles/aboutMain/aboutMainOjt.css";

const About = () => {
  const nextRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);

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

  return (
    <>
      <div className="about-wrapper">
        <div className="about-container">
          <div className="about-left">
            <img src={`${import.meta.env.BASE_URL}my.png`} className="about-image" alt="about" />
          </div>
          <AboutRight />

          <button className="scroll-btn" onClick={handleClick}>
            {isBottom ? <CircleChevronUp size={30} /> : <CircleChevronDown size={30} />}
          </button>
        </div>

        <div className="about-fill">
          <div className="about-fill-inner">
            <div className="about-fill-image-placeholder">
              <img src={`${import.meta.env.BASE_URL}cy_pic.jpg`} alt="BSIT student" className="about-fill-img" /> 
            </div>
            <div className="about-fill-text">
              <h2>Bachelor of Science in <span>Information Technology</span></h2>
              <p>
                I'm currently pursuing a BSIT degree, where I explore the intersection of
                software development, systems design, and modern web technologies. My studies
                have equipped me with a strong foundation in programming, networking, and
                problem-solving — skills I bring into every project I build.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-friends">
        <div className="about-friends-inner">
          <div className="about-friends-text">
            <h2>The People Who <span>Made It Worth It</span></h2>
            <p>
              College would not have been the same without the people who showed up —
              through late-night cramming sessions, group projects that somehow always
              came together at the last minute, and every moment in between. My friends
              and blockmates have been my constant support system, my sounding board,
              and my reason to keep going. These are the people I grew with, laughed
              with, and built memories with throughout my years in college.
            </p>
          </div>
          <div className="about-friends-image-placeholder">
            <img src={`${import.meta.env.BASE_URL}friends.jpg`} alt="Friends and blockmates" className="about-friends-img" />
          </div>
        </div>
      </div>

      <div className="about-ojt">
        <div className="about-ojt-header">
          <h2>On-the-Job <span>Training</span></h2>
          <p>Real-world experience that shaped how I work and think.</p>
        </div>

        {/* 1st OJT */}
        <div className="about-ojt-card">
          <div className="about-ojt-card-inner">
            <div className="about-ojt-image-placeholder">
              <img src={`${import.meta.env.BASE_URL}stronghold.jpg`} alt="Stronghold OJT" className="about-ojt-img" />
            </div>
            <div className="about-ojt-info">
              <div className="about-ojt-tag">1st OJT</div>
              <h3>Stronghold Insurance Company</h3>
              <p className="about-ojt-sub">Buendia Branch</p>
              <ul className="about-ojt-tasks">
                <li>Handled encoding and data entry of insurance documents and records</li>
                <li>Assisted in organizing and managing physical and digital paperwork</li>
                <li>Designed and developed the official website for the Buendia Branch</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2nd OJT */}
        <div className="about-ojt-card">
          <div className="about-ojt-card-inner">
            <div className="about-ojt-image-placeholder">
              <img src={`${import.meta.env.BASE_URL}ojt2.jpg`} alt="2nd OJT - WEEPAY" className="about-ojt-img" />
            </div>
            <div className="about-ojt-info">
              <div className="about-ojt-tag about-ojt-tag--second">2nd OJT</div>
              <h3>WEEPAY</h3>
              <p className="about-ojt-sub">Frontend Developer & UI/UX Designer</p>
              <ul className="about-ojt-tasks">
                <li>Built and designed the company website and a project calculator web application from the ground up</li>
                <li>Took ownership of frontend development and UI/UX design, crafting responsive and user-friendly interfaces</li>
                <li>Developed using React, CSS, and Bootstrap for consistent and modern UI components</li>
                <li>Managed source code and collaborated on the team repository using Microsoft Azure Repos</li>
                <li>Contributed to backend integration with light C# work, bridging the gap between design and functionality</li>
              </ul>
              <div className="about-ojt-stack">
                <span>React</span>
                <span>CSS</span>
                <span>Bootstrap</span>
                <span>C#</span>
                <span>Azure Repos</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="about-bottom" ref={nextRef} />
    </>
  );
};

export default About;