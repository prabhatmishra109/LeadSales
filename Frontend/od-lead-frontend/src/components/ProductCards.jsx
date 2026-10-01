import { useNavigate } from "react-router-dom";

export default function ProductCards() {
  const navigate = useNavigate();

  const selectProduct = (product) => {
    navigate(`/?product=${product}#apply`);
  };

  return (
    <section className="section" id="products">
      <div className="container">

        <div className="section-title">
          <h2>Choose What You Need</h2>

          <p>
            Select the financial option you want to know more about.
          </p>
        </div>

        <div className="product-grid">

          {/* OVERDRAFT */}

          <div className="product-card">

            <h3>Overdraft</h3>

            <p>
              A flexible credit facility where eligible customers
              can use funds as per the sanctioned limit.
            </p>

            <ul className="product-list">
              <li>Flexible usage</li>
              <li>Interest may depend on utilised amount</li>
              <li>Suitable for eligible salaried/business customers</li>
              <li>Limit and terms depend on lender assessment</li>
            </ul>

            <button
              className="btn btn-primary"
              onClick={() => selectProduct("OD")}
            >
              Check OD Option
            </button>

          </div>

          {/* PERSONAL LOAN */}

          <div className="product-card">

            <h3>Personal Loan</h3>

            <p>
              Apply to explore personal finance options based on
              your income and eligibility.
            </p>

            <ul className="product-list">
              <li>Fixed loan amount as approved</li>
              <li>Repayment through EMIs</li>
              <li>For eligible salaried/business customers</li>
              <li>Rate and tenure depend on lender assessment</li>
            </ul>

            <button
              className="btn btn-primary"
              onClick={() => selectProduct("LOAN")}
            >
              Check Personal Loan
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}