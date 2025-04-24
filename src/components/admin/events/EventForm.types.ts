
import { Event } from "@/types/database";

export type EventFormData = Omit<Event, 'id' | 'created_at' | 'updated_at'> & {
  image_url: string | File | null;
};
