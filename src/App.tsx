import { App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/routes';

const App = () => {
    return (
        <AntdApp>
            <RouterProvider router={router} />
        </AntdApp>
    );
};

export default App;
