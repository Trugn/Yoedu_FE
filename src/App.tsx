import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/routes';
import AntdProvider from '@/app/providers/antd/AntdProvider';

const App = () => {
    return (
        <AntdProvider>
            <RouterProvider router={router} />
        </AntdProvider>
    );
};

export default App;
