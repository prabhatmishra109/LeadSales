import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

// Save new customer lead
export const saveLead = async (leadData) => {
  const response = await axios.post(
    `${API_URL}/api/leads`,
    leadData
  );

  return response.data;
};

// Get leads for admin dashboard
export const getLeads = async (adminKey, product = "") => {
  const response = await axios.get(
    `${API_URL}/api/leads`,
    {
      headers: {
        "X-ADMIN-KEY": adminKey,
      },
      params: product ? { product } : {},
    }
  );

  return response.data;
};