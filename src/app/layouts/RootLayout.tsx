import { Outlet } from 'react-router-dom';
import AppInit from '@/app/init/AppInit';

export default function RootLayout() {
  return (
    <AppInit>
      <Outlet />
    </AppInit>
  );
}
