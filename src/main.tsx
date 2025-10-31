import React from 'react';
import { createRoot } from 'react-dom/client';

import { DashboardV2 } from '@playground/pages/DashboardV2';
import { DealProvider } from '@/contexts/DealContext';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DealProvider>
      <DashboardV2 navigateTo={() => {}} currentPage="dashboard" />
    </DealProvider>
  </React.StrictMode>,
);
