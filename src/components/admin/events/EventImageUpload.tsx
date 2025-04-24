
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

interface EventImageUploadProps {
  form: UseFormReturn<EventFormData>;
}

export function EventImageUpload({ form }: EventImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update preview when image_url changes
  useEffect(() => {
    const currentImage = form.getValues('image_url');
    
    if (currentImage instanceof File) {
      const objectUrl = URL.createObjectURL(currentImage);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof currentImage === 'string' && currentImage) {
      setPreviewUrl(currentImage);
    } else {
      setPreviewUrl(null);
    }
  }, [form.watch('image_url')]);

  const handleNewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image_url', file);
    }
  };

  return (
    <FormField
      control={form.control}
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Event Image</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleNewImageUpload}
              />

              {previewUrl && (
                <div className="mt-2">
                  <img 
                    src={previewUrl} 
                    alt="Event preview" 
                    className="h-40 w-full object-cover rounded"
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>
            Upload an image for the event (optional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
