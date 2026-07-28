import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.tsx';
import { AppRouter } from '@/app/providers';
import { QueryProvider } from '@/app/providers';
// import { AuthProvider } from '@/app/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      {/* <AuthProvider> */}
      <AppRouter />
      {/* </AuthProvider> */}
    </QueryProvider>
  </StrictMode>,
);
