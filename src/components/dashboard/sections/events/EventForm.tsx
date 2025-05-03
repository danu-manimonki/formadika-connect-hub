
import { Form } from "@/components/ui/form";
import { Event } from "@/types/database";
import { EventFormData } from "./EventForm.types";
import { EventBasicInfo } from "./EventBasicInfo";
import { EventDateTime } from "./EventDateTime";
import { EventTypeDetails } from "./EventTypeDetails";
import { EventPreview } from "./EventPreview";
import { useEventForm } from "@/hooks/useEventForm";
import { useEventSubmit } from "@/hooks/useEventSubmit";
import { EventPreviewButton } from "./EventPreviewButton";
import { EventFormSubmit } from "./EventFormSubmit";

interface EventFormProps {
  event?: Event;
  onSuccess?: () => void;
}

export function EventForm({ event, onSuccess }: EventFormProps) {
  const { form, isSubmitting, setIsSubmitting, isPreviewOpen, setIsPreviewOpen } = useEventForm(event, onSuccess);
  const { handleSubmit } = useEventSubmit(event, onSuccess);
  
  const onSubmit = async (values: EventFormData) => {
    setIsSubmitting(true);
    const success = await handleSubmit(values);
    if (success && !event) {
      form.reset();
    }
    setIsSubmitting(false);
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-end">
            <EventPreviewButton onPreview={handlePreview} />
          </div>
          
          <EventBasicInfo form={form} />
          <EventDateTime form={form} />
          <EventTypeDetails form={form} />
          
          <EventFormSubmit 
            form={form} 
            isSubmitting={isSubmitting} 
            isEditing={!!event} 
          />
        </form>
      </Form>
      
      <EventPreview 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        eventData={form.getValues()}
      />
    </>
  );
}
