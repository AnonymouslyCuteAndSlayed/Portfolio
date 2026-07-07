/* eslint-disable no-unused-vars */
import { forwardRef } from "react";
import { Coffee, Code2, Palette, Heart } from "lucide-react";
import "../styles/aboutMePart.css";

const AboutExtended = forwardRef((_, ref) => {
  const highlights = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "Building clean, responsive interfaces with React and modern CSS.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing experiences that feel intuitive, playful, and human.",
    },
    {
      icon: Coffee,
      title: "Always Learning",
      description: "Constantly exploring new tools, frameworks, and design trends.",
    },
    {
      icon: Heart,
      title: "Detail-Oriented",
      description: "Sweating the small stuff so the big picture feels effortless.",
    },
  ];

  const quickFacts = [
    { label: "Based in", value: "Philippines" },
    { label: "Focus", value: "Frontend & UI/UX" },
    { label: "Currently", value: "Open to opportunities" },
    { label: "Fun fact", value: "Coffee-powered coder ☕" },
  ];

  return (
    <section ref={ref} className="about-extended-section">
      <div className="about-extended-container">
        <div className="about-extended-header">
          <span className="about-extended-eyebrow">Get to know me</span>
          <h2 className="about-extended-title">A little more about me</h2>
          <p className="about-extended-bio">
            I'm a frontend developer and UI/UX designer who loves turning ideas
            into interfaces people actually enjoy using. I care about the
            little details — smooth transitions, thoughtful spacing, and
            colors that feel just right. When I'm not coding, I'm probably
            sketching new design ideas or falling down a rabbit hole of CSS
            animations.
          </p>
        </div>

        <div className="about-extended-facts">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="about-extended-fact-card">
              <span className="about-extended-fact-label">{fact.label}</span>
              <span className="about-extended-fact-value">{fact.value}</span>
            </div>
          ))}
        </div>

        <div className="about-extended-highlights">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="about-extended-highlight-card">
              <div className="about-extended-highlight-icon-wrapper">
                <Icon size={22} className="about-extended-highlight-icon" />
              </div>
              <h3 className="about-extended-highlight-title">{title}</h3>
              <p className="about-extended-highlight-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

AboutExtended.displayName = "AboutExtended";

export default AboutExtended;