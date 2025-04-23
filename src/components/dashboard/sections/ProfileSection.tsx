
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User } from "lucide-react";

export default function ProfileSection() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle updating profile
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profil Admin</h2>
        <p className="text-muted-foreground">
          Kelola informasi dan akun admin
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>
              Lihat dan edit informasi akun admin Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-2xl">
                  <User size={24} />
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-medium">{user?.email}</p>
                <p className="text-sm text-muted-foreground">Administrator</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">Nama Depan</Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nama Belakang</Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              {isEditing && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password Baru</Label>
                    <Input 
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword} 
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-end">
                {isEditing ? (
                  <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Batal
                    </Button>
                    <Button type="submit">
                      Simpan Perubahan
                    </Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profil
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Keamanan Akun</CardTitle>
            <CardDescription>
              Pengaturan keamanan untuk akun admin Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Pastikan untuk menggunakan password yang kuat dan jangan bagikan akses akun admin kepada orang lain.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <h3 className="font-medium">Login Terakhir</h3>
              <p className="text-sm text-muted-foreground">23 April 2025, 10:45 WIB</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Password Terakhir Diubah</h3>
              <p className="text-sm text-muted-foreground">Belum pernah diubah</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Ubah Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
