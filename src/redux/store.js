import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./reducers/userSlice.js";
import appReducer from "./reducers/appSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer
    },
});

export default store;
