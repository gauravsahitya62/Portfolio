import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">
          {config.about.title}
          <span className="sr-only">
            {" "}
            — Gaurav Sahitya, software engineer in Bengaluru
          </span>
        </h3>
        <p className="para">
          {config.about.description}
        </p>
      </div>
    </div>
  );
};

export default About;
