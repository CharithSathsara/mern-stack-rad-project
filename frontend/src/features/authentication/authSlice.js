import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from "./authService";

//createAsyncThunk() is a asynchronous function that is going to deal with async data and our backend database


//When we are register or login, we get back user data and json web token
//which we need to access protected routes. so, we get that data and store in local storage


//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
    //if there is a user in local storage, we use it. otherwise null
    user:user ? user : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try{
            return await authService.register(user)
        }catch (error){
            const message = error.toString()
            //we send message as the payload
            return thunkAPI.rejectWithValue(message)
        }
    })

//login user
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        try{
            return await authService.login(user)
        }catch (error){
            const message = error.toString()
            //we send message as the payload
            return thunkAPI.rejectWithValue(message)
        }
    })

export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout()
    })

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        //reset to default values when we are login...
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {//fetching the data
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {//fetching the data
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer