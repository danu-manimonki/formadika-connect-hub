
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
    // Fixed function to check admin status correctly
    const checkAdminStatus = async (userId: string) => {
      try {
        console.log("Checking admin status for user:", userId);

        // Direct SQL query instead of using the RLS-protected table
        const { data, error } = await supabase
          .from('user_roles')
          .select('id')
          .eq('user_id', userId)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          return;
        }
        
        const hasAdminRole = !!data;
        console.log("Admin status result:", hasAdminRole);
        setIsAdmin(hasAdminRole);
      } catch (err) {
        console.error("Exception in checkAdminStatus:", err);
        setIsAdmin(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.email);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Use setTimeout to avoid potential recursion
          setTimeout(() => {
            checkAdminStatus(newSession.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Initial session check
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
      const { data, error } = await supabase.auth.signInWithPassword({ 
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

      const user = data.user;
      
      // Correctly check admin status
      if (user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('id')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
          
        if (roleData) {
          console.log("User is admin, redirecting to admin page");
          setIsAdmin(true);
          navigate('/admin');
        } else {
          // Redirect regular users to the dashboard page
          navigate('/dashboard');
        }
      }
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
