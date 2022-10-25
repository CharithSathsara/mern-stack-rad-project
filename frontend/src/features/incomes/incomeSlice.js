import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import incomeService from './incomeService'

const initialState = {
    incomes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create a New Income
export const createIncome = createAsyncThunk(
    'incomes/create',
    async (incomeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await incomeService.createIncome(incomeData, token)
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

// Get all incomes
export const getIncomes = createAsyncThunk(
    'incomes/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await incomeService.getIncomes(token)
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

// Delete Income
export const deleteIncome = createAsyncThunk(
    'income/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await incomeService.deleteIncome(id, token)
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


// Update Income
export const updateIncome = createAsyncThunk(
    'income/update',
    async (incomeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const income_id = localStorage.getItem('ID')
            return await incomeService.updateIncome(income_id, incomeData, token)
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

export const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createIncome.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createIncome.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.incomes.push(action.payload)
            })
            .addCase(createIncome.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIncomes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIncomes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.incomes = action.payload
            })
            .addCase(getIncomes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteIncome.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.incomes = state.incomes.filter(
                    (income) => income._id !== action.payload.id
                )
            })
            .addCase(deleteIncome.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateIncome.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateIncome.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.incomes = state.incomes.filter(
                    (income) => income._id !== action.payload._id
                )
                state.incomes.push(action.payload)
            })
            .addCase(updateIncome.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = incomeSlice.actions
export default incomeSlice.reducer
