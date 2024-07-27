import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const BACKEND_API = 'http://localhost:8080';

export const loginUser = createAsyncThunk('auth/loginUser', async({email, password}) => {
    const response = await axios.post(`${BACKEND_API}/api/v1/auth/authenticate`, {
        email,
        password
    })
    const data = response.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    return data;
})

export const register = createAsyncThunk('auth/register', async ({firstName, lastName, email, password}) => {
    const response = await axios.post(`${BACKEND_API}/api/v1/auth/register`, {
        firstName,
        lastName,
        email,
        password
    });
    const data = response.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;