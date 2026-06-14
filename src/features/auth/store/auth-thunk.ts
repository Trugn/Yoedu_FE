import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginApi, registerApi } from '../api/auth-api';
import type { LoginPayload, RegisterPayload } from '../types/auth-type';
import { userRoleUserApi } from '@/features/users/api/user-api';

export const loginThunk = createAsyncThunk( 
  'auth/login',
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const res = await loginApi(payload);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: Omit<RegisterPayload, 'confirmPassword'>, thunkAPI) => {
    try {
      const res = await registerApi(payload);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Đăng ký tài khoản thất bại',
      );
    }
  },
);

export const getMeThunk = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    const { get } = userRoleUserApi;
    const res = await get();

    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Lấy thông tin người dùng thất bại',
    );
  }
});
