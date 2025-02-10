import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";
import SocialIcons from "./SocialIcons.js";
import ImageComponent from "./IntroImg.js";
import ShiningButton from "./Badge.js";
import NavBar from "./NavBar.js";

const Intro = () => {
  const [isInView, setIsInView] = useState(false);
  const introRef = useRef(null);
  const location = useLocation();

  const checkIfInView = () => {
    if (introRef.current) {
      const rect = introRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const inView = rect.top <= viewHeight && rect.bottom >= 0;
      console.log(`Rect top: ${rect.top}, Rect bottom: ${rect.bottom}, View height: ${viewHeight}, In view: ${inView}`);
      setIsInView(inView);
    }
  };

  useEffect(() => {
    const handleScroll = () => checkIfInView();
    window.addEventListener("scroll", handleScroll);
    checkIfInView(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <div id="intro" ref={introRef}>
      <NavBar />
      <div className="image-container">
        <ImageComponent />
      </div>
      <div className="typist-container">
        <ShiningButton>ABOUT</ShiningButton>

        {isInView && (
          <Typist avgTypingDelay={100}>
            <span className="intro-name">DevOps Engineer</span>
            <Typist.Backspace count={15} delay={600} />
            <span className="intro-name">Problem Solver &#x1F609;</span>
            <Typist.Backspace count={20} delay={600} />
            <span className="intro-name">Cloud Architect</span>
            <Typist.Backspace count={17} delay={600} />
            <span className="intro-name">Cyber Security Engineer</span>
            <Typist.Backspace count={19} delay={600} />
            <span className="intro-name">Full Stack Developer</span>
          </Typist>
        )}

        <FadeInSection>
          <div className="intro-subtitle">
           Hi! I'm Chinna, a seasoned DevOps Engineer specializing in GCP, Kubernetes (GKE), Docker, CI/CD pipelines, and security. With extensive expertise in tools like Jenkins and cloud-native technologies, I excel at optimizing workflows and driving robust, scalable solutions. Let's connect to discuss innovative solutions in the DevOps and cloud ecosystem!
          </div>

        </FadeInSection>
        <SocialIcons />
      </div>
    </div>
  );
};

export default Intro;