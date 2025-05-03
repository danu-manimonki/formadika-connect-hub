
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";
import { EventTitleInput } from "./components/EventTitleInput";
import { EventDescriptionEditor } from "./components/EventDescriptionEditor";
import { EventImageUploader } from "./components/EventImageUploader";
import { ImageGalleryPicker } from "./ImageGalleryPicker";
import { useState } from "react";

interface EventBasicInfoProps {
  form: UseFormReturn<EventFormData>;
}

export function EventBasicInfo({ form }: EventBasicInfoProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const handleSelectFromGallery = (imageUrl: string) => {
    form.setValue("image_url", imageUrl, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b">
        <h3 className="text-lg font-medium">Informasi Dasar</h3>
      </div>

      <EventTitleInput form={form} />
      <EventDescriptionEditor form={form} />
      <EventImageUploader form={form} />

      <ImageGalleryPicker
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectImage={handleSelectFromGallery}
      />
    </div>
  );
}
