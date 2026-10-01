
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const goToApplication = (product) => {
    navigate(`/?product=${product}#apply`);

    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <section className="hero">
      <div className="container hero-grid">

        <div>
          <span className="hero-badge">
            Simple Digital Finance Assistance
          </span>

          <h1>
            Need Extra Funds?
            <br />
            <span>Check Your Options Easily.</span>
          </h1>

          <p className="hero-description">
            Tell us a little about yourself, your income and your
            requirement. Our team can contact you to explain the
            available financial options.
          </p>

          <div className="hero-buttons">

            <button
              className="btn btn-primary"
              onClick={() => goToApplication("OD")}
            >
              Check Overdraft Option
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => goToApplication("LOAN")}
            >
              Check Personal Loan
            </button>

          </div>
        </div>

        <div className="hero-card">
          <h3>Quick Eligibility Check</h3>

          <p>
            Share basic details and get contacted by our team.
          </p>

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => goToApplication("OD")}
          >
            Start Now
          </button>

          <p
            style={{
              marginTop: "15px",
              marginBottom: 0,
              fontSize: "12px",
            }}
          >
            Final approval, amount and terms are subject to
            lender eligibility and approval.
          </p>
        </div>

      </div>
    </section>
  );
}
