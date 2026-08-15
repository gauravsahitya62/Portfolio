import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  document.documentElement.style.overflowY = "auto";
  document.body.style.overflowY = "auto";
  lenis?.start();

  const main = document.getElementsByTagName("main")[0];
  if (main) {
    main.classList.add("main-active");
    main.style.opacity = "1";
  }

  gsap.fromTo(
    [".landing-intro", ".landing-info"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.05,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    }
  );
}
