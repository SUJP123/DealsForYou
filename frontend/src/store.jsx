import { configureStore } from '@reduxjs/toolkit';
import authReducer from './service/auth';
import cartReducer from './service/user';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;