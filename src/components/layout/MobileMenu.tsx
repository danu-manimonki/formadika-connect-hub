
import { Link } from 'react-router-dom';
import { UserCircle, LogOut, LogIn, UserPlus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RegularUser } from '@/types/database';

type MobileMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
  userName: string;
  isAdmin: boolean;
  regularUser: RegularUser | null;
  handleSignOut: () => void;
};

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  isLoggedIn,
  userName,
  isAdmin,
  regularUser,
  handleSignOut,
}: MobileMenuProps) => {
  if (!isMenuOpen) return null;
  
  return (
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
  );
};

export default MobileMenu;
