import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import distributorService from './distributerService'

const initialState = {
    distributors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create a New Product
export const createDistributor = createAsyncThunk(
    'distributors/create',
    async (distributorData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await distributorService.createDistributor(distributorData, token)
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

// Get all distributors
export const getDistributors = createAsyncThunk(
    'distributors/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await distributorService.getDistributors(token)
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

// Delete distributor
export const deleteDistributor = createAsyncThunk(
    'distributors/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await distributorService.deleteDistributor(id, token)
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


// Update distributor
export const updateDistributor = createAsyncThunk(
    'distributors/update',
    async (distributorData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const distributor_id = localStorage.getItem('ID')
            return await distributorService.updateDistributor(distributor_id, distributorData, token)
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

export const distributorSlice = createSlice({
    name: 'distributor',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDistributor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDistributor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.distributors.push(action.payload)
            })
            .addCase(createDistributor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDistributors.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDistributors.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.distributors = action.payload
            })
            .addCase(getDistributors.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteDistributor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDistributor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.distributors = state.distributors.filter(
                    (distributor) => distributor._id !== action.payload.id
                )
            })
            .addCase(deleteDistributor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateDistributor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateDistributor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.distributors = state.distributors.filter(
                    (distributor) => distributor._id !== action.payload._id
                )
                state.distributors.push(action.payload)
            })
            .addCase(updateDistributor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = distributorSlice.actions
export default distributorSlice.reducer
