
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

// Registration form schema
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Nama lengkap minimal 3 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  phone: z.string().min(10, {
    message: "Nomor telepon minimal 10 angka.",
  }),
  birthDate: z.date({
    required_error: "Tanggal lahir harus diisi.",
  }),
  gender: z.string({
    required_error: "Jenis kelamin harus dipilih.",
  }),
  address: z.string().min(10, {
    message: "Alamat minimal 10 karakter.",
  }),
  university: z.string().min(5, {
    message: "Nama perguruan tinggi minimal 5 karakter.",
  }),
  major: z.string().min(3, {
    message: "Jurusan minimal 3 karakter.",
  }),
  studentId: z.string().min(5, {
    message: "NIM minimal 5 karakter.",
  }),
  batch: z.string().min(4, {
    message: "Angkatan minimal 4 karakter (tahun).",
  }),
  scholarshipType: z.string({
    required_error: "Jenis beasiswa harus dipilih.",
  }),
  motivation: z.string().min(20, {
    message: "Motivasi minimal 20 karakter.",
  }),
  skills: z.string().optional(),
  interests: z.string().optional(),
  termsAgreed: z.boolean().refine((value) => value === true, {
    message: "Anda harus menyetujui syarat dan ketentuan.",
  }),
});

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      university: "",
      major: "",
      studentId: "",
      batch: "",
      skills: "",
      interests: "",
      termsAgreed: false,
    },
  });

  const isValid = (fields: string[]) => {
    const currentValues = form.getValues();
    const currentErrors = form.formState.errors;
    
    for (const field of fields) {
      if (!currentValues[field] || currentErrors[field]) {
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (step === 1 && isValid(['fullName', 'email', 'phone', 'birthDate', 'gender', 'address'])) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2 && isValid(['university', 'major', 'studentId', 'batch', 'scholarshipType'])) {
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Pendaftaran Berhasil",
      description: "Data pendaftaran Anda telah berhasil dikirim. Kami akan menghubungi Anda melalui email atau telepon.",
    });
  };

  const scholarshipTypes = [
    { value: "bidikmisi", label: "Bidikmisi" },
    { value: "kip-k", label: "KIP-Kuliah" },
    { value: "afirmasi", label: "Afirmasi Pendidikan" },
    { value: "other", label: "Lainnya" },
  ];

  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Bergabung
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Daftar Menjadi Anggota FORMADIKA
            </h1>
            <p className="text-xl text-formadika-50">
              Isi data diri Anda untuk bergabung dengan komunitas FORMADIKA Karanganyar.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-formadika-50">
        <div className="container mx-auto px-4">
          {isSubmitted ? (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle2 size={80} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Pendaftaran Berhasil!</h2>
              <p className="text-gray-600 mb-6">
                Terima kasih telah mendaftar sebagai anggota FORMADIKA Karanganyar. Data Anda telah kami terima dan akan segera diproses.
                Kami akan menghubungi Anda melalui email atau telepon yang telah didaftarkan untuk langkah selanjutnya.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <a href="/">Kembali ke Beranda</a>
                </Button>
                <Button asChild>
                  <a href="/members">Lihat Anggota</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className={`flex-1 h-2 ${step >= 1 ? 'bg-formadika-teal' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-formadika-teal' : 'bg-gray-300'} text-white font-bold text-sm`}>
                    1
                  </div>
                  <div className={`flex-1 h-2 ${step >= 2 ? 'bg-formadika-teal' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-formadika-teal' : 'bg-gray-300'} text-white font-bold text-sm`}>
                    2
                  </div>
                  <div className={`flex-1 h-2 ${step >= 3 ? 'bg-formadika-teal' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-formadika-teal' : 'bg-gray-300'} text-white font-bold text-sm`}>
                    3
                  </div>
                  <div className={`flex-1 h-2 ${step >= 3 ? 'bg-formadika-teal' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <div className="text-center w-1/4">Data Diri</div>
                  <div className="text-center w-1/4">Data Akademik</div>
                  <div className="text-center w-1/4">Informasi Tambahan</div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Data Diri</h2>
                        <p className="text-gray-600 mb-6">Silakan lengkapi informasi data diri Anda.</p>
                        
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Lengkap *</FormLabel>
                              <FormControl>
                                <Input placeholder="Masukkan nama lengkap" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nomor Telepon *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Contoh: 08123456789" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Tanggal Lahir *</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "dd MMMM yyyy")
                                        ) : (
                                          <span>Pilih tanggal</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() || date < new Date("1950-01-01")
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jenis Kelamin *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Laki-laki</SelectItem>
                                    <SelectItem value="female">Perempuan</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alamat *</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Masukkan alamat lengkap" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-4 flex justify-end">
                          <Button type="button" onClick={handleNext}>
                            Selanjutnya
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Data Akademik</h2>
                        <p className="text-gray-600 mb-6">Silakan lengkapi informasi akademik Anda.</p>
                        
                        <FormField
                          control={form.control}
                          name="university"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Perguruan Tinggi *</FormLabel>
                              <FormControl>
                                <Input placeholder="Contoh: Universitas Indonesia" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="major"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jurusan/Program Studi *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Contoh: Teknik Informatika" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="studentId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>NIM *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nomor Induk Mahasiswa" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="batch"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Angkatan *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Contoh: 2023" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="scholarshipType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jenis Beasiswa *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih jenis beasiswa" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {scholarshipTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={() => setStep(1)}>
                            Kembali
                          </Button>
                          <Button type="button" onClick={handleNext}>
                            Selanjutnya
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Informasi Tambahan</h2>
                        <p className="text-gray-600 mb-6">Silakan lengkapi informasi tambahan.</p>
                        
                        <FormField
                          control={form.control}
                          name="motivation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Motivasi Bergabung *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Ceritakan motivasi Anda bergabung dengan FORMADIKA Karanganyar" 
                                  className="h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Keahlian</FormLabel>
                              <FormControl>
                                <Input placeholder="Contoh: Public Speaking, Programming, Design" {...field} />
                              </FormControl>
                              <FormDescription>
                                Tuliskan keahlian yang Anda miliki, pisahkan dengan koma.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minat</FormLabel>
                              <FormControl>
                                <Input placeholder="Contoh: Penelitian, Pendidikan, Seni" {...field} />
                              </FormControl>
                              <FormDescription>
                                Tuliskan bidang yang Anda minati, pisahkan dengan koma.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="termsAgreed"
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
                                  Saya menyetujui syarat dan ketentuan FORMADIKA Karanganyar *
                                </FormLabel>
                                <FormDescription>
                                  Dengan mendaftar, Anda setuju untuk mematuhi kode etik dan peraturan FORMADIKA.
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={() => setStep(2)}>
                            Kembali
                          </Button>
                          <Button type="submit">Daftar</Button>
                        </div>
                      </div>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Register;
