
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Heart, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Users, 
  Lightbulb,
  Copy,
  Send
} from "lucide-react";

// Donation form schema
const donationFormSchema = z.object({
  name: z.string().min(3, {
    message: "Nama minimal 3 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  amount: z.string().min(1, {
    message: "Jumlah donasi harus diisi.",
  }),
  donationType: z.string({
    required_error: "Jenis donasi harus dipilih.",
  }),
  message: z.string().optional(),
  anonymous: z.boolean().default(false),
});

const DonateForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  
  const form = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      donationType: "",
      message: "",
      anonymous: false,
    },
  });
  
  function onSubmit(values: z.infer<typeof donationFormSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Donasi Berhasil",
      description: "Terima kasih atas dukungan Anda untuk FORMADIKA Karanganyar.",
    });
  }
  
  // Donation types
  const donationTypes = [
    {
      value: "scholarship",
      label: "Beasiswa",
      description: "Mendukung kebutuhan pendidikan mahasiswa berprestasi"
    },
    {
      value: "event",
      label: "Kegiatan",
      description: "Mendukung pelaksanaan kegiatan dan program FORMADIKA"
    },
    {
      value: "community",
      label: "Pengabdian Masyarakat",
      description: "Mendukung program sosial di desa binaan"
    },
    {
      value: "general",
      label: "Umum",
      description: "Digunakan untuk kebutuhan operasional FORMADIKA"
    },
  ];
  
  // Preset donation amounts
  const presetAmounts = [
    { value: "50000", label: "Rp50.000" },
    { value: "100000", label: "Rp100.000" },
    { value: "250000", label: "Rp250.000" },
    { value: "500000", label: "Rp500.000" },
    { value: "1000000", label: "Rp1.000.000" },
  ];
  
  // Bank account details
  const bankAccounts = [
    {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "Yayasan FORMADIKA Karanganyar"
    },
    {
      bank: "BRI",
      accountNumber: "0987654321",
      accountName: "Yayasan FORMADIKA Karanganyar"
    },
    {
      bank: "Mandiri",
      accountNumber: "2468135790",
      accountName: "Yayasan FORMADIKA Karanganyar"
    }
  ];
  
  // QRIS and Mobile Banking Images (placeholders)
  const qrisImage = "https://images.unsplash.com/photo-1598978481867-54c7bb135650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=672&q=80";
  const mobileWallets = [
    { name: "GoPay", logo: "/lovable-uploads/7b14fac9-3021-4d9e-985a-56c2299fba6c.png" },
    { name: "OVO", logo: "/lovable-uploads/7b14fac9-3021-4d9e-985a-56c2299fba6c.png" },
    { name: "DANA", logo: "/lovable-uploads/7b14fac9-3021-4d9e-985a-56c2299fba6c.png" },
    { name: "LinkAja", logo: "/lovable-uploads/7b14fac9-3021-4d9e-985a-56c2299fba6c.png" },
  ];
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil disalin",
      description: "Nomor rekening telah disalin ke clipboard.",
    });
  };
  
  const handlePresetAmount = (amount) => {
    form.setValue("amount", amount);
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={80} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Terima Kasih!</h3>
        <p className="text-gray-600 mb-6">
          Donasi Anda telah berhasil diproses. Kami sangat menghargai dukungan yang Anda berikan untuk FORMADIKA Karanganyar.
          Donasi ini akan membantu kami dalam melaksanakan berbagai program dan kegiatan untuk komunitas.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Kembali ke Halaman Donasi</Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="form">Form Donasi</TabsTrigger>
            <TabsTrigger value="payment">Metode Pembayaran</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
                
                <FormField
                  control={form.control}
                  name="donationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Donasi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis donasi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {donationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <span>{type.label}</span>
                                <span className="ml-2 text-xs text-gray-500">- {type.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah Donasi</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                            <Input placeholder="Masukkan jumlah donasi" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {presetAmounts.map((amount) => (
                      <Button 
                        key={amount.value}
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePresetAmount(amount.value)}
                        className="text-xs"
                      >
                        {amount.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pesan (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tulis pesan atau harapan Anda..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Pesan ini akan ditampilkan di daftar donatur (jika tidak anonim).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Donasi Anonim
                        </FormLabel>
                        <FormDescription>
                          Nama Anda tidak akan ditampilkan di daftar donatur.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  <Heart size={16} className="mr-2" /> Donasi Sekarang
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="payment">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Metode Pembayaran</h3>
                
                <div className="flex space-x-4">
                  <Button
                    variant={paymentMethod === 'transfer' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('transfer')}
                  >
                    Transfer Bank
                  </Button>
                  <Button
                    variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('qris')}
                  >
                    QRIS
                  </Button>
                  <Button
                    variant={paymentMethod === 'ewallet' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('ewallet')}
                  >
                    E-Wallet
                  </Button>
                </div>
              </div>
              
              {paymentMethod === 'transfer' && (
                <div className="space-y-4">
                  <h4 className="font-medium">Rekening Bank</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Silakan transfer donasi Anda ke salah satu rekening berikut, kemudian konfirmasikan dengan mengisi form donasi.
                  </p>
                  
                  <div className="space-y-4">
                    {bankAccounts.map((account, index) => (
                      <div key={index} className="bg-formadika-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-semibold">{account.bank}</h5>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(account.accountNumber)}
                            className="h-8 px-2"
                          >
                            <Copy size={16} className="mr-1" /> Salin
                          </Button>
                        </div>
                        <div className="text-lg font-mono mb-1">{account.accountNumber}</div>
                        <div className="text-sm text-gray-600">a.n. {account.accountName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {paymentMethod === 'qris' && (
                <div className="space-y-4">
                  <h4 className="font-medium">QRIS</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Scan QR code berikut menggunakan aplikasi e-wallet atau m-banking Anda untuk melakukan pembayaran.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="bg-white p-4 border border-gray-200 rounded-lg max-w-xs">
                      <img src={qrisImage} alt="QRIS Code" className="w-full" />
                      <div className="text-center mt-2 text-sm text-gray-600">
                        FORMADIKA Karanganyar
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'ewallet' && (
                <div className="space-y-4">
                  <h4 className="font-medium">E-Wallet</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Pilih salah satu e-wallet berikut untuk melakukan donasi.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mobileWallets.map((wallet, index) => (
                      <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg text-center cursor-pointer hover:border-formadika-teal transition-colors">
                        <img src={wallet.logo} alt={wallet.name} className="h-12 mx-auto mb-2" />
                        <div className="text-sm font-medium">{wallet.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
                <h4 className="font-semibold mb-1">Catatan Penting:</h4>
                <p>
                  Setelah melakukan pembayaran, silakan konfirmasi dengan mengisi form donasi dan menyertakan bukti transfer jika ada.
                  Jika ada pertanyaan, Anda dapat menghubungi kami melalui email atau nomor telepon yang tertera di halaman kontak.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ImpactCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-formadika-50 w-12 h-12 rounded-full flex items-center justify-center text-formadika-teal mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const DonorCard = ({ donor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
      <Heart className="text-red-500 mr-3 flex-shrink-0" size={20} />
      <div>
        <div className="flex items-center mb-1">
          <span className="font-medium">{donor.name}</span>
          {donor.recurring && (
            <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Donatur Tetap</Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <span className="font-medium text-formadika-teal">Rp{donor.amount.toLocaleString("id-ID")}</span>
          <span className="mx-2">•</span>
          <span>{donor.date}</span>
        </div>
        {donor.message && (
          <p className="text-sm text-gray-600 mt-2 italic">"{donor.message}"</p>
        )}
      </div>
    </div>
  );
};

const Donate = () => {
  // Mock data for recent donors
  const recentDonors = [
    {
      name: "Budi Santoso",
      amount: 500000,
      date: "10 April 2025",
      message: "Semoga bermanfaat untuk adik-adik mahasiswa.",
      recurring: true
    },
    {
      name: "Dewi Anggraini",
      amount: 250000,
      date: "8 April 2025",
      message: "Sukses selalu untuk FORMADIKA Karanganyar!",
      recurring: false
    },
    {
      name: "Hamba Allah",
      amount: 1000000,
      date: "5 April 2025",
      message: null,
      recurring: false
    },
    {
      name: "Faisal Rahman",
      amount: 300000,
      date: "2 April 2025",
      message: "Untuk kegiatan pengabdian masyarakat.",
      recurring: true
    },
    {
      name: "Indah Lestari",
      amount: 200000,
      date: "1 April 2025",
      message: "Semoga bisa membantu.",
      recurring: false
    }
  ];
  
  // Impact description
  const impacts = [
    {
      icon: <GraduationCap size={24} />,
      title: "Beasiswa Pendidikan",
      description: "Membantu mahasiswa berprestasi untuk melanjutkan studi dan mengembangkan potensinya."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Program Edukasi",
      description: "Mendukung program pendampingan akademik dan pengembangan soft skill mahasiswa."
    },
    {
      icon: <Globe size={24} />,
      title: "Pengabdian Masyarakat",
      description: "Memfasilitasi program pengabdian di desa-desa binaan di Kabupaten Karanganyar."
    },
    {
      icon: <Users size={24} />,
      title: "Pemberdayaan Komunitas",
      description: "Memperkuat jaringan dan kapasitas mahasiswa penerima beasiswa dari Karanganyar."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Inovasi & Riset",
      description: "Mendorong pengembangan inovasi dan riset untuk kemajuan Kabupaten Karanganyar."
    }
  ];

  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Donasi
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Dukung FORMADIKA Karanganyar
            </h1>
            <p className="text-xl text-formadika-50">
              Bantu kami mewujudkan mimpi dan potensi mahasiswa Karanganyar untuk masa depan yang lebih baik.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-formadika-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/5">
              <h2 className="text-2xl font-bold mb-8">Form Donasi</h2>
              <DonateForm />
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Dampak Donasi Anda</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {impacts.slice(0, 3).map((impact, index) => (
                    <ImpactCard key={index} {...impact} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/5">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Donasi Terakhir</h3>
                  <Badge variant="outline" className="border-formadika-teal text-formadika-teal">
                    5 Donatur Terbaru
                  </Badge>
                </div>
                <div className="space-y-4">
                  {recentDonors.map((donor, index) => (
                    <DonorCard key={index} donor={donor} />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full">Lihat Semua Donatur</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Butuh Bantuan?</h3>
                <p className="text-gray-600 mb-6">
                  Jika Anda memiliki pertanyaan atau mengalami kendala dalam proses donasi, jangan ragu untuk menghubungi kami.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="/contact" className="flex items-center justify-center">
                    <Send size={16} className="mr-2" /> Hubungi Kami
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Seperti Apa Donasi Anda Digunakan?</h2>
            <p className="text-gray-600 mb-12">
              FORMADIKA Karanganyar berkomitmen untuk menggunakan setiap donasi secara transparan dan tepat sasaran.
              Berikut adalah distribusi penggunaan donasi yang kami terima:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-formadika-teal"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">60%</h3>
                <p className="text-gray-600">Beasiswa dan Bantuan Pendidikan</p>
              </div>
            </div>
            
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-formadika-gold"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">30%</h3>
                <p className="text-gray-600">Program Pengabdian dan Kegiatan</p>
              </div>
            </div>
            
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-formadika-brown"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">10%</h3>
                <p className="text-gray-600">Operasional dan Pengembangan</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Button asChild>
              <a href="/about">Pelajari Lebih Lanjut Tentang FORMADIKA</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
