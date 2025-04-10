import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';
import { removeBackground, loadImage } from '@/lib/image-utils';
import { useToast } from '@/hooks/use-toast';

const LogoProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const processLogo = async () => {
      try {
        setIsProcessing(true);
        const logoUrl = '/lovable-uploads/8c77ad66-c0b5-4a07-8909-497eccc72e0d.png';
        
        const response = await fetch(logoUrl);
        const blob = await response.blob();
        
        const img = await loadImage(blob);
        setOriginalImage(URL.createObjectURL(blob));
        
        const processedBlob = await removeBackground(img);
        setProcessedImage(URL.createObjectURL(processedBlob));
        
        toast({
          title: "Berhasil!",
          description: "Latar belakang logo berhasil dihapus.",
        });
      } catch (error) {
        console.error('Error processing logo:', error);
        toast({
          title: "Gagal memproses logo",
          description: "Terjadi kesalahan saat menghapus latar belakang.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();
  }, [toast]);

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'formadika-logo-transparent.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Pengolahan Logo FORMADIKA</h1>
          
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-formadika-teal animate-spin" />
              <p className="mt-4 text-lg">Sedang memproses logo...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Ini mungkin memerlukan waktu beberapa saat karena model AI perlu dimuat
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="font-medium mb-3">Logo Asli</h3>
                  {originalImage && (
                    <div className="flex justify-center">
                      <img 
                        src={originalImage} 
                        alt="Logo FORMADIKA Asli" 
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                  )}
                </div>
                
                <div className="border rounded-lg p-4 bg-gray-100">
                  <h3 className="font-medium mb-3">Logo Tanpa Background</h3>
                  {processedImage && (
                    <div className="flex justify-center bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg p-4">
                      <img 
                        src={processedImage} 
                        alt="Logo FORMADIKA Transparan" 
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleBack}>
                  Kembali ke Beranda
                </Button>
                
                <Button 
                  className="bg-formadika-teal hover:bg-formadika-teal/90"
                  onClick={handleDownload}
                  disabled={!processedImage}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Logo Transparan
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LogoProcessor;
