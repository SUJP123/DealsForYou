import { configureStore } from '@reduxjs/toolkit';
import authReducer from './service/auth';
import userReducer from './service/user';

const store = configureStore({
    reducer: {
        auth: authReducer,
        //user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;