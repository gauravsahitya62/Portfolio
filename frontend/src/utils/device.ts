export const DESKTOP_MIN = 1024;
export const TABLET_MIN = 768;

export const isDesktopExperience = () =>
  typeof window !== "undefined" &&
  window.innerWidth >= DESKTOP_MIN &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const isCinematicViewport = () =>
  typeof window !== "undefined" && window.innerWidth >= DESKTOP_MIN;

export const isTabletUp = () =>
  typeof window !== "undefined" && window.innerWidth >= TABLET_MIN;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const applyDeviceClass = () => {
  if (typeof document === "undefined") return isDesktopExperience();
  const desktop = isDesktopExperience();
  document.documentElement.classList.toggle("desktop-ui", desktop);
  document.documentElement.classList.toggle("touch-ui", !desktop);
  return desktop;
};
