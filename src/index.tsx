import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MainProvider } from './context/AppContext';
import { QueryClient, QueryClientProvider, } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const webQueryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={webQueryClient}>
      <MainProvider>
        <App />
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </MainProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
