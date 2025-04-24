
import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  type: z.enum(["online", "offline"]),
  participants: z.number().min(0, "Number of participants must be positive")
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;
