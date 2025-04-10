
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, Mail, MapPin, Phone, MessageSquare, Send, Clock } from "lucide-react";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(3, {
    message: "Nama minimal 3 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  subject: z.string().min(5, {
    message: "Subjek minimal 5 karakter.",
  }),
  message: z.string().min(20, {
    message: "Pesan minimal 20 karakter.",
  }),
});

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Pesan Terkirim",
      description: "Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda secepatnya.",
    });
  }
  
  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={80} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Pesan Terkirim!</h3>
        <p className="text-gray-600 mb-6">
          Terima kasih telah menghubungi FORMADIKA Karanganyar. Kami sudah menerima pesan Anda dan akan merespon secepatnya melalui email yang telah Anda berikan.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Kirim Pesan Lagi</Button>
      </div>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan alamat email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjek</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan subjek pesan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tulis pesan Anda..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Send size={16} className="mr-2" /> Kirim Pesan
        </Button>
      </form>
    </Form>
  );
};

const Contact = () => {
  const contactDetails = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: "formadika.karanganyar@gmail.com",
      action: "mailto:formadika.karanganyar@gmail.com",
      actionText: "Kirim Email"
    },
    {
      icon: <Phone size={24} />,
      title: "Telepon",
      details: "+62 8123 4567 890",
      action: "tel:+6281234567890",
      actionText: "Telepon Kami"
    },
    {
      icon: <MapPin size={24} />,
      title: "Alamat",
      details: "Sekretariat FORMADIKA, Jl. Lawu No. 123, Karanganyar, Jawa Tengah",
      action: "https://maps.google.com/?q=Karanganyar,Jawa+Tengah,Indonesia",
      actionText: "Lihat Peta"
    },
    {
      icon: <Clock size={24} />,
      title: "Jam Operasional",
      details: "Senin - Jumat: 09:00 - 17:00 WIB",
      action: null,
      actionText: null
    }
  ];
  
  const faqs = [
    {
      question: "Apa syarat untuk menjadi anggota FORMADIKA?",
      answer: "Untuk menjadi anggota FORMADIKA, Anda harus merupakan mahasiswa atau alumni penerima beasiswa Bidikmisi, KIP-K, atau beasiswa serupa yang berasal dari Kabupaten Karanganyar."
    },
    {
      question: "Bagaimana cara bergabung dengan FORMADIKA?",
      answer: "Anda dapat bergabung dengan FORMADIKA dengan mengisi formulir pendaftaran di halaman Daftar Anggota pada website ini. Setelah data Anda diverifikasi, Anda akan menerima notifikasi keanggotaan."
    },
    {
      question: "Apakah ada biaya untuk menjadi anggota FORMADIKA?",
      answer: "Tidak ada biaya yang dikenakan untuk menjadi anggota FORMADIKA. Semua kegiatan dan program yang diselenggarakan juga tidak berbayar, kecuali disebutkan secara khusus untuk program-program tertentu."
    },
    {
      question: "Apakah alumni juga bisa berpartisipasi dalam kegiatan FORMADIKA?",
      answer: "Ya, alumni FORMADIKA sangat diharapkan partisipasinya dalam berbagai kegiatan, terutama sebagai mentor, pembicara, atau donatur untuk mendukung program-program FORMADIKA."
    }
  ];
  
  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Hubungi Kami
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Kontak FORMADIKA
            </h1>
            <p className="text-xl text-formadika-50">
              Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-formadika-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Sampaikan Pesan Anda</h2>
                <p className="text-gray-600">
                  Kami akan dengan senang hati menjawab pertanyaan Anda. Isi formulir di bawah dan tim kami akan menghubungi Anda secepatnya.
                </p>
              </div>
              
              <ContactForm />
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6 text-formadika-teal">Informasi Kontak</h3>
                <div className="space-y-6">
                  {contactDetails.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-formadika-50 p-3 rounded-full text-formadika-teal mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-600 mb-2">{item.details}</p>
                        {item.action && (
                          <a 
                            href={item.action}
                            className="text-formadika-teal hover:underline text-sm font-medium"
                            target={item.action.startsWith('http') ? "_blank" : undefined}
                            rel={item.action.startsWith('http') ? "noopener noreferrer" : undefined}
                          >
                            {item.actionText}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h4 className="font-semibold mb-4">Ikuti Kami</h4>
                  <div className="flex space-x-3">
                    <a href="#" className="bg-formadika-50 p-2 rounded-full hover:bg-formadika-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-formadika-teal">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="bg-formadika-50 p-2 rounded-full hover:bg-formadika-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-formadika-teal">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-formadika-50 p-2 rounded-full hover:bg-formadika-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-formadika-teal">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <MessageSquare className="text-formadika-teal mr-3" size={24} />
                  <h3 className="text-xl font-bold text-formadika-teal">Pertanyaan Umum</h3>
                </div>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
