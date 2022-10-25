import axios from 'axios'

const API_URL = '/api/distributors/'

// Create a new product
const createDistributor = async (distributorData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, distributorData, config)

    return response.data
}

// Get products
const getDistributors = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete a product
const deleteDistributor = async (distributorId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + distributorId, config)

    return response.data
}

// Update Product
const updateDistributor = async (distributorId, distributorData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + distributorId, distributorData, config)

    return response.data
}

const goalService = {
    createDistributor,
    getDistributors,
    updateDistributor,
    deleteDistributor,
}

export default goalService
