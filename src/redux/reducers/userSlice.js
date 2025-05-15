import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { name, email } = action.payload;
            state.name = name;
            state.email = email;
            state.isLoggedIn = true;
        },
        clearUser(state) {
            state.name = '';
            state.email = '';
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
