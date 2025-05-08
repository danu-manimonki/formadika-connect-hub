
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RegularUser } from '@/types/database';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, user, signOut } = useAuth();
  const [regularUser, setRegularUser] = useState<RegularUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for regular user in localStorage
    const storedUser = localStorage.getItem('regular_user');
    if (storedUser) {
      setRegularUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    if (user) {
      // Supabase auth signout
      signOut();
    } else if (regularUser) {
      // Regular user signout (clear localStorage)
      localStorage.removeItem('regular_user');
      setRegularUser(null);
      navigate('/');
    }
  };

  const isLoggedIn = !!user || !!regularUser;
  const userName = user?.email?.split('@')[0] || regularUser?.name || '';
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/7dbc8780-1573-4f93-8b44-63c106a0fb67.png" 
              alt="FORMADIKA Logo" 
              className="h-10 mr-2"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-formadika-teal">FORMADIKA</span>
            </div>
          </div>
        </Link>

        <NavLinks />
        
        <div className="hidden md:flex">
          <UserMenu 
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            regularUser={regularUser}
            handleSignOut={handleSignOut}
          />
        </div>

        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLoggedIn={isLoggedIn}
        userName={userName}
        isAdmin={isAdmin}
        regularUser={regularUser}
        handleSignOut={handleSignOut}
      />
    </header>
  );
};

export default Navbar;
