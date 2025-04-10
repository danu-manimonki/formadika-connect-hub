
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-formadika-100 text-formadika-600 text-4xl font-bold mb-8">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
          </p>
          <Button asChild size="lg">
            <Link to="/" className="flex items-center">
              <Home size={18} className="mr-2" /> Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
