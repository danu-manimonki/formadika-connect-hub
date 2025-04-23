
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Hardcoded admin credentials for checking
const ADMIN_USER = {
  email: 'admin@formadika.com',
  password: 'Admin1234' // Not used for verification, just for reference
};

export default function Dashboard() {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [isHardcodedAdmin, setIsHardcodedAdmin] = useState(false);

  useEffect(() => {
    console.log("Dashboard page - User:", user?.email);
    console.log("Dashboard page - Is admin:", isAdmin);
    
    // Check if this is our hardcoded admin (checking the route came from /auth)
    const checkAccess = async () => {
      if (!loading) {
        setIsChecking(false);
        
        // If it's our hardcoded admin (coming from Auth page), allow access
        const isComingFromAuth = document.referrer.includes('/auth');
        
        if (user && user.email === ADMIN_USER.email) {
          setIsHardcodedAdmin(true);
        } else if (!user && !isComingFromAuth) {
          console.log("No user, redirecting to auth");
          toast({
            title: "Akses Ditolak",
            description: "Anda harus login terlebih dahulu",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        } else if (!isAdmin && !isComingFromAuth) {
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

  // Allow access for hardcoded admin even without Supabase auth
  if ((!user && !isHardcodedAdmin) || (!isAdmin && !isHardcodedAdmin)) return null;

  const handleSignOut = () => {
    if (signOut) {
      signOut();
    }
    navigate('/auth');
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
