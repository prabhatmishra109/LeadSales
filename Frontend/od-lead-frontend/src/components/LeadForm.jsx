import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { saveLead } from "../Api/leadApi";

export default function LeadForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [product, setProduct] = useState(
    searchParams.get("product") || "OD"
  );

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    jobType: "SALARIED",
    income: "",
    emi: "",
  
    consent: false,
  });

  useEffect(() => {
    const selectedProduct = searchParams.get("product");

    if (
      selectedProduct === "OD" ||
      selectedProduct === "LOAN"
    ) {
      setProduct(selectedProduct);
    }
  }, [searchParams]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductChange = (selectedProduct) => {
    setProduct(selectedProduct);
  };

  const getSource = () => {
    const params = new URLSearchParams(
      window.location.search
    );

    return params.get("src") || "direct";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.consent) {
      alert(
        "Please give consent before submitting the form."
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    setLoading(true);

    try {
      await saveLead({
        ...form,
        product,
        source: getSource(),
      });

      navigate("/thank-you");
    } catch (error) {
      console.error("STATUS:", error.response?.status);
      console.error(
        "BACKEND RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section form-section"
      id="apply"
    >
      <div className="container">

        <div className="form-card">

          <div className="form-header">
            <h2>Check Your Eligibility</h2>

            <p>
              Enter your basic details. Our team can
              contact you regarding the selected option.
            </p>
          </div>

          {/* PRODUCT SELECTION */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "25px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              className={
                product === "OD"
                  ? "btn btn-primary"
                  : "btn btn-secondary"
              }
              onClick={() =>
                handleProductChange("OD")
              }
            >
              Overdraft
            </button>

            <button
              type="button"
              className={
                product === "LOAN"
                  ? "btn btn-primary"
                  : "btn btn-secondary"
              }
              onClick={() =>
                handleProductChange("LOAN")
              }
            >
              Personal Loan
            </button>
          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* NAME */}

              <div className="form-group">
                <label htmlFor="name">
                  Full Name *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}

              <div className="form-group">
                <label htmlFor="email">
                  Email Address *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}

              <div className="form-group">
                <label htmlFor="phone">
                  Mobile Number *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* CITY */}

              <div className="form-group">
                <label htmlFor="city">
                  City *
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMPLOYMENT TYPE */}

              <div className="form-group">
                <label htmlFor="jobType">
                  Employment Type *
                </label>

                <select
                  id="jobType"
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="SALARIED">
                    Salaried
                  </option>

                  <option value="BUSINESS">
                    Business / Self-employed
                  </option>
                </select>
              </div>

              {/* MONTHLY INCOME */}

              <div className="form-group">
                <label htmlFor="income">
                  Monthly Income *
                </label>

                <input
                  id="income"
                  name="income"
                  type="number"
                  min="1"
                  placeholder="Example: 30000"
                  value={form.income}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EXISTING EMI */}

              <div className="form-group">
                <label htmlFor="emi">
                  Existing Monthly EMI
                </label>

                <input
                  id="emi"
                  name="emi"
                  type="number"
                  min="0"
                  placeholder="Enter 0 if none"
                  value={form.emi}
                  onChange={handleChange}
                  onBlur={(e) => {
  const monthlyIncome = Number(form.income);
  const existingEmi = Number(e.target.value || 0);

  if (monthlyIncome > 0 && existingEmi > 0) {
    const emiPercentage =
      (existingEmi / monthlyIncome) * 100;

    if (emiPercentage >= 80) {
      alert(
        "Based on the information provided, you may not meet the current eligibility criteria because your existing EMI is 80% or more of your monthly income."
      );
    }
  }
}}
                />
              </div>

            

            </div>

            {/* CONSENT */}

            <label className="consent">

              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />

              <span>
                I agree to be contacted by phone,
                WhatsApp or other permitted communication
                channels regarding my enquiry. I understand
                that submission does not guarantee approval.
              </span>

            </label>

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="btn btn-primary form-submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit & Get a Call"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}