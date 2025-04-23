
import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const handleSignOut = async (): Promise<void> => {
    navigate('/auth');
    return Promise.resolve();
  };

  return (
    <div className="flex min-h-screen h-screen bg-background">
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        signOut={handleSignOut} 
      />
      <DashboardContent activeSection={activeSection} />
    </div>
  );
}
