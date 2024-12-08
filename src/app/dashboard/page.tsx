import React, { Suspense } from 'react';
import DashboardOverview from '../../components/dashboard-page/ui/DashboardOverview/DashboardOverview';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

async function DashboardHomePage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner size={40} />
        </div>
      }
    >
      <DashboardOverview />
    </Suspense>
  );
}

export default DashboardHomePage;
