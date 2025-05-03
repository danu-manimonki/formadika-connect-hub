
import React, { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useEventImageUpload } from "@/hooks/useEventImageUpload";
import { ImageGalleryPicker } from "../ImageGalleryPicker";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "../EventForm.types";

interface EventImageUploaderProps {
  form: UseFormReturn<EventFormData>;
}

export function EventImageUploader({ form }: EventImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { handleImageUpload, isUploading } = useEventImageUpload();

  // Get initial value from form for preview
  useEffect(() => {
    const currentImageUrl = form.getValues("image_url");
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
  }, [form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar (maks 5MB)");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Format file tidak didukung");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const imageUrl = await handleImageUpload(selectedFile);
      if (imageUrl) {
        console.log("Image uploaded, setting form value to:", imageUrl);
        
        // Set the image_url in the form
        form.setValue("image_url", imageUrl, { 
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
        
        setPreviewUrl(imageUrl);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("image_url", "", { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    setPreviewUrl(null);
    setSelectedFile(null);
    console.log("Image removed, form value cleared");
  };

  const handleSelectFromGallery = (imageUrl: string) => {
    form.setValue("image_url", imageUrl, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    setPreviewUrl(imageUrl);
    setSelectedFile(null);
  };

  return (
    <FormField
      control={form.control}
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gambar Event</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("event-image-input")?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" /> Pilih File
                </Button>
                <input
                  id="event-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                {selectedFile && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? "Mengunggah..." : "Unggah Sekarang"}
                  </Button>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsGalleryOpen(true)}
                  className="gap-2"
                >
                  <ImageIcon className="h-4 w-4" /> Pilih dari Galeri
                </Button>
              </div>
              
              {/* Preview of uploaded or selected image */}
              {previewUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute right-2 top-2 h-6 w-6"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground">
                {field.value ? "✓ Gambar diunggah dan siap untuk dikirim" : "Belum ada gambar yang dipilih"}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
