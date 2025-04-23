
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Buat Akun Baru" : "Selamat Datang"}</CardTitle>
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
        </CardContent>
      </Card>
    </div>
  );
}
