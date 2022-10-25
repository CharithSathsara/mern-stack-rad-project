import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'

const initialState = {
    customers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create a New Customer
export const createCustomer = createAsyncThunk(
    'customers/create',
    async (customerData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.createCustomer(customerData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all customers
export const getCustomers = createAsyncThunk(
    'customers/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.getCustomers(token)
        } catch (error) {
            //console.log(error.toString())
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete product
export const deleteCustomer = createAsyncThunk(
    'customers/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.deleteCustomer(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Update customer
export const updateCustomer = createAsyncThunk(
    'customers/update',
    async (customerData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const customer_id = localStorage.getItem('ID')
            return await customerService.updateCustomer(customer_id, customerData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers.push(action.payload)
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCustomers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = action.payload
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = state.customers.filter(
                    (customer) => customer._id !== action.payload.id
                )
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateCustomer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = state.customers.filter(
                    (customer) => customer._id !== action.payload._id
                )
                state.customers.push(action.payload)
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = customerSlice.actions
export default customerSlice.reducer
