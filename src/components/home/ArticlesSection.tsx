
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Tips Lolos Seleksi Beasiswa Luar Negeri',
    excerpt: 'Beberapa tips dan trik untuk mempersiapkan diri dalam seleksi beasiswa studi lanjut ke luar negeri.',
    date: '10 April 2025',
    author: 'Budi Santoso',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Beasiswa'
  },
  {
    id: 2,
    title: 'Manajemen Keuangan untuk Mahasiswa Penerima Beasiswa',
    excerpt: 'Panduan praktis mengelola keuangan selama masa studi dengan dana beasiswa yang terbatas.',
    date: '5 April 2025',
    author: 'Siti Rahma',
    image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Keuangan'
  }
];

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6 md:w-3/5">
        <div className="inline-block bg-formadika-100 text-formadika-800 text-xs px-2 py-1 rounded-full mb-3">
          {article.category}
        </div>
        <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
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
          <Link to={`/articles/${article.id}`}>Baca Selengkapnya</Link>
        </Button>
      </div>
    </div>
  );
};

const ArticlesSection = () => {
  return (
    <section className="section bg-formadika-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
            Artikel Terbaru
          </div>
          <h2 className="text-3xl font-bold">Informasi & Edukasi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Dapatkan informasi terbaru seputar beasiswa, pengembangan diri, dan kisah inspiratif.
          </p>
        </div>
        
        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild>
            <Link to="/articles">
              Lihat Semua Artikel <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
