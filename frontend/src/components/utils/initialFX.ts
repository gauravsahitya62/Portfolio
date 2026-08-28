import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";
import { prefersReducedMotion } from "../../utils/device";

let started = false;

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (lenis) {
    lenis.start();
  }
  if (started) {
    return;
  }
  started = true;
  const main = document.querySelector("main.main-body");
  if (main) {
    main.classList.add("main-active");
  }
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const compact = window.innerWidth < 768;
  const yOff = prefersReducedMotion() ? 0 : compact ? 40 : 80;
  const blur = prefersReducedMotion() ? "blur(0px)" : "blur(5px)";

  const selectors = [".landing-info h3", ".landing-intro .landing-hello", ".landing-intro h1"];
  const elements = selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
  var landingText = new TextSplitter(elements, {
    type: "chars,lines",
    linesClass: "split-line",
  });
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: yOff, filter: blur },
    {
      opacity: 1,
      duration: compact ? 0.9 : 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: compact ? 0.018 : 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var landingText2 = new TextSplitter(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: yOff, filter: blur },
    {
      opacity: 1,
      duration: compact ? 0.9 : 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: compact ? 0.018 : 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  var landingText3 = new TextSplitter(".landing-h2-info-1", TextProps);
  var landingText4 = new TextSplitter(".landing-h2-1", TextProps);
  var landingText5 = new TextSplitter(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: TextSplitter, Text2: TextSplitter) {
  if (!Text1.chars.length || !Text2.chars.length) return;
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;
  const yOff = window.innerWidth < 768 ? 26 : 34;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: yOff },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: yOff },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -yOff,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -yOff,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
