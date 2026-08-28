import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { config } from "../config";

type PageKey = "home" | "works" | "play";

const pages: Record<
  PageKey,
  { title: string; description: string; path: string; type: "profile" | "website" }
> = {
  home: {
    title: "Gaurav Sahitya — Software Engineer (SDE-II) in Bengaluru",
    description:
      "Gaurav Sahitya is a software engineer (SDE-II) in Bengaluru. 4+ years in Java, Spring Boot, and AWS distributed systems that cut API latency by 35%+.",
    path: "/",
    type: "profile",
  },
  works: {
    title: "Projects by Gaurav Sahitya — Java, Spring Boot, WordPress",
    description:
      "Selected work by software engineer Gaurav Sahitya, including Wedding Vows by Nikhil and production Java, Spring Boot, and AWS systems.",
    path: "/myworks",
    type: "website",
  },
  play: {
    title: "Play Chess with Gaurav Sahitya | Software Engineer",
    description:
      "Play chess and chat with Gaurav Sahitya on his software engineer portfolio. An interactive React and TypeScript board.",
    path: "/play",
    type: "website",
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

const setLink = (rel: string, href: string, extra?: Record<string, string>) => {
  const extraKey = extra
    ? Object.entries(extra)
        .map(([k, v]) => `[${k}="${v}"]`)
        .join("")
    : "";
  let el = document.querySelector(`link[rel="${rel}"]${extraKey}`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    }
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const siteOrigin = () => {
  if (typeof window === "undefined") return config.site.url.replace(/\/$/, "");
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return `${window.location.origin}${base}`;
};

const personSchema = (origin: string, image: string) => ({
  "@type": "Person",
  "@id": `${origin}/#person`,
  name: config.developer.fullName,
  alternateName: ["Gaurav Sahitya SDE-II", "Gaurav Sahitya Java"],
  givenName: "Gaurav",
  familyName: "Sahitya",
  url: `${origin}/`,
  image,
  jobTitle: "Software Engineer (SDE-II)",
  description: config.seo.identity,
  email: `mailto:${config.contact.email}`,
  telephone: config.contact.phone,
  nationality: { "@type": "Country", name: "India" },
  knowsLanguage: ["English", "Hindi"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  workLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationalCategory: "15-1252.00",
    skills: config.seo.keywords,
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
    "OpenAI",
    "React",
  ],
  sameAs: [config.contact.github, config.contact.linkedin].filter(Boolean),
});

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
    const imageAlt = `${config.developer.fullName}, software engineer in Bengaluru`;

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "author", config.developer.fullName);
    setMeta("name", "keywords", config.seo.keywords);
    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    setMeta("name", "googlebot", "index, follow");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:type", meta.type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", imageAlt);
    setMeta("property", "og:site_name", config.site.name);
    setMeta("property", "og:locale", config.site.locale);
    setMeta("property", "profile:first_name", "Gaurav");
    setMeta("property", "profile:last_name", "Sahitya");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:image:alt", imageAlt);
    setLink("canonical", url);
    setLink("alternate", url, { hreflang: "en" });
    setLink("alternate", url, { hreflang: "x-default" });
    setLink("author", url);
    [config.contact.github, config.contact.linkedin].forEach((href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="me"][href="${href}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "me");
        el.setAttribute("href", href);
        document.head.appendChild(el);
      }
    });

    const breadcrumbs = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${origin}/`,
        },
        ...(page === "home"
          ? []
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: page === "works" ? "Work" : "Play",
                item: url,
              },
            ]),
      ],
    };

    const graph: Record<string, unknown>[] = [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: config.site.name,
        alternateName: config.developer.fullName,
        description: pages.home.description,
        inLanguage: "en",
        publisher: { "@id": `${origin}/#person` },
      },
      personSchema(origin, image),
      breadcrumbs,
    ];

    if (page === "home") {
      graph.push(
        {
          "@type": "ProfilePage",
          "@id": `${url}#page`,
          url,
          name: meta.title,
          description: meta.description,
          inLanguage: "en",
          isPartOf: { "@id": `${origin}/#website` },
          about: { "@id": `${origin}/#person` },
          mainEntity: { "@id": `${origin}/#person` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
        },
        {
          "@type": "FAQPage",
          "@id": `${origin}/#faq`,
          url: `${origin}/#faq`,
          mainEntity: config.seo.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
        {
          "@type": "ItemList",
          "@id": `${origin}/#projects`,
          name: "Selected work by Gaurav Sahitya",
          itemListElement: config.projects
            .filter((project) => project.title === "Wedding Vows by Nikhil")
            .map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "CreativeWork",
                name: project.title,
                description: project.description,
                url: project.link,
                creator: { "@id": `${origin}/#person` },
                keywords: project.technologies,
              },
            })),
        }
      );
    } else if (page === "works") {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: meta.title,
        description: meta.description,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#person` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      });
    } else {
      graph.push({
        "@type": "WebApplication",
        "@id": `${url}#page`,
        url,
        name: "Play chess with Gaurav Sahitya",
        description: meta.description,
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        isPartOf: { "@id": `${origin}/#website` },
        author: { "@id": `${origin}/#person` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      });
    }

    const schema = {
      "@context": "https://schema.org",
      "@graph": graph,
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
