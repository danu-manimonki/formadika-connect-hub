
const StatisticsSection = () => {
  return (
    <section className="section bg-formadika-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
            Pencapaian Kami
          </div>
          <h2 className="text-3xl font-bold">FORMADIKA dalam Angka</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Berikut adalah pencapaian dan pertumbuhan komunitas FORMADIKA selama lebih dari 10 tahun berdiri.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-4xl font-bold text-formadika-600 mb-2">300+</div>
            <p className="text-gray-600">Anggota Aktif</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-4xl font-bold text-formadika-600 mb-2">50+</div>
            <p className="text-gray-600">Kampus</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-4xl font-bold text-formadika-600 mb-2">100+</div>
            <p className="text-gray-600">Kegiatan</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-4xl font-bold text-formadika-600 mb-2">10+</div>
            <p className="text-gray-600">Tahun Berjalan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
