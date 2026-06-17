import React, { useState } from "react";
import Navbar from "./navbar/mainNavbar";
import About from "./main-page/about-me-part/aboutMain";
import Skills from "./main-page/skills-part/skillsMain";
import "../shared/styles/main.css";

function Main() {
  const [activePage, setActivePage] = useState("about");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("left");
  const [hasNavigated, setHasNavigated] = useState(false);  

  const navigateTo = (page) => {
    if (page === activePage || animating) return;

    const order = ["about", "skills", "projects", "contact"];
    const currentIndex = order.indexOf(activePage);
    const nextIndex = order.indexOf(page);
    setDirection(nextIndex > currentIndex ? "left" : "right");
    setHasNavigated(true);                                  

    setAnimating(true);
    setTimeout(() => {
      setActivePage(page);
      setAnimating(false);
      window.scrollTo({ top: 0 });
    }, 400);
  };

  const getSlideClass = () => {
    if (animating) return `slide-out-${direction}`;
    if (!hasNavigated) return "no-transition";       
    return direction === "left" ? "slide-in-right" : "slide-in-left";
  };

  return (
    <div>
      <Navbar activePage={activePage} navigateTo={navigateTo} />
      <main style={{ paddingTop: "64px", overflow: "hidden" }}>
        <div className={`page-slide ${getSlideClass()}`}>
          {activePage === "about"    && <About />}
          {activePage === "skills"   && <Skills />}
          {activePage === "projects" && <div>Projects coming soon</div>}
          {activePage === "contact"  && <div>Contact coming soon</div>}
        </div>
      </main>
    </div>
  );
}

export default Main;