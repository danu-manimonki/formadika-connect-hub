
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const benefits = [
  'Jaringan alumni dan mahasiswa dari berbagai kampus',
  'Akses ke informasi beasiswa dan lowongan',
  'Program mentoring dari alumni sukses',
  'Peluang mengikuti berbagai kegiatan pengembangan diri',
  'Kesempatan berpartisipasi dalam kegiatan sosial'
];

const JoinSection = () => {
  return (
    <section className="section bg-gradient-to-r from-formadika-600 to-formadika-500 text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Gabung Bersama Kami
            </div>
            <h2 className="text-3xl font-bold mb-6">Menjadi Bagian dari Komunitas FORMADIKA</h2>
            <p className="text-formadika-50 mb-8">
              FORMADIKA terbuka bagi seluruh mahasiswa penerima beasiswa Bidikmisi, KIP-K, atau beasiswa serupa yang berasal dari Karanganyar. Bergabunglah untuk memperluas jaringan dan mengembangkan potensimu.
            </p>
            
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Check size={14} />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-formadika-600 hover:bg-formadika-50">
                <Link to="/register">Daftar Sekarang</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full h-[400px] bg-white/20 rounded-lg backdrop-blur-sm p-6 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="FORMADIKA Members" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
