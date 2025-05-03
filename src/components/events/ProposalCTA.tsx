
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProposalCTA = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-12">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-2/3">
          <h3 className="text-2xl font-bold mb-2 text-formadika-teal">Ingin Mengusulkan Kegiatan?</h3>
          <p className="text-gray-600 mb-4">
            FORMADIKA membuka kesempatan bagi anggota untuk mengusulkan kegiatan yang bermanfaat bagi komunitas dan masyarakat Karanganyar.
          </p>
          <Button asChild>
            <Link to="/contact">Ajukan Usulan</Link>
          </Button>
        </div>
        <div className="md:w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="Proposal Kegiatan"
            className="rounded-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProposalCTA;
