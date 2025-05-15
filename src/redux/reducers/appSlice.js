import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    authButtonsLoading: true,
    pageLoading: false
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAuthButtonsLoading(state, action) {
            state.authButtonsLoading = action.payload;
        },
        setPageLoading(state, action) {
            const {loading} = action.payload;
            state.authButtonsLoading = loading;
        },
    },
});

export const {setAuthButtonsLoading, setPageLoading} = appSlice.actions;

export default appSlice.reducer;
