import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@/features/users/types/user-type';
import { loginThunk, registerThunk, getMeThunk } from './auth-thunk';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
    initialized: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
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
            state.accessToken = null;
            state.refreshToken = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        markInitialized: (state) => {
            state.initialized = true;
        },
        restoreToken: (state) => {
            // Khôi phục token từ localStorage vào Redux state ngay
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            
            if (accessToken) state.accessToken = accessToken;
            if (refreshToken) state.refreshToken = refreshToken;
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

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
        
        // Token đã được restoreToken set, không cần set lại
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

export const { logout, clearError, markInitialized, restoreToken } = authSlice.actions;
export default authSlice.reducer;
