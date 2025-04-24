
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";
import { useState, useEffect } from "react";

interface EventImageUploadProps {
  form: UseFormReturn<EventFormData>;
}

export function EventImageUpload({ form }: EventImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update preview when image_url changes
  useEffect(() => {
    const currentImage = form.getValues('image_url');
    
    if (currentImage instanceof File) {
      // Create a URL for File objects
      const objectUrl = URL.createObjectURL(currentImage);
      setPreviewUrl(objectUrl);
      
      // Clean up the URL when component unmounts or image changes
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof currentImage === 'string') {
      // Use existing string URL
      setPreviewUrl(currentImage);
    } else {
      setPreviewUrl(null);
    }
  }, [form.getValues('image_url')]);

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
              {previewUrl && (
                <img 
                  src={previewUrl} 
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
