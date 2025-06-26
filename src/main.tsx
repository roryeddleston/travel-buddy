import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { AppProviders } from './contexts/AppProviders'; // ✅ Use single wrapper

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppProviders>
        <>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
              },
              success: {
                style: { background: '#10b981', color: 'white' },
              },
              error: {
                style: { background: '#ef4444', color: 'white' },
              },
            }}
          />
        </>
      </AppProviders>
    </StrictMode>
  );
}