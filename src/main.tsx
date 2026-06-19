import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '@/style/index.css';
import App from './App.tsx';
import { store } from '@/app/redux/store';
import ThemeProvider from '@/app/providers/theme/ThemeProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
