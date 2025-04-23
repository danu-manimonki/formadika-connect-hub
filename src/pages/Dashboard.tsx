
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function Dashboard() {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    console.log("Dashboard page - User:", user?.email);
    console.log("Dashboard page - Is admin:", isAdmin);
    
    const checkAccess = async () => {
      if (!loading) {
        setIsChecking(false);
        
        if (!user) {
          console.log("No user, redirecting to auth");
          toast({
            title: "Akses Ditolak",
            description: "Anda harus login terlebih dahulu",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        } 
        
        if (!isAdmin) {
          console.log("Not admin, redirecting to home");
          toast({
            title: "Akses Ditolak",
            description: "Anda tidak memiliki akses admin",
            variant: "destructive",
          });
          navigate('/');
        }
      }
    };

    checkAccess();
  }, [user, isAdmin, navigate, loading]);

  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Memverifikasi akses...</span>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="flex min-h-screen h-screen bg-background">
      <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} signOut={signOut} />
      <DashboardContent activeSection={activeSection} />
    </div>
  );
}
