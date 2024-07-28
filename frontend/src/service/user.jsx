import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_API = "http://localhost:8080";

const initialState = {
    items: [],
    showCart: false,  // Make sure this property exists for toggling the cart
    status: 'idle',
    error: null,
};

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (product, { getState }) => {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${BACKEND_API}/api/v1/customer/cart`, product, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    }
);

export const getItemsInCart = createAsyncThunk(
    'cart/getItemsInCart',  // Correct the action name
    async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const idResponse = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userId = idResponse.data;

        const response = await axios.get(`${BACKEND_API}/api/v1/customer/${userId}/getcart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.showCart = !state.showCart;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getItemsInCart.pending, (state) => {  // Remove parentheses
                state.status = 'loading';
            })
            .addCase(getItemsInCart.fulfilled, (state, action) => {  // Remove parentheses
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getItemsInCart.rejected, (state, action) => {  // Remove parentheses
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
