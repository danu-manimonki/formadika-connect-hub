
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, BookOpen, Image } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-section bg-gradient-to-r from-formadika-teal to-[#0085a1]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00TTAgMGg0djRIMHpNNiA2aDR2NEg2ek0xMiAxMmg0djRoLTR6TTE4IDE4aDR2NGgtNHpNMjQgMjRoNHY0aC00ek0zMCAzMGg0djRoLTR6TTM2IDM2aDR2NGgtNHpNNDIgNDJoNHY0aC00ek00OCA0OGg0djRoLTR6TTYgMGg0djRINnpNMTIgNmg0djRoLTR6TTE4IDEyaDR2NGgtNHpNMjQgMThoNHY0aC00ek0zMCAyNGg0djRoLTR6TTM2IDMwaDR2NGgtNHpNNDIgMzZoNHY0aC00ek00OCA0Mmg0djRoLTR6TTU0IDQ4aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
      <div className="container relative mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/7b14fac9-3021-4d9e-985a-56c2299fba6c.png" 
              alt="FORMADIKA Logo" 
              className="h-24 md:h-28"
            />
          </div>
          <h1 className="text-white mb-2">
            FORMADIKA Karanganyar
          </h1>
          <div className="mb-6 text-center">
            <p className="text-xl md:text-2xl font-medium">
              <span className="tagline-teal bg-white px-2 rounded">SATU RASA</span>
              <span className="text-white mx-2">•</span>
              <span className="tagline-gold bg-white px-2 rounded">SATU KELUARGA</span>
            </p>
          </div>
          <p className="text-formadika-50 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Komunitas mahasiswa dan alumni penerima beasiswa dari Karanganyar yang aktif sejak tahun 2012.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-formadika-gold hover:bg-formadika-gold/90 text-white">
              <Link to="/register">
                Bergabung Sekarang <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/about">Tentang Kami</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/logo-processor">
                <Image className="mr-2 h-4 w-4" /> Logo Transparan
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-white text-xl mb-2">Komunitas Aktif</h3>
            <p className="text-formadika-50">
              Bergabunglah dengan jaringan mahasiswa dan alumni berbakat dari seluruh Indonesia.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-white" size={24} />
            </div>
            <h3 className="text-white text-xl mb-2">Program Rutin</h3>
            <p className="text-formadika-50">
              Ikuti program mentoring, workshop, dan kegiatan sosial yang rutin diselenggarakan.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="text-white" size={24} />
            </div>
            <h3 className="text-white text-xl mb-2">Akses Informasi</h3>
            <p className="text-formadika-50">
              Dapatkan informasi beasiswa, lowongan kerja, dan peluang pendidikan lanjut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
