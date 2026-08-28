import "./styles/Career.css";
import { config } from "../config";

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  if (period.includes(" - ")) {
    return period.split(" - ")[0]; // Show start year for ranges
  }
  return period; // Single year like "2021"
};

const Career = () => {
  return (
    <section className="career-section section-container" id="career" aria-labelledby="career-heading">
      <div className="career-container">
        <h2 id="career-heading">
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <article key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                </div>
                <div className="career-year">
                  <time dateTime={exp.period}>{getDisplayYear(exp.period)}</time>
                </div>
              </div>
              <p>{exp.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
