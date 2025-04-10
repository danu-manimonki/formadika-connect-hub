
import { useState } from 'react';
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, UserCheck, UserPlus, MapPin, School, Briefcase } from "lucide-react";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for members
  const members = [
    {
      id: 1,
      name: "Agus Widodo",
      university: "Universitas Gadjah Mada",
      major: "Teknik Informatika",
      batch: "2020",
      location: "Yogyakarta",
      role: "Ketua FORMADIKA",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      isAlumni: false
    },
    {
      id: 2,
      name: "Dina Pratiwi",
      university: "Universitas Sebelas Maret",
      major: "Akuntansi",
      batch: "2021",
      location: "Surakarta",
      role: "Sekretaris",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      isAlumni: false
    },
    {
      id: 3,
      name: "Budi Santoso",
      university: "Institut Teknologi Bandung",
      major: "Teknik Sipil",
      batch: "2019",
      location: "Bandung",
      role: "Bendahara",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      isAlumni: false
    },
    {
      id: 4,
      name: "Rina Wahyuni",
      university: "Universitas Diponegoro",
      major: "Ilmu Komunikasi",
      batch: "2021",
      location: "Semarang",
      role: "Koordinator Divisi Pendidikan",
      image: "https://randomuser.me/api/portraits/women/62.jpg",
      isAlumni: false
    },
    {
      id: 5,
      name: "Andi Permana",
      university: "Universitas Brawijaya",
      major: "Manajemen",
      batch: "2020",
      location: "Malang",
      role: "Koordinator Divisi Humas",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      isAlumni: false
    },
    {
      id: 6,
      name: "Indah Lestari",
      university: "Universitas Indonesia",
      major: "Psikologi",
      batch: "2019",
      location: "Jakarta",
      role: "Koordinator Divisi Pengabdian",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      isAlumni: false
    },
    {
      id: 7,
      name: "Rizki Ramadhan",
      university: "Institut Seni Indonesia Surakarta",
      major: "Desain Komunikasi Visual",
      batch: "2020",
      location: "Surakarta",
      role: "Koordinator Divisi Kreatif",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      isAlumni: false
    },
    {
      id: 8,
      name: "Rahmat Hidayat",
      university: "Universitas Gadjah Mada",
      major: "Ilmu Hukum",
      batch: "2018",
      location: "Jakarta",
      role: "Legal Consultant",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      isAlumni: true
    },
    {
      id: 9,
      name: "Dewi Anggraini",
      university: "Universitas Indonesia",
      major: "Kedokteran",
      batch: "2017",
      location: "Jakarta",
      role: "Dokter",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      isAlumni: true
    },
    {
      id: 10,
      name: "Faisal Rahman",
      university: "Institut Teknologi Bandung",
      major: "Teknik Elektro",
      batch: "2016",
      location: "Bandung",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      isAlumni: true
    }
  ];
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.major.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const activeMembers = filteredMembers.filter(member => !member.isAlumni);
  const alumniMembers = filteredMembers.filter(member => member.isAlumni);

  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Direktori Anggota
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Anggota & Alumni FORMADIKA
            </h1>
            <p className="text-xl text-formadika-50">
              Kenali rekan-rekan mahasiswa dan alumni FORMADIKA Karanganyar dari berbagai perguruan tinggi di Indonesia.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-10 bg-formadika-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Cari anggota berdasarkan nama, perguruan tinggi, atau jurusan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="gap-2">
                <a href="#active"><UserCheck size={16} /> Anggota Aktif</a>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <a href="#alumni"><UserPlus size={16} /> Alumni</a>
              </Button>
            </div>
          </div>
          
          <div id="active" className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-formadika-teal">Anggota Aktif</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow transition-transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-formadika-teal text-sm mb-2">{member.role}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-start">
                        <School size={14} className="mr-2 mt-1 flex-shrink-0" />
                        <span>{member.university}<br />{member.major} ({member.batch})</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={14} className="mr-2 mt-1 flex-shrink-0" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div id="alumni">
            <h2 className="text-2xl font-bold mb-6 text-formadika-teal">Alumni</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {alumniMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow transition-transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <div className="inline-block bg-formadika-gold/20 text-formadika-brown px-2 py-0.5 rounded-full text-xs mb-2">
                      Alumni
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-start">
                        <School size={14} className="mr-2 mt-1 flex-shrink-0" />
                        <span>{member.university}<br />{member.major} ({member.batch})</span>
                      </div>
                      <div className="flex items-start">
                        <Briefcase size={14} className="mr-2 mt-1 flex-shrink-0" />
                        <span>{member.role}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={14} className="mr-2 mt-1 flex-shrink-0" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">Ingin bergabung dengan komunitas FORMADIKA Karanganyar?</p>
            <Button asChild className="mt-4 gap-2">
              <a href="/register"><UserPlus size={16} /> Daftar Sekarang</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Members;
