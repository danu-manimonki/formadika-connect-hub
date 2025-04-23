
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("Admin page - User:", user?.email);
    console.log("Admin page - Is admin:", isAdmin);
    console.log("Admin page - Loading:", loading);

    const checkAccess = () => {
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
        } else if (!isAdmin) {
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
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>
      <AdminDashboard />
    </div>
  );
}
