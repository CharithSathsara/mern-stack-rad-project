import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenditureService from "./expenditureService";

const initialState = {
  expenditures: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a New expenditure
export const createExpenditure = createAsyncThunk(
  "expenditure/create",
  async (expenditureData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenditureService.createExpenditure(expenditureData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all expenditure
export const getExpenditures = createAsyncThunk(
  "expenditures/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenditureService.getExpenditures(token);
    } catch (error) {
      //console.log(error.toString())
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete expenditure
export const deleteExpenditure = createAsyncThunk(
  "expenditures/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenditureService.deleteExpenditure(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update expenditure
export const updateExpenditure = createAsyncThunk(
  "expenditures/update",
  async (expenditureData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const expenditure_id = localStorage.getItem("ID");
      return await expenditureService.updateExpenditure(
        expenditure_id,
        expenditureData,
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const expenditureSlice = createSlice({
  name: "expenditure",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpenditure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpenditure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenditures.push(action.payload);
      })
      .addCase(createExpenditure.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExpenditures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenditures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenditures = action.payload;
      })
      .addCase(getExpenditures.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExpenditure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpenditure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenditures = state.expenditures.filter(
          (expenditure) => expenditure._id !== action.payload.id
        );
      })
      .addCase(deleteExpenditure.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExpenditure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExpenditure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenditures = state.expenditures.filter(
          (expenditure) => expenditure._id !== action.payload._id
        );
        state.expenditures.push(action.payload);
      })
      .addCase(updateExpenditure.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = expenditureSlice.actions;
export default expenditureSlice.reducer;
