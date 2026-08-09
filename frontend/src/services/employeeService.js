import axios from "axios";

const API_URL = "http://localhost:5000/api/visitors";

export const getVisitors = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

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