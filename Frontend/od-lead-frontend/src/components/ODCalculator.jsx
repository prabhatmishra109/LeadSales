import { useState } from "react";

export default function ODCalculator() {
  const [amount, setAmount] = useState(50000);
  const [days, setDays] = useState(15);
  const [rate, setRate] = useState(14);

  const interest =
    (Number(amount) * Number(rate) * Number(days)) /
    (100 * 365);

  return (
    <section className="section" id="calculator">
      <div className="container">

        <div className="section-title">
          <h2>Overdraft Interest Calculator</h2>

          <p>
            Get an approximate calculation based on the amount,
            days and assumed annual rate.
          </p>
        </div>

        <div className="calculator">

          <div className="calculator-grid">

            <div className="form-group">
              <label>Amount Used (₹)</label>

              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Number of Days</label>

              <input
                type="number"
                min="1"
                value={days}
                onChange={(e) =>
                  setDays(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Assumed Annual Rate (%)</label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={rate}
                onChange={(e) =>
                  setRate(e.target.value)
                }
              />
            </div>

          </div>

          <div className="calculator-result">
            <span>Approximate interest</span>

            <strong>
              ₹
              {Number.isFinite(interest)
                ? interest.toFixed(0)
                : "0"}
            </strong>
          </div>

          <p
            style={{
              marginTop: "15px",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            This calculator is for illustration only. Actual
            interest, fees, limit and terms may vary according
            to the lender and approved facility.
          </p>

        </div>

      </div>
    </section>
  );
}