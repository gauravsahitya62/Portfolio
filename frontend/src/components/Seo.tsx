import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { config } from "../config";

type PageKey = "home" | "works" | "play";

const pages: Record<
  PageKey,
  { title: string; description: string; path: string }
> = {
  home: {
    title:
      "Gaurav Sahitya — Software Engineer | SDE-II, Java & Distributed Systems",
    description:
      "Gaurav Sahitya is a software engineer (SDE-II) in Bengaluru. 4+ years building Java, Spring Boot, and AWS distributed systems that cut API latency by 35%+.",
    path: "/",
  },
  works: {
    title: "Software Engineering Projects | Gaurav Sahitya",
    description:
      "Selected software engineering work by Gaurav Sahitya: Java microservices, AWS document pipelines, AI automation, and production Spring Boot systems.",
    path: "/myworks",
  },
  play: {
    title: "Play Chess | Gaurav Sahitya — Software Engineer",
    description:
      "Play chess with Gaurav Sahitya on his software engineer portfolio. An interactive board built with React and TypeScript.",
    path: "/play",
  },
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const siteOrigin = () => {
  if (typeof window === "undefined") return config.site.url.replace(/\/$/, "");
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return `${window.location.origin}${base}`;
};

const Seo = () => {
  const { pathname } = useLocation();
  const page: PageKey = pathname.startsWith("/myworks")
    ? "works"
    : pathname.startsWith("/play")
      ? "play"
      : "home";

  useEffect(() => {
    const meta = pages[page];
    const origin = siteOrigin();
    const url = `${origin}${meta.path === "/" ? "/" : meta.path}`;
    const image = `${origin}${config.site.ogImage}`;

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "author", config.developer.fullName);
    setMeta(
      "name",
      "keywords",
      "Gaurav Sahitya, software engineer, SDE-II, Java developer, Spring Boot, distributed systems engineer, backend engineer Bengaluru, AWS, microservices"
    );
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:type", page === "home" ? "profile" : "website");
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", `${config.developer.fullName} Portfolio`);
    setMeta("property", "og:locale", "en_IN");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", image);
    setLink("canonical", url);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: `${origin}/`,
          name: `${config.developer.fullName} — Software Engineer Portfolio`,
          description: pages.home.description,
          inLanguage: "en",
          publisher: { "@id": `${origin}/#person` },
        },
        {
          "@type": "Person",
          "@id": `${origin}/#person`,
          name: config.developer.fullName,
          url: `${origin}/`,
          image: image,
          jobTitle: "Software Engineer (SDE-II)",
          description: config.developer.description,
          email: `mailto:${config.contact.email}`,
          telephone: config.contact.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
          worksFor: {
            "@type": "Organization",
            name: "KadelLabs",
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Pratap University, Jaipur",
          },
          knowsAbout: [
            "Software Engineering",
            "Java",
            "Spring Boot",
            "Distributed Systems",
            "Microservices",
            "AWS",
            "REST APIs",
            "MySQL",
          ],
          sameAs: [config.contact.github, config.contact.linkedin],
        },
        {
          "@type": "ProfilePage",
          "@id": `${url}#page`,
          url,
          name: meta.title,
          description: meta.description,
          isPartOf: { "@id": `${origin}/#website` },
          about: { "@id": `${origin}/#person` },
          mainEntity: { "@id": `${origin}/#person` },
        },
      ],
    };

    let script = document.getElementById("seo-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-jsonld";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [page]);

  return null;
};

export default Seo;
