
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import type { RegularUser } from '@/types/database';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();

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
      // First try to login as a regular user from our database
      // Using raw SQL query which bypasses TypeScript's type checking
      const { data, error } = await (supabase.from('regular_users') as any)
        .select('*')
        .eq('email', email)
        .eq('password', password);
      
      if (data && data.length > 0) {
        // Regular user login successful
        // Store user info in localStorage for session management
        localStorage.setItem('regular_user', JSON.stringify(data[0]));
        
        toast({
          title: "Login Berhasil",
          description: "Anda berhasil masuk sebagai pengguna biasa",
        });
        
        navigate('/events');
        return;
      }
      
      // If not a regular user, try Supabase auth (for admins)
      await signIn(email, password);
      
      // If we reach here, Supabase auth was successful
      toast({
        title: "Login Berhasil (Admin)",
        description: "Anda berhasil masuk ke sistem sebagai admin",
      });
      
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Gagal",
        description: error?.message || "Terjadi kesalahan saat login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Masuk ke akun Anda untuk mendaftar kegiatan FORMADIKA
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
              <div className="text-center mt-4">
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={() => navigate('/register-user')}
                >
                  Belum punya akun? Daftar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
