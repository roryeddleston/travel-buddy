import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937', // Tailwind gray-800
              color: '#f9fafb',       // Tailwind gray-50
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: {
              style: {
                background: '#10b981', // Tailwind green-500
                color: 'white',
              },
            },
            error: {
              style: {
                background: '#ef4444', // Tailwind red-500
                color: 'white',
              },
            },
          }}
        />
      </>
    </StrictMode>
  );
}