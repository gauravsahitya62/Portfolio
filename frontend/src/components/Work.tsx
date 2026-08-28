import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { TABLET_MIN } from "../utils/device";

gsap.registerPlugin(ScrollTrigger);

const featuredWorks = config.projects.filter(
  (project) => project.title === "Wedding Vows by Nikhil"
);

const Work = () => {
  useEffect(() => {
    ScrollTrigger.getById("work")?.kill();
    gsap.set(".work-flex", { clearProps: "x,transform" });
    gsap.set(".work-box", { clearProps: "opacity,y,transform" });

    if (featuredWorks.length <= 1) return;

    const mq = window.matchMedia(`(min-width: ${TABLET_MIN}px)`);
    let timeline: gsap.core.Timeline | null = null;

    const killWork = () => {
      timeline?.kill();
      timeline = null;
      ScrollTrigger.getById("work")?.kill();
      gsap.set(".work-flex", { clearProps: "x,transform" });
      gsap.set(".work-box", { clearProps: "opacity,y,transform" });
    };

    const setup = () => {
      killWork();

      if (mq.matches) {
        let translateX = 0;
        const box = document.getElementsByClassName("work-box");
        if (box.length === 0) return;
        const container = document.querySelector(".work-container");
        if (!container) return;
        const rectLeft = container.getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
        const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
        translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;

        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".work-section",
            start: "top top",
            end: `+=${translateX}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            id: "work",
            invalidateOnRefresh: true,
          },
        });

        timeline.to(".work-flex", {
          x: -translateX,
          ease: "none",
        });
      } else {
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".work-section",
            start: "top 82%",
            toggleActions: "play none none reverse",
            id: "work",
          },
        });
        timeline.fromTo(
          ".work-box",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      ScrollTrigger.refresh();
    };

    const timeout = window.setTimeout(setup, 80);
    mq.addEventListener("change", setup);
    return () => {
      window.clearTimeout(timeout);
      mq.removeEventListener("change", setup);
      killWork();
    };
  }, []);
  return (
    <div className={`work-section${featuredWorks.length <= 1 ? " work-section-static" : ""}`} id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className={`work-flex${featuredWorks.length <= 1 ? " work-flex-single" : ""}`}>
          {featuredWorks.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
