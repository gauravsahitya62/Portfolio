import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <section className="landing-section" id="landingDiv" aria-label="Introduction">
        <div className="landing-container">
          <div className="landing-intro">
            <p className="landing-hello">Hello! I'm</p>
            <h1>
              {firstName.toUpperCase()}
              {" "}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
              <span className="sr-only">
                {", software engineer (SDE-II) in Bengaluru specializing in Java and distributed systems"}
              </span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{config.developer.primaryRole}</div>
              <div className="landing-h2-2">ENGINEER</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Software Engineer</div>
              <div className="landing-h2-info-1">Java Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </section>
    </>
  );
};

export default Landing;
