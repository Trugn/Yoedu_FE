import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { getMeThunk } from '@/features/auth/store/auth-thunk';
import { markInitialized, restoreToken } from '@/features/auth/store/auth-slice';

export default function AppInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector((state) => state.auth);
  const initRef = useRef(false);

  useEffect(() => {
    // Chỉ chạy 1 lần duy nhất
    if (initRef.current) return;
    initRef.current = true;

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Khôi phục token từ localStorage vào Redux ngay lập tức
    // Điều này cho phép ProtectedRoute cho phép truy cập ngay
    if (accessToken && refreshToken) {
      dispatch(restoreToken());
      // Sau đó gọi API để lấy user info
      dispatch(getMeThunk());
    } else {
      dispatch(markInitialized());
    }
  }, [dispatch]);

  return children;
}
