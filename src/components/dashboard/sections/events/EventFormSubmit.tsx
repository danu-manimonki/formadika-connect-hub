
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";

interface EventFormSubmitProps {
  form: UseFormReturn<EventFormData>;
  isSubmitting: boolean;
  isEditing: boolean;
}

export function EventFormSubmit({ form, isSubmitting, isEditing }: EventFormSubmitProps) {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Menyimpan...' : isEditing ? 'Perbarui Event' : 'Buat Event'}
    </Button>
  );
}
