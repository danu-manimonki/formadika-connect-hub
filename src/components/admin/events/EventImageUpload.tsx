
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";

interface EventImageUploadProps {
  form: UseFormReturn<EventFormData>;
}

export function EventImageUpload({ form }: EventImageUploadProps) {
  return (
    <FormField
      control={form.control}
      name="image_url"
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>Event Image</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                  }
                }}
                {...field}
              />
              {value && typeof value === 'string' && (
                <img 
                  src={value} 
                  alt="Event preview" 
                  className="h-20 w-20 object-cover rounded"
                />
              )}
            </div>
          </FormControl>
          <FormDescription>
            Upload an image for the event
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
