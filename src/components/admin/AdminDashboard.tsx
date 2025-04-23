
import { useState } from 'react';
import OverviewCards from './dashboard/OverviewCards';
import DashboardCharts from './dashboard/DashboardCharts';
import DashboardTabs from './dashboard/DashboardTabs';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 p-6">
      <OverviewCards />
      <DashboardCharts />
      <DashboardTabs />
    </div>
  );
}

