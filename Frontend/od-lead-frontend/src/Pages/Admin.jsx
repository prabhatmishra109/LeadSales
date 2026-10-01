import { useState } from "react";

import { getLeads } from "../Api/leadApi";

export default function Admin() {
  const [adminKey, setAdminKey] = useState("");
  const [product, setProduct] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    if (!adminKey) {
      setError("Please enter admin key.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getLeads(
        adminKey,
        product
      );

      setLeads(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load leads. Check admin key or backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">

        <h1 style={{ marginBottom: "25px" }}>
          Lead Dashboard
        </h1>

        <div
          className="form-card"
          style={{ marginBottom: "25px" }}
        >

          <div className="form-grid">

            <div className="form-group">
              <label>
                Admin Key
              </label>

              <input
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) =>
                  setAdminKey(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                Product
              </label>

              <select
                value={product}
                onChange={(e) =>
                  setProduct(e.target.value)
                }
              >
                <option value="">
                  All
                </option>

                <option value="OD">
                  Overdraft
                </option>

                <option value="LOAN">
                  Personal Loan
                </option>
              </select>
            </div>

          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={loadLeads}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "Load Leads"}
          </button>

          {error && (
            <p
              style={{
                color: "#dc2626",
                marginTop: "15px",
              }}
            >
              {error}
            </p>
          )}

        </div>

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Product</th>
                <th>Job Type</th>
                <th>Income</th>
                <th>Amount</th>
                <th>Source</th>
              </tr>
            </thead>

            <tbody>

              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.id}</td>
                    <td>{lead.name}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.city}</td>
                    <td>{lead.product}</td>
                    <td>{lead.jobType}</td>
                    <td>₹{lead.income}</td>
                    <td>
                      ₹{lead.requiredAmount}
                    </td>
                    <td>{lead.source}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}