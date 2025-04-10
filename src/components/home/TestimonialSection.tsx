
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Bergabung dengan FORMADIKA membuka banyak peluang bagi saya. Saya mendapatkan mentor yang membantu mengarahkan karier saya pasca kuliah.",
    name: "Ahmad Faiz",
    role: "Alumni Universitas Sebelas Maret",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    content: "Berkat jaringan di FORMADIKA, saya bisa mendapatkan informasi beasiswa S2 dan sekarang melanjutkan studi di luar negeri.",
    name: "Dina Pratiwi",
    role: "Alumni Universitas Gadjah Mada",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    content: "FORMADIKA memberikan saya kesempatan untuk mengembangkan soft skills melalui berbagai kegiatan sosial dan kepemimpinan.",
    name: "Raka Putra",
    role: "Mahasiswa Institut Teknologi Bandung",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
            Testimoni
          </div>
          <h2 className="text-3xl font-bold">Apa Kata Mereka?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Pengalaman dan cerita dari anggota dan alumni FORMADIKA.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-formadika-50 p-8 md:p-10 rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name} 
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                />
              </div>
              
              <p className="text-lg md:text-xl text-gray-700 italic mb-6">
                "{testimonials[activeIndex].content}"
              </p>
              
              <div>
                <h4 className="font-semibold text-formadika-800">{testimonials[activeIndex].name}</h4>
                <p className="text-sm text-gray-500">{testimonials[activeIndex].role}</p>
              </div>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-4">
              <button 
                onClick={prevTestimonial}
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-formadika-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-4">
              <button 
                onClick={nextTestimonial}
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-formadika-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  index === activeIndex ? "bg-formadika-500 w-6" : "bg-formadika-200"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
