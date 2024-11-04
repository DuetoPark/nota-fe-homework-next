import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { MswProvider } from './components/MswWrapper.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MswProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MswProvider>
  </StrictMode>,
);
