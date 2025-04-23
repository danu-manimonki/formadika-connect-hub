
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Berhasil",
          description: "Akun berhasil dibuat",
          variant: "default"
        });
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: isSignUp ? "Gagal membuat akun" : "Login gagal",
        variant: "destructive"
      });
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
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isSignUp ? "Daftar" : "Masuk"}
            </Button>
            <div className="text-center mt-4">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => setIsSignUp(!isSignUp)}
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
