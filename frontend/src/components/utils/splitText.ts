import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "../../utils/textSplitter";
import { prefersReducedMotion } from "../../utils/device";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: TextSplitter;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const compact = window.innerWidth < 768;
  const TriggerStart = window.innerWidth < 1024 ? "top 78%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";
  const yOffset = compact ? 36 : 80;
  const instant = prefersReducedMotion();

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    if (instant) {
      para.style.opacity = "1";
      return;
    }

    para.split = new TextSplitter(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: yOffset },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: compact ? 0.7 : 1,
        ease: "power3.out",
        y: 0,
        stagger: compact ? 0.015 : 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }

    if (instant) {
      title.style.opacity = "1";
      return;
    }

    title.split = new TextSplitter(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: yOffset, rotate: compact ? 6 : 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: compact ? 0.6 : 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: compact ? 0.02 : 0.03,
      }
    );
  });
}
