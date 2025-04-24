
import { z } from "zod";
import { eventFormSchema } from "./EventForm.schema";

export type EventFormData = z.infer<typeof eventFormSchema>;
