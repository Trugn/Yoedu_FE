import { axiosClient } from '@/shared/lib/axios';

import type { LoginPayload, RegisterPayload } from '@/features/auth/types/auth-type';

const API_URL_PREFIX = '/auth';

export const loginApi = async (payload: LoginPayload) => {
    const res = await axiosClient.post(`${API_URL_PREFIX}/login`, payload);

    return res.data;
};

export const registerApi = async (payload: Omit<RegisterPayload, 'confirmPassword'>) => {
    const res = await axiosClient.post(`${API_URL_PREFIX}/register`, payload);

    return res.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
    const res = await axiosClient.post(`${API_URL_PREFIX}/refresh-token`, { refreshToken });

    return res.data;
};
