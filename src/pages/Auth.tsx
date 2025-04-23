
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// Hardcoded admin user
const ADMIN_USER = {
  email: 'admin@formadika.com',
  password: 'Admin1234'
};

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Auth - User already logged in:", user.email);
      if (isAdmin) {
        console.log("Redirecting admin to admin page");
        navigate('/admin');
      } else {
        console.log("Redirecting user to home");
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email dan password harus diisi",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Check if trying to login as admin
      if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        console.log("Admin login successful");
        // For hardcoded admin, we'll bypass the actual auth system
        // and directly redirect to dashboard
        toast({
          title: "Login Berhasil",
          description: "Selamat datang, Admin!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Gagal",
          description: "Email atau password salah",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Login gagal",
        variant: "destructive"
      });
      console.error("Authentication error:", error);
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

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login Admin</CardTitle>
          <CardDescription>
            Masuk ke akun admin Anda
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
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
