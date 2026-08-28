import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="about-me">
        <h2 className="title" id="about-heading">{config.about.title}</h2>
        <p className="para about-identity">{config.seo.identity}</p>
        <p className="para">
          {config.about.description}
        </p>
      </div>
    </section>
  );
};

export default About;
