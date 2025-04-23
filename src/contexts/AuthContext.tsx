
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async (userId: string) => {
      try {
        console.log("Checking admin status for user:", userId);
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .eq('role', 'admin')
          .single();

        if (error) {
          console.error("Error checking admin status:", error);
        }
        
        const hasAdminRole = !!data;
        console.log("Admin status result:", hasAdminRole, data);
        setIsAdmin(hasAdminRole);
      } catch (err) {
        console.error("Exception in checkAdminStatus:", err);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.email);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase auth state
          setTimeout(() => {
            checkAdminStatus(newSession.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting sign in with:", email);
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        console.error("Sign in error:", error);
        toast({
          title: "Login Gagal",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      // Successful login
      toast({
        title: "Login Berhasil",
        description: "Anda berhasil masuk ke sistem",
      });

      // Navigation is now handled by the onAuthStateChange event
    } catch (error: any) {
      console.error("Exception during sign in:", error);
      toast({
        title: "Login Gagal",
        description: error?.message || "Terjadi kesalahan saat login",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    console.log("Attempting signup with:", email);
    
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        console.error("Sign up error:", error);
        toast({
          title: "Pendaftaran Gagal",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      console.log("Signup response:", data);
      toast({
        title: "Pendaftaran Berhasil",
        description: "Akun berhasil dibuat. Silakan masuk dengan akun baru Anda.",
      });
    } catch (error: any) {
      console.error("Exception during sign up:", error);
      toast({
        title: "Pendaftaran Gagal",
        description: error?.message || "Terjadi kesalahan saat pendaftaran",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
