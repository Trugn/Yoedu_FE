import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@/features/users/types/user-type';
import { loginThunk, registerThunk, getMeThunk } from './auth-thunk';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    initialized: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    initialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        markInitialized: (state) => {
            state.initialized = true;
        },
    },
    extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload.user;

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getMeThunk.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;

        state.initialized = true;
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.user = null;

        state.initialized = true;

        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, markInitialized } = authSlice.actions;
export default authSlice.reducer;
