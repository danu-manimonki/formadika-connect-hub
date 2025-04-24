
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";
import { useState, useEffect } from "react";
import { useEventImages } from "@/hooks/useEventImages";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface EventImageUploadProps {
  form: UseFormReturn<EventFormData>;
}

export function EventImageUpload({ form }: EventImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "existing">("upload");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getExistingImages, isLoading: isLoadingImages } = useEventImages();

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
      form.setValue('image_url', file, { shouldValidate: true });
    }
  };

  const handleExistingImageSelect = (url: string) => {
    form.setValue('image_url', url, { shouldValidate: true });
    setIsDialogOpen(false);
  };

  const loadExistingImages = async () => {
    const images = await getExistingImages();
    setExistingImages(images);
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
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={uploadMethod === "upload" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setUploadMethod("upload")}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New
                  </Button>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        type="button" 
                        variant={uploadMethod === "existing" ? "default" : "outline"} 
                        className="flex-1"
                        onClick={() => {
                          setUploadMethod("existing");
                          loadExistingImages();
                        }}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Choose Existing
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Select an existing image</DialogTitle>
                      </DialogHeader>
                      
                      {isLoadingImages ? (
                        <div className="text-center py-4">Loading images...</div>
                      ) : existingImages.length === 0 ? (
                        <div className="text-center py-4">No images found</div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-2">
                          {existingImages.map((url, index) => (
                            <div 
                              key={index} 
                              className={`relative rounded-md overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity ${
                                url === field.value ? 'ring-2 ring-primary' : ''
                              }`}
                              onClick={() => handleExistingImageSelect(url)}
                            >
                              <img src={url} alt={`Event image ${index}`} className="h-32 w-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                
                {uploadMethod === "upload" && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleNewImageUpload}
                  />
                )}
              </div>

              {previewUrl && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">Preview:</p>
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
