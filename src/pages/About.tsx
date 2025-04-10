import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VisionMission = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="inline-block bg-formadika-100 text-formadika-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
        Visi
      </div>
      <h3 className="text-xl font-semibold mb-4">
        Menjadi komunitas mahasiswa yang unggul dan berkontribusi aktif bagi pengembangan Karanganyar
      </h3>
      <p className="text-gray-600">
        FORMADIKA berkomitmen untuk mencetak generasi unggul yang dapat memberikan kontribusi positif bagi kemajuan daerah asal, khususnya Kabupaten Karanganyar melalui pengembangan potensi akademik dan non-akademik.
      </p>
    </div>
    
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="inline-block bg-formadika-100 text-formadika-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
        Misi
      </div>
      <ul className="space-y-3 text-gray-600">
        <li className="flex items-start">
          <span className="bg-formadika-100 text-formadika-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            1
          </span>
          <span>Membangun jaringan yang kuat antara mahasiswa penerima beasiswa dari Karanganyar</span>
        </li>
        <li className="flex items-start">
          <span className="bg-formadika-100 text-formadika-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            2
          </span>
          <span>Mengembangkan kemampuan akademik dan soft skill mahasiswa melalui program rutin</span>
        </li>
        <li className="flex items-start">
          <span className="bg-formadika-100 text-formadika-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            3
          </span>
          <span>Melaksanakan program pengabdian untuk mendukung kemajuan daerah Karanganyar</span>
        </li>
        <li className="flex items-start">
          <span className="bg-formadika-100 text-formadika-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            4
          </span>
          <span>Membangun kolaborasi dengan instansi dan organisasi lain untuk perluasan dampak</span>
        </li>
      </ul>
    </div>
  </div>
);

const OrganizationalStructure = () => {
  const leaders = [
    {
      name: "Agus Widodo",
      position: "Ketua",
      university: "Universitas Gadjah Mada",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Dina Pratiwi",
      position: "Sekretaris",
      university: "Universitas Sebelas Maret",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Budi Santoso",
      position: "Bendahara",
      university: "Institut Teknologi Bandung",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  const divisionHeads = [
    {
      name: "Rina Wahyuni",
      position: "Koordinator Divisi Pendidikan",
      university: "Universitas Diponegoro",
      image: "https://randomuser.me/api/portraits/women/62.jpg"
    },
    {
      name: "Andi Permana",
      position: "Koordinator Divisi Humas",
      university: "Universitas Brawijaya",
      image: "https://randomuser.me/api/portraits/men/12.jpg"
    },
    {
      name: "Indah Lestari",
      position: "Koordinator Divisi Pengabdian",
      university: "Universitas Indonesia",
      image: "https://randomuser.me/api/portraits/women/55.jpg"
    },
    {
      name: "Rizki Ramadhan",
      position: "Koordinator Divisi Kreatif",
      university: "Institut Seni Indonesia Surakarta",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  const PersonCard = ({ person, isLeader = false }) => (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col ${isLeader ? 'transform hover:-translate-y-1 transition-transform' : ''}`}>
      <div className="h-48 overflow-hidden">
        <img 
          src={person.image} 
          alt={person.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="font-semibold text-lg">{person.name}</h4>
        <p className="text-formadika-600 mb-1">{person.position}</p>
        <p className="text-sm text-gray-500">{person.university}</p>
      </div>
    </div>
  );

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-8 text-center">Pengurus Periode 2024-2025</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {leaders.map((leader) => (
          <PersonCard key={leader.name} person={leader} isLeader />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {divisionHeads.map((head) => (
          <PersonCard key={head.name} person={head} />
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Tentang Kami
            </div>
            <h1 className="text-4xl font-bold mb-6">
              FORMADIKA
            </h1>
            <p className="text-xl text-formadika-50">
              Forum Mahasiswa Bidikmisi dan KIP-K Karanganyar — Komunitas mahasiswa dan alumni penerima beasiswa dari Karanganyar yang aktif sejak tahun 2012.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
                Sejarah Kami
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Perjalanan FORMADIKA
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  FORMADIKA Karanganyar didirikan pada tahun 2012 oleh sekelompok mahasiswa penerima beasiswa Bidikmisi asal Karanganyar yang berkuliah di berbagai perguruan tinggi. Berawal dari keresahan akan minimnya wadah komunikasi dan kolaborasi antar mahasiswa penerima beasiswa, forum ini dibentuk untuk menjembatani kebutuhan tersebut.
                </p>
                <p>
                  Pada awalnya, FORMADIKA hanya beranggotakan 25 mahasiswa dari 5 perguruan tinggi. Seiring berjalannya waktu, keanggotaan FORMADIKA terus bertambah dan saat ini telah memiliki lebih dari 300 anggota yang tersebar di lebih dari 50 perguruan tinggi di Indonesia.
                </p>
                <p>
                  Sejak tahun 2018, FORMADIKA mulai aktif menyelenggarakan berbagai kegiatan sosial dan edukasi di Karanganyar, seperti bimbingan belajar gratis, sosialisasi beasiswa, dan pengabdian masyarakat.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
                  alt="FORMADIKA History" 
                  className="rounded-lg shadow-md h-40 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="FORMADIKA Events" 
                  className="rounded-lg shadow-md h-56 w-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80" 
                  alt="FORMADIKA Members" 
                  className="rounded-lg shadow-md h-56 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="FORMADIKA Activities" 
                  className="rounded-lg shadow-md h-40 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-formadika-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
              Landasan Kami
            </div>
            <h2 className="text-3xl font-bold">Visi & Misi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Landasan yang menjadi pedoman dan arah gerak FORMADIKA Karanganyar.
            </p>
          </div>
          
          <VisionMission />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
              Struktur Organisasi
            </div>
            <h2 className="text-3xl font-bold">Pengurus FORMADIKA</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Kenali pengurus yang mengelola dan mengembangkan FORMADIKA.
            </p>
          </div>
          
          <OrganizationalStructure />
        </div>
      </section>

      <section className="bg-formadika-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Jadilah Bagian dari FORMADIKA</h2>
          <p className="text-xl text-formadika-50 max-w-2xl mx-auto mb-8">
            Bagi mahasiswa penerima Bidikmisi atau KIP-K asal Karanganyar, kami mengundang Anda untuk bergabung dengan komunitas kami.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-formadika-600 hover:bg-formadika-50">
              <Link to="/register">Daftar Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/contact">Hubungi Kami <ArrowRight size={16} className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
