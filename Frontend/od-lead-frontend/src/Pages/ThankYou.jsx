import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="thank-you">

      <div className="thank-you-card">

        <div className="thank-you-icon">
          ✓
        </div>

        <h1>
          Thank You!
        </h1>

        <p>
          Your enquiry has been submitted successfully.
          Our team can contact you regarding your selected
          financial option.
        </p>

        <p style={{ fontSize: "13px" }}>
          Please keep your phone available if you expect
          a follow-up call.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}