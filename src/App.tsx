import {RouterProvider} from 'react-router-dom'
import { router } from './app/routers/routes';

const App = () => {
    return <RouterProvider router={router} />
};

export default App;
