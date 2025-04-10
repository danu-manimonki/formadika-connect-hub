
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  ChevronDown,
  CalendarDays,
  Users,
  BookOpen,
  MessageSquare,
  Heart
} from 'lucide-react';

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
            "flex items-center gap-1 px-3 py-2 text-foreground/80 hover:text-formadika-600 transition-colors",
            isOpen && "text-formadika-600"
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
      className="px-3 py-2 text-foreground/80 hover:text-formadika-600 transition-colors"
    >
      {label}
    </Link>
  );
};

const DropdownItem = ({ to, label, icon }: { to: string; label: string; icon?: React.ReactNode }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-formadika-50 hover:text-formadika-600 transition-colors"
  >
    {icon} {label}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-formadika-600">FORMADIKA</span>
          <span className="ml-2 text-xs font-medium bg-formadika-100 text-formadika-800 px-2 py-1 rounded-md">Karanganyar</span>
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
          
          <div className="ml-4">
            <Button asChild variant="default" size="sm">
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
              <Link to="/" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Beranda
              </Link>
              <Link to="/about" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Tentang Kami
              </Link>
              <Link to="/events" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Kalender Kegiatan
              </Link>
              <Link to="/gallery" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Galeri Dokumentasi
              </Link>
              <Link to="/members" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Direktori Anggota
              </Link>
              <Link to="/register" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Daftar Anggota
              </Link>
              <Link to="/articles" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Artikel
              </Link>
              <Link to="/forum" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Forum
              </Link>
              <Link to="/contact" className="px-3 py-2 hover:text-formadika-600" onClick={() => setIsMenuOpen(false)}>
                Kontak
              </Link>
              <Button asChild variant="default" size="sm" className="w-full">
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
