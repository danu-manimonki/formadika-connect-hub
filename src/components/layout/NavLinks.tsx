
import NavItem from './NavItem';
import DropdownItem from './DropdownItem';
import { CalendarDays, BookOpen, Users } from 'lucide-react';

const NavLinks = () => {
  return (
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
    </div>
  );
};

export default NavLinks;
