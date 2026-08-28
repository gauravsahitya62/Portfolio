import { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import WorkCover from "../components/WorkCover";
import { initScrollReveal } from "../utils/scrollReveal";
import "./MyWorks.css";

const MyWorks = () => {
  useEffect(() => initScrollReveal(), []);
  return (
    <main className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
          <span className="sr-only"> — software engineering projects by Gaurav Sahitya</span>
        </h1>
        <p>Software engineering projects: Java, Spring Boot, AWS, and production systems</p>
      </div>

      <div className="myworks-grid">
        {config.projects
          .filter((project) => project.title === "Wedding Vows by Nikhil")
          .map((project, index) => {
          const isInternalLink = Boolean(project.link?.startsWith("/"));
          const useCover = !project.image || project.image.includes("placeholder");
          const cardContent = (
            <>
              <div className="myworks-card-number">0{index + 1}</div>
              <div className="myworks-card-image">
                {useCover ? (
                  <WorkCover
                    icon={project.icon}
                    title={project.title}
                    category={project.category}
                    variant={index}
                  />
                ) : (
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                )}
              </div>
              <div className="myworks-card-info">
                <h3>{project.title}</h3>
                <p className="myworks-card-category">{project.category}</p>
                <p className="myworks-card-description">{project.description}</p>
                <p className="myworks-card-tech">{project.technologies}</p>
              </div>
            </>
          );

          if (isInternalLink) {
            return (
              <Link
                className="myworks-card"
                key={project.id}
                data-cursor="disable"
                data-reveal
                to={project.link}
              >
                {cardContent}
              </Link>
            );
          }

          return (
            <a
              className="myworks-card"
              key={project.id}
              data-cursor="disable"
              data-reveal
              href={project.link || undefined}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
            >
              {cardContent}
            </a>
          );
        })}
      </div>
    </main>
  );
};

export default MyWorks;
