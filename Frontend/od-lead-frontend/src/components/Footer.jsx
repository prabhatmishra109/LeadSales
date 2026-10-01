export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-grid">

          <div>
            <h3>FinanceAssist</h3>

            <p>
              A digital enquiry platform for customers
              looking to explore applicable financial options.
            </p>
          </div>

          <div>
            <h3>Products</h3>

            <div className="footer-links">
              <a href="/#apply">
                Overdraft
              </a>

              <a href="/#apply">
                Personal Loan
              </a>

              <a href="/#calculator">
                OD Calculator
              </a>
            </div>
          </div>

          <div>
            <h3>Information</h3>

            <div className="footer-links">
              <a href="/#how-it-works">
                How It Works
              </a>

              <a href="/#faq">
                FAQ
              </a>

              <a href="/privacy">
                Privacy Policy
              </a>

              <a href="/terms">
                Terms
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} FinanceAssist.
            All rights reserved.
          </p>

          <p style={{ marginTop: "7px" }}>
            This website provides an enquiry/lead
            submission facility. Approval, rates, fees,
            limits and final terms are subject to the
            applicable lender's assessment.
          </p>
        </div>

      </div>
    </footer>
  );
}