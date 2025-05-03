
import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Judul harus memiliki minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi harus memiliki minimal 10 karakter"),
  date: z.string().min(1, "Tanggal harus diisi"),
  time: z.string().min(1, "Waktu harus diisi"),
  location: z.string().min(3, "Lokasi harus memiliki minimal 3 karakter"),
  type: z.enum(["online", "offline"]),
  participants: z.number().min(0, "Jumlah peserta harus positif"),
  image_url: z.string().optional(),
  is_featured: z.boolean().optional().default(false),
  max_participants: z.number().optional().nullable(),
  status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).default("upcoming")
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;
