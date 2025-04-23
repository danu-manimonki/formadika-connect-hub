
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { signOut } = useAuth();

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="flex min-h-screen h-screen bg-background">
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      <main className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Admin Dashboard</span>
          </div>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={signOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </Button>
        </div>
        <DashboardContent activeSection={activeSection} />
      </main>
    </div>
  );
}
