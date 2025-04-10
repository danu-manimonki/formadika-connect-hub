
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  User,
  ChevronRight,
  FileText,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Lightbulb,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Categories for filtering
  const categories = [
    { id: "all", name: "Semua", icon: FileText },
    { id: "scholarship", name: "Beasiswa", icon: GraduationCap },
    { id: "career", name: "Karir", icon: Briefcase },
    { id: "education", name: "Pendidikan", icon: BookOpen },
    { id: "success-story", name: "Kisah Sukses", icon: Award },
    { id: "tips", name: "Tips & Trik", icon: Lightbulb },
  ];
  
  // Mock article data
  const allArticles = [
    {
      id: 1,
      title: "Tips Lolos Seleksi Beasiswa Luar Negeri",
      excerpt: "Beberapa tips dan trik untuk mempersiapkan diri dalam seleksi beasiswa studi lanjut ke luar negeri. Simak pengalaman alumni FORMADIKA yang berhasil mendapatkan beasiswa prestasi ke berbagai negara tujuan.",
      date: "10 April 2025",
      author: "Budi Santoso",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "scholarship",
      readTime: "5 menit"
    },
    {
      id: 2,
      title: "Manajemen Keuangan untuk Mahasiswa Penerima Beasiswa",
      excerpt: "Panduan praktis mengelola keuangan selama masa studi dengan dana beasiswa yang terbatas. Termasuk tips menabung, investasi sederhana, dan menyusun anggaran bulanan yang efektif.",
      date: "5 April 2025",
      author: "Siti Rahma",
      image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "tips",
      readTime: "7 menit"
    },
    {
      id: 3,
      title: "Persiapan Memasuki Dunia Kerja Setelah Lulus Kuliah",
      excerpt: "Berbagai hal yang perlu dipersiapkan fresh graduate sebelum memasuki dunia kerja, mulai dari menyusun CV, persiapan interview, hingga membangun personal branding.",
      date: "28 Maret 2025",
      author: "Andi Permana",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      category: "career",
      readTime: "6 menit"
    },
    {
      id: 4,
      title: "Program Beasiswa Pascasarjana Dalam dan Luar Negeri 2025",
      excerpt: "Daftar program beasiswa pascasarjana yang bisa dilamar oleh mahasiswa dan alumni Karanganyar di tahun 2025. Termasuk persyaratan, timeline, dan tips dari alumni yang berhasil.",
      date: "15 Maret 2025",
      author: "Dewi Anggraini",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      category: "scholarship",
      readTime: "10 menit"
    },
    {
      id: 5,
      title: "Dari Bidikmisi ke Beasiswa S2 di Australia: Kisah Sukses Alumni",
      excerpt: "Cerita inspiratif dari alumni FORMADIKA yang berhasil melanjutkan studi S2 di Australia setelah menyelesaikan S1 dengan beasiswa Bidikmisi. Berisi cerita perjuangan dan tips sukses.",
      date: "5 Maret 2025",
      author: "Rahmat Hidayat",
      image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      category: "success-story",
      readTime: "8 menit"
    },
    {
      id: 6,
      title: "Metode Belajar Efektif untuk Mahasiswa",
      excerpt: "Berbagai metode dan teknik belajar yang telah terbukti efektif untuk meningkatkan prestasi akademik mahasiswa, termasuk manajemen waktu dan penggunaan teknologi.",
      date: "25 Februari 2025",
      author: "Rina Wahyuni",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "education",
      readTime: "7 menit"
    },
    {
      id: 7,
      title: "Program Pengembangan Skill Digital untuk Mahasiswa",
      excerpt: "Informasi mengenai berbagai program pengembangan keahlian digital yang bisa diikuti oleh mahasiswa, termasuk sertifikasi gratis dan pelatihan daring.",
      date: "15 Februari 2025",
      author: "Faisal Rahman",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "education",
      readTime: "6 menit"
    },
    {
      id: 8,
      title: "Membangun Jaringan Profesional Sejak Bangku Kuliah",
      excerpt: "Panduan praktis membangun networking profesional sejak masa kuliah yang akan bermanfaat untuk karir di masa depan. Termasuk strategi menggunakan LinkedIn dan menghadiri event.",
      date: "5 Februari 2025",
      author: "Indah Lestari",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      category: "career",
      readTime: "5 menit"
    }
  ];
  
  // Filter articles based on category and search term
  const filteredArticles = allArticles
    .filter(article => 
      activeCategory === "all" || article.category === activeCategory
    )
    .filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  // Featured / latest article
  const featuredArticle = allArticles[0];
  
  const getCategoryColor = (categoryId) => {
    switch(categoryId) {
      case "scholarship":
        return "bg-blue-100 text-blue-800";
      case "career":
        return "bg-green-100 text-green-800";
      case "education":
        return "bg-purple-100 text-purple-800";
      case "success-story":
        return "bg-yellow-100 text-yellow-800";
      case "tips":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Artikel
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Artikel & Informasi
            </h1>
            <p className="text-xl text-formadika-50">
              Baca berbagai artikel informatif dan edukatif tentang beasiswa, karir, pendidikan, dan kisah sukses alumni.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-formadika-50">
        <div className="container mx-auto px-4">
          {/* Featured Article */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Artikel Terbaru</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-3">
                    <Badge className={getCategoryColor(featuredArticle.category)}>
                      {getCategoryName(featuredArticle.category)}
                    </Badge>
                    <div className="flex items-center ml-4 text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <User size={14} className="mr-1" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{featuredArticle.date}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full md:w-auto">
                    <Link to={`/articles/${featuredArticle.id}`}>Baca Selengkapnya</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
              <Input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className="flex items-center gap-1"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <category.icon size={16} />
                  <span className="ml-1">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Article List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getCategoryColor(article.category)}>
                      {getCategoryName(article.category)}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 mt-auto">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/articles/${article.id}`} className="flex items-center justify-center">
                      Baca <ChevronRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Artikel Tidak Ditemukan</h3>
              <p className="text-gray-600">
                Maaf, tidak ada artikel yang sesuai dengan kriteria pencarian Anda.
              </p>
              <Button 
                onClick={() => {setSearchTerm(''); setActiveCategory('all')}}
                className="mt-4"
              >
                Reset Pencarian
              </Button>
            </div>
          )}
          
          {/* Pagination / Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline">Muat Lebih Banyak</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
