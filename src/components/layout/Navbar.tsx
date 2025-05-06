
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  ChevronDown,
  CalendarDays,
  Users,
  BookOpen,
  Heart,
  LogIn,
  LogOut,
  UserPlus,
  UserCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RegularUser } from '@/types/database';

const NavItem = ({ to, label, children, dropdown = false }: { 
  to: string; 
  label: string; 
  children?: React.ReactNode;
  dropdown?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (dropdown && children) {
    return (
      <div className="relative">
        <button
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-foreground/80 hover:text-formadika-teal transition-colors",
            isOpen && "text-formadika-teal"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label} <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className="px-3 py-2 text-foreground/80 hover:text-formadika-teal transition-colors"
    >
      {label}
    </Link>
  );
};

const DropdownItem = ({ to, label, icon }: { to: string; label: string; icon?: React.ReactNode }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-formadika-50 hover:text-formadika-teal transition-colors"
  >
    {icon} {label}
  </Link>
);

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

        <div className="hidden md:flex items-center space-x-1">
          <NavItem to="/" label="Beranda" />
          <NavItem to="/about" label="Tentang Kami" />
          
          <NavItem to="#" label="Kegiatan" dropdown>
            <DropdownItem to="/events" label="Kalender Kegiatan" icon={<CalendarDays size={16} />} />
            <DropdownItem to="/gallery" label="Galeri Dokumentasi" icon={<BookOpen size={16} />} />
          </NavItem>
          
          <NavItem to="#" label="Keanggotaan" dropdown>
            <DropdownItem to="/members" label="Direktori Anggota" icon={<Users size={16} />} />
            <DropdownItem to="/register" label="Daftar Anggota" icon={<Users size={16} />} />
          </NavItem>
          
          <NavItem to="/articles" label="Artikel" />
          <NavItem to="/forum" label="Forum" />
          <NavItem to="/contact" label="Kontak" />
          
          <div className="ml-4 flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <div className="text-sm mr-2">
                  Halo, {userName}
                </div>
                
                {isAdmin ? (
                  <Button 
                    asChild 
                    variant="default" 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link to="/dashboard">Admin Dashboard</Link>
                  </Button>
                ) : regularUser && (
                  <Button 
                    asChild 
                    variant="default" 
                    size="sm" 
                    className="bg-formadika-teal hover:bg-formadika-teal/90 text-white"
                  >
                    <Link to="/user-dashboard">
                      <UserCircle size={16} className="mr-1" /> 
                      Dashboard
                    </Link>
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} /> Keluar
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                  <Link to="/login">
                    <LogIn size={16} className="mr-1" /> Login
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm" className="flex items-center gap-1">
                  <Link to="/register-user">
                    <UserPlus size={16} className="mr-1" /> Daftar
                  </Link>
                </Button>
              </>
            )}
            
            <Button asChild variant="default" size="sm" className="bg-formadika-gold hover:bg-formadika-gold/90 text-white">
              <Link to="/donate" className="flex items-center gap-1">
                <Heart size={16} className="mr-1" /> Donasi
              </Link>
            </Button>
          </div>
        </div>

        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b animate-fade-in">
          <div className="container px-4 py-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Beranda
              </Link>
              <Link to="/about" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Tentang Kami
              </Link>
              <Link to="/events" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Kalender Kegiatan
              </Link>
              <Link to="/gallery" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Galeri Dokumentasi
              </Link>
              <Link to="/members" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Direktori Anggota
              </Link>
              <Link to="/register" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Daftar Anggota
              </Link>
              <Link to="/articles" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Artikel
              </Link>
              <Link to="/forum" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Forum
              </Link>
              <Link to="/contact" className="px-3 py-2 hover:text-formadika-teal" onClick={() => setIsMenuOpen(false)}>
                Kontak
              </Link>
              
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2">
                    Halo, {userName}
                  </div>
                  
                  {isAdmin ? (
                    <Link 
                      to="/dashboard" 
                      className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-1" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : regularUser && (
                    <Link 
                      to="/user-dashboard" 
                      className="px-3 py-2 bg-formadika-teal text-white rounded flex items-center gap-1" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserCircle size={16} className="mr-1" /> Dashboard
                    </Link>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1" 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} /> Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-3 py-2 border rounded flex items-center gap-1" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={16} className="mr-1" /> Login
                  </Link>
                  <Link 
                    to="/register-user" 
                    className="px-3 py-2 bg-gray-100 rounded flex items-center gap-1" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={16} className="mr-1" /> Daftar
                  </Link>
                </>
              )}
              
              <Button asChild variant="default" size="sm" className="w-full bg-formadika-gold hover:bg-formadika-gold/90">
                <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                  <Heart size={16} className="mr-2" /> Donasi
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
