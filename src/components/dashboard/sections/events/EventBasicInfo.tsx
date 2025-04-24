import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";
import { Button } from "@/components/ui/button";
import { useEventImageUpload } from "@/hooks/useEventImageUpload";
import { useState } from "react";
import { FileImage } from "lucide-react";

interface EventBasicInfoProps {
  form: UseFormReturn<EventFormData>;
}

export function EventBasicInfo({ form }: EventBasicInfoProps) {
  const { handleImageUpload, isUploading } = useEventImageUpload();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    form.getValues("image_url") || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create temporary preview URL
    const tempPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(tempPreviewUrl);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const imageUrl = await handleImageUpload(selectedFile);
      if (imageUrl) {
        form.setValue("image_url", imageUrl);
        setPreviewUrl(imageUrl);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Event title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter event description"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Event location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                  id="event-image"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => document.getElementById("event-image")?.click()}
                  >
                    <FileImage className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                  {selectedFile && (
                    <Button
                      type="button"
                      disabled={isUploading}
                      onClick={handleUpload}
                      className="flex-1"
                    >
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  )}
                </div>
                {field.value && !selectedFile && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img
                      src={field.value}
                      alt="Current event image"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                {selectedFile && previewUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img
                      src={previewUrl}
                      alt="Event preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
