import axios from "axios";

const API_URL = "http://localhost:5000/api/visitors";

// Get all visitors
export const getVisitors = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Register visitor
export const registerVisitor = async (visitorData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/register`,
    visitorData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Approve visitor
export const approveVisitor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Reject visitor
export const rejectVisitor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const checkInVisitor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}/checkin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const checkOutVisitor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}/checkout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};