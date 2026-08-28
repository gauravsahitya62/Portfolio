export const initScrollReveal = () => {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (nodes.length === 0) return () => undefined;

  const reveal = (el: HTMLElement) => {
    el.classList.remove("reveal-pending");
    el.classList.add("is-revealed");
  };

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    nodes.forEach(reveal);
    return () => undefined;
  }

  nodes.forEach((el) => {
    if (!el.classList.contains("is-revealed")) {
      el.classList.add("reveal-pending");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      reveal(el);
      return;
    }
    observer.observe(el);
  });

  const fallback = window.setTimeout(() => nodes.forEach(reveal), 900);

  return () => {
    window.clearTimeout(fallback);
    observer.disconnect();
  };
};
