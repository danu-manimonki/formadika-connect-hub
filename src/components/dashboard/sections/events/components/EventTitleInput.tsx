
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "../EventForm.types";

interface EventTitleInputProps {
  form: UseFormReturn<EventFormData>;
}

export function EventTitleInput({ form }: EventTitleInputProps) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Judul Kegiatan</FormLabel>
          <FormControl>
            <Input placeholder="Masukkan judul kegiatan" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
