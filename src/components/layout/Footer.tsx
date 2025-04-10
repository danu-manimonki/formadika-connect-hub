import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Youtube 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-formadika-teal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/7dbc8780-1573-4f93-8b44-63c106a0fb67.png" 
                alt="FORMADIKA Logo" 
                className="h-12 mr-3"
              />
              <div>
                <h3 className="text-xl font-bold">FORMADIKA</h3>
                <span className="ml-0 text-xs font-medium bg-white text-formadika-teal px-2 py-1 rounded-md">
                  Karanganyar
                </span>
              </div>
            </div>
            <p className="text-formadika-50 mb-6">
              Forum Mahasiswa Bidikmisi dan KIP-K Karanganyar - Komunitas mahasiswa dan alumni penerima beasiswa dari Karanganyar sejak 2012.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Menu Utama</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-formadika-50 hover:text-white transition-colors">
                Beranda
              </Link>
              <Link to="/about" className="text-formadika-50 hover:text-white transition-colors">
                Tentang Kami
              </Link>
              <Link to="/events" className="text-formadika-50 hover:text-white transition-colors">
                Kegiatan
              </Link>
              <Link to="/members" className="text-formadika-50 hover:text-white transition-colors">
                Anggota
              </Link>
              <Link to="/articles" className="text-formadika-50 hover:text-white transition-colors">
                Artikel
              </Link>
              <Link to="/forum" className="text-formadika-50 hover:text-white transition-colors">
                Forum
              </Link>
              <Link to="/contact" className="text-formadika-50 hover:text-white transition-colors">
                Kontak
              </Link>
              <Link to="/donate" className="text-formadika-50 hover:text-white transition-colors">
                Donasi
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-formadika-50">Kabupaten Karanganyar, Jawa Tengah, Indonesia</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-formadika-50">+62 8123 4567 890</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span className="text-formadika-50">formadika.karanganyar@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-formadika-50">
          <p>© {new Date().getFullYear()} FORMADIKA Karanganyar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
