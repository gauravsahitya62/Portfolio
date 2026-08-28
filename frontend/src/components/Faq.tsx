import { config } from "../config";
import "./styles/Faq.css";

const Faq = () => {
  return (
    <section className="faq-section section-container" id="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">
        Questions about <span>Gaurav Sahitya</span>
      </h2>
      <p className="faq-lead">
        Direct answers for search and people who want the facts without scrolling the whole page.
      </p>
      <div className="faq-list">
        {config.seo.faqs.map((faq) => (
          <article className="faq-item" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Faq;
