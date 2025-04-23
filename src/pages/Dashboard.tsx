
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast({
          title: "Akses Ditolak",
          description: "Anda harus login terlebih dahulu",
          variant: "destructive",
        });
        navigate('/auth');
      } else if (isAdmin) {
        // Redirect admin users to admin dashboard
        navigate('/admin');
      } else {
        // If not admin, show error and redirect to auth
        toast({
          title: "Akses Ditolak",
          description: "Anda tidak memiliki akses admin",
          variant: "destructive",
        });
        navigate('/auth');
      }
    }
  }, [user, isAdmin, navigate, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Memverifikasi akses...</span>
      </div>
    );
  }

  return null;
}
