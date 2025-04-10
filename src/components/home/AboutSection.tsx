
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="section bg-white">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
              alt="FORMADIKA Karanganyar" 
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
          </div>
          
          <div className="lg:w-1/2">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
              Tentang Kami
            </div>
            <h2 className="text-3xl font-bold mb-4">FORMADIKA Karanganyar</h2>
            <p className="text-gray-700 mb-6">
              FORMADIKA (Forum Mahasiswa Bidikmisi dan KIP-K Karanganyar) adalah komunitas mahasiswa dan alumni penerima beasiswa dari Karanganyar yang aktif sejak tahun 2012.
            </p>
            <p className="text-gray-700 mb-6">
              Kami bertujuan untuk membangun jaringan yang kuat antar penerima beasiswa, memberikan pendampingan dan mentoring bagi mahasiswa baru, serta berkontribusi pada pengembangan daerah Karanganyar melalui berbagai program sosial dan edukasi.
            </p>
            <Button asChild>
              <Link to="/about">
                Selengkapnya <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
