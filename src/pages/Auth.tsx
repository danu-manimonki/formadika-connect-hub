
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

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
      if (isSignUp) {
        // Signup flow with optional admin key
        if (adminKey && adminKey !== 'admin123') {
          toast({
            title: "Error",
            description: "Kunci admin tidak valid",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        await signUp(email, password);
        
        // If admin key is correct, add admin role
        if (adminKey === 'admin123') {
          const { error } = await supabase.rpc('add_admin_role', { user_email: email });
          
          if (error) {
            console.error('Failed to add admin role:', error);
            toast({
              title: "Peringatan",
              description: "Akun dibuat, tetapi gagal menetapkan peran admin",
              variant: "default"
            });
          } else {
            toast({
              title: "Sukses",
              description: "Akun admin berhasil dibuat",
            });
          }
        }
      } else {
        // Login flow
        await signIn(email, password);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      // The toast for failed login is shown in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Daftar Admin' : 'Login Admin'}</CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Buat akun admin baru' 
              : 'Masuk ke akun admin Anda'}
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
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="adminKey">Kunci Admin (Opsional)</Label>
                <Input
                  id="adminKey"
                  type="password"
                  placeholder="Masukkan kunci admin"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? "Memproses..." 
                : (isSignUp ? "Daftar" : "Masuk")}
            </Button>
            <div className="text-center mt-4">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp 
                  ? "Sudah punya akun? Login" 
                  : "Belum punya akun? Daftar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
