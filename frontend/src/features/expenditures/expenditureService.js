import axios from "axios";

const API_URL = "/api/expenditures/";

// Create a new expenditure
const createExpenditure = async (expenditureData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, expenditureData, config);

  return response.data;
};

// Get expenditure
const getExpenditures = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete a expenditure
const deleteExpenditure = async (expenditureId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + expenditureId, config);

  return response.data;
};

// Update expenditure
const updateExpenditure = async (expenditureId, expenditureData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + expenditureId, expenditureData, config);

  return response.data;
};

const expenditureService = {
  createExpenditure,
  getExpenditures,
  updateExpenditure,
  deleteExpenditure,
};

export default expenditureService;
