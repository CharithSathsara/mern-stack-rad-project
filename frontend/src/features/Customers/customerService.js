import axios from 'axios'

const API_URL = '/api/customers/'

// Create a new customer
const createCustomer = async (customerData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, customerData, config)

    return response.data
}

// Get customers
const getCustomers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete a customer
const deleteCustomer = async (customerId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + customerId, config)

    return response.data
}

// Update Customer
const updateCustomer = async (customerId,customerData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + customerId,customerData, config)

    return response.data
}

const customerService = {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
}

export default customerService;
