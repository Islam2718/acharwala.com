import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null; // Replace `any` with your user type if available
    token: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ user: any; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

            // Persist in localStorage
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('token', state.token);
        },
        clearAuthData: (state) => {
            state.user = null;
            state.token = null;
            // Remove from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
