
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [showAdminTools, setShowAdminTools] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        // If not admin, show error and redirect back to auth
        toast({
          title: "Akses Ditolak",
          description: "Anda tidak memiliki akses admin",
          variant: "destructive",
        });
      }
    }
  }, [user, isAdmin, navigate]);

  // Toggle admin tools visibility with double click
  const handleSecretClick = () => {
    setShowAdminTools(!showAdminTools);
  };

  // Simple email validation
  const isValidEmail = (email: string) => {
    // Basic email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!isValidEmail(email)) {
      toast({
        title: "Format Email Salah",
        description: "Masukkan alamat email yang valid",
        variant: "destructive"
      });
      return;
    }
    
    // Validate password
    if (password.length < 6) {
      toast({
        title: "Password Terlalu Pendek",
        description: "Password harus minimal 6 karakter",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Berhasil",
          description: "Akun berhasil dibuat. Silakan masuk.",
          variant: "default"
        });
        // Switch to login mode after successful registration
        setIsSignUp(false);
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || (isSignUp ? "Gagal membuat akun" : "Login gagal"),
        variant: "destructive"
      });
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeAdmin = async () => {
    if (!adminEmail || !isValidEmail(adminEmail)) {
      toast({
        title: "Format Email Salah",
        description: "Masukkan alamat email yang valid",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use RPC function to add admin role
      const { data, error } = await supabase.rpc('add_admin_role', {
        user_email: adminEmail
      });

      if (error) {
        if (error.code === '23505') { // Duplicate key error
          toast({
            title: "Informasi",
            description: `User ${adminEmail} sudah memiliki role admin`,
            variant: "default"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Berhasil",
          description: `User ${adminEmail} telah dijadikan admin`,
          variant: "default"
        });
      }
    } catch (error: any) {
      console.error("Error making admin:", error);
      toast({
        title: "Gagal Menjadikan Admin",
        description: error.message || "Terjadi kesalahan saat menjadikan user sebagai admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Memverifikasi status login...</span>
      </div>
    );
  }

  // If already logged in, don't render the auth form
  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle onDoubleClick={handleSecretClick}>{isSignUp ? "Buat Akun Baru" : "Selamat Datang"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Daftar untuk mulai bergabung" : "Masuk ke akun Anda"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isSignUp && <p className="text-xs text-muted-foreground mt-1">Password minimal 6 karakter</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : (isSignUp ? "Daftar" : "Masuk")}
            </Button>
            <div className="text-center mt-4">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                {isSignUp 
                  ? "Sudah punya akun? Masuk" 
                  : "Belum punya akun? Daftar"}
              </Button>
            </div>
          </form>
          
          {showAdminTools && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-medium mb-4">Admin Tools</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email User</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="Email user yang akan dijadikan admin"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  disabled={isLoading}
                  onClick={handleMakeAdmin}
                >
                  {isLoading ? "Memproses..." : "Jadikan Admin"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
