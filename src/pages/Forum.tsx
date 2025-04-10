
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MessageSquare,
  Users,
  Clock,
  Calendar,
  PlusCircle,
  Eye,
  MessageCircle,
  ChevronRight,
  ArrowRightLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock forum categories
  const categories = [
    { id: "scholarship", name: "Beasiswa", count: 15 },
    { id: "academic", name: "Akademik", count: 12 },
    { id: "career", name: "Karir", count: 10 },
    { id: "events", name: "Kegiatan", count: 8 },
    { id: "general", name: "Umum", count: 14 }
  ];
  
  // Mock discussion threads
  const discussions = [
    {
      id: 1,
      title: "Informasi Pendaftaran Beasiswa LPDP 2025",
      category: "scholarship",
      author: "Budi Santoso",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "10 April 2025",
      replies: 24,
      views: 156,
      lastReply: "15 menit yang lalu",
      isSticky: true,
      isHot: true
    },
    {
      id: 2,
      title: "Tips Menulis Personal Statement untuk Beasiswa Luar Negeri",
      category: "scholarship",
      author: "Dewi Anggraini",
      authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
      date: "8 April 2025",
      replies: 18,
      views: 98,
      lastReply: "2 jam yang lalu",
      isSticky: false,
      isHot: true
    },
    {
      id: 3,
      title: "Diskusi Skripsi: Metode Penelitian Kualitatif vs Kuantitatif",
      category: "academic",
      author: "Andi Permana",
      authorAvatar: "https://randomuser.me/api/portraits/men/12.jpg",
      date: "7 April 2025",
      replies: 32,
      views: 145,
      lastReply: "1 hari yang lalu",
      isSticky: false,
      isHot: false
    },
    {
      id: 4,
      title: "Lowongan Magang di Perusahaan Teknologi untuk Mahasiswa Tahun Terakhir",
      category: "career",
      author: "Indah Lestari",
      authorAvatar: "https://randomuser.me/api/portraits/women/55.jpg",
      date: "5 April 2025",
      replies: 15,
      views: 210,
      lastReply: "2 hari yang lalu",
      isSticky: true,
      isHot: false
    },
    {
      id: 5,
      title: "Tanya Jawab: Program KKN Tematik 2025",
      category: "academic",
      author: "Rizki Ramadhan",
      authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "4 April 2025",
      replies: 9,
      views: 87,
      lastReply: "3 hari yang lalu",
      isSticky: false,
      isHot: false
    },
    {
      id: 6,
      title: "Undangan Gathering Alumni FORMADIKA di Jakarta",
      category: "events",
      author: "Dina Pratiwi",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "3 April 2025",
      replies: 27,
      views: 132,
      lastReply: "10 jam yang lalu",
      isSticky: true,
      isHot: true
    },
    {
      id: 7,
      title: "Diskusi: Kiat Sukses Wawancara Kerja untuk Fresh Graduate",
      category: "career",
      author: "Faisal Rahman",
      authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
      date: "2 April 2025",
      replies: 21,
      views: 175,
      lastReply: "1 hari yang lalu",
      isSticky: false,
      isHot: false
    },
    {
      id: 8,
      title: "Program Pengabdian Masyarakat FORMADIKA 2025",
      category: "events",
      author: "Rina Wahyuni",
      authorAvatar: "https://randomuser.me/api/portraits/women/62.jpg",
      date: "1 April 2025",
      replies: 14,
      views: 93,
      lastReply: "5 hari yang lalu",
      isSticky: false,
      isHot: false
    }
  ];
  
  // Mock active users
  const activeUsers = [
    {
      name: "Budi Santoso",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      posts: 45
    },
    {
      name: "Dewi Anggraini",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      posts: 37
    },
    {
      name: "Andi Permana",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      posts: 29
    },
    {
      name: "Indah Lestari",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      posts: 24
    },
    {
      name: "Rizki Ramadhan",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      posts: 18
    }
  ];
  
  // Filter discussions based on search term
  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getCategoryBadge = (categoryId) => {
    switch(categoryId) {
      case "scholarship":
        return <Badge className="bg-blue-100 text-blue-800">Beasiswa</Badge>;
      case "academic":
        return <Badge className="bg-purple-100 text-purple-800">Akademik</Badge>;
      case "career":
        return <Badge className="bg-green-100 text-green-800">Karir</Badge>;
      case "events":
        return <Badge className="bg-yellow-100 text-yellow-800">Kegiatan</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Umum</Badge>;
    }
  };
  
  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Forum
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Forum Diskusi FORMADIKA
            </h1>
            <p className="text-xl text-formadika-50">
              Berbagi informasi, bertanya, dan berdiskusi dengan sesama anggota FORMADIKA Karanganyar.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-formadika-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4">
              {/* Search and New Topic Button */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full md:w-1/2">
                  <Input
                    type="text"
                    placeholder="Cari diskusi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <Button className="gap-2">
                  <PlusCircle size={16} />
                  <span>Topik Baru</span>
                </Button>
              </div>
              
              {/* Forum Tabs */}
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="hot">Populer</TabsTrigger>
                  <TabsTrigger value="sticky">Penting</TabsTrigger>
                  <TabsTrigger value="unanswered">Belum Terjawab</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Forum Threads */}
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-8 bg-formadika-50 flex flex-row md:flex-col items-center justify-center p-3 text-gray-500 text-center md:text-xs">
                          <div className="mr-2 md:mr-0 md:mb-2">
                            <MessageCircle size={16} className="mx-auto" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div>
                            <Eye size={16} className="mx-auto" />
                            <span>{discussion.views}</span>
                          </div>
                        </div>
                        <div className="p-4 flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <div className="flex items-start md:items-center mb-2 md:mb-0">
                              {discussion.isSticky && (
                                <Badge variant="outline" className="mr-2 border-yellow-500 text-yellow-600">
                                  Penting
                                </Badge>
                              )}
                              {discussion.isHot && (
                                <Badge variant="outline" className="mr-2 border-red-500 text-red-600">
                                  Populer
                                </Badge>
                              )}
                              {getCategoryBadge(discussion.category)}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <ArrowRightLeft size={12} className="mr-1" />
                              <span>Balasan terakhir: {discussion.lastReply}</span>
                            </div>
                          </div>
                          
                          <Link to={`/forum/${discussion.id}`} className="block">
                            <h3 className="font-semibold text-lg mb-3 hover:text-formadika-teal transition-colors">
                              {discussion.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                                <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{discussion.author}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar size={14} className="mr-1" />
                              <span>{discussion.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredDiscussions.length === 0 && (
                  <Card className="p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">Diskusi Tidak Ditemukan</h3>
                    <p className="text-gray-600 mb-4">
                      Tidak ada diskusi yang sesuai dengan pencarian Anda.
                    </p>
                    <Button 
                      onClick={() => setSearchTerm('')}
                      variant="outline"
                    >
                      Reset Pencarian
                    </Button>
                  </Card>
                )}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mx-1">1</Button>
                <Button variant="outline" className="mx-1">2</Button>
                <Button variant="outline" className="mx-1">3</Button>
                <Button variant="outline" className="mx-1">
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/4 space-y-6">
              {/* Forum Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Statistik Forum</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare size={16} className="mr-2 text-formadika-teal" />
                        <span>Total Diskusi</span>
                      </div>
                      <span className="font-medium">124</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageCircle size={16} className="mr-2 text-formadika-teal" />
                        <span>Total Balasan</span>
                      </div>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-formadika-teal" />
                        <span>Total Anggota</span>
                      </div>
                      <span className="font-medium">328</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-formadika-teal" />
                        <span>Online Saat Ini</span>
                      </div>
                      <span className="font-medium">24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Kategori</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <Link to={`/forum/category/${category.id}`} className="hover:text-formadika-teal transition-colors">
                          {category.name}
                        </Link>
                        <Badge variant="outline">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Active Users */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Pengguna Aktif</h3>
                  <div className="space-y-4">
                    {activeUsers.map((user) => (
                      <div key={user.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                        </div>
                        <Badge variant="outline">{user.posts}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Forum;
