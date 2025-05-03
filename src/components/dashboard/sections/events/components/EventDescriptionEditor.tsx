
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "../EventForm.types";

interface EventDescriptionEditorProps {
  form: UseFormReturn<EventFormData>;
}

export function EventDescriptionEditor({ form }: EventDescriptionEditorProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Deskripsi</FormLabel>
          <FormControl>
            <RichTextEditor 
              content={field.value} 
              onChange={field.onChange}
              className="min-h-[200px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
