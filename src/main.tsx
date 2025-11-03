import React from 'react';
import { createRoot } from 'react-dom/client';

import { DashboardV2 } from '@playground/pages/DashboardV2';
import { DealProvider } from './contexts/DealContext';
import { ToastProvider } from './components/feedback/Toast';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DealProvider>
      <ToastProvider>
        <DashboardV2 currentPage="dashboard-v2" navigateTo={() => {}} />
      </ToastProvider>
    </DealProvider>
  </React.StrictMode>,
);
