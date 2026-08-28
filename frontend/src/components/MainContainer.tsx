import { PropsWithChildren, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import Faq from "./Faq";
import setSplitText from "./utils/splitText";
import { setAllTimeline } from "./utils/GsapScroll";
import { applyDeviceClass } from "../utils/device";
import { initScrollReveal } from "../utils/scrollReveal";

const MainContainer = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    applyDeviceClass();
    const sync = () => {
      applyDeviceClass();
      setSplitText();
    };
    const timeout = window.setTimeout(() => {
      sync();
      setAllTimeline();
      initScrollReveal();
    }, 120);

    let resizeTimer: number | undefined;
    const resizeHandler = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(sync, 150);
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <SocialIcons />
      <main className="container-main" id="main-content">
        <Landing>{children}</Landing>
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStackNew />
        <CallToAction />
        <Faq />
        <Contact />
      </main>
    </div>
  );
};

export default MainContainer;
