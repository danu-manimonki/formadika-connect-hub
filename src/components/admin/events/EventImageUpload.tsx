
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEventImages } from "@/hooks/useEventImages";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Image, Upload } from "lucide-react";

interface EventImageUploadProps {
  form: UseFormReturn<EventFormData>;
}

export function EventImageUpload({ form }: EventImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<'new' | 'existing'>('new');
  const { getExistingImages } = useEventImages();

  const { data: existingImages = [] } = useQuery({
    queryKey: ['eventImages'],
    queryFn: getExistingImages
  });

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

  const handleExistingImageSelect = (value: string) => {
    form.setValue('image_url', value);
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
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant={uploadMode === 'new' ? 'default' : 'outline'}
                  onClick={() => setUploadMode('new')}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New
                </Button>
                <Button 
                  type="button"
                  variant={uploadMode === 'existing' ? 'default' : 'outline'}
                  onClick={() => setUploadMode('existing')}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Use Existing
                </Button>
              </div>

              {uploadMode === 'new' ? (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleNewImageUpload}
                />
              ) : (
                <Select
                  onValueChange={handleExistingImageSelect}
                  value={typeof field.value === 'string' ? field.value : ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an existing image" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingImages.map((imageUrl, index) => (
                      <SelectItem key={index} value={imageUrl}>
                        <div className="flex items-center gap-2">
                          <img 
                            src={imageUrl} 
                            alt="Thumbnail" 
                            className="h-8 w-8 object-cover rounded"
                          />
                          <span>Image {index + 1}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {previewUrl && (
                <div className="mt-2">
                  <img 
                    src={previewUrl} 
                    alt="Event preview" 
                    className="h-20 w-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>
            Upload a new image or select an existing one (optional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
