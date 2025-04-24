
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";
import { Button } from "@/components/ui/button";
import { useEventImageUpload } from "@/hooks/useEventImageUpload";
import { useState, useEffect } from "react";
import { FileImage } from "lucide-react";

interface EventBasicInfoProps {
  form: UseFormReturn<EventFormData>;
}

export function EventBasicInfo({ form }: EventBasicInfoProps) {
  const { handleImageUpload, isUploading } = useEventImageUpload();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Initialize preview with existing image_url if available
  useEffect(() => {
    const currentImageUrl = form.getValues("image_url");
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
  }, [form]);

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
        // Set the image_url in the form
        form.setValue("image_url", imageUrl);
        setPreviewUrl(imageUrl);
        setSelectedFile(null);
        // Trigger validation to update form state
        form.trigger("image_url");
        console.log("Image uploaded successfully, form value updated:", imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("image_url", "");
    setPreviewUrl(null);
    setSelectedFile(null);
    // Trigger validation
    form.trigger("image_url");
    console.log("Image removed, form value cleared");
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
                {/* Preview of uploaded or selected image */}
                {previewUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img
                      src={previewUrl}
                      alt="Event preview"
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 bg-opacity-70"
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                {/* Hidden input field to store the image URL */}
                <input
                  type="hidden"
                  name={field.name}
                  value={field.value || ""}
                  onChange={field.onChange}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
