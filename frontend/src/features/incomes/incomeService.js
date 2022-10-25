import axios from 'axios'

const API_URL = '/api/incomes/'

// Create a new income
const createIncome = async (incomeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, incomeData, config)

    return response.data
}

// Get incomes
const getIncomes = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete income
const deleteIncome = async (incomeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + incomeId, config)

    return response.data
}

// Update Income
const updateIncome = async (incomeId,incomeData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + incomeId,incomeData, config)

    return response.data
}

const incomeService = {
    createIncome,
    getIncomes,
    updateIncome,
    deleteIncome,
}

export default incomeService
