
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state change listener FIRST
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

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          return;
        }
        
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          
          if (data.session.user) {
            checkAdminStatus(data.session.user.id);
          }
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fixed function to check admin status correctly
  const checkAdminStatus = async (userId: string) => {
    try {
      console.log("Checking admin status for user:", userId);

      // Use the has_role function we created in SQL
      const { data, error } = await supabase
        .rpc('has_role', { 
          user_id: userId, 
          role: 'admin' 
        });

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        return;
      }
      
      console.log("Admin status result:", data);
      setIsAdmin(!!data);
    } catch (err) {
      console.error("Exception in checkAdminStatus:", err);
      setIsAdmin(false);
    }
  };

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

      // Navigation will happen based on admin status check in useEffect
      // Redirect to dashboard by default
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Exception during sign in:", error);
      toast({
        title: "Login Gagal",
        description: error?.message || "Terjadi kesalahan saat login",
        variant: "destructive"
      });
      throw error;
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
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
