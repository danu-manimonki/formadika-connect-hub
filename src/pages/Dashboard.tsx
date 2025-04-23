
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Loader2, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!loading) {
        setIsChecking(false);
        
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

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Pengguna</h1>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>Detail akun anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Email:</span> 
                <span>{user.email}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bergabung sejak: {new Date(user.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Riwayat aktivitas anda</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Belum ada aktivitas terbaru</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
